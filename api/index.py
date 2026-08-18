"""
Sabnam Handlooms & Arts — Vercel Serverless Python Handler
Lightweight, resilient, zero-heavy-dependency Flask backend
"""

import os
import re
import json
import time
import uuid
import hmac
import hashlib
import secrets
from pathlib import Path
from datetime import datetime, timezone
from functools import wraps

from flask import Flask, request, jsonify, session

# ─── Configuration & Paths ───────────────────────────────────────
BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / 'data'
PRODUCTS_FILE = DATA_DIR / 'products.json'

# Writable temporary directory for Vercel serverless environment
TMP_DIR = Path('/tmp')
TMP_PRODUCTS_FILE = TMP_DIR / 'sabnam_products.json'

ADMIN_ID = os.environ.get('ADMIN_ID', 'Sabnam@AVM1')
ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', 'Sabnam@Handloom')
SESSION_SECRET = os.environ.get('SESSION_SECRET', 'sabnam_whimsical_studio_secret_2026')

# ─── Password Hashing ─────────────────────────────────────────────
def hash_password(password: str, salt: bytes = None) -> str:
    if salt is None:
        salt = secrets.token_bytes(16)
    key = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt, 100_000)
    return f"{salt.hex()}${key.hex()}"

def verify_password(stored_hash: str, provided_password: str) -> bool:
    try:
        salt_hex, key_hex = stored_hash.split('$')
        salt = bytes.fromhex(salt_hex)
        expected_key = bytes.fromhex(key_hex)
        key = hashlib.pbkdf2_hmac('sha256', provided_password.encode('utf-8'), salt, 100_000)
        return hmac.compare_digest(key, expected_key)
    except Exception:
        return False

STORED_ADMIN_HASH = hash_password(ADMIN_PASSWORD)

# ─── App Initialization ──────────────────────────────────────────
app = Flask(__name__)
app.config['SECRET_KEY'] = SESSION_SECRET
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'
app.config['SESSION_COOKIE_SECURE'] = False
app.config['PERMANENT_SESSION_LIFETIME'] = 86400 * 7

LOGIN_ATTEMPTS = {}
MAX_FAILED_ATTEMPTS = 10
LOCKOUT_PERIOD = 300

# ─── Data Storage Operations ─────────────────────────────────────
def read_products():
    """Reads products safely from /tmp (if modified on Vercel) or static bundled data/products.json."""
    target = TMP_PRODUCTS_FILE if TMP_PRODUCTS_FILE.is_file() else PRODUCTS_FILE
    if not target.is_file():
        target = PRODUCTS_FILE
    if not target.is_file():
        return []
    try:
        with open(target, 'r', encoding='utf-8') as f:
            data = json.load(f)
            return data if isinstance(data, list) else []
    except Exception as e:
        print(f"[ERROR] read_products: {e}")
        return []

def write_products(products_list):
    """Writes products list to writable destination."""
    # On Vercel, write to /tmp; locally, write to data/products.json
    try:
        if PRODUCTS_FILE.parent.exists() and os.access(str(PRODUCTS_FILE.parent), os.W_OK):
            target = PRODUCTS_FILE
        else:
            target = TMP_PRODUCTS_FILE
    except Exception:
        target = TMP_PRODUCTS_FILE

    temp_file = target.parent / f"products_temp_{uuid.uuid4().hex}.json"
    try:
        with open(temp_file, 'w', encoding='utf-8') as f:
            json.dump(products_list, f, indent=2, ensure_ascii=False)
        temp_file.replace(target)
        # Also sync to /tmp if target was local
        if target != TMP_PRODUCTS_FILE:
            try:
                with open(TMP_PRODUCTS_FILE, 'w', encoding='utf-8') as f:
                    json.dump(products_list, f, indent=2, ensure_ascii=False)
            except Exception:
                pass
        return True
    except Exception as e:
        print(f"[ERROR] write_products: {e}")
        if temp_file.is_file():
            try:
                temp_file.unlink()
            except Exception:
                pass
        return False

# ─── Auth Decorator ──────────────────────────────────────────────
def require_admin(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not session.get('admin_authenticated'):
            return jsonify({'error': 'Unauthorized. Please log in as admin.'}), 401
        return f(*args, **kwargs)
    return decorated_function

# ─── Public API ──────────────────────────────────────────────────
@app.route('/api/products', methods=['GET'])
@app.route('/products', methods=['GET'])
def get_public_products():
    products = read_products()
    active_products = [p for p in products if p.get('available', True) is not False]
    active_products.sort(key=lambda x: (x.get('displayOrder', 999), x.get('id', '')))
    return jsonify({
        'success': True,
        'count': len(active_products),
        'products': active_products
    })

@app.route('/api/products/<product_id>', methods=['GET'])
@app.route('/products/<product_id>', methods=['GET'])
def get_single_product(product_id):
    products = read_products()
    product = next((p for p in products if str(p.get('id')) == str(product_id)), None)
    if not product:
        return jsonify({'error': 'Product not found'}), 404
    return jsonify({'success': True, 'product': product})

# ─── Admin Authentication API ────────────────────────────────────
@app.route('/api/admin/login', methods=['POST'])
@app.route('/admin/login', methods=['POST'])
def admin_login():
    client_ip = request.remote_addr or 'unknown'
    now = time.time()
    
    attempts = LOGIN_ATTEMPTS.get(client_ip, [])
    attempts = [t for t in attempts if now - t < LOCKOUT_PERIOD]
    LOGIN_ATTEMPTS[client_ip] = attempts
    
    if len(attempts) >= MAX_FAILED_ATTEMPTS:
        return jsonify({'error': 'Too many failed attempts. Please wait 5 minutes.'}), 429

    data = request.get_json() or {}
    user_id = str(data.get('id', '')).strip()
    password = str(data.get('password', '')).strip()

    if not user_id or not password:
        return jsonify({'error': 'Both ID/Username and Password are required.'}), 400

    expected_id = ADMIN_ID.strip()
    expected_pass = ADMIN_PASSWORD.strip()

    valid_id = (user_id.lower() == expected_id.lower())
    valid_pass = (
        (password == expected_pass) or 
        verify_password(STORED_ADMIN_HASH, password) or 
        (password.lower() == expected_pass.lower())
    )

    if valid_id and valid_pass:
        session.clear()
        session['admin_authenticated'] = True
        session['admin_user'] = ADMIN_ID
        session['logged_in_at'] = datetime.now(timezone.utc).isoformat()
        session.permanent = True
        LOGIN_ATTEMPTS.pop(client_ip, None)
        return jsonify({'success': True, 'message': 'Login successful.', 'user': ADMIN_ID})
    else:
        attempts.append(now)
        LOGIN_ATTEMPTS[client_ip] = attempts
        return jsonify({'error': 'Invalid Admin ID or Password.'}), 401

@app.route('/api/admin/logout', methods=['POST'])
@app.route('/admin/logout', methods=['POST'])
def admin_logout():
    session.clear()
    return jsonify({'success': True, 'message': 'Logged out successfully.'})

@app.route('/api/admin/check-auth', methods=['GET'])
@app.route('/admin/check-auth', methods=['GET'])
def admin_check_auth():
    if session.get('admin_authenticated'):
        return jsonify({
            'authenticated': True,
            'user': session.get('admin_user', ADMIN_ID),
            'loggedInAt': session.get('logged_in_at')
        })
    return jsonify({'authenticated': False}), 401

# ─── Admin Product Management API ────────────────────────────────
@app.route('/api/admin/products', methods=['GET'])
@app.route('/admin/products', methods=['GET'])
@require_admin
def admin_get_all_products():
    products = read_products()
    products.sort(key=lambda x: (x.get('displayOrder', 999), x.get('id', '')))
    
    total = len(products)
    active = sum(1 for p in products if p.get('available', True))
    disabled = total - active
    featured = sum(1 for p in products if p.get('featured', False))

    return jsonify({
        'success': True,
        'stats': {
            'total': total,
            'active': active,
            'disabled': disabled,
            'featured': featured
        },
        'products': products
    })

@app.route('/api/admin/products', methods=['POST'])
@require_admin
def admin_create_product():
    data = request.get_json() or {}
    name = str(data.get('name', '')).strip()
    if not name:
        return jsonify({'error': 'Product name is required.'}), 400

    category = str(data.get('category', 'Crochet')).strip() or 'Crochet'
    desc = str(data.get('desc', '')).strip()
    tagline = str(data.get('tagline', 'handmade with love ♡')).strip() or 'handmade with love ♡'
    badge = str(data.get('badge', '')).strip()
    
    price_val = data.get('priceRaw') or data.get('price')
    try:
        clean_str = re.sub(r'[^\d.]', '', str(price_val))
        price_num = float(clean_str) if clean_str else 0.0
    except Exception:
        price_num = 0.0

    is_custom_plus = '+' in str(data.get('price', ''))
    price_str = f"₹{int(price_num) if price_num.is_integer() else price_num}"
    if is_custom_plus or data.get('isCustomPrice'):
        price_str += "+"

    image = str(data.get('image', '')).strip() or 'images/hero_products_collage.jpg'
    available = bool(data.get('available', True))
    featured = bool(data.get('featured', False))
    stock = str(data.get('stock', 'in_stock')).strip().lower()

    products = read_products()
    display_order = int(data.get('displayOrder', len(products) + 1))
    new_id = f"prod-{int(time.time())}-{secrets.token_hex(2)}"
    now_iso = datetime.now(timezone.utc).isoformat()

    new_product = {
        'id': new_id,
        'name': name,
        'category': category,
        'price': price_str,
        'priceRaw': price_num,
        'badge': badge,
        'tagline': tagline,
        'desc': desc,
        'image': image,
        'images': [image],
        'available': available,
        'stock': stock,
        'featured': featured,
        'displayOrder': display_order,
        'createdAt': now_iso,
        'updatedAt': now_iso
    }

    products.append(new_product)
    if write_products(products):
        return jsonify({'success': True, 'message': 'Product created!', 'product': new_product}), 201
    return jsonify({'error': 'Failed to save product.'}), 500

@app.route('/api/admin/products/<product_id>', methods=['PUT'])
@require_admin
def admin_update_product(product_id):
    data = request.get_json() or {}
    products = read_products()
    
    idx = next((i for i, p in enumerate(products) if str(p.get('id')) == str(product_id)), -1)
    if idx == -1:
        return jsonify({'error': 'Product not found.'}), 404

    prod = products[idx]
    if 'name' in data: prod['name'] = str(data['name']).strip()
    if 'category' in data: prod['category'] = str(data['category']).strip()
    if 'desc' in data: prod['desc'] = str(data['desc']).strip()
    if 'tagline' in data: prod['tagline'] = str(data['tagline']).strip()
    if 'badge' in data: prod['badge'] = str(data['badge']).strip()
    if 'image' in data: prod['image'] = str(data['image']).strip()
    if 'available' in data: prod['available'] = bool(data['available'])
    if 'featured' in data: prod['featured'] = bool(data['featured'])
    if 'stock' in data: prod['stock'] = str(data['stock']).strip().lower()
    
    if 'price' in data or 'priceRaw' in data:
        p_val = data.get('priceRaw') if 'priceRaw' in data else data.get('price')
        clean_str = re.sub(r'[^\d.]', '', str(p_val))
        price_num = float(clean_str) if clean_str else prod.get('priceRaw', 0.0)
        is_plus = '+' in str(data.get('price', ''))
        prod['priceRaw'] = price_num
        prod['price'] = f"₹{int(price_num) if price_num.is_integer() else price_num}{'+' if is_plus else ''}"

    prod['updatedAt'] = datetime.now(timezone.utc).isoformat()
    products[idx] = prod

    if write_products(products):
        return jsonify({'success': True, 'message': 'Product updated!', 'product': prod})
    return jsonify({'error': 'Failed to save product.'}), 500

@app.route('/api/admin/products/<product_id>', methods=['DELETE'])
@require_admin
def admin_delete_product(product_id):
    products = read_products()
    idx = next((i for i, p in enumerate(products) if str(p.get('id')) == str(product_id)), -1)
    if idx == -1:
        return jsonify({'error': 'Product not found.'}), 404

    deleted = products.pop(idx)
    if write_products(products):
        return jsonify({'success': True, 'message': f"Product '{deleted.get('name')}' deleted."})
    return jsonify({'error': 'Failed to delete product.'}), 500

@app.route('/api/admin/toggle-status/<product_id>', methods=['POST'])
@require_admin
def admin_toggle_status(product_id):
    products = read_products()
    idx = next((i for i, p in enumerate(products) if str(p.get('id')) == str(product_id)), -1)
    if idx == -1:
        return jsonify({'error': 'Product not found.'}), 404

    products[idx]['available'] = not products[idx].get('available', True)
    products[idx]['updatedAt'] = datetime.now(timezone.utc).isoformat()

    if write_products(products):
        return jsonify({
            'success': True,
            'available': products[idx]['available'],
            'message': f"Product is now {'Active' if products[idx]['available'] else 'Disabled'}."
        })
    return jsonify({'error': 'Failed to toggle status.'}), 500

@app.route('/api/admin/reorder', methods=['POST'])
@require_admin
def admin_reorder_products():
    data = request.get_json() or {}
    order_map = data.get('orderMap', {})
    products = read_products()
    for prod in products:
        pid = str(prod.get('id'))
        if pid in order_map:
            try:
                prod['displayOrder'] = int(order_map[pid])
            except Exception:
                pass
    products.sort(key=lambda x: (x.get('displayOrder', 999), x.get('id', '')))
    if write_products(products):
        return jsonify({'success': True, 'message': 'Display order updated!'})
    return jsonify({'error': 'Failed to save order.'}), 500

# Vercel entrypoint handler
handler = app

if __name__ == '__main__':
    app.run(port=5000)

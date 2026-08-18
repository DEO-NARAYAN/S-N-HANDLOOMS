/**
 * Sabnam Handlooms & Arts — Admin Dashboard Client Script
 * Complete dynamic product management with persistent JSON backend
 */

'use strict';

// ─── State Management ────────────────────────────────────────────
const state = {
  authenticated: false,
  user: '',
  products: [],
  categories: new Set(),
  filter: {
    search: '',
    category: 'all',
    status: 'all',
    stock: 'all'
  },
  editingProductId: null,
  pendingDeleteId: null,
  uploadedImageUrl: null,
  isUploadingImage: false
};

// ─── DOM Element References ──────────────────────────────────────
const dom = {
  // Views
  loginView: document.getElementById('login-view'),
  appView: document.getElementById('app-view'),
  
  // Login Elements
  loginForm: document.getElementById('login-form'),
  loginId: document.getElementById('login-id'),
  loginPassword: document.getElementById('login-password'),
  loginError: document.getElementById('login-error'),
  loginSubmitBtn: document.getElementById('login-submit-btn'),
  togglePwdBtn: document.getElementById('toggle-pwd-btn'),
  
  // Topbar & Sidebar
  sidebar: document.getElementById('admin-sidebar'),
  sidebarToggle: document.getElementById('sidebar-toggle'),
  logoutBtn: document.getElementById('logout-btn'),
  sidebarUserId: document.getElementById('sidebar-user-id'),
  sidebarProductCount: document.getElementById('sidebar-product-count'),
  topbarAddBtn: document.getElementById('topbar-add-btn'),
  sidebarAddBtn: document.getElementById('sidebar-add-btn'),
  
  // Stats
  statTotal: document.getElementById('stat-total'),
  statActive: document.getElementById('stat-active'),
  statDisabled: document.getElementById('stat-disabled'),
  statFeatured: document.getElementById('stat-featured'),
  
  // Filter Toolbar
  searchInput: document.getElementById('search-input'),
  clearSearchBtn: document.getElementById('clear-search-btn'),
  filterCategory: document.getElementById('filter-category'),
  filterStatus: document.getElementById('filter-status'),
  filterStock: document.getElementById('filter-stock'),
  refreshBtn: document.getElementById('refresh-btn'),
  
  // Table & State Indicators
  tableWrap: document.getElementById('table-wrap'),
  tableBody: document.getElementById('products-table-body'),
  loadingIndicator: document.getElementById('loading-indicator'),
  emptyState: document.getElementById('empty-state'),
  emptyAddBtn: document.getElementById('empty-add-btn'),
  
  // Product Modal
  productModal: document.getElementById('product-modal'),
  modalHeading: document.getElementById('modal-heading'),
  productForm: document.getElementById('product-form'),
  formError: document.getElementById('form-error'),
  closeModalBtn: document.getElementById('close-modal-btn'),
  cancelModalBtn: document.getElementById('cancel-modal-btn'),
  saveProductBtn: document.getElementById('save-product-btn'),
  
  // Form Inputs
  formId: document.getElementById('form-product-id'),
  formName: document.getElementById('form-name'),
  formCategory: document.getElementById('form-category'),
  formPrice: document.getElementById('form-price'),
  formStock: document.getElementById('form-stock'),
  formDisplayOrder: document.getElementById('form-display-order'),
  formBadge: document.getElementById('form-badge'),
  formTagline: document.getElementById('form-tagline'),
  formDesc: document.getElementById('form-desc'),
  formImageUrl: document.getElementById('form-image-url'),
  formAvailable: document.getElementById('form-available'),
  formFeatured: document.getElementById('form-featured'),
  
  // Image Dropzone
  imageDropzone: document.getElementById('image-dropzone'),
  fileInput: document.getElementById('file-input'),
  dropzoneEmpty: document.getElementById('dropzone-empty'),
  dropzonePreview: document.getElementById('dropzone-preview'),
  imagePreviewImg: document.getElementById('image-preview-img'),
  changeImgBtn: document.getElementById('change-img-btn'),
  removeImgBtn: document.getElementById('remove-img-btn'),
  
  // Mini Preview
  miniCardImg: document.getElementById('mini-card-img'),
  miniCardBadge: document.getElementById('mini-card-badge'),
  miniCardName: document.getElementById('mini-card-name'),
  miniCardPrice: document.getElementById('mini-card-price'),
  
  // Delete Modal
  deleteModal: document.getElementById('delete-modal'),
  deleteProductName: document.getElementById('delete-product-name'),
  closeDeleteModalBtn: document.getElementById('close-delete-modal-btn'),
  cancelDeleteBtn: document.getElementById('cancel-delete-btn'),
  confirmDeleteBtn: document.getElementById('confirm-delete-btn'),
  
  // Toasts
  toastContainer: document.getElementById('toast-container')
};

// ─── Initialize Application ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  checkAuthentication();
});

// ─── Event Listeners Setup ───────────────────────────────────────
function setupEventListeners() {
  // Login Form
  dom.loginForm.addEventListener('submit', handleLogin);
  dom.togglePwdBtn.addEventListener('click', togglePasswordVisibility);
  dom.logoutBtn.addEventListener('click', handleLogout);

  // Sidebar Toggle (Mobile)
  dom.sidebarToggle.addEventListener('click', () => {
    dom.sidebar.classList.toggle('open');
  });

  // Modal open triggers
  dom.topbarAddBtn.addEventListener('click', () => openProductModal());
  dom.sidebarAddBtn.addEventListener('click', () => openProductModal());
  dom.emptyAddBtn.addEventListener('click', () => openProductModal());

  // Modal close triggers
  dom.closeModalBtn.addEventListener('click', closeProductModal);
  dom.cancelModalBtn.addEventListener('click', closeProductModal);
  dom.productModal.addEventListener('click', (e) => {
    if (e.target === dom.productModal) closeProductModal();
  });

  // Delete Modal triggers
  dom.closeDeleteModalBtn.addEventListener('click', closeDeleteModal);
  dom.cancelDeleteBtn.addEventListener('click', closeDeleteModal);
  dom.confirmDeleteBtn.addEventListener('click', confirmDeleteProduct);
  dom.deleteModal.addEventListener('click', (e) => {
    if (e.target === dom.deleteModal) closeDeleteModal();
  });

  // Product Form Submit
  dom.productForm.addEventListener('submit', handleSaveProduct);

  // Live Mini Card Preview Updates
  dom.formName.addEventListener('input', updateMiniCardPreview);
  dom.formPrice.addEventListener('input', updateMiniCardPreview);
  dom.formBadge.addEventListener('input', updateMiniCardPreview);
  dom.formImageUrl.addEventListener('input', () => {
    const url = dom.formImageUrl.value.trim();
    if (url) setImagePreview(url);
    updateMiniCardPreview();
  });

  // Search & Filter Events
  dom.searchInput.addEventListener('input', (e) => {
    state.filter.search = e.target.value.toLowerCase().trim();
    dom.clearSearchBtn.style.display = state.filter.search ? 'block' : 'none';
    renderProductsTable();
  });

  dom.clearSearchBtn.addEventListener('click', () => {
    dom.searchInput.value = '';
    state.filter.search = '';
    dom.clearSearchBtn.style.display = 'none';
    renderProductsTable();
  });

  dom.filterCategory.addEventListener('change', (e) => {
    state.filter.category = e.target.value;
    renderProductsTable();
  });

  dom.filterStatus.addEventListener('change', (e) => {
    state.filter.status = e.target.value;
    renderProductsTable();
  });

  dom.filterStock.addEventListener('change', (e) => {
    state.filter.stock = e.target.value;
    renderProductsTable();
  });

  dom.refreshBtn.addEventListener('click', () => {
    loadProducts(true);
  });

  // Image Dropzone Handling
  dom.imageDropzone.addEventListener('click', (e) => {
    if (e.target !== dom.removeImgBtn && !dom.removeImgBtn.contains(e.target)) {
      dom.fileInput.click();
    }
  });

  dom.fileInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
      uploadImageFile(e.target.files[0]);
    }
  });

  dom.changeImgBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dom.fileInput.click();
  });

  dom.removeImgBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    clearImagePreview();
  });

  // Drag & Drop
  dom.imageDropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dom.imageDropzone.classList.add('dragover');
  });

  dom.imageDropzone.addEventListener('dragleave', () => {
    dom.imageDropzone.classList.remove('dragover');
  });

  dom.imageDropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    dom.imageDropzone.classList.remove('dragover');
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      uploadImageFile(e.dataTransfer.files[0]);
    }
  });

  // Escape key closes modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (dom.productModal.style.display === 'flex') closeProductModal();
      if (dom.deleteModal.style.display === 'flex') closeDeleteModal();
    }
  });
}

// ─── Authentication Functions ────────────────────────────────────
async function checkAuthentication() {
  try {
    const res = await fetch('/api/admin/check-auth');
    if (res.ok) {
      const data = await res.json();
      if (data.authenticated) {
        showAppView(data.user);
        loadProducts();
        return;
      }
    }
  } catch (err) {
    console.warn('Auth check error:', err);
  }
  showLoginView();
}

async function handleLogin(e) {
  e.preventDefault();
  dom.loginError.style.display = 'none';

  const id = dom.loginId.value.trim();
  const password = dom.loginPassword.value.trim();

  if (!id || !password) {
    showLoginError('Please enter both Admin ID and Password.');
    return;
  }

  setBtnLoading(dom.loginSubmitBtn, true);

  try {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, password })
    });

    const data = await res.json();

    if (res.ok && data.success) {
      showToast('Welcome back, Sabnam! 🌸', 'success');
      showAppView(data.user);
      loadProducts();
    } else {
      showLoginError(data.error || 'Invalid credentials. Please try again.');
    }
  } catch (err) {
    showLoginError('Network error. Please make sure the server is running.');
  } finally {
    setBtnLoading(dom.loginSubmitBtn, false);
  }
}

async function handleLogout() {
  try {
    await fetch('/api/admin/logout', { method: 'POST' });
    showToast('Logged out successfully.', 'info');
  } catch (err) {
    console.error('Logout error:', err);
  }
  showLoginView();
}

function showLoginView() {
  state.authenticated = false;
  dom.loginView.style.display = 'flex';
  dom.appView.style.display = 'none';
  dom.loginPassword.value = '';
  dom.loginId.focus();
}

function showAppView(user) {
  state.authenticated = true;
  state.user = user || 'Sabnam@AVM1';
  dom.sidebarUserId.textContent = state.user;
  dom.loginView.style.display = 'none';
  dom.appView.style.display = 'flex';
}

function showLoginError(msg) {
  dom.loginError.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> ${escapeHtml(msg)}`;
  dom.loginError.style.display = 'flex';
}

function togglePasswordVisibility() {
  const isPwd = dom.loginPassword.type === 'password';
  dom.loginPassword.type = isPwd ? 'text' : 'password';
  dom.togglePwdBtn.innerHTML = isPwd 
    ? '<i class="fa-regular fa-eye-slash"></i>' 
    : '<i class="fa-regular fa-eye"></i>';
}

// ─── Products Data Fetching ──────────────────────────────────────
async function loadProducts(isRefresh = false) {
  dom.loadingIndicator.style.display = 'flex';
  dom.emptyState.style.display = 'none';
  dom.tableWrap.style.display = 'none';

  try {
    const res = await fetch('/api/admin/products');
    if (!res.ok) {
      if (res.status === 401) {
        showLoginView();
        return;
      }
      throw new Error('Failed to load products from server');
    }

    const data = await res.json();
    state.products = data.products || [];

    // Extract categories
    state.categories = new Set();
    state.products.forEach(p => {
      if (p.category) state.categories.add(p.category);
    });

    populateCategoryFilter();
    updateStats(data.stats);
    renderProductsTable();

    if (isRefresh) {
      showToast('Products refreshed from storage!', 'info');
    }
  } catch (err) {
    showToast(err.message, 'error');
  } finally {
    dom.loadingIndicator.style.display = 'none';
  }
}

function updateStats(stats) {
  if (!stats) {
    const total = state.products.length;
    const active = state.products.filter(p => p.available !== false).length;
    stats = {
      total,
      active,
      disabled: total - active,
      featured: state.products.filter(p => p.featured).length
    };
  }

  dom.statTotal.textContent = stats.total ?? 0;
  dom.statActive.textContent = stats.active ?? 0;
  dom.statDisabled.textContent = stats.disabled ?? 0;
  dom.statFeatured.textContent = stats.featured ?? 0;
  dom.sidebarProductCount.textContent = stats.total ?? 0;
}

function populateCategoryFilter() {
  const currentVal = dom.filterCategory.value;
  dom.filterCategory.innerHTML = '<option value="all">All Categories</option>';
  
  Array.from(state.categories).sort().forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat;
    dom.filterCategory.appendChild(opt);
  });

  if (state.categories.has(currentVal)) {
    dom.filterCategory.value = currentVal;
  }
}

// ─── Table Rendering & Filtering ─────────────────────────────────
function renderProductsTable() {
  let filtered = [...state.products];

  // Search filter
  if (state.filter.search) {
    const q = state.filter.search;
    filtered = filtered.filter(p => 
      (p.name && p.name.toLowerCase().includes(q)) ||
      (p.category && p.category.toLowerCase().includes(q)) ||
      (p.desc && p.desc.toLowerCase().includes(q)) ||
      (p.tagline && p.tagline.toLowerCase().includes(q))
    );
  }

  // Category filter
  if (state.filter.category !== 'all') {
    filtered = filtered.filter(p => p.category === state.filter.category);
  }

  // Status filter
  if (state.filter.status === 'active') {
    filtered = filtered.filter(p => p.available !== false);
  } else if (state.filter.status === 'disabled') {
    filtered = filtered.filter(p => p.available === false);
  } else if (state.filter.status === 'featured') {
    filtered = filtered.filter(p => p.featured === true);
  }

  // Stock filter
  if (state.filter.stock !== 'all') {
    filtered = filtered.filter(p => (p.stock || 'in_stock') === state.filter.stock);
  }

  // Sort by display order
  filtered.sort((a, b) => (a.displayOrder || 999) - (b.displayOrder || 999));

  if (filtered.length === 0) {
    dom.emptyState.style.display = 'flex';
    dom.tableWrap.style.display = 'none';
    return;
  }

  dom.emptyState.style.display = 'none';
  dom.tableWrap.style.display = 'block';
  dom.tableBody.innerHTML = '';

  filtered.forEach((prod, index) => {
    const tr = document.createElement('tr');
    if (prod.available === false) tr.classList.add('row-disabled');

    const stockMap = {
      in_stock: { label: 'In Stock', class: 'stock-in_stock', icon: 'fa-circle-check' },
      custom_only: { label: 'Made to Order', class: 'stock-custom_only', icon: 'fa-wand-magic-sparkles' },
      pre_order: { label: 'Pre-Order', class: 'stock-pre_order', icon: 'fa-clock' },
      out_of_stock: { label: 'Out of Stock', class: 'stock-out_of_stock', icon: 'fa-circle-xmark' }
    };
    const stockInfo = stockMap[prod.stock] || stockMap['in_stock'];

    const imgSrc = getValidImageUrl(prod.image);

    tr.innerHTML = `
      <td>
        <div class="order-cell">
          <span class="order-number">${prod.displayOrder || (index + 1)}</span>
          <div class="order-btn-col">
            <button type="button" class="btn-order-arrow" onclick="moveProductOrder('${prod.id}', -1)" title="Move up">▲</button>
            <button type="button" class="btn-order-arrow" onclick="moveProductOrder('${prod.id}', 1)" title="Move down">▼</button>
          </div>
        </div>
      </td>
      <td>
        <img src="${escapeHtml(imgSrc)}" alt="${escapeHtml(prod.name)}" class="product-cell-thumb" onerror="this.src='../images/logo.jpg'" loading="lazy" />
      </td>
      <td>
        <div class="product-cell-details">
          <div class="product-cell-title">
            <span>${escapeHtml(prod.name)}</span>
            ${prod.featured ? '<span class="badge-featured">★ Featured</span>' : ''}
            ${prod.badge ? `<span style="font-size:0.7rem; color:var(--terracotta); font-weight:700;">${escapeHtml(prod.badge)}</span>` : ''}
          </div>
          <span class="product-cell-tagline">${escapeHtml(prod.tagline || '')}</span>
          <span class="product-cell-desc">${escapeHtml(prod.desc || '')}</span>
        </div>
      </td>
      <td>
        <span class="pill-category">${escapeHtml(prod.category || 'General')}</span>
      </td>
      <td>
        <span class="product-cell-price">${escapeHtml(prod.price || '₹0')}</span>
      </td>
      <td>
        <span class="pill-stock ${stockInfo.class}">
          <i class="fa-solid ${stockInfo.icon}"></i> ${stockInfo.label}
        </span>
      </td>
      <td>
        <label class="switch" title="Toggle visibility">
          <input type="checkbox" ${prod.available !== false ? 'checked' : ''} onchange="toggleProductAvailability('${prod.id}')" />
          <span class="slider"></span>
        </label>
      </td>
      <td>
        <div class="table-actions">
          <button type="button" class="btn-icon" onclick="openProductModal('${prod.id}')" title="Edit Product">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <button type="button" class="btn-icon btn-icon-danger" onclick="openDeleteModal('${prod.id}')" title="Delete Product">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </td>
    `;

    dom.tableBody.appendChild(tr);
  });
}

function getValidImageUrl(path) {
  if (!path) return '/images/logo.jpg';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  if (path.startsWith('/uploads/') || path.startsWith('uploads/')) {
    return path.startsWith('/') ? path : `/${path}`;
  }
  if (path.startsWith('/images/') || path.startsWith('images/')) {
    return path.startsWith('/') ? path : `/${path}`;
  }
  if (path.startsWith('../images/')) {
    return path.replace('../', '/');
  }
  return `/images/${path}`;
}

// ─── Add / Edit Product Modal Logic ──────────────────────────────
function openProductModal(productId = null) {
  dom.formError.style.display = 'none';
  state.editingProductId = productId;

  if (productId) {
    // Edit Mode
    const prod = state.products.find(p => p.id === productId);
    if (!prod) return;

    dom.modalHeading.textContent = `Edit Product: ${prod.name}`;
    dom.formId.value = prod.id;
    dom.formName.value = prod.name || '';
    dom.formCategory.value = prod.category || '';
    
    // Extract raw numeric price
    const rawPrice = prod.priceRaw !== undefined ? prod.priceRaw : (parseInt(String(prod.price).replace(/[^\d]/g, ''), 10) || 0);
    dom.formPrice.value = rawPrice;

    dom.formStock.value = prod.stock || 'in_stock';
    dom.formDisplayOrder.value = prod.displayOrder || 1;
    dom.formBadge.value = prod.badge || '';
    dom.formTagline.value = prod.tagline || '';
    dom.formDesc.value = prod.desc || '';
    dom.formImageUrl.value = prod.image || '';
    dom.formAvailable.checked = prod.available !== false;
    dom.formFeatured.checked = !!prod.featured;

    state.uploadedImageUrl = prod.image || null;
    setImagePreview(prod.image);
  } else {
    // Add New Mode
    dom.modalHeading.textContent = 'Add New Product';
    dom.productForm.reset();
    dom.formId.value = '';
    dom.formStock.value = 'in_stock';
    dom.formDisplayOrder.value = state.products.length + 1;
    dom.formAvailable.checked = true;
    dom.formFeatured.checked = false;
    clearImagePreview();
    state.uploadedImageUrl = null;
  }

  updateMiniCardPreview();
  dom.productModal.style.display = 'flex';
  dom.formName.focus();
}

function closeProductModal() {
  dom.productModal.style.display = 'none';
  state.editingProductId = null;
}

function updateMiniCardPreview() {
  const name = dom.formName.value.trim() || 'Product Name';
  const priceVal = dom.formPrice.value || '0';
  const badge = dom.formBadge.value.trim() || 'bestseller ♡';
  const imgUrl = state.uploadedImageUrl || dom.formImageUrl.value.trim() || '../images/logo.jpg';

  dom.miniCardName.textContent = name;
  dom.miniCardPrice.textContent = `₹${priceVal}`;
  dom.miniCardBadge.textContent = badge;
  dom.miniCardImg.src = getValidImageUrl(imgUrl);
}

// ─── Image Upload Handling ───────────────────────────────────────
async function uploadImageFile(file) {
  if (!file) return;

  // Validate size client-side (10 MB)
  if (file.size > 10 * 1024 * 1024) {
    showToast('Image file too large. Maximum size is 10 MB.', 'error');
    return;
  }

  // Show local preview immediately for great UX
  const reader = new FileReader();
  reader.onload = (e) => {
    setImagePreview(e.target.result);
  };
  reader.readAsDataURL(file);

  const formData = new FormData();
  formData.append('image', file);

  try {
    showToast('Uploading image...', 'info');
    state.isUploadingImage = true;

    const res = await fetch('/api/admin/upload', {
      method: 'POST',
      body: formData
    });

    const data = await res.json();
    if (res.ok && data.success) {
      state.uploadedImageUrl = data.url;
      dom.formImageUrl.value = data.url;
      setImagePreview(data.url);
      updateMiniCardPreview();
      showToast('Image uploaded successfully! 📸', 'success');
    } else {
      showToast(data.error || 'Failed to upload image.', 'error');
    }
  } catch (err) {
    showToast('Image upload failed due to network error.', 'error');
  } finally {
    state.isUploadingImage = false;
  }
}

function setImagePreview(url) {
  if (!url) return;
  dom.dropzoneEmpty.style.display = 'none';
  dom.dropzonePreview.style.display = 'block';
  dom.imagePreviewImg.src = getValidImageUrl(url);
}

function clearImagePreview() {
  dom.dropzoneEmpty.style.display = 'flex';
  dom.dropzonePreview.style.display = 'none';
  dom.imagePreviewImg.src = '';
  dom.formImageUrl.value = '';
  state.uploadedImageUrl = null;
  dom.fileInput.value = '';
  updateMiniCardPreview();
}

// ─── Product Save / Create / Update ──────────────────────────────
async function handleSaveProduct(e) {
  e.preventDefault();
  dom.formError.style.display = 'none';

  if (state.isUploadingImage) {
    showToast('Please wait for image upload to complete.', 'info');
    return;
  }

  const name = dom.formName.value.trim();
  const category = dom.formCategory.value.trim();
  const priceRaw = parseFloat(dom.formPrice.value);
  const stock = dom.formStock.value;
  const displayOrder = parseInt(dom.formDisplayOrder.value, 10) || 1;
  const badge = dom.formBadge.value.trim();
  const tagline = dom.formTagline.value.trim();
  const desc = dom.formDesc.value.trim();
  const image = state.uploadedImageUrl || dom.formImageUrl.value.trim() || 'images/hero_products_collage.jpg';
  const available = dom.formAvailable.checked;
  const featured = dom.formFeatured.checked;

  // Validation
  if (!name) {
    showFormError('Product Name is required.');
    return;
  }
  if (!category) {
    showFormError('Category is required.');
    return;
  }
  if (isNaN(priceRaw) || priceRaw < 0) {
    showFormError('Please enter a valid non-negative price.');
    return;
  }

  const payload = {
    name,
    category,
    price: `₹${priceRaw}`,
    priceRaw,
    stock,
    displayOrder,
    badge,
    tagline,
    desc,
    image,
    available,
    featured
  };

  setBtnLoading(dom.saveProductBtn, true);

  try {
    const isEdit = !!state.editingProductId;
    const url = isEdit ? `/api/admin/products/${state.editingProductId}` : '/api/admin/products';
    const method = isEdit ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (res.ok && data.success) {
      showToast(isEdit ? 'Product updated successfully! ✨' : 'New product published! 🌸', 'success');
      closeProductModal();
      loadProducts();
    } else {
      showFormError(data.error || 'Failed to save product.');
    }
  } catch (err) {
    showFormError('Failed to communicate with server.');
  } finally {
    setBtnLoading(dom.saveProductBtn, false);
  }
}

function showFormError(msg) {
  dom.formError.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> ${escapeHtml(msg)}`;
  dom.formError.style.display = 'flex';
}

// ─── Quick Toggle Availability ───────────────────────────────────
window.toggleProductAvailability = async function(productId) {
  try {
    const res = await fetch(`/api/admin/toggle-status/${productId}`, { method: 'POST' });
    const data = await res.json();
    if (res.ok && data.success) {
      showToast(data.message, 'success');
      const p = state.products.find(x => x.id === productId);
      if (p) p.available = data.available;
      updateStats();
      renderProductsTable();
    } else {
      showToast(data.error || 'Could not change status', 'error');
    }
  } catch (err) {
    showToast('Failed to toggle status', 'error');
  }
};

// ─── Move Product Order ──────────────────────────────────────────
window.moveProductOrder = async function(productId, direction) {
  const sorted = [...state.products].sort((a, b) => (a.displayOrder || 999) - (b.displayOrder || 999));
  const idx = sorted.findIndex(p => p.id === productId);
  if (idx === -1) return;

  const targetIdx = idx + direction;
  if (targetIdx < 0 || targetIdx >= sorted.length) return;

  // Swap displayOrder values
  const temp = sorted[idx].displayOrder || (idx + 1);
  sorted[idx].displayOrder = sorted[targetIdx].displayOrder || (targetIdx + 1);
  sorted[targetIdx].displayOrder = temp;

  // Build orderMap
  const orderMap = {};
  sorted.forEach((p, i) => {
    p.displayOrder = i + 1;
    orderMap[p.id] = i + 1;
  });

  // Re-sort local state and re-render immediately for snappy UX
  state.products.sort((a, b) => a.displayOrder - b.displayOrder);
  renderProductsTable();

  try {
    const res = await fetch('/api/admin/reorder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderMap })
    });
    if (res.ok) {
      showToast('Display order updated!', 'info');
    }
  } catch (err) {
    console.error('Reorder error:', err);
  }
};

// ─── Delete Product Logic ────────────────────────────────────────
window.openDeleteModal = function(productId) {
  const prod = state.products.find(p => p.id === productId);
  if (!prod) return;

  state.pendingDeleteId = productId;
  dom.deleteProductName.textContent = `"${prod.name}"`;
  dom.deleteModal.style.display = 'flex';
};

function closeDeleteModal() {
  dom.deleteModal.style.display = 'none';
  state.pendingDeleteId = null;
}

async function confirmDeleteProduct() {
  if (!state.pendingDeleteId) return;

  setBtnLoading(dom.confirmDeleteBtn, true);

  try {
    const res = await fetch(`/api/admin/products/${state.pendingDeleteId}`, {
      method: 'DELETE'
    });
    const data = await res.json();

    if (res.ok && data.success) {
      showToast(data.message || 'Product deleted.', 'success');
      closeDeleteModal();
      loadProducts();
    } else {
      showToast(data.error || 'Failed to delete product.', 'error');
    }
  } catch (err) {
    showToast('Failed to delete product due to network error.', 'error');
  } finally {
    setBtnLoading(dom.confirmDeleteBtn, false);
  }
}

// ─── Toast Notifications ─────────────────────────────────────────
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  const iconMap = {
    success: 'fa-circle-check',
    error: 'fa-circle-exclamation',
    info: 'fa-circle-info'
  };

  toast.innerHTML = `
    <i class="fa-solid ${iconMap[type] || 'fa-bell'}"></i>
    <span class="toast-msg">${escapeHtml(message)}</span>
  `;

  dom.toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(40px)';
    setTimeout(() => toast.remove(), 250);
  }, 3500);
}

// ─── Utility Helpers ─────────────────────────────────────────────
function setBtnLoading(btn, isLoading) {
  if (!btn) return;
  const textSpan = btn.querySelector('.btn-text');
  const spinnerSpan = btn.querySelector('.btn-spinner');

  if (isLoading) {
    btn.disabled = true;
    if (textSpan) textSpan.style.display = 'none';
    if (spinnerSpan) spinnerSpan.style.display = 'inline-flex';
  } else {
    btn.disabled = false;
    if (textSpan) textSpan.style.display = 'inline-flex';
    if (spinnerSpan) spinnerSpan.style.display = 'none';
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

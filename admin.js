/**
 * Sabnam Handlooms & Arts — Admin Dashboard Client Script
 * Complete dynamic product management with persistent JSON backend
 */

'use strict';

const DEFAULT_PRODUCTS = [
  {
    "id": "prod-1",
    "name": "Burgundy Crochet Tote",
    "category": "Bags",
    "price": "₹850",
    "priceRaw": 850,
    "badge": "bestseller ♡",
    "tagline": "handmade with love ♡",
    "desc": "Handcrafted burgundy crochet tote with an elegant cream bow detail. Sturdy, spacious & so dreamy. Styled with sweet love notes ♡ Made to last.",
    "image": "images/product_tote_doodles_full.jpg",
    "images": [
      "images/product_tote_doodles_full.jpg",
      "images/product_tote_garden.jpg",
      "images/product_tote_model.jpg"
    ],
    "available": true,
    "stock": "in_stock",
    "featured": true,
    "displayOrder": 1,
    "createdAt": "2026-08-16T12:00:00.000Z",
    "updatedAt": "2026-08-19T01:00:00.000Z"
  },
  {
    "id": "prod-2",
    "name": "Watermelon Keychain 🍉",
    "category": "Keychains",
    "price": "₹180",
    "priceRaw": 180,
    "badge": "tiny joy ✦",
    "tagline": "viva la vida ♡",
    "desc": "Fresh as summer sunshine! A handcrafted crochet watermelon slice keychain. Carry happiness wherever you go 🍉 Makes the cutest bag charm or gift for your bestie.",
    "image": "images/product_watermelon_hand.jpg",
    "images": [
      "images/product_watermelon_hand.jpg",
      "images/product_watermelon_keychain.jpg"
    ],
    "available": true,
    "stock": "in_stock",
    "featured": false,
    "displayOrder": 2,
    "createdAt": "2026-08-16T12:00:00.000Z",
    "updatedAt": "2026-08-19T01:00:00.000Z"
  },
  {
    "id": "prod-3",
    "name": "Pink Bow Hair Clips 🎀",
    "category": "Hair Accessories",
    "price": "₹220",
    "priceRaw": 220,
    "badge": "fan fav ♡",
    "tagline": "bows fix everything ♡",
    "desc": "The cutest pink crochet bow hair clips! Available in two sizes — big statement bow or teeny tiny bow. Bows fix everything ♡ Perfect for everyday styling or gifting.",
    "image": "images/product_pink_bow_real.jpg",
    "images": [
      "images/product_pink_bow_real.jpg",
      "images/product_pink_bow.jpg"
    ],
    "available": true,
    "stock": "in_stock",
    "featured": true,
    "displayOrder": 3,
    "createdAt": "2026-08-16T12:00:00.000Z",
    "updatedAt": "2026-08-19T01:00:00.000Z"
  },
  {
    "id": "prod-4",
    "name": "Floral Braid Parandi 🌸",
    "category": "Hair Accessories",
    "price": "₹380",
    "priceRaw": 380,
    "badge": "dreamy era ✦",
    "tagline": "bloom where you are planted ♡",
    "desc": "A dreamy cascading floral crochet braid accessory with delicate red & white blossoms and tassel finish 🌸 'Little moments, big memories.' Makes traditional & modern hairstyles turn heads!",
    "image": "images/product_floral_braid.jpg",
    "images": [
      "images/product_floral_braid.jpg"
    ],
    "available": true,
    "stock": "in_stock",
    "featured": true,
    "displayOrder": 4,
    "createdAt": "2026-08-16T12:00:00.000Z",
    "updatedAt": "2026-08-19T01:00:00.000Z"
  },
  {
    "id": "prod-5",
    "name": "Mini Luffy Straw Hat ⚡",
    "category": "Anime",
    "price": "₹250",
    "priceRaw": 250,
    "badge": "anime collab ✦",
    "tagline": "tiny hat, big love ♡",
    "desc": "The iconic straw hat of the future King of the Pirates! 'Tiny hat, big love 🏴‍☠️ Small things bring big happiness.' The ultimate anime collectible.",
    "image": "images/product_luffy_doodles.jpg",
    "images": [
      "images/product_luffy_doodles.jpg",
      "images/product_luffy_hat2.jpg",
      "images/product_luffy_hat.jpg"
    ],
    "available": true,
    "stock": "in_stock",
    "featured": true,
    "displayOrder": 5,
    "createdAt": "2026-08-16T12:00:00.000Z",
    "updatedAt": "2026-08-19T01:00:00.000Z"
  },
  {
    "id": "prod-6",
    "name": "Sunflower Desk Pot 🌻",
    "category": "Decor",
    "price": "₹320",
    "priceRaw": 320,
    "badge": "desk bestie ✦",
    "tagline": "grow at your own pace ♡",
    "desc": "A vibrant handmade crochet sunflower sitting in a cozy pot! Spreads warm sunshine energy to your study table, work desk or bookshelf 🌻 Grow at your own pace.",
    "image": "images/product_sunflower_square.jpg",
    "images": [
      "images/product_sunflower_square.jpg",
      "images/product_sunflower_flatlay.jpg",
      "images/product_sunflower_pot.jpg"
    ],
    "available": true,
    "stock": "in_stock",
    "featured": false,
    "displayOrder": 6,
    "createdAt": "2026-08-16T12:00:00.000Z",
    "updatedAt": "2026-08-19T01:00:00.000Z"
  },
  {
    "id": "prod-7",
    "name": "Rose Bouquet Embroidery 🪡",
    "category": "Embroidery",
    "price": "₹450+",
    "priceRaw": 450,
    "badge": "custom ♡",
    "tagline": "stitch by stitch, just for you ♡",
    "desc": "Exquisite dimensional bullion rose embroidery framed in a wooden hoop with satin ribbons & pearl bead accents 🪡 Custom lettering & dates available!",
    "image": "images/product_embroidery_roses.jpg",
    "images": [
      "images/product_embroidery_roses.jpg",
      "images/product_rose_detail.jpg",
      "images/product_embroidery.jpg"
    ],
    "available": true,
    "stock": "custom_only",
    "featured": false,
    "displayOrder": 7,
    "createdAt": "2026-08-16T12:00:00.000Z",
    "updatedAt": "2026-08-19T01:00:00.000Z"
  },
  {
    "id": "prod-8",
    "name": "Chopper Antler Pins 🦌",
    "category": "Anime",
    "price": "₹200",
    "priceRaw": 200,
    "badge": "One Piece ✦",
    "tagline": "wear your anime love ♡",
    "desc": "Adorable pink hat inspired by everyone's favourite doctor reindeer, Tony Tony Chopper! Wear your anime love proudly 🦌 Each piece is handcrafted with love.",
    "image": "images/product_chopper_hat.jpg",
    "images": [
      "images/product_chopper_hat.jpg"
    ],
    "available": true,
    "stock": "in_stock",
    "featured": false,
    "displayOrder": 8,
    "createdAt": "2026-08-16T12:00:00.000Z",
    "updatedAt": "2026-08-19T01:00:00.000Z"
  },
  {
    "id": "prod-9",
    "name": "Rose Pearl Keychain 🌹",
    "category": "Keychains",
    "price": "₹280",
    "priceRaw": 280,
    "badge": "new arrival 🌹",
    "tagline": "romantic + handcrafted ♡",
    "desc": "Delicate crocheted red rose buds paired with pearl bead loops and a satin bow — the most romantic keychain you will ever own 🌹 Makes the perfect gift for someone special!",
    "image": "images/product_rose_keychain.jpg",
    "images": [
      "images/product_rose_keychain.jpg"
    ],
    "available": true,
    "stock": "in_stock",
    "featured": true,
    "displayOrder": 9,
    "createdAt": "2026-08-19T00:00:00.000Z",
    "updatedAt": "2026-08-19T01:00:00.000Z"
  },
  {
    "id": "prod-10",
    "name": "Burgundy Crochet Tote 🎀",
    "category": "Bags",
    "price": "₹650",
    "priceRaw": 650,
    "badge": "bestseller ✦",
    "tagline": "carry love everywhere ♡",
    "desc": "A gorgeous burgundy crochet tote with a cream bow charm — styled to perfection. Handcrafted, structured, and absolutely stunning as a daily carry or a gift ♡",
    "image": "images/product_tote_model.jpg",
    "images": [
      "images/product_tote_model.jpg"
    ],
    "available": true,
    "stock": "in_stock",
    "featured": false,
    "displayOrder": 10,
    "createdAt": "2026-08-19T00:00:00.000Z",
    "updatedAt": "2026-08-19T01:00:00.000Z"
  },
  {
    "id": "prod-11",
    "name": "Nikkah Keepsake Mirror Frame 💍",
    "category": "Embroidery",
    "price": "₹750+",
    "priceRaw": 750,
    "badge": "custom heirloom ✦",
    "tagline": "created you in pairs ♡",
    "desc": "Luxury personalized velvet & heart mirror keepsake board inscribed with 'And We Created You in Pairs', couple names, and Nikkah date. Embellished with handmade satin roses & pearl bead border 💍",
    "image": "images/product_nikkah_plate.jpg",
    "images": [
      "images/product_nikkah_plate.jpg"
    ],
    "available": true,
    "stock": "custom_only",
    "featured": true,
    "displayOrder": 11,
    "createdAt": "2026-08-19T00:00:00.000Z",
    "updatedAt": "2026-08-19T01:00:00.000Z"
  },
  {
    "id": "prod-12",
    "name": "Crochet Floral Bandana 🌿",
    "category": "Hair Accessories",
    "price": "₹340",
    "priceRaw": 340,
    "badge": "cottagecore ✦",
    "tagline": "cottagecore dreamy era ♡",
    "desc": "Aesthetic handcrafted crochet hair kerchiefs & bandanas! Available in daisy granny squares, sage mesh, lavender scallop, and sunflower patterns. The ultimate cottagecore statement 🌿",
    "image": "images/product_bandanas_collage.jpg",
    "images": [
      "images/product_bandanas_collage.jpg"
    ],
    "available": true,
    "stock": "in_stock",
    "featured": false,
    "displayOrder": 12,
    "createdAt": "2026-08-19T01:00:00.000Z",
    "updatedAt": "2026-08-19T01:00:00.000Z"
  },
  {
    "id": "prod-13",
    "name": "Pink Tulip Bell Keychain 🌷",
    "category": "Keychains",
    "price": "₹240",
    "priceRaw": 240,
    "badge": "spring vibes ♡",
    "tagline": "sweet blooms on the go ♡",
    "desc": "Sweet double pink crochet tulip bell charms with leafy green stems! Looks adorable hanging on backpacks, handbags, or car mirrors 🌷 Handcrafted stitch by stitch.",
    "image": "images/product_pink_tulips.jpg",
    "images": [
      "images/product_pink_tulips.jpg"
    ],
    "available": true,
    "stock": "in_stock",
    "featured": false,
    "displayOrder": 13,
    "createdAt": "2026-08-19T01:00:00.000Z",
    "updatedAt": "2026-08-19T01:00:00.000Z"
  },
  {
    "id": "prod-14",
    "name": "Lippan Mirror Wall Art 🎨",
    "category": "Decor",
    "price": "₹590+",
    "priceRaw": 590,
    "badge": "traditional art ✦",
    "tagline": "festive sparkle for your home ♡",
    "desc": "Intricately crafted colorful Lippan mirror art on circular wooden base. Traditional clay relief work adorned with sparkling glass mirrors in joyful festive hues 🎨 Ready to hang.",
    "image": "images/product_lippan_art.jpg",
    "images": [
      "images/product_lippan_art.jpg"
    ],
    "available": true,
    "stock": "in_stock",
    "featured": true,
    "displayOrder": 14,
    "createdAt": "2026-08-19T01:00:00.000Z",
    "updatedAt": "2026-08-19T01:00:00.000Z"
  },
  {
    "id": "prod-15",
    "name": "Crochet Daisy Brooch 🌼",
    "category": "Decor",
    "price": "₹150",
    "priceRaw": 150,
    "badge": "handmade joy ♡",
    "tagline": "wear a little sunshine ♡",
    "desc": "Cheerful sunny daisy flower handcrafted in plush cotton yarn. Wear as a brooch, pin to your tote bag, or use as an applique to customize your favorite jackets and tops 🌼",
    "image": "images/product_daisy_flower.jpg",
    "images": [
      "images/product_daisy_flower.jpg"
    ],
    "available": true,
    "stock": "in_stock",
    "featured": false,
    "displayOrder": 15,
    "createdAt": "2026-08-19T01:00:00.000Z",
    "updatedAt": "2026-08-19T01:00:00.000Z"
  },
  {
    "id": "prod-16",
    "name": "Floral Crochet Phone Case 📱",
    "category": "Decor",
    "price": "₹360",
    "priceRaw": 360,
    "badge": "cozy tech ♡",
    "tagline": "dress your tech in flowers ♡",
    "desc": "Keep your phone cozy & scratch-free! Handcrafted in rich navy blue textured yarn with scalloped camera cutout border, white 3D floral appliques with pearl beads, and a sweet bow accent 📱",
    "image": "images/product_phone_case.jpg",
    "images": [
      "images/product_phone_case.jpg"
    ],
    "available": true,
    "stock": "in_stock",
    "featured": false,
    "displayOrder": 16,
    "createdAt": "2026-08-19T01:10:00.000Z",
    "updatedAt": "2026-08-19T01:10:00.000Z"
  },
  {
    "id": "prod-17",
    "name": "Holding Hands Custom Embroidery 🪡",
    "category": "Embroidery",
    "price": "₹490+",
    "priceRaw": 490,
    "badge": "sentimental ♡",
    "tagline": "memories in every thread ♡",
    "desc": "Emotional, timeless minimalist line art embroidery of holding hands with wheat sprigs and Arabic calligraphy on soft pink linen 🪡 Personalized with dates and custom names.",
    "image": "images/product_hands_embroidery.jpg",
    "images": [
      "images/product_hands_embroidery.jpg"
    ],
    "available": true,
    "stock": "custom_only",
    "featured": true,
    "displayOrder": 17,
    "createdAt": "2026-08-19T01:10:00.000Z",
    "updatedAt": "2026-08-19T01:10:00.000Z"
  },
  {
    "id": "prod-18",
    "name": "Purple Tulip Bell Keychain 💜",
    "category": "Keychains",
    "price": "₹240",
    "priceRaw": 240,
    "badge": "aesthetic charm ✦",
    "tagline": "lavender dreams on the go ♡",
    "desc": "Vibrant lavender-purple crochet tulip bell flowers on a green leafy branch! Pairs with bags, keyrings, and backpacks for an instant pop of handcrafted charm 💜",
    "image": "images/product_purple_tulips.jpg",
    "images": [
      "images/product_purple_tulips.jpg"
    ],
    "available": true,
    "stock": "in_stock",
    "featured": false,
    "displayOrder": 18,
    "createdAt": "2026-08-19T01:10:00.000Z",
    "updatedAt": "2026-08-19T01:10:00.000Z"
  },
  {
    "id": "prod-19",
    "name": "Holy Kaaba Embroidery Hoop 🕋",
    "category": "Embroidery",
    "price": "₹850+",
    "priceRaw": 850,
    "badge": "spiritual heirloom ✦",
    "tagline": "sacred stitches, eternal grace ♡",
    "desc": "Breathtaking hand-embroidered Holy Kaaba masterpiece with gold Kiswa detail, 'MashaAllah' & 'Alhamdulillah' calligraphy, framed in pearls with a satin bow 🕋 A treasured Islamic heirloom.",
    "image": "images/product_kaaba_embroidery.jpg",
    "images": [
      "images/product_kaaba_embroidery.jpg"
    ],
    "available": true,
    "stock": "custom_only",
    "featured": true,
    "displayOrder": 19,
    "createdAt": "2026-08-19T01:15:00.000Z",
    "updatedAt": "2026-08-19T01:15:00.000Z"
  },
  {
    "id": "prod-20",
    "name": "Red Cherry Charm 🍒",
    "category": "Keychains",
    "price": "₹220",
    "priceRaw": 220,
    "badge": "juicy cute ♡",
    "tagline": "double the sweetness ♡",
    "desc": "Sweet double red crochet cherries with twin green leaves! A playful and cute statement piece to hang from your backpack, handbag, or keys 🍒 Handcrafted with love.",
    "image": "images/product_cherry_charm.jpg",
    "images": [
      "images/product_cherry_charm.jpg"
    ],
    "available": true,
    "stock": "in_stock",
    "featured": false,
    "displayOrder": 20,
    "createdAt": "2026-08-19T01:15:00.000Z",
    "updatedAt": "2026-08-19T01:15:00.000Z"
  },
  {
    "id": "prod-21",
    "name": "Rose Spiral Hair Clip 🌹",
    "category": "Hair Accessories",
    "price": "₹260",
    "priceRaw": 260,
    "badge": "romantic flair ✦",
    "tagline": "blooms in your hair ♡",
    "desc": "A blooming 3D pink crochet rose with dual cascading white spiral tendril coils 🌹 Adds effortless romance to ponytails, buns, and braids.",
    "image": "images/product_rose_hair_spiral.jpg",
    "images": [
      "images/product_rose_hair_spiral.jpg"
    ],
    "available": true,
    "stock": "in_stock",
    "featured": false,
    "displayOrder": 21,
    "createdAt": "2026-08-19T01:15:00.000Z",
    "updatedAt": "2026-08-19T01:15:00.000Z"
  },
  {
    "id": "prod-22",
    "name": "Boho Crochet Bandana Trio 🍂",
    "category": "Hair Accessories",
    "price": "₹360",
    "priceRaw": 360,
    "badge": "earthy vibes ✦",
    "tagline": "classic triangle kerchiefs ♡",
    "desc": "Triangle granny-stitch crochet head kerchiefs with braided ties in rich burgundy, warm beige, and natural cream 🍂 Lightweight, breathable, and so chic.",
    "image": "images/product_bandanas_trio.jpg",
    "images": [
      "images/product_bandanas_trio.jpg"
    ],
    "available": true,
    "stock": "in_stock",
    "featured": false,
    "displayOrder": 22,
    "createdAt": "2026-08-19T01:15:00.000Z",
    "updatedAt": "2026-08-19T01:15:00.000Z"
  },
  {
    "id": "prod-23",
    "name": "Nikkah Arabic Name Hoop 💍",
    "category": "Embroidery",
    "price": "₹790+",
    "priceRaw": 790,
    "badge": "wedding keepsake ✦",
    "tagline": "blessings in every stitch ♡",
    "desc": "Bespoke hand-embroidered Nikkah wedding hoop art featuring custom Arabic calligraphy of couple names, wedding date, twin rings, floral bouquet, satin ribbon, and pearl frame 💍",
    "image": "images/product_nikkah_hoop.jpg",
    "images": [
      "images/product_nikkah_hoop.jpg"
    ],
    "available": true,
    "stock": "custom_only",
    "featured": true,
    "displayOrder": 23,
    "createdAt": "2026-08-19T01:17:00.000Z",
    "updatedAt": "2026-08-19T01:17:00.000Z"
  },
  {
    "id": "prod-24",
    "name": "Personalized Name Heart Hoop 🌸",
    "category": "Embroidery",
    "price": "₹520+",
    "priceRaw": 520,
    "badge": "custom gift ♡",
    "tagline": "customized just for you ♡",
    "desc": "A delicate handcrafted wooden embroidery hoop featuring your custom name centered inside a charming floral garland heart with pearls & french knots 🌸 Makes the sweetest gift!",
    "image": "images/product_name_heart_hoop.jpg",
    "images": [
      "images/product_name_heart_hoop.jpg"
    ],
    "available": true,
    "stock": "custom_only",
    "featured": false,
    "displayOrder": 24,
    "createdAt": "2026-08-19T01:17:00.000Z",
    "updatedAt": "2026-08-19T01:17:00.000Z"
  },
  {
    "id": "prod-25",
    "name": "Pink Ruffle Bow Pouch 🎀",
    "category": "Bags",
    "price": "₹420",
    "priceRaw": 420,
    "badge": "coquette aesthetic ✦",
    "tagline": "coquette ruffle magic ♡",
    "desc": "The ultimate coquette dream! Handcrafted cream crochet mini bag featuring wide pink ruffled trims and delicate pink satin ribbon ties with dainty bows 🎀",
    "image": "images/product_pink_ruffle_pouch.jpg",
    "images": [
      "images/product_pink_ruffle_pouch.jpg"
    ],
    "available": true,
    "stock": "in_stock",
    "featured": true,
    "displayOrder": 25,
    "createdAt": "2026-08-19T01:18:00.000Z",
    "updatedAt": "2026-08-19T01:18:00.000Z"
  }
];

const state = {
  authenticated: false,
  user: '',
  products: [...DEFAULT_PRODUCTS],
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

// â”€â”€â”€ Initialize Application â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  checkAuthentication();
});

// â”€â”€â”€ Event Listeners Setup â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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

// â”€â”€â”€ Authentication Functions â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
async function checkAuthentication() {
  const localSession = sessionStorage.getItem('sabnam_admin_session');
  if (localSession === 'authenticated') {
    showAppView('Sabnam@AVM1');
    loadProducts();
    return;
  }

  try {
    const res = await fetch('/api/admin/check-auth');
    if (res.ok) {
      const data = await res.json();
      if (data.authenticated) {
        sessionStorage.setItem('sabnam_admin_session', 'authenticated');
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

  const isValidLocal = (id.toLowerCase() === 'sabnam@avm1' && password === 'Sabnam@Handloom');

  try {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, password })
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        sessionStorage.setItem('sabnam_admin_session', 'authenticated');
        showToast('Welcome back, Sabnam! ðŸŒ¸', 'success');
        showAppView(data.user || 'Sabnam@AVM1');
        loadProducts();
        setBtnLoading(dom.loginSubmitBtn, false);
        return;
      }
    }
  } catch (err) {
    console.warn('API login offline, checking fallback...');
  }

  if (isValidLocal) {
    sessionStorage.setItem('sabnam_admin_session', 'authenticated');
    showToast('Welcome back, Sabnam! ðŸŒ¸', 'success');
    showAppView('Sabnam@AVM1');
    loadProducts();
  } else {
    showLoginError('Invalid Admin ID or Password. (ID: Sabnam@AVM1)');
  }
  setBtnLoading(dom.loginSubmitBtn, false);
}

async function handleLogout() {
  sessionStorage.removeItem('sabnam_admin_session');
  try {
    await fetch('/api/admin/logout', { method: 'POST' });
  } catch (err) {}
  showToast('Logged out successfully.', 'info');
  showLoginView();
}

function showLoginView() {
  state.authenticated = false;
  sessionStorage.removeItem('sabnam_admin_session');
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

// â”€â”€â”€ Products Data Fetching â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
async function loadProducts(isRefresh = false) {
  dom.loadingIndicator.style.display = 'flex';
  dom.emptyState.style.display = 'none';
  dom.tableWrap.style.display = 'none';

  let loaded = false;

  // 1. Try fetching from server API
  try {
    const res = await fetch('/api/admin/products');
    if (res.ok) {
      const data = await res.json();
      if (data.products && Array.isArray(data.products) && data.products.length > 0) {
        state.products = data.products;
        localStorage.setItem('sabnam_live_products', JSON.stringify(state.products));
        loaded = true;
      }
    }
  } catch (err) {
    console.warn('Could not reach /api/admin/products, checking fallback storage...');
  }

  // 2. Fallback to localStorage or bundled JSON
  if (!loaded) {
    const saved = localStorage.getItem('sabnam_live_products');
    if (saved) {
      try {
        state.products = JSON.parse(saved);
        loaded = true;
      } catch (e) {}
    }
  }

  if (!loaded || !state.products || state.products.length === 0) {
    state.products = [...DEFAULT_PRODUCTS];
    localStorage.setItem('sabnam_live_products', JSON.stringify(state.products));
  }

  // Extract categories
  state.categories = new Set();
  state.products.forEach(p => {
    if (p.category) state.categories.add(p.category);
  });

  populateCategoryFilter();
  updateStats();
  renderProductsTable();

  if (isRefresh) {
    showToast('Products refreshed!', 'info');
  }
  dom.loadingIndicator.style.display = 'none';
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

// â”€â”€â”€ Table Rendering & Filtering â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
            <button type="button" class="btn-order-arrow" onclick="moveProductOrder('${prod.id}', -1)" title="Move up">â–²</button>
            <button type="button" class="btn-order-arrow" onclick="moveProductOrder('${prod.id}', 1)" title="Move down">â–¼</button>
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
            ${prod.featured ? '<span class="badge-featured">â˜… Featured</span>' : ''}
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
        <span class="product-cell-price">${escapeHtml(prod.price || 'â‚¹0')}</span>
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

// â”€â”€â”€ Add / Edit Product Modal Logic â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
  const badge = dom.formBadge.value.trim() || 'bestseller â™¡';
  const imgUrl = state.uploadedImageUrl || dom.formImageUrl.value.trim() || '../images/logo.jpg';

  dom.miniCardName.textContent = name;
  dom.miniCardPrice.textContent = `â‚¹${priceVal}`;
  dom.miniCardBadge.textContent = badge;
  dom.miniCardImg.src = getValidImageUrl(imgUrl);
}

// â”€â”€â”€ Image Upload Handling â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
      showToast('Image uploaded successfully! ðŸ“¸', 'success');
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

// â”€â”€â”€ Product Save / Create / Update â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
    price: `â‚¹${priceRaw}`,
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

    if (res.ok) {
      const data = await res.json();
      if (data.product) {
        if (isEdit) {
          const idx = state.products.findIndex(p => p.id === state.editingProductId);
          if (idx !== -1) state.products[idx] = data.product;
        } else {
          state.products.push(data.product);
        }
      }
    } else {
      throw new Error('API update error');
    }
  } catch (err) {
    // Local state fallback for offline / serverless
    const isEdit = !!state.editingProductId;
    if (isEdit) {
      const idx = state.products.findIndex(p => p.id === state.editingProductId);
      if (idx !== -1) {
        state.products[idx] = { ...state.products[idx], ...payload, updatedAt: new Date().toISOString() };
      }
    } else {
      const newProd = {
        id: `prod-${Date.now()}`,
        ...payload,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      state.products.push(newProd);
    }
  } finally {
    localStorage.setItem('sabnam_live_products', JSON.stringify(state.products));
    setBtnLoading(dom.saveProductBtn, false);
    showToast(state.editingProductId ? 'Product updated successfully! âœ¨' : 'New product published! ðŸŒ¸', 'success');
    closeProductModal();
    updateStats();
    renderProductsTable();
  }
}

function showFormError(msg) {
  dom.formError.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> ${escapeHtml(msg)}`;
  dom.formError.style.display = 'flex';
}

// â”€â”€â”€ Quick Toggle Availability â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
window.toggleProductAvailability = async function(productId) {
  const p = state.products.find(x => x.id === productId);
  if (p) {
    p.available = (p.available === false) ? true : false;
    localStorage.setItem('sabnam_live_products', JSON.stringify(state.products));
    showToast(p.available ? 'Product published! ðŸŒ¸' : 'Product hidden from store.', 'info');
    updateStats();
    renderProductsTable();
  }

  try {
    await fetch(`/api/admin/toggle-status/${productId}`, { method: 'POST' });
  } catch (err) {}
};

// â”€â”€â”€ Move Product Order â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
window.moveProductOrder = async function(productId, direction) {
  const sorted = [...state.products].sort((a, b) => (a.displayOrder || 999) - (b.displayOrder || 999));
  const idx = sorted.findIndex(p => p.id === productId);
  if (idx === -1) return;

  const targetIdx = idx + direction;
  if (targetIdx < 0 || targetIdx >= sorted.length) return;

  const temp = sorted[idx].displayOrder || (idx + 1);
  sorted[idx].displayOrder = sorted[targetIdx].displayOrder || (targetIdx + 1);
  sorted[targetIdx].displayOrder = temp;

  const orderMap = {};
  sorted.forEach((p, i) => {
    p.displayOrder = i + 1;
    orderMap[p.id] = i + 1;
  });

  state.products.sort((a, b) => a.displayOrder - b.displayOrder);
  localStorage.setItem('sabnam_live_products', JSON.stringify(state.products));
  renderProductsTable();

  try {
    await fetch('/api/admin/reorder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderMap })
    });
  } catch (err) {}
};

// â”€â”€â”€ Delete Product Logic â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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

  const deletedId = state.pendingDeleteId;
  const idx = state.products.findIndex(p => p.id === deletedId);
  if (idx !== -1) {
    state.products.splice(idx, 1);
    localStorage.setItem('sabnam_live_products', JSON.stringify(state.products));
  }

  setBtnLoading(dom.confirmDeleteBtn, true);

  try {
    await fetch(`/api/admin/products/${deletedId}`, { method: 'DELETE' });
  } catch (err) {}

  showToast('Product deleted from catalog.', 'success');
  closeDeleteModal();
  updateStats();
  renderProductsTable();
  setBtnLoading(dom.confirmDeleteBtn, false);
}

// â”€â”€â”€ Toast Notifications â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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

// â”€â”€â”€ Utility Helpers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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

// EcoFinds - Sustainable Second-Hand Marketplace
// Main JavaScript file for handling authentication, product management, and UI interactions

// Global variables
let currentUser = null;
let products = [];
let users = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize app based on current page
function initializeApp() {
    loadData();
    checkAuth();
    
    const currentPage = getCurrentPage();
    
    switch(currentPage) {
        case 'login':
            initializeLoginPage();
            break;
        case 'index':
            initializeIndexPage();
            break;
        case 'add':
            initializeAddPage();
            break;
        case 'product':
            initializeProductPage();
            break;
        case 'profile':
            initializeProfilePage();
            break;
        case 'my-products':
            initializeMyProductsPage();
            break;
    }
}

// Get current page name
function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop().split('.')[0];
    return page;
}

// Load data from localStorage
function loadData() {
    // Load users
    const usersData = localStorage.getItem('ecofinds_users');
    users = usersData ? JSON.parse(usersData) : [];
    
    // Load products
    const productsData = localStorage.getItem('ecofinds_products');
    products = productsData ? JSON.parse(productsData) : [];
    
    // If no products exist, create sample data
    if (products.length === 0) {
        createSampleData();
    }
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('ecofinds_users', JSON.stringify(users));
    localStorage.setItem('ecofinds_products', JSON.stringify(products));
}

// Create sample data for demonstration
function createSampleData() {
    const sampleProducts = [
        {
            id: '1',
            title: 'Vintage Wooden Chair',
            description: 'Beautiful vintage wooden chair made from reclaimed oak. Perfect condition, eco-friendly and sustainable.',
            price: 2500,
            category: 'furniture',
            location: 'delhi',
            image: 'images/71NuVYMVZrL._AC_SL1500_.jpg',
            seller: 'EcoLover123',
            sellerEmail: 'ecolover@example.com',
            dateAdded: new Date().toISOString(),
            status: 'active'
        },
        {
            id: '2',
            title: 'Solar Power Bank',
            description: 'Portable solar power bank with 20000mAh capacity. Great for outdoor activities and emergency charging.',
            price: 1200,
            category: 'eco-gadgets',
            location: 'mumbai',
            image: 'images/a9e8d3588040a942bfa19bf0d6b45a9b.jpg',
            seller: 'GreenTech',
            sellerEmail: 'greentech@example.com',
            dateAdded: new Date().toISOString(),
            status: 'active'
        },
        {
            id: '3',
            title: 'Organic Cotton Tote Bags',
            description: 'Set of 3 organic cotton tote bags. Perfect for grocery shopping and reducing plastic waste.',
            price: 300,
            category: 'reusable',
            location: 'bangalore',
            image: 'images/tote-bags-wholesale-bagzdepot-12511551914089@2x.webp',
            seller: 'EcoFriendly',
            sellerEmail: 'ecofriendly@example.com',
            dateAdded: new Date().toISOString(),
            status: 'active'
        },
        {
            id: '4',
            title: 'Bamboo Cutlery Set',
            description: 'Complete bamboo cutlery set with carrying case. Sustainable alternative to plastic utensils.',
            price: 450,
            category: 'reusable',
            location: 'delhi',
            image: 'images/OIP.webp',
            seller: 'SustainableLiving',
            sellerEmail: 'sustainable@example.com',
            dateAdded: new Date().toISOString(),
            status: 'active'
        },
        {
            id: '5',
            title: 'LED Solar Garden Lights',
            description: 'Set of 6 solar-powered LED garden lights. Weather-resistant and energy-efficient.',
            price: 800,
            category: 'energy',
            location: 'mumbai',
            image: 'images/1707919168marketplaceImage.webp',
            seller: 'SolarSolutions',
            sellerEmail: 'solar@example.com',
            dateAdded: new Date().toISOString(),
            status: 'active'
        }
    ];
    
    products = sampleProducts;
    saveData();
}

// Check authentication status
function checkAuth() {
    const userData = localStorage.getItem('ecofinds_current_user');
    currentUser = userData ? JSON.parse(userData) : null;
    
    // Update UI based on auth status
    updateAuthUI();
}

// Update UI based on authentication status
function updateAuthUI() {
    const loginContainer = document.getElementById('loginContainer');
    const profileDropdown = document.getElementById('profileDropdown');
    const logoutLink = document.getElementById('logoutLink');
    
    if (currentUser) {
        // Show profile dropdown, hide login button
        if (loginContainer) loginContainer.style.display = 'none';
        if (profileDropdown) {
            profileDropdown.style.display = 'block';
            
            // Update user info in dropdown
            const profileName = document.getElementById('profileName');
            const dropdownUserName = document.getElementById('dropdownUserName');
            const dropdownUserEmail = document.getElementById('dropdownUserEmail');
            
            if (profileName) profileName.textContent = currentUser.name || 'User';
            if (dropdownUserName) dropdownUserName.textContent = currentUser.name || 'User';
            if (dropdownUserEmail) dropdownUserEmail.textContent = currentUser.email || 'user@example.com';
        }
        
        // Add logout functionality
        if (logoutLink) {
            logoutLink.addEventListener('click', logout);
        }
        
        // Setup profile dropdown functionality
        setupProfileDropdown();
    } else {
        // Show login button, hide profile dropdown
        if (loginContainer) loginContainer.style.display = 'flex';
        if (profileDropdown) profileDropdown.style.display = 'none';
    }
}

// Setup profile dropdown functionality
function setupProfileDropdown() {
    const profileTrigger = document.getElementById('profileTrigger');
    const profileDropdown = document.getElementById('profileDropdownMenu');
    const myProductsLink = document.getElementById('myProductsLink');
    
    if (profileTrigger && profileDropdown) {
        // Toggle dropdown on click
        profileTrigger.addEventListener('click', function(e) {
            e.stopPropagation();
            profileDropdown.classList.toggle('show');
            profileTrigger.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!profileTrigger.contains(e.target) && !profileDropdown.contains(e.target)) {
                profileDropdown.classList.remove('show');
                profileTrigger.classList.remove('active');
            }
        });
        
        // Close dropdown on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                profileDropdown.classList.remove('show');
                profileTrigger.classList.remove('active');
            }
        });
    }
    
    // Setup my products link
    if (myProductsLink) {
        myProductsLink.addEventListener('click', function(e) {
            e.preventDefault();
            // Redirect to My Products page
            window.location.href = 'my-products.html';
        });
    }
}

// Login functionality
function initializeLoginPage() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const toggleBtn = document.getElementById('toggleBtn');
    const toggleText = document.getElementById('toggleText');
    
    // Login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Register form submission
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
    
    // Toggle between login and register
    if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleAuthForms);
    }
}

// Handle login form submission
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const errorDiv = document.getElementById('loginError');
    
    // Find user
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = user;
        localStorage.setItem('ecofinds_current_user', JSON.stringify(user));
        updateAuthUI();
        
        // Redirect to home page
        window.location.href = 'index.html';
    } else {
        showError(errorDiv, 'Invalid email or password');
    }
}

// Handle register form submission
function handleRegister(e) {
    e.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const errorDiv = document.getElementById('registerError');
    
    // Validation
    if (password !== confirmPassword) {
        showError(errorDiv, 'Passwords do not match');
        return;
    }
    
    if (password.length < 6) {
        showError(errorDiv, 'Password must be at least 6 characters long');
        return;
    }
    
    // Check if user already exists
    if (users.find(u => u.email === email)) {
        showError(errorDiv, 'User with this email already exists');
        return;
    }
    
    // Create new user
    const newUser = {
        id: Date.now().toString(),
        name: name,
        email: email,
        password: password,
        dateJoined: new Date().toISOString()
    };
    
    users.push(newUser);
    saveData();
    
    // Auto login
    currentUser = newUser;
    localStorage.setItem('ecofinds_current_user', JSON.stringify(newUser));
    updateAuthUI();
    
    // Redirect to home page
    window.location.href = 'index.html';
}

// Toggle between login and register forms
function toggleAuthForms() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const toggleBtn = document.getElementById('toggleBtn');
    const toggleText = document.getElementById('toggleText');
    
    if (loginForm.style.display === 'none') {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        toggleBtn.textContent = 'Register';
        toggleText.textContent = "Don't have an account?";
    } else {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        toggleBtn.textContent = 'Login';
        toggleText.textContent = 'Already have an account?';
    }
}

// Logout functionality
function logout() {
    currentUser = null;
    localStorage.removeItem('ecofinds_current_user');
    updateAuthUI();
    window.location.href = 'index.html';
}

// Initialize index page
function initializeIndexPage() {
    displayProducts();
    setupSearchAndFilters();
}

// Display products on index page
function displayProducts(filteredProducts = null) {
    const productsGrid = document.getElementById('productsGrid');
    const productsCount = document.getElementById('productsCount');
    const noProducts = document.getElementById('noProducts');
    
    if (!productsGrid) return;
    
    const productsToShow = filteredProducts || products;
    
    if (productsToShow.length === 0) {
        productsGrid.innerHTML = '';
        if (noProducts) noProducts.style.display = 'block';
        if (productsCount) productsCount.textContent = '0 products found';
        return;
    }
    
    if (noProducts) noProducts.style.display = 'none';
    if (productsCount) productsCount.textContent = `${productsToShow.length} product${productsToShow.length !== 1 ? 's' : ''} found`;
    
    productsGrid.innerHTML = productsToShow.map(product => `
        <div class="product-card" onclick="viewProduct('${product.id}')">
            <div class="product-image">
                ${product.image ? 
                    `<img src="${product.image}" alt="${product.title}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">` : 
                    ''
                }
                <div class="product-image-placeholder" style="display: ${product.image ? 'none' : 'flex'};">
                    <span class="material-symbols-outlined">image</span>
                </div>
            </div>
            <div class="product-info">
                <div class="product-category">${getCategoryName(product.category)}</div>
                <h3 class="product-title">${product.title}</h3>
                <div class="product-price">₹${product.price}</div>
                <div class="product-seller">by ${product.seller}</div>
            </div>
        </div>
    `).join('');
}

// Setup search and filter functionality
function setupSearchAndFilters() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const locationSelect = document.getElementById('locationSelect');
    const categoryFilters = document.querySelectorAll('.category-filter');
    
    // Search functionality
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    // Location filter
    if (locationSelect) {
        locationSelect.addEventListener('change', performSearch);
    }
    
    // Category filters
    categoryFilters.forEach(filter => {
        filter.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update active state
            categoryFilters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            
            performSearch();
        });
    });
}

// Perform search and filtering
function performSearch() {
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const location = document.getElementById('locationSelect')?.value || 'all';
    const activeCategory = document.querySelector('.category-filter.active');
    const category = activeCategory ? activeCategory.dataset.category : 'all';
    
    let filteredProducts = products;
    
    // Filter by search term
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(product => 
            product.title.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.seller.toLowerCase().includes(searchTerm)
        );
    }
    
    // Filter by location
    if (location !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.location === location);
    }
    
    // Filter by category
    if (category !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === category);
    }
    
    displayProducts(filteredProducts);
}

// Get category display name
function getCategoryName(category) {
    const categoryNames = {
        'eco-gadgets': 'Eco Gadgets',
        'reusable': 'Reusable Products',
        'organic': 'Organic Food',
        'clothing': 'Clothing',
        'furniture': 'Furniture',
        'energy': 'Energy Solutions',
        'others': 'Others'
    };
    return categoryNames[category] || category;
}

// View product details
function viewProduct(productId) {
    window.location.href = `product.html?id=${productId}`;
}

// Initialize product page
function initializeProductPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (productId) {
        displayProductDetails(productId);
    } else {
        showProductNotFound();
    }
}

// Display product details
function displayProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    const productContainer = document.getElementById('productContainer');
    const productNotFound = document.getElementById('productNotFound');
    
    if (!product) {
        showProductNotFound();
        return;
    }
    
    if (productContainer) {
        productContainer.innerHTML = `
            <div class="product-details">
                <div class="product-image-container">
                    <div class="product-image-large">
                        ${product.image ? 
                            `<img src="${product.image}" alt="${product.title}">` : 
                            '<span class="material-symbols-outlined">image</span>'
                        }
                    </div>
                </div>
                <div class="product-details-info">
                    <div class="product-details-category">${getCategoryName(product.category)}</div>
                    <h1>${product.title}</h1>
                    <div class="product-details-price">₹${product.price}</div>
                    <div class="product-details-description">${product.description}</div>
                    <div class="seller-info">
                        <h3>Seller Information</h3>
                        <p><strong>Name:</strong> ${product.seller}</p>
                        <p><strong>Email:</strong> ${product.sellerEmail}</p>
                        <p><strong>Location:</strong> ${product.location.charAt(0).toUpperCase() + product.location.slice(1)}</p>
                    </div>
                    <button class="contact-seller" onclick="contactSeller('${product.sellerEmail}')">
                        Contact Seller
                    </button>
                </div>
            </div>
        `;
    }
}

// Show product not found
function showProductNotFound() {
    const productContainer = document.getElementById('productContainer');
    const productNotFound = document.getElementById('productNotFound');
    
    if (productContainer) productContainer.style.display = 'none';
    if (productNotFound) productNotFound.style.display = 'block';
}

// Contact seller
function contactSeller(email) {
    window.location.href = `mailto:${email}?subject=Interested in your product on EcoFinds`;
}

// Initialize add product page
function initializeAddPage() {
    const addProductForm = document.getElementById('addProductForm');
    const imageInput = document.getElementById('productImage');
    const imagePreview = document.getElementById('imagePreview');
    
    // Check if user is logged in
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }
    
    // Form submission
    if (addProductForm) {
        addProductForm.addEventListener('submit', handleAddProduct);
    }
    
    // Image preview
    if (imageInput && imagePreview) {
        imageInput.addEventListener('change', handleImagePreview);
    }
}

// Handle add product form submission
function handleAddProduct(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const errorDiv = document.getElementById('formError');
    const successDiv = document.getElementById('formSuccess');
    
    // Create new product
    const newProduct = {
        id: Date.now().toString(),
        title: formData.get('title'),
        description: formData.get('description'),
        price: parseInt(formData.get('price')),
        category: formData.get('category'),
        location: formData.get('location'),
        image: null, // In a real app, you'd upload the image
        seller: currentUser.name,
        sellerEmail: currentUser.email,
        dateAdded: new Date().toISOString()
    };
    
    // Add product to array
    products.push(newProduct);
    saveData();
    
    // Show success message
    showSuccess(successDiv, 'Product added successfully! Redirecting...');
    
    // Redirect to home page after 2 seconds
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000);
}

// Handle image preview
function handleImagePreview(e) {
    const file = e.target.files[0];
    const preview = document.getElementById('imagePreview');
    
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
        };
        reader.readAsDataURL(file);
    }
}

// Initialize profile page
function initializeProfilePage() {
    const profileContainer = document.getElementById('profileContainer');
    const loginRequired = document.getElementById('loginRequired');
    
    // Check if user is logged in
    if (!currentUser) {
        if (profileContainer) profileContainer.style.display = 'none';
        if (loginRequired) loginRequired.style.display = 'block';
        return;
    }
    
    if (profileContainer) profileContainer.style.display = 'block';
    if (loginRequired) loginRequired.style.display = 'none';
    
    displayUserProfile();
}

// Display user profile
function displayUserProfile() {
    const profileContainer = document.getElementById('profileContainer');
    
    if (!profileContainer) return;
    
    // Get user's products
    const userProducts = products.filter(p => p.sellerEmail === currentUser.email);
    
    profileContainer.innerHTML = `
        <div class="profile-header">
            <h1>Welcome, ${currentUser.name}!</h1>
            <p>Manage your products and profile</p>
        </div>
        
        <div class="user-products">
            <h2>Your Products (${userProducts.length})</h2>
            ${userProducts.length === 0 ? 
                '<p>You haven\'t added any products yet. <a href="add.html">Add your first product</a></p>' :
                `<div class="user-products-grid">
                    ${userProducts.map(product => `
                        <div class="user-product-card">
                            <h3>${product.title}</h3>
                            <p><strong>Price:</strong> ₹${product.price}</p>
                            <p><strong>Category:</strong> ${getCategoryName(product.category)}</p>
                            <p><strong>Added:</strong> ${new Date(product.dateAdded).toLocaleDateString()}</p>
                            <button class="delete-product" onclick="deleteProduct('${product.id}')">
                                Delete Product
                            </button>
                        </div>
                    `).join('')}
                </div>`
            }
        </div>
    `;
}

// Delete product
function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        products = products.filter(p => p.id !== productId);
        saveData();
        displayUserProfile(); // Refresh the profile
    }
}

// Utility functions
function showError(element, message) {
    if (element) {
        element.textContent = message;
        element.style.display = 'block';
        setTimeout(() => {
            element.style.display = 'none';
        }, 5000);
    }
}

function showSuccess(element, message) {
    if (element) {
        element.textContent = message;
        element.style.display = 'block';
        setTimeout(() => {
            element.style.display = 'none';
        }, 5000);
    }
}

// Initialize My Products page
function initializeMyProductsPage() {
    // Check if user is logged in
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }
    
    displayMyProducts();
}

// Display user's products on My Products page
function displayMyProducts() {
    const myProductsGrid = document.getElementById('myProductsGrid');
    const noMyProducts = document.getElementById('noMyProducts');
    
    if (!myProductsGrid) return;
    
    // Get user's products
    const userProducts = products.filter(p => p.sellerEmail === currentUser.email);
    
    if (userProducts.length === 0) {
        myProductsGrid.innerHTML = '';
        if (noMyProducts) noMyProducts.style.display = 'block';
        return;
    }
    
    if (noMyProducts) noMyProducts.style.display = 'none';
    
    myProductsGrid.innerHTML = userProducts.map(product => `
        <div class="product-management-card">
            <div class="product-image">
                ${product.image ? 
                    `<img src="${product.image}" alt="${product.title}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">` : 
                    ''
                }
                <div class="product-image-placeholder" style="display: ${product.image ? 'none' : 'flex'};">
                    <span class="material-symbols-outlined">image</span>
                </div>
            </div>
            <div class="product-info">
                <div class="product-category">${getCategoryName(product.category)}</div>
                <h3 class="product-title">${product.title}</h3>
                <div class="product-price">₹${product.price}</div>
                <div class="product-status ${product.status || 'active'}">${(product.status || 'active').toUpperCase()}</div>
                <div class="product-meta">
                    Listed on ${new Date(product.dateAdded).toLocaleDateString()}
                </div>
                <div class="product-actions">
                    <a href="product.html?id=${product.id}" class="btn-edit">View</a>
                    <button class="btn-delete" onclick="deleteMyProduct('${product.id}')">Delete</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Delete user's product
function deleteMyProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        products = products.filter(p => p.id !== productId);
        saveData();
        displayMyProducts(); // Refresh the page
    }
}

// Export functions for global access
window.viewProduct = viewProduct;
window.contactSeller = contactSeller;
window.deleteProduct = deleteProduct;
window.deleteMyProduct = deleteMyProduct;

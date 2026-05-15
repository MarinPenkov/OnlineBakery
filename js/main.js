function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const count = getCart().reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll('#cartCount').forEach(el => el.textContent = count);
}

function addToCart(productId) {
  const cart = getCart();
  const existing = cart.find(item => item.id === productId);
  if (existing) existing.quantity += 1;
  else cart.push({ id: productId, quantity: 1 });
  saveCart(cart);
  showToast('Продуктът е добавен в количката.');
}

function changeQuantity(productId, delta) {
  const cart = getCart().map(item => item.id === productId ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item);
  saveCart(cart);
  renderCart();
}

function removeFromCart(productId) {
  saveCart(getCart().filter(item => item.id !== productId));
  renderCart();
}

function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2200);
}

function productCard(product) {
  return `
    <article class="card product-card">
      <a class="product-media" href="product.html?id=${product.id}">
        <span class="product-img">${product.emoji}</span>
        ${product.bestseller ? '<span class="tag">Най-продаван</span>' : ''}
      </a>
      <div class="product-body">
        <div class="rating">★ ${product.rating}</div>
        <h3><a href="product.html?id=${product.id}">${product.name}</a></h3>
        <p>${product.description}</p>
        <div class="product-bottom">
          <strong>${product.price.toFixed(2)} лв.</strong>
          <button onclick="addToCart(${product.id})">Добави</button>
        </div>
      </div>
    </article>`;
}

function renderDropdown() {
  const dropdown = document.getElementById('dropdownCategories');
  if (!dropdown) return;
  dropdown.innerHTML = categories.map(c => `<a href="category.html?cat=${c.id}"><span>${c.icon}</span> ${c.name}</a>`).join('');
}

function setupMobileMenu() {
  const btn = document.getElementById('mobileToggle');
  const nav = document.getElementById('mainNav');
  if (!btn || !nav) return;
  btn.addEventListener('click', () => nav.classList.toggle('open'));
}

function renderHome() {
  const categoryGrid = document.getElementById('categoryGrid');
  const bestSellers = document.getElementById('bestSellers');

  if (categoryGrid) {
    categoryGrid.innerHTML = categories.map((c, index) => `
      <a class="card category-card" href="category.html?cat=${c.id}">
        <span>${c.icon}</span>
        <small>0${index + 1}</small>
        <h3>${c.name}</h3>
        <p>${c.description}</p>
      </a>`).join('');
  }

  if (bestSellers) {
    bestSellers.innerHTML = products.filter(p => p.bestseller).slice(0, 6).map(productCard).join('');
  }
}

function getCategoryProducts() {
  const catId = new URLSearchParams(window.location.search).get('cat') || 'torti';
  let filtered = products.filter(p => p.category === catId);
  const q = (document.getElementById('searchInput')?.value || '').toLowerCase().trim();
  const sort = document.getElementById('sortSelect')?.value || 'default';

  if (q) filtered = filtered.filter(p => (p.name + ' ' + p.description).toLowerCase().includes(q));
  if (sort === 'priceAsc') filtered.sort((a, b) => a.price - b.price);
  if (sort === 'priceDesc') filtered.sort((a, b) => b.price - a.price);
  if (sort === 'nameAsc') filtered.sort((a, b) => a.name.localeCompare(b.name, 'bg'));
  if (sort === 'best') filtered.sort((a, b) => Number(b.bestseller) - Number(a.bestseller));
  return filtered;
}

function renderCategoryPage() {
  const container = document.getElementById('categoryProducts');
  if (!container) return;

  const catId = new URLSearchParams(window.location.search).get('cat') || 'torti';
  const category = categories.find(c => c.id === catId);
  document.getElementById('categoryTitle').textContent = category ? category.name : 'Категория';
  document.getElementById('categoryDescription').textContent = category ? category.description : '';

  const render = () => {
    const filtered = getCategoryProducts();
    container.innerHTML = filtered.map(productCard).join('') || '<p class="empty-state">Няма продукти по избрания филтър.</p>';
    const counter = document.getElementById('productCounter');
    if (counter) counter.textContent = `${filtered.length} продукт(а)`;
  };

  document.getElementById('searchInput')?.addEventListener('input', render);
  document.getElementById('sortSelect')?.addEventListener('change', render);
  render();
}

function renderProductDetails() {
  const container = document.getElementById('productDetails');
  if (!container) return;
  const id = Number(new URLSearchParams(window.location.search).get('id'));
  const product = products.find(p => p.id === id) || products[0];
  const category = categories.find(c => c.id === product.category);
  container.innerHTML = `
    <div class="product-detail">
      <div class="detail-media"><span>${product.emoji}</span></div>
      <div class="detail-content">
        <p class="eyebrow">${category?.name || 'Продукт'}</p>
        <h1>${product.name}</h1>
        <p class="muted">${product.description}</p>
        <div class="detail-meta">
          <span>★ ${product.rating} рейтинг</span>
          <span>${product.weight}</span>
          <span>${product.bestseller ? 'Бестселър' : 'Каталог'}</span>
        </div>
        <strong class="detail-price">${product.price.toFixed(2)} лв.</strong>
        <div class="hero-actions">
          <button class="btn" onclick="addToCart(${product.id})">Добави в количка</button>
          <a class="btn btn-light" href="category.html?cat=${product.category}">Назад към категорията</a>
        </div>
      </div>
    </div>`;
}

function renderCart() {
  const cartItems = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');
  if (!cartItems || !cartTotal) return;

  const cart = getCart();
  let total = 0;
  if (cart.length === 0) {
    cartItems.innerHTML = '<div class="empty-state">Количката е празна. Разгледай каталога и добави десерт.</div>';
    cartTotal.textContent = '0.00 лв.';
    return;
  }

  cartItems.innerHTML = cart.map(item => {
    const product = products.find(p => p.id === item.id);
    const lineTotal = product.price * item.quantity;
    total += lineTotal;
    return `
      <div class="cart-item">
        <span class="cart-emoji">${product.emoji}</span>
        <div><strong>${product.name}</strong><p>${product.price.toFixed(2)} лв. / ${product.weight}</p></div>
        <div class="qty-controls"><button onclick="changeQuantity(${product.id}, -1)">−</button><span>${item.quantity}</span><button onclick="changeQuantity(${product.id}, 1)">+</button></div>
        <strong>${lineTotal.toFixed(2)} лв.</strong>
        <button class="remove" onclick="removeFromCart(${product.id})">✕</button>
      </div>`;
  }).join('');
  cartTotal.textContent = `${total.toFixed(2)} лв.`;
}

function setupOrderForm() {
  const form = document.getElementById('orderForm');
  if (!form) return;
  form.addEventListener('submit', event => {
    event.preventDefault();
    const message = document.getElementById('orderMessage');
    if (getCart().length === 0) {
      message.textContent = 'Добавете продукт преди поръчка.';
      return;
    }
    localStorage.removeItem('cart');
    updateCartCount();
    renderCart();
    form.reset();
    message.textContent = 'Поръчката е приета успешно!';
  });
}

renderDropdown();
setupMobileMenu();
renderHome();
renderCategoryPage();
renderProductDetails();
renderCart();
setupOrderForm();
updateCartCount();

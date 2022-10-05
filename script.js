const cart = document.querySelector('.cart__items');
const emptyCartBtn = document.querySelector('.empty-cart');
let cartItems;

const getTotalPrice = () => {
  const priceElement = document.querySelector('.total-price');
  let total = 0;
  if (cartItems) {
    total = cartItems.reduce((sum, { salePrice: price }) => sum + parseFloat(price), 0);
  }
  const [match] = total.toString().match(/\d+(\.\d\d?)?/);
  priceElement.innerText = match;
};

const saveCart = () => {
  saveCartItems(JSON.stringify(cartItems));
  getTotalPrice();
};

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  return section;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const emptyCart = () => {
  cartItems = [];
  localStorage.clear();
  cart.innerHTML = '';
  getTotalPrice();
};

emptyCartBtn.addEventListener('click', emptyCart);

const cartItemClickListener = ({ target }) => {
  const cartElements = document.querySelectorAll('.cart__item');
  cartElements.forEach((element, index) => {
    if (target === element) cartItems.splice(index, 1);
  });
  target.remove();
  saveCart();
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const displayLoading = () => {
  const container = document.querySelector('.container');
  const loadingContainer = createCustomElement('div', 'loading-container', '');
  const loading = createCustomElement('span', 'loading', 'carregando...');
  loadingContainer.appendChild(loading);
  container.appendChild(loadingContainer);
};

const removeLoading = () => {
  const loadingContainer = document.querySelector('.loading-container');
  loadingContainer.remove();
};

const addToCart = async ({ target: { parentElement: itemElement } }) => {
  displayLoading();
  const sku = getSkuFromProductItem(itemElement);
  const itemData = await fetchItem(sku);
  const { title: name, price: salePrice } = itemData;
  cartItems.push({ sku, name, salePrice });
  cart.appendChild(createCartItemElement({ sku, name, salePrice }));
  saveCart();
  removeLoading();
};

const initializeAddButtons = () => {
  const addButtons = document.querySelectorAll('.item__add');
  addButtons.forEach((button) => {
    button.addEventListener('click', addToCart);
  });
};

const populateItemsList = async () => {
  displayLoading();
  const items = document.querySelector('.items');
  const data = await fetchProducts('computador');
  data.results.forEach((product) => {
    const { id: sku, title: name, thumbnail: image } = product;
    items.appendChild(createProductItemElement({ sku, name, image }));
  });
  initializeAddButtons();
  removeLoading();
};

const loadCart = () => {
  cartItems = JSON.parse(getSavedCartItems());
  if (cartItems) {
    cartItems.forEach(({ sku, name, salePrice }) => {
      cart.appendChild(createCartItemElement({ sku, name, salePrice }));
    });
  } else {
    cartItems = [];
  }
  getTotalPrice();
};

window.onload = () => {
  populateItemsList();
  loadCart();
};

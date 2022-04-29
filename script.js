const waySectionItems = document.querySelector('.items');
const wayCart = document.querySelector('.cart__items');
const wayBtnClearCart = document.querySelector('.empty-cart');
const waySumPrice = document.querySelector('.total-price');
const wayCartItems = document.querySelectorAll('.cart__item');

async function setLoading() {
  const elemento = document.createElement('section');
  elemento.className = 'loading';
  elemento.innerHTML = 'carregando...';
  waySectionItems.appendChild(elemento);
}

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

async function cartItemClickListener(event) {
  // coloque seu código aqui
  const alvo = event.target;
  wayCart.removeChild(alvo);
}

function createCartItemElement({ sku, name, salePrice, image }) {
  const li = document.createElement('li');
  const imagem = document.createElement('img');
  imagem.src = image;
  imagem.className = 'img-cart';
  
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.appendChild(imagem);
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function productCart(event) {
  // coloque seu código aqui
  const node = event.target.parentNode;
  const selectedId = getSkuFromProductItem(node);
  const getId = await fetchItem(selectedId);
  const objCart = {
    sku: getId.id,
    name: getId.title,
    salePrice: getId.price,
    image: getId.thumbnail,
  };

  waySumPrice.innerHTML = parseFloat(objCart.salePrice) + parseFloat(waySumPrice.innerHTML);

  wayCart.appendChild(createCartItemElement(objCart));
  saveCartItems(wayCart.innerHTML);
}

const products = async () => {
  const arrayProducts = await fetchProducts('computador');
  waySectionItems.innerHTML = '';
  const getItems = arrayProducts.results;
  const objData = getItems.map((obj) => ({
    sku: obj.id,
    name: obj.title,
    image: obj.thumbnail,
  }));
  objData.forEach((produto) => {
      waySectionItems.appendChild(createProductItemElement(produto));
    });
  
  const wayBtnItems = document.querySelectorAll('.item__add');
  wayBtnItems.forEach((button) => button.addEventListener('click', productCart));
};

function emptyCart() {
  wayCart.innerHTML = '';
  waySumPrice.innerHTML = 0;
  localStorage.clear();
}
console.log(wayCartItems);

wayBtnClearCart.addEventListener('click', emptyCart);

window.onload = async () => {
  setLoading();
  await products();
  wayCart.innerHTML = getSavedCartItems('cartItems'); 
  wayCart.addEventListener('click', cartItemClickListener);
};

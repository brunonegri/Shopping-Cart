const waySectionItems = document.querySelector('.items');
const wayCartItems = document.querySelector('.cart__items');
const wayBtnClearCart = document.querySelector('.empty-cart');

async function setLoading() {
  const elemento = document.createElement('section');
  elemento.className = 'loading';
  elemento.innerHTML = 'carregando...';
  const arrayProducts = await fetchProducts('computador');
  const getItems = arrayProducts.results;
  // console.log(getItems);
  getItems.forEach(() => {
    waySectionItems.appendChild(elemento);
  });
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

}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
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
  };
  wayCartItems.appendChild(createCartItemElement(objCart));
  localStorage.setItem('cart', JSON.stringify(wayCartItems.innerHTML));
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
  wayCartItems.innerHTML = '';
}

wayBtnClearCart.addEventListener('click', emptyCart);

window.onload = async () => {
  setLoading();
  await products();
  if (localStorage.length > 0) {
    const recuperado = JSON.parse(localStorage.getItem('cart'));
    wayCartItems.innerHTML = recuperado;
  }
  localStorage.getItem('cart');
};

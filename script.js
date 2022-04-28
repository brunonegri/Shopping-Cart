const waySectionItems = document.querySelector('.items');
// const wayBtnItems = document.querySelectorAll('.item__add');
// console.log(wayBtnItems);
const wayCartItems = document.querySelector('.cart__items');

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
  console.log(selectedId);
  const getId = await fetchItem(selectedId);
  console.log(getId);
  const objCart = {
    sku: getId.id,
    name: getId.title,
    salePrice: getId.price,
  };
  wayCartItems.appendChild(createCartItemElement(objCart));
}

const products = async () => {
  const arrayProducts = await fetchProducts('computador');
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

window.onload = async () => {
  products();
};

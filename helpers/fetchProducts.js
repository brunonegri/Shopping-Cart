const baseUrl = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';

const fetchProducts = async () => {
  // seu código aqui
  const callFetch = await fetch(baseUrl);
  const fetchJson = await callFetch.json();
  const data = fetchJson.results;
  const objData = data.map((obj) => ({
    sku: obj.id,
    name: obj.title,
    image: obj.thumbnail,
  }));
  return objData;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}

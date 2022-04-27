const baseUrl = 'https://api.mercadolibre.com/sites/MLB/search?q=';

const fetchProducts = async (parametro) => {
  // seu código aqui
  const url = `${baseUrl}${parametro}`;
  const callFetch = await fetch(url);
  const fetchJson = await callFetch.json();
  return fetchJson;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}

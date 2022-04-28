const urlBase = 'https://api.mercadolibre.com/items/';

const fetchItem = async (parametro) => {
  // seu código aqui
  const url = `${urlBase}${parametro}`;
  const callFetch = await fetch(url);
  const fecthJson = await callFetch.json();
  // console.log(fecthJson);
  return fecthJson;
};

// console.log(fetchItem('MLB1341706310'));

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}

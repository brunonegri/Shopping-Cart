require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  it('Teste se fetchProducts é uma função', ()=>{
    expect(typeof fetchProducts).toBe('function')
  })
  it('Execute a função fetchProducts com o argumento "computador" e teste se fetch foi chamada', async ()=>{
    await fetchProducts('computador')
    expect(fetch).toHaveBeenCalled()
  })

  it('Teste se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint', async ()=>{
    await fetchProducts('computador')
    const urlMl = 'https://api.mercadolibre.com/sites/MLB/search?q=computador'
    expect(fetch).toHaveBeenCalledWith(urlMl)
  })

  it('Teste se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch', async ()=>{
    const data = await fetchProducts('computador')
    expect(computadorSearch).toBe(data)
  })

  // REJECTS https://jestjs.io/pt-BR/docs/asynchronous#asyncawait
  it('Teste se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url', async ()=>{
    await expect(fetchProducts()).rejects.toThrowError(
      new Error('You must provide an url')
    )
  })
});

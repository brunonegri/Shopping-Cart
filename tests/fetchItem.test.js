require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  // implemente seus testes aqui
  it('1.Teste se fetchItem é uma função', ()=>{
    expect(typeof fetchItem).toBe('function')
  })
  it('2.Execute a função fetchItem com o argumento do item "MLB1615760527" e teste se fetch foi chamada', async ()=>{
    await fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalled()
  })

  it('3.Teste se, ao chamar a função fetchItem com o argumento do item "MLB1615760527", a função fetch utiliza o endpoint', async ()=>{
    await fetchItem('MLB1615760527')
    const urlMl = 'https://api.mercadolibre.com/items/MLB1615760527'
    expect(fetch).toHaveBeenCalledWith(urlMl)
  })

  it('4.Teste se o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item', async ()=>{
    const data = await fetchItem('MLB1615760527')
    expect(item).toEqual(data)
  })

  // REJECTS https://jestjs.io/pt-BR/docs/asynchronous#asyncawait
  it('5.Teste se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url', async ()=>{
    await expect(fetchItem()).rejects.toThrowError(
      new Error('You must provide an url')
    )
  })
});

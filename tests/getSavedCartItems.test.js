const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  // implemente seus testes aqui
  it('Teste 1', ()=>{
    getSavedCartItems()
    expect(localStorage.getItem).toHaveBeenCalled()
  })
  it('Teste 2', ()=>{
    getSavedCartItems('cartItems')
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems')
  })
});

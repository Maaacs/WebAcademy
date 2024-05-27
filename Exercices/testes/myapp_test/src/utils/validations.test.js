const { firstName, verifyStockAvailability, calculateTotalPrice } = require('./validations');

describe('Testes para função firstName', () => {
  it('Deve retornar o primeiro nome quando houver nome completo', () => {
    expect(firstName('John Doe')).toBe('John');
  });

  it('Deve retornar o nome completo quando não houver espaço em branco', () => {
    expect(firstName('John')).toBe('John');
  });
});

describe('Testes para função verifyStockAvailability', () => {
  it('Deve retornar true para produto em estoque', () => {
    expect(verifyStockAvailability('laptop', 5)).toBe(true);
  });

  it('Deve retornar false para produto fora de estoque', () => {
    expect(verifyStockAvailability('book', 1)).toBe(false);
  });

  it('Deve retornar false para produto com quantidade indisponível', () => {
    expect(verifyStockAvailability('smartphone', 25)).toBe(false); 
  });
});

describe('Testes para função calculateTotalPrice', () => {
  it('Deve retornar o preço total dos produtos no carrinho', () => {
    const products = [
      { name: 'Product 1', price: 10, quantity: 2 },
      { name: 'Product 2', price: 15, quantity: 2 },
      { name: 'Product 3', price: 20, quantity: 1 }
    ];
    expect(calculateTotalPrice(products)).toBe(70);
  });

  it('Deve retornar 0 para carrinho vazio', () => {
    expect(calculateTotalPrice([])).toBe(0);
  });
});
require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('fetchProducts deve ser uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  it('a função fetch deve ser chamada ao executar fetchProducts com o argumento "computador"', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  it('ao chamar fetchProducts com o argumento "computador", a função fetch deve utilizar o endpoint esperado', () => {
    const expectedEndpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(expectedEndpoint);
  });
  it('o retorno de fetchProducts com o argumento "computador" deve ser igual ao objeto computadorSearch', async () => {
    expect.assertions(1);
    const products = await fetchProducts('computador');
    expect(products).toEqual(computadorSearch);
  });
  it('deve retornar a mensagem de erro "You must provide an url" se fetchProducts for chamada sem nenhum argumento', async () => {
    expect.assertions(1);
    const error = await fetchProducts();
    expect(error).toEqual(new Error('You must provide an url'));
  })
});

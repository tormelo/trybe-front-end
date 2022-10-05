require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('fetchItem deve ser uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });
  it('a função fetch deve ser chamada ao executar fetchItem com o argumento "MLB1615760527"', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });
  it('ao chamar fetchItem com o argumento "MLB1615760527", a função fetch deve utilizar o endpoint esperado', () => {
    const expectedEndpoint = 'https://api.mercadolibre.com/items/MLB1615760527';
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(expectedEndpoint);
  });
  it('o retorno de fetchItem com o argumento "MLB1615760527" deve ser igual ao objeto item', async () => {
    expect.assertions(1);
    const myItem = await fetchItem('MLB1615760527');
    expect(myItem).toEqual(item);
  });
  it('deve retornar a mensagem de erro "You must provide an url" se fetchItem for chamada sem nenhum argumento', async () => {
    expect.assertions(1);
    const error = await fetchItem();
    expect(error).toEqual(new Error('You must provide an url'));
  })
});

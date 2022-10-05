const fetchProducts = async (productName) => {
  try {
    const endpoint = `https://api.mercadolibre.com/sites/MLB/search?q=${productName}`;
    const response = await fetch(endpoint);
    const products = await response.json();
    return products;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}

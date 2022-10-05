const fetchItem = async (id) => {
  try {
    const endpoint = `https://api.mercadolibre.com/items/${id}`;
    const response = await fetch(endpoint);
    const item = await response.json();
    return item;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}

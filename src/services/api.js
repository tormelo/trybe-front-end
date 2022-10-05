export async function getCategories() {
  try {
    const url = 'https://api.mercadolibre.com/sites/MLB/categories';
    const promiseFetch = await fetch(url);
    const result = await promiseFetch.json();
    return result;
    // console.log(result);
  } catch (error) {
    return error;
  }
}

export async function getProductsFromCategoryAndQuery(categoryID, query) {
  try {
    const url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryID}&q=${query}`;
    const promiseFetch = await fetch(url);
    const result = await promiseFetch.json();
    return result;
    // console.log(result);
  } catch (error) {
    return error;
  }
}

export async function getProductsFromQuery(query) {
  try {
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
    const promiseFetch = await fetch(url);
    const result = await promiseFetch.json();
    return result;
    // console.log(result);
  } catch (error) {
    return error;
  }
}

export async function getProductDetails(id) {
  try {
    const url = `https://api.mercadolibre.com/items/${id}`;
    const promiseFetch = await fetch(url);
    const result = await promiseFetch.json();
    return result;
    // console.log(result);
  } catch (error) {
    return error;
  }
}

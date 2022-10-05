const CART_ITEMS_KEY = 'cart_items';

if (!JSON.parse(localStorage.getItem(CART_ITEMS_KEY))) {
  localStorage.setItem(CART_ITEMS_KEY, JSON.stringify([]));
}
export const readCartItems = () => JSON.parse(localStorage.getItem(CART_ITEMS_KEY));

const saveCartItems = (cartItems) => localStorage
  .setItem(CART_ITEMS_KEY, JSON.stringify(cartItems));

export const addItemCart = (item) => {
  const cartItems = readCartItems();
  console.log(cartItems);
  item.quantity = 1;
  saveCartItems([...cartItems, item]);
  // this.setState((prevState) => ({ cart: [...prevState.cart, item] }));
  console.log(item);
};

export const removeItemCart = (item) => {
  const cartItems = readCartItems();
  const newCart = cartItems.filter(({ id }) => item.id !== id);
  saveCartItems(newCart);
};

export const clearCart = () => {
  saveCartItems([]);
};

export const changeItemQuantity = (item, quantity) => {
  const cartItems = readCartItems();
  const newCart = cartItems.map((cartItem) => {
    if (cartItem.id === item.id) {
      cartItem.quantity += quantity;
    }
    return cartItem;
  });
  saveCartItems(newCart);
};

// export default addItemCart;

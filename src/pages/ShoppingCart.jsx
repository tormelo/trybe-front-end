import React from 'react';
import { Link } from 'react-router-dom';
import { arrayOf, shape, func } from 'prop-types';
import { removeItemCart, changeItemQuantity } from '../services/cartStorage';

class ShoppingCart extends React.Component {
  componentDidMount = () => {
    this.update();
  }

  update = () => {
    const { updateCart } = this.props;
    updateCart();
  }

  onRemoveBtnClick = (item) => {
    removeItemCart(item);
    this.update();
  }

  onChangeQuantity = (item, quantity) => {
    changeItemQuantity(item, quantity);
    this.update();
  }

  render() {
    const { cart } = this.props;
    const decreaseQuantity = -1;
    const increaseQuantity = 1;
    const cartItems = cart.map((item) => (
      <div className="cart-item" key={ item.id }>
        <div className="cart-remove">
          <button
            data-testid="remove-product"
            type="button"
            onClick={ () => this.onRemoveBtnClick(item) }
          >
            X
          </button>
        </div>

        <div className="cart-title">
          <h5 data-testid="shopping-cart-product-name">{item.title}</h5>
        </div>
        <div className="cart-image">
          <img src={ item.thumbnail } alt="carrinho" />
        </div>
        <div className="cart-button-price">
          <div className="cart-mais-menos">
            <button
              data-testid="product-decrease-quantity"
              type="button"
              onClick={ () => this.onChangeQuantity(item, decreaseQuantity) }
              disabled={ item.quantity === 1 }
            >
              -
            </button>
            <p data-testid="shopping-cart-product-quantity">{item.quantity}</p>
            <button
              data-testid="product-increase-quantity"
              type="button"
              onClick={ () => this.onChangeQuantity(item, increaseQuantity) }
              disabled={ item.quantity === item.available_quantity }
            >
              +
            </button>
          </div>
          <div className="cart-price">
            <span>{`R$ ${(item.quantity * item.price).toFixed(2)}`}</span>
          </div>
        </div>
      </div>
    ));
    return (
      <div>
        <h2 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h2>
        <div className="cart-items-list">
          {cartItems.length > 0 ? cartItems : ' Está vazio' }
        </div>
        <Link data-testid="checkout-products" to="/checkout">Finalizar</Link>
      </div>
    );
  }
}

ShoppingCart.propTypes = {
  cart: arrayOf(shape({})),
  updateCart: func,
}.isRequired;

export default ShoppingCart;

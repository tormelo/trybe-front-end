import { shape } from 'prop-types';
import React from 'react';

class CartSummary extends React.Component {
  render() {
    const { cart } = this.props;
    const totalPrice = cart.reduce((sum, { price, quantity }) => (
      sum + (price * quantity)
    ), 0);
    return (
      <div>
        <h3>Revise os seus produtos</h3>
        <div>
          {
            cart.map(({ title, price, quantity, id }) => (
              <div key={ id }>
                <span>{quantity}</span>
                <span>{title}</span>
                <span>{`R$ ${(price * quantity).toFixed(2)}`}</span>
              </div>
            ))
          }
        </div>
        <div>
          <span>{`Total: R$${totalPrice}`}</span>
        </div>
      </div>
    );
  }
}

CartSummary.propTypes = {
  cart: shape({}),
}.isRequired;

export default CartSummary;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { arrayOf, shape, number } from 'prop-types';

export default class CartLink extends Component {
  render() {
    const { cart } = this.props;
    const total = cart.reduce((sum, { quantity }) => sum + quantity, 0);
    return (
      <div>
        <Link data-testid="shopping-cart-button" to="/cart">
          Ir para o carrinho
          <p data-testid="shopping-cart-size">{ total }</p>
        </Link>
      </div>
    );
  }
}

CartLink.propTypes = {
  cart: arrayOf(shape({
    quantity: number,
  })).isRequired,
};

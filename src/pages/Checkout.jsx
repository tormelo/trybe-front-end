import { shape } from 'prop-types';
import React from 'react';
import CartSummary from '../components/CartSummary';
import CheckoutForm from '../components/CheckoutForm';
import { readCartItems } from '../services/cartStorage';

class Checkout extends React.Component {
  state = {
    cart: [],
  }

  componentDidMount = () => {
    this.setState({
      cart: readCartItems(),
    });
  }

  render() {
    const { history } = this.props;
    const { cart } = this.state;

    return (
      <div>
        <CartSummary cart={ cart } />
        <CheckoutForm history={ history } />
      </div>
    );
  }
}

Checkout.propTypes = {
  history: shape({}),
}.isRequired;

export default Checkout;

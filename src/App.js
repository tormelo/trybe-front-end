import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';
import './App.css';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import { readCartItems } from './services/cartStorage';

class App extends React.Component {
  state = {
    cart: [],
  };

  updateCart = () => {
    this.setState({
      cart: readCartItems(),
    });
  }

  render() {
    const { cart } = this.state;
    return (

      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={
              () => (<Home
                cart={ cart }
                updateCart={ this.updateCart }
              />)
            }
          />

          <Route
            exact
            path="/cart"
            render={
              () => (<ShoppingCart
                cart={ cart }
                updateCart={ this.updateCart }
              />)
            }
          />

          <Route exact path="/checkout" component={ Checkout } />

          <Route
            exact
            path="/product/:id"
            render={
              (props) => (<ProductDetails
                updateCart={ this.updateCart }
                cart={ cart }
                { ...props }
              />)
            }
          />

        </Switch>
      </BrowserRouter>

    );
  }
}
export default App;

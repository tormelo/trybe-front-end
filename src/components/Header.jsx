import React, { Component } from 'react';
import { string } from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const total = expenses.reduce((sum, expense) => {
      const { value, currency, exchangeRates } = expense;
      const { ask } = exchangeRates[currency];
      return sum + (value * ask);
    }, 0);
    return (
      <header>
        <span data-testid="email-field">{email}</span>
        <div>
          <span data-testid="total-field">{total.toFixed(2)}</span>
          <span data-testid="header-currency-field">BRL</span>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  email: string,
}.isRequired;

const mapStateToProps = ({ user, wallet }) => ({
  ...user,
  expenses: wallet.expenses,
});

export default connect(mapStateToProps)(Header);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { arrayOf, bool } from 'prop-types';
import { createNewExpense, editExpense, getCurrencyList } from '../redux/actions';

const INITIAL_FORM = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

class WalletForm extends Component {
  state = {
    ...INITIAL_FORM,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCurrencyList());
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  resetForm = () => {
    this.setState({
      ...INITIAL_FORM,
    });
  };

  onFormSubmit = (event) => {
    event.preventDefault();
    const { dispatch, editor } = this.props;
    if (editor) {
      dispatch(editExpense(this.state));
    } else {
      dispatch(createNewExpense(this.state));
    }
    this.resetForm();
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies, editor } = this.props;
    return (
      <form onSubmit={ this.onFormSubmit }>
        <input
          name="value"
          data-testid="value-input"
          type="number"
          value={ value }
          onChange={ this.handleChange }
        />
        <input
          name="description"
          data-testid="description-input"
          type="text"
          value={ description }
          onChange={ this.handleChange }
        />
        <select
          name="currency"
          data-testid="currency-input"
          value={ currency }
          onChange={ this.handleChange }
        >
          {currencies.map((currencyCode) => (
            <option key={ currencyCode }>{currencyCode}</option>
          ))}
        </select>
        <select
          name="method"
          data-testid="method-input"
          value={ method }
          onChange={ this.handleChange }
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
        <select
          name="tag"
          data-testid="tag-input"
          value={ tag }
          onChange={ this.handleChange }
        >
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
        <button type="submit">
          {editor ? 'Editar despesa' : 'Adicionar despesa'}
        </button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: arrayOf({}),
  editor: bool,
}.isRequired;

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
  editor: wallet.editor,
});

export default connect(mapStateToProps)(WalletForm);

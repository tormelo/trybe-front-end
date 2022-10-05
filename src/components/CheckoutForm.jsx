import { shape } from 'prop-types';
import React from 'react';
import { clearCart } from '../services/cartStorage';

export default class CheckoutForm extends React.Component {
  state = {
    name: '',
    email: '',
    cpf: '',
    phone: '',
    cep: '',
    address: '',
    payment: '',
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.validateForm);
  }

  onSubmitBtnClick = () => {
    const { history } = this.props;
    clearCart();
    history.push('/');
  }

  render() {
    const { name, email, cpf, phone, cep, address, payment } = this.state;
    const isValid = name && email && cpf && phone && cep && address && payment;
    return (
      <form>
        <label htmlFor="name">
          Nome Completo:
          <input
            data-testid="checkout-fullname"
            type="text"
            name="name"
            id="name"
            value={ name }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            data-testid="checkout-email"
            type="text"
            name="email"
            id="email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="cpf">
          CPF:
          <input
            data-testid="checkout-cpf"
            type="text"
            name="cpf"
            id="cpf"
            value={ cpf }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="phone">
          Telefone:
          <input
            data-testid="checkout-phone"
            type="text"
            name="phone"
            id="phone"
            value={ phone }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="cep">
          CEP:
          <input
            data-testid="checkout-cep"
            type="text"
            name="cep"
            id="cep"
            value={ cep }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="address">
          Endereço:
          <input
            data-testid="checkout-address"
            type="text"
            name="address"
            id="address"
            value={ address }
            onChange={ this.handleChange }
          />
        </label>

        <div>
          <label htmlFor="ticket">
            Boleto
            <input
              data-testid="ticket-payment"
              type="radio"
              id="ticket"
              name="payment"
              value="ticket"
              checked={ payment === 'ticket' }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="visa">
            Visa
            <input
              data-testid="visa-payment"
              type="radio"
              id="visa"
              name="payment"
              value="visa"
              checked={ payment === 'visa' }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="master">
            Master Card
            <input
              data-testid="master-payment"
              type="radio"
              id="master"
              name="payment"
              value="master"
              checked={ payment === 'master' }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="elo">
            Elo
            <input
              data-testid="elo-payment"
              type="radio"
              id="elo"
              name="payment"
              value="elo"
              checked={ payment === 'elo' }
              onChange={ this.handleChange }
            />
          </label>
        </div>

        <button
          data-testid="checkout-btn"
          type="button"
          disabled={ !isValid }
          onClick={ this.onSubmitBtnClick }
        >
          Comprar
        </button>
        {!isValid && <span data-testid="error-msg">Campos inválidos</span>}
      </form>
    );
  }
}

CheckoutForm.propTypes = {
  history: shape({}),
}.isRequired;

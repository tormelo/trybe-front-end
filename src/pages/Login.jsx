import React from 'react';
import { connect } from 'react-redux';
import { shape } from 'prop-types';
import { login } from '../redux/actions';

const MIN_PASSWORD_LENGTH = 6;

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  onFormSubmit = (event) => {
    event.preventDefault();
    const { dispatch, history } = this.props;
    const { email } = this.state;
    dispatch(login(email));
    history.push('/carteira');
  };

  render() {
    const { email, password } = this.state;
    const isPasswordValid = password.length >= MIN_PASSWORD_LENGTH;
    const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
    const isEmailValid = emailRegex.test(email);
    return (
      <form onSubmit={ this.onFormSubmit }>
        <input
          name="email"
          data-testid="email-input"
          type="text"
          value={ email }
          onChange={ this.handleChange }
        />
        <input
          name="password"
          data-testid="password-input"
          type="text"
          value={ password }
          onChange={ this.handleChange }
        />
        <button type="submit" disabled={ !isEmailValid || !isPasswordValid }>
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  dispatch: shape({}),
}.isRequired;

export default connect()(Login);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { submitLogin } from '../redux/actions';
import { saveToken } from '../services/storage';
import { fetchToken } from '../services/triviaApi';

import logo from '../trivia.png';

class Login extends Component {
  state = {
    name: '',
    gravatarEmail: '',
  };

  handleInput = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value });
  };

  inputChecker = () => {
    const { gravatarEmail, name } = this.state;
    return !(gravatarEmail.length > 0 && name.length > 0);
  };

  loginSubmit = async (event) => {
    event.preventDefault();
    const { gravatarEmail, name } = this.state;
    const { dispatch, history } = this.props;
    dispatch(submitLogin({ gravatarEmail, name }));
    const token = await fetchToken();
    saveToken(token);
    history.push('/game');
  };

  render() {
    const { name, gravatarEmail } = this.state;
    const buttonDisabled = this.inputChecker();
    const { history } = this.props;
    return (
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <form onSubmit={ this.loginSubmit }>
          <input
            type="text"
            data-testid="input-player-name"
            name="name"
            value={ name }
            onChange={ this.handleInput }
            placeholder="Coloque seu nome"
          />
          <input
            type="email"
            data-testid="input-gravatar-email"
            name="gravatarEmail"
            value={ gravatarEmail }
            onChange={ this.handleInput }
            placeholder="Coloque seu e-mail"
          />
          <button
            type="submit"
            data-testid="btn-play"
            disabled={ buttonDisabled }
          >
            Play
          </button>
        </form>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ () => history.push('/settings') }
        >
          Settings
        </button>
      </header>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
};

export default connect()(Login);

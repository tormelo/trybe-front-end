import React from 'react';
import { shape } from 'prop-types';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

const MIN_NAME_LENGTH = 3;

class Login extends React.Component {
  state = {
    name: '',
    loading: false,
  }

  login = () => {
    const { history } = this.props;
    history.push('/search');
  }

  onLoginButtonClick = async () => {
    this.setState(
      { loading: true },
      async () => {
        const { name } = this.state;
        await createUser({ name });
        this.login();
      },
    );
  }

  render() {
    const { name, loading } = this.state;
    const loginForm = (
      <form>
        <input
          data-testid="login-name-input"
          type="text"
          value={ name }
          onChange={ ({ target }) => this.setState({ name: target.value }) }
        />
        <button
          data-testid="login-submit-button"
          type="button"
          disabled={ name.length < MIN_NAME_LENGTH }
          onClick={ this.onLoginButtonClick }
        >
          Entrar
        </button>
      </form>
    );

    return (
      <div data-testid="page-login">
        {loading ? <Loading /> : loginForm}
      </div>
    );
  }
}

Login.propTypes = {
  history: shape({}).isRequired,
};

export default Login;

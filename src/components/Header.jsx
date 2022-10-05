import { bool, func, shape } from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';

class Header extends React.Component {
  componentDidMount = async () => {
    const { fetchUser } = this.props;
    await fetchUser();
  }

  render() {
    const { user, loading } = this.props;
    const userInfo = (
      <p data-testid="header-user-name">
        {user.name}
      </p>
    );

    return (
      <div data-testid="header-component">
        {loading ? <Loading /> : userInfo}
        <div>
          <Link to="/search" data-testid="link-to-search">
            Pesquisa
          </Link>
          <Link to="/favorites" data-testid="link-to-favorites">
            Favoritas
          </Link>
          <Link to="/profile" data-testid="link-to-profile">
            Perfil
          </Link>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  user: shape({}).isRequired,
  fetchUser: func.isRequired,
  loading: bool.isRequired,
};

export default Header;

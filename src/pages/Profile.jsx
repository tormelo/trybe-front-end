import { bool, func, shape } from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';

class Profile extends React.Component {
  componentDidMount = async () => {
    const { fetchUser } = this.props;
    await fetchUser();
  }

  render() {
    const { user: { image, name, email, description }, loading } = this.props;
    const profile = (
      <div>
        <img
          data-testid="profile-image"
          src={ image }
          alt={ `${name} profile pic` }
        />
        <p>{name}</p>
        <p>{email}</p>
        <p>{description}</p>
        <Link to="/profile/edit">Editar perfil</Link>
      </div>
    );

    return (
      <div data-testid="page-profile">
        {loading ? <Loading /> : profile}
      </div>
    );
  }
}

Profile.propTypes = {
  user: shape({}).isRequired,
  fetchUser: func.isRequired,
  loading: bool.isRequired,
};

export default Profile;

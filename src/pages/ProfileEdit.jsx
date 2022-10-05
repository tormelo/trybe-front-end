import { bool, func, shape } from 'prop-types';
import React from 'react';
import Loading from '../components/Loading';
import { updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  state = {
    image: '',
    name: '',
    email: '',
    description: '',
    saving: false,
  }

  componentDidMount = async () => {
    const { fetchUser } = this.props;
    await fetchUser();
  }

  componentDidUpdate = (prevProps) => {
    const { user } = this.props;
    const { user: prevUser } = prevProps;
    if (user !== prevUser) {
      this.setState({ ...user });
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  goBackToProfilePage = () => {
    const { history } = this.props;
    history.push('/profile');
  }

  onSaveButtonClick = async () => {
    this.setState(
      { saving: true },
      async () => {
        const { image, name, email, description } = this.state;
        await updateUser({ image, name, email, description });
        this.goBackToProfilePage();
      },
    );
  }

  render() {
    const { image, name, email, description, saving } = this.state;
    const { loading } = this.props;
    const disabled = !image || !name || !email || !description;
    const editForm = (
      <form>
        <input
          data-testid="edit-input-image"
          name="image"
          value={ image }
          onChange={ this.handleChange }
        />
        <input
          data-testid="edit-input-name"
          name="name"
          value={ name }
          onChange={ this.handleChange }
        />
        <input
          data-testid="edit-input-email"
          name="email"
          value={ email }
          onChange={ this.handleChange }
        />
        <textarea
          data-testid="edit-input-description"
          name="description"
          value={ description }
          onChange={ this.handleChange }
        />
        <button
          data-testid="edit-button-save"
          type="button"
          onClick={ this.onSaveButtonClick }
          disabled={ disabled }
        >
          Salvar
        </button>
      </form>
    );

    return (
      <div data-testid="page-profile-edit">
        {(loading || saving) ? <Loading /> : editForm}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  user: shape({}).isRequired,
  fetchUser: func.isRequired,
  loading: bool.isRequired,
  history: shape({}).isRequired,
};

export default ProfileEdit;

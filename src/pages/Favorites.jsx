import { arrayOf, func, shape } from 'prop-types';
import React from 'react';
import MusicCard from '../components/MusicCard';

class Favorites extends React.Component {
  componentDidMount = async () => {
    const { fetchFavorites } = this.props;
    await fetchFavorites();
  }

  render() {
    const { favorites, fetchFavorites } = this.props;
    const favoritePreviews = favorites.map((song) => (
      <MusicCard
        key={ song.trackId }
        song={ song }
        fetchFavorites={ fetchFavorites }
        persist={ false }
      />
    ));

    return (
      <div data-testid="page-favorites">
        {favoritePreviews}
      </div>
    );
  }
}

Favorites.propTypes = {
  favorites: arrayOf(shape({})).isRequired,
  fetchFavorites: func.isRequired,
};

export default Favorites;

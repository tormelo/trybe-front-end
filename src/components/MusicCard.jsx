import React from 'react';
import { bool, func, shape } from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  state = {
    isFavorite: false,
    loading: false,
  }

  componentDidMount = async () => {
    const { isFavorite } = this.props;
    this.setState({ isFavorite });
  }

  toggleFavorite = async ({ target }) => {
    const isFavorite = target.checked;
    this.setState(
      { isFavorite, loading: true },
      async () => {
        const { song, fetchFavorites, persist } = this.props;
        const removeLoading = isFavorite || persist;

        if (isFavorite) await addSong(song);
        else await removeSong(song);

        if (removeLoading) this.setState({ loading: false }, await fetchFavorites);
        else await fetchFavorites();
      },
    );
  }

  render() {
    const { isFavorite, loading } = this.state;
    const { song } = this.props;
    const { trackId, trackName, previewUrl } = song;
    const templateId = `checkbox-music-${trackId}`;
    const card = (
      <div className="music-card">
        <span>{trackName}</span>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <div>
          <label htmlFor={ templateId }>
            Favorita
            <input
              data-testid={ templateId }
              id={ templateId }
              type="checkbox"
              checked={ isFavorite }
              onChange={ this.toggleFavorite }
            />
          </label>
        </div>
      </div>
    );

    return (
      <div>
        {loading ? <Loading /> : card}
      </div>
    );
  }
}

MusicCard.propTypes = {
  song: shape({}).isRequired,
  isFavorite: bool,
  fetchFavorites: func.isRequired,
  persist: bool,
};

MusicCard.defaultProps = {
  isFavorite: true,
  persist: true,
};

export default MusicCard;

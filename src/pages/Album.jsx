import React from 'react';
import { arrayOf, func, shape } from 'prop-types';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  state = {
    albumName: '',
    artistName: '',
    songList: [],
  }

  componentDidMount = async () => {
    const { fetchFavorites } = this.props;
    await fetchFavorites();
    await this.fetchSongPreviews();
  }

  fetchSongPreviews = async () => {
    const { match } = this.props;
    const { id: albumId } = match.params;
    const result = await getMusics(albumId);
    const [{ collectionName: albumName, artistName }, ...songList] = result;
    this.setState({
      albumName,
      artistName,
      songList,
    });
  }

  render() {
    const { artistName, albumName, songList } = this.state;
    const { favorites, fetchFavorites } = this.props;
    const songPreviews = songList.map((song) => {
      const isFavorite = favorites.some(({ trackId }) => trackId === song.trackId);
      return (
        <MusicCard
          key={ song.trackId }
          song={ song }
          isFavorite={ isFavorite }
          fetchFavorites={ fetchFavorites }
        />
      );
    });

    return (
      <div data-testid="page-album">
        <div>
          <h3 data-testid="album-name">
            {albumName}
          </h3>
          <p data-testid="artist-name">
            {artistName}
          </p>
        </div>
        <div />
        {songPreviews}
        <div />
      </div>
    );
  }
}

Album.propTypes = {
  match: shape({}).isRequired,
  favorites: arrayOf(shape({})).isRequired,
  fetchFavorites: func.isRequired,
};

export default Album;

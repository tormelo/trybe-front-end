import React from 'react';
import AlbumCard from '../components/AlbumCard';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

const REQUIRED_CHARS = 2;

class Search extends React.Component {
  state = {
    searchInputValue: '',
    currentSearch: '',
    albumList: [],
    loading: false,
  }

  fetchAlbums = async () => {
    this.setState(
      (prevState) => (
        { loading: true, searchInputValue: '', currentSearch: prevState.searchInputValue }
      ),
      async () => {
        const { currentSearch } = this.state;
        const albums = await searchAlbumsAPI(currentSearch);
        this.setState({
          loading: false,
          albumList: albums,
        });
      },
    );
  }

  render() {
    const { searchInputValue, loading, albumList, currentSearch } = this.state;
    const albums = albumList.map(({ collectionId, collectionName, artistName }) => (
      <AlbumCard
        key={ collectionId }
        collectionId={ collectionId }
        collectionName={ collectionName }
        artistName={ artistName }
      />
    ));
    const albumsContainer = (
      <div>
        {
          currentSearch
             && (
               albumList.length > 0
                 ? (<p>{`Resultado de álbuns de: ${currentSearch}`}</p>)
                 : (<p>Nenhum álbum foi encontrado</p>)
             )
        }
        {albums}
      </div>
    );

    return (
      <div data-testid="page-search">
        <form>
          <input
            data-testid="search-artist-input"
            type="text"
            value={ searchInputValue }
            onChange={ ({ target }) => this.setState({ searchInputValue: target.value }) }
          />
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ searchInputValue.length < REQUIRED_CHARS }
            onClick={ this.fetchAlbums }
          >
            Pesquisar
          </button>
        </form>
        {loading ? <Loading /> : albumsContainer}
      </div>
    );
  }
}

export default Search;

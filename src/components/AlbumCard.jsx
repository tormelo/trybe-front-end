import React from 'react';
import { Link } from 'react-router-dom';
import { number, string } from 'prop-types';

class AlbumCard extends React.Component {
  render() {
    const { collectionId, collectionName, artistName } = this.props;

    return (
      <Link
        data-testid={ `link-to-album-${collectionId}` }
        to={ `/album/${collectionId}` }
      >
        <div className="preview-card">
          <p>{collectionName}</p>
          <p>{artistName}</p>
        </div>
      </Link>
    );
  }
}

AlbumCard.propTypes = {
  collectionId: number.isRequired,
  collectionName: string.isRequired,
  artistName: string.isRequired,
};

export default AlbumCard;

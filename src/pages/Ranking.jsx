/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { readRanking } from '../services/storage';

class Ranking extends Component {
  state = {
    ranking: readRanking().sort((a, b) => b.score - a.score),
  };

  avatarGravatar = (email) => {
    const hash = md5(email).toString();
    return `https://www.gravatar.com/avatar/${hash}`;
  };

  createRankingPosition = (array) => {
    const returnArray = [];
    array.forEach((person, index) => {
      returnArray.push((
        <div key={ index }>
          <img
            src={ this.avatarGravatar(person.gravatarEmail) }
            alt="gravatar"
          />
          <span data-testid={ `player-name-${index}` }>
            { person.name }
          </span>
          <span data-testid={ `player-score-${index}` }>
            { person.score }
          </span>
        </div>
      ));
    });
    return returnArray;
  };

  render() {
    const { history } = this.props;
    const { ranking } = this.state;

    const showRanking = this.createRankingPosition(ranking);

    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        { showRanking }
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => history.push('/') }
        >
          Início
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
};

export default Ranking;

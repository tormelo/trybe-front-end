import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { string, instanceOf } from 'prop-types';
import { setRanking } from '../services/storage';
import { clearPlayer } from '../redux/actions';

class Feedback extends Component {
  state = {
    userPictureUrl: '',
  };

  componentDidMount() {
    const { gravatarEmail, player } = this.props;
    setRanking(player);
    const hash = md5(gravatarEmail).toString();
    const userPictureUrl = `https://www.gravatar.com/avatar/${hash}`;
    this.setState({ userPictureUrl });
  }

  getFeedbackMessage = () => {
    const { assertions } = this.props;
    const min = 3;
    if (assertions >= min) return 'Well Done!';
    return 'Could be better...';
  };

  playAgain = () => {
    const { history, clearActPlayer } = this.props;
    clearActPlayer();
    history.push('/');
  };

  goToRanking = () => {
    const { history, clearActPlayer } = this.props;
    clearActPlayer();
    history.push('/ranking');
  };

  render() {
    const { userPictureUrl } = this.state;
    const { name, score, assertions } = this.props;
    return (
      <div>
        <header>
          <img
            data-testid="header-profile-picture"
            src={ userPictureUrl }
            alt={ name }
          />
          <span data-testid="header-player-name">{name}</span>
          <span data-testid="header-score">{score}</span>
        </header>
        <main>
          <span data-testid="feedback-total-score">{score}</span>
          <span data-testid="feedback-total-question">{assertions}</span>
          <span data-testid="feedback-text">{this.getFeedbackMessage()}</span>
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ this.playAgain }
          >
            Play Again
          </button>
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ this.goToRanking }
          >
            Ranking
          </button>
        </main>
      </div>
    );
  }
}

Feedback.propTypes = {
  gravatarEmail: string,
  name: string,
  score: string,
  player: instanceOf(Object),
}.isRequired;

const mapStateToProps = (state) => ({
  ...state.player,
  player: state.player,
});

const mapDispatchToProps = (dispatch) => ({
  clearActPlayer: () => dispatch(clearPlayer()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);

/* eslint-disable no-magic-numbers */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { fetchTrivia } from '../services/triviaApi';
import { deleteToken } from '../services/storage';
import { doScore } from '../redux/actions';
import Loading from '../components/Loading';

const ONE_SECOND = 1000;
const HARD = 3;
const MEDIUM = 2;
const EASY = 1;
const RIGHT = 10;

class Game extends Component {
  state = {
    arrayOfQuestions: [],
    questionNum: 0,
    answered: false,
    loading: true,
    category: '',
    question: '',
    correctAnswer: '',
    time: 30000,
  };

  async componentDidMount() {
    const { history } = this.props;
    const token = localStorage.getItem('token');
    const response = await fetchTrivia(token);

    const SUCESS_CODE = 0;

    if (response.response_code !== SUCESS_CODE) {
      deleteToken();
      history.push('/');
    }

    this.setState({
      arrayOfQuestions: response.results,
    }, () => {
      this.setTriviaStates();
    });
  }

  setTriviaStates = () => {
    const { arrayOfQuestions, questionNum } = this.state;
    const { category, question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = arrayOfQuestions[questionNum];

    this.setState({
      category,
      question,
      correctAnswer,
    }, () => {
      this.setState({
        shuffledAnswers: this.shuffler([correctAnswer, ...incorrectAnswers]),
        loading: false,
      });
    });
  };

  buttonCreator = (answer, type, index) => {
    const { answered, time } = this.state;
    if (type === 'correct') {
      return (
        <button
          type="button"
          data-testid="correct-answer"
          key="correct"
          className={ answered ? 'green-border' : '' }
          onClick={ () => this.clickOption(true) }
          disabled={ time === 0 || answered }
        >
          { answer }
        </button>
      );
    }
    return (
      <button
        type="button"
        data-testid={ `wrong-answer-${index}` }
        key={ `wrong-answer-${index}` }
        className={ answered ? 'red-border' : '' }
        onClick={ () => this.clickOption(false) }
        disabled={ time === 0 || answered }
      >
        { answer }
      </button>
    );
  };

  clickOption = (iscorret) => {
    this.setState({
      answered: true,
    });
    const { arrayOfQuestions, questionNum, time } = this.state;
    const { dispatch } = this.props;

    let { difficulty } = arrayOfQuestions[questionNum];

    switch (difficulty) {
    case 'hard':
      difficulty = HARD;
      break;
    case 'medium':
      difficulty = MEDIUM;
      break;
    default:
      difficulty = EASY;
    }

    const score = RIGHT + ((time / ONE_SECOND) * difficulty);

    if (iscorret) dispatch(doScore(score));
  };

  shuffler = (array) => {
    let curIndex = array.length;
    let randomIndex;
    while (curIndex !== 0) {
      randomIndex = Math.floor(Math.random() * curIndex);
      curIndex -= 1;
      [array[curIndex], array[randomIndex]] = [array[randomIndex], array[curIndex]];
    }
    return array;
  };

  nextQ = () => {
    this.setState({
      answered: false,
    }, () => {
      const { history } = this.props;
      const { arrayOfQuestions, questionNum } = this.state;
      if (questionNum < arrayOfQuestions.length - 1) {
        this.setState((prev) => ({
          questionNum: prev.questionNum + 1,
        }), () => {
          this.setTriviaStates();
        });
      } else {
        history.push('/feedback'); // Preparando para quando acabar as perguntass
      }
    });
    this.setState({ time: 30000 });
    this.handleTime();
  };

  avatarGravatar = () => {
    const { gravatarEmail } = this.props;
    const hash = md5(gravatarEmail).toString();
    return `https://www.gravatar.com/avatar/${hash}`;
  };

  renderTrivia = () => {
    const { category, question, shuffledAnswers, correctAnswer } = this.state;

    const answers = [];
    shuffledAnswers.forEach((ans, index) => {
      if (ans === correctAnswer) {
        answers.push(this.buttonCreator(ans, 'correct'));
      } else {
        answers.push(this.buttonCreator(ans, 'incorrect', index));
      }
    });

    return (
      <div>
        <section data-testid="question-category">{ category }</section>
        <section data-testid="question-text">{ question }</section>
        <section data-testid="answer-options">{ answers }</section>
      </div>
    );
  };

  handleTime = () => {
    const { time, answered } = this.state;
    const timer = setTimeout(() => {
      this.setState({ time: time - ONE_SECOND });
    }, ONE_SECOND);

    if (time === 0 || answered) clearTimeout(timer);
  };

  render() {
    const { name, score } = this.props;
    const { loading, time, answered } = this.state;
    if (time !== 0) this.handleTime();

    return (
      <div>
        <header>
          <img
            src={ this.avatarGravatar() }
            alt="Avatar do usuário"
            data-testid="header-profile-picture"
          />
          <span data-testid="header-player-name">
            { name }
          </span>
          <span data-testid="header-score">
            { score }
          </span>
        </header>
        <p data-testid="timer-question">{ time / ONE_SECOND }</p>
        { loading ? <Loading /> : this.renderTrivia() }
        { answered && (
          <button
            type="button"
            onClick={ () => this.nextQ() }
            data-testid="btn-next"
          >
            Next
          </button>
        )}
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (store) => ({
  name: store.player.name,
  gravatarEmail: store.player.gravatarEmail,
  score: store.player.score,
});

export default connect(mapStateToProps)(Game);

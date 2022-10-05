import { CLEAR_PLAYER, LOGIN_SUBMIT, SCORE_COUNT } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN_SUBMIT:
    return {
      ...state,
      ...action.value,
    };
  case SCORE_COUNT:
    return {
      ...state,
      score: state.score + action.score,
      assertions: state.assertions + 1,
    };
  case CLEAR_PLAYER:
    return INITIAL_STATE;
  default: return state;
  }
};

export default player;

export const LOGIN_SUBMIT = 'LOGIN_SUBMIT';
export const SCORE_COUNT = 'SCORE_COUNT';
export const CLEAR_PLAYER = 'CLEAR_PLAYER';

export const submitLogin = (value) => (
  {
    type: LOGIN_SUBMIT,
    value,
  });

export const doScore = (score) => (
  {
    type: SCORE_COUNT,
    score,
  }
);

export const clearPlayer = () => (
  {
    type: CLEAR_PLAYER,
  }
);

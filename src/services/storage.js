const TOKEN_KEY = 'token';
const RANKING_KEY = 'trivia-rank';

export const saveToken = (token) => (
  localStorage.setItem(TOKEN_KEY, token)
);

export const deleteToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const readRanking = () => (
  JSON.parse(localStorage.getItem(RANKING_KEY))
);

export const setRanking = (newPerson) => {
  const soFarRank = readRanking();
  if (!soFarRank) {
    localStorage.setItem(RANKING_KEY, JSON.stringify([newPerson]));
  }
  if (soFarRank) {
    const updatedRank = [...soFarRank, newPerson];
    localStorage.setItem(RANKING_KEY, JSON.stringify(updatedRank));
  }
};

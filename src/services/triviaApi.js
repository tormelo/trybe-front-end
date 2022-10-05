const urlToken = 'https://opentdb.com/api_token.php?command=request';
const urlQuestions = 'https://opentdb.com/api.php?amount=5&token=';

export const fetchToken = () => fetch(urlToken)
  .then((response) => response.json())
  .then((data) => data.token);

export const fetchTrivia = async (token) => {
  const request = await fetch(`${urlQuestions}${token}`);
  const response = request.json();
  return response;
};

const EXCHANGE_API_ENDPOINT = 'https://economia.awesomeapi.com.br/json/all';

const getCurrentExchangeRates = async () => {
  const response = await fetch(EXCHANGE_API_ENDPOINT);
  const rates = await response.json();
  return rates;
};

export default getCurrentExchangeRates;

const getTotal = (expenses) => {
  const total = expenses.reduce((sum, expense) => {
    const { value, currency, exchangeRates } = expense;
    const { ask } = exchangeRates[currency];
    return sum + (value * ask);
  }, 0);
  return total.toFixed(2);
};

export default getTotal;

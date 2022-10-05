import getCurrentExchangeRates from '../../services/exchangeAPI';

export const GET_CURRENCIES = 'GET_CURRENCIES';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const REQUEST_EDIT = 'REQUEST_EDIT';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const LOGIN = 'LOGIN';

const getCurrencies = (currencies) => ({
  type: GET_CURRENCIES,
  currencies,
});

const addExpense = (newExpense) => ({
  type: ADD_EXPENSE,
  newExpense,
});

export const getCurrencyList = () => async (dispatch) => {
  const exchangeRates = await getCurrentExchangeRates();
  const currencies = Object.keys(exchangeRates).filter(
    (currency) => currency !== 'USDT',
  );
  dispatch(getCurrencies(currencies));
};

export const createNewExpense = (formInfos) => async (dispatch) => {
  const exchangeRates = await getCurrentExchangeRates();
  const newExpense = {
    ...formInfos,
    exchangeRates,
  };
  dispatch(addExpense(newExpense));
};

export const deleteExpense = (idToDelete) => ({
  type: DELETE_EXPENSE,
  idToDelete,
});

export const requestEditExpense = (idToEdit) => ({
  type: REQUEST_EDIT,
  idToEdit,
});

export const editExpense = (editedExpense) => ({
  type: EDIT_EXPENSE,
  editedExpense,
});

export const login = (email) => ({
  type: LOGIN,
  email,
});

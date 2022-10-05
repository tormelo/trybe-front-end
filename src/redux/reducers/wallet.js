import {
  GET_CURRENCIES,
  ADD_EXPENSE,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  REQUEST_EDIT,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  nextExpenseId: 0,
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCIES: return {
    ...state,
    currencies: action.currencies,
  };
  case ADD_EXPENSE: return {
    ...state,
    expenses: [
      ...state.expenses,
      { ...action.newExpense, id: state.nextExpenseId },
    ],
    nextExpenseId: state.nextExpenseId + 1,
  };
  case DELETE_EXPENSE: return {
    ...state,
    expenses: state.expenses.filter((expense) => expense.id !== action.idToDelete),
  };
  case REQUEST_EDIT: return {
    ...state,
    editor: true,
    idToEdit: action.idToEdit,
  };
  case EDIT_EXPENSE: return {
    ...state,
    expenses: state.expenses.map((expense) => (
      expense.id === state.idToEdit ? { ...expense, ...action.editedExpense } : expense
    )),
    editor: false,
    idToEdit: 0,
  };
  default:
    return state;
  }
};

export default walletReducer;

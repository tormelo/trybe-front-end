import mockData from './mockData';

export const EMAIL_INPUT_ID = 'email-input';
export const PASSWORD_INPUT_ID = 'password-input';
export const VALID_EMAIL = 'email@email.com';
export const INVALID_EMAIL = 'emailmailcom';
export const VALID_PASSWORD = '123456';
export const INVALID_PASSWORD = '123';

export const TOTAL_FIELD_ID = 'total-field';

export const VALUE_INPUT_ID = 'value-input';
export const DESCRIPTION_INPUT_ID = 'description-input';
export const CURRENCY_INPUT_ID = 'currency-input';
export const METHOD_INPUT_ID = 'method-input';
export const TAG_INPUT_ID = 'tag-input';

export const EDIT_BTN_ID = 'edit-btn';
export const DELETE_BTN_ID = 'delete-btn';

export const ID_TO_EDIT = 1;
export const ID_TO_REMOVE = 2;

export const methodOptions = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
export const tagOptions = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
export const currencies = Object.keys(mockData).filter((key) => key !== 'USDT');

export const initialExpenses = [
  {
    id: 0,
    value: '20',
    description: 'Taxi',
    currency: 'EUR',
    method: 'Dinheiro',
    tag: 'Transporte',
    exchangeRates: { ...mockData },
  },
  {
    id: 1,
    value: '500',
    description: 'Ps5',
    currency: 'USD',
    method: 'Cartão de crédito',
    tag: 'Lazer',
    exchangeRates: { ...mockData },
  },
  {
    id: 2,
    value: '4000',
    description: 'Medicamentos',
    currency: 'JPY',
    method: 'Cartão de débito',
    tag: 'Saúde',
    exchangeRates: { ...mockData },
  },
];

export const initialState = {
  user: { email: 'email@email.com' },
  wallet: {
    currencies,
    expenses: [...initialExpenses],
    editor: false,
    idToEdit: 0,
    nextExpenseId: 3,
  },
};

export const initialForm = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

export const formData = {
  value: '500',
  description: 'Viagem Canada',
  currency: 'CAD',
  method: 'Dinheiro',
  tag: 'Lazer',
};

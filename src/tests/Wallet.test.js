import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWith';
import mockData from './helpers/mockData';
import {
  TOTAL_FIELD_ID,
  VALUE_INPUT_ID,
  DESCRIPTION_INPUT_ID,
  CURRENCY_INPUT_ID,
  METHOD_INPUT_ID,
  TAG_INPUT_ID,
  EDIT_BTN_ID,
  DELETE_BTN_ID,
  ID_TO_REMOVE,
  ID_TO_EDIT,
  methodOptions,
  tagOptions,
  currencies,
  initialExpenses,
  initialState,
  initialForm,
} from './helpers/constants';
import getTotal from './helpers/helperFunctions';

describe('Testa a página Wallet', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
  });

  it('Deve renderizar o fomulário corretamente', () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    expect(history.location.pathname).toBe('/carteira');
    expect(screen.getByTestId(VALUE_INPUT_ID)).toBeInTheDocument();
    expect(screen.getByTestId(DESCRIPTION_INPUT_ID)).toBeInTheDocument();
    expect(screen.getByTestId(CURRENCY_INPUT_ID)).toBeInTheDocument();
    expect(screen.getByTestId(METHOD_INPUT_ID)).toBeInTheDocument();
    expect(screen.getByTestId(TAG_INPUT_ID)).toBeInTheDocument();

    methodOptions.forEach((method) => (
      expect(screen.getByRole('option', { name: method })).toBeInTheDocument()
    ));

    tagOptions.forEach((tag) => (
      expect(screen.getByRole('option', { name: tag })).toBeInTheDocument()
    ));
  });
  it('Deve fazer fetch das currencies e criar as options corretamente', async () => {
    const { store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toBeCalledWith('https://economia.awesomeapi.com.br/json/all');
    });

    currencies.forEach((currency) => {
      expect(screen.getByRole('option', { name: currency })).toBeInTheDocument();
    });

    expect(store.getState().wallet.currencies).toEqual(currencies);
  });
  it('Deve salvar despesa ao clicar em "Adicionar despesa" e atualizar Header e Table', async () => {
    const { store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });

    const formData = {
      value: '500',
      description: 'Viagem Canada',
      currency: 'CAD',
      method: 'Dinheiro',
      tag: 'Lazer',
    };

    const updatedExpenses = [
      ...initialExpenses,
      {
        ...formData,
        exchangeRates: { ...mockData },
        id: 3,
      },
    ];

    const totalField = screen.getByTestId(TOTAL_FIELD_ID);
    const valueInput = screen.getByTestId(VALUE_INPUT_ID);
    const descriptionInput = screen.getByTestId(DESCRIPTION_INPUT_ID);
    const currencyInput = screen.getByTestId(CURRENCY_INPUT_ID);
    const methodInput = screen.getByTestId(METHOD_INPUT_ID);
    const tagInput = screen.getByTestId(TAG_INPUT_ID);
    const addExpenseBtn = screen.getByRole('button', { name: /Adicionar/i });
    let storeExpenses = store.getState().wallet.expenses;

    userEvent.type(valueInput, formData.value);
    userEvent.type(descriptionInput, formData.description);
    userEvent.selectOptions(methodInput, [formData.method]);
    userEvent.selectOptions(tagInput, [formData.tag]);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
    userEvent.selectOptions(currencyInput, [formData.currency]);

    expect(storeExpenses).toEqual(initialExpenses);
    expect(totalField.innerHTML).toBe(getTotal(initialExpenses));
    expect(store.getState().wallet.nextExpenseId).toBe(3);

    userEvent.click(addExpenseBtn);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));

    storeExpenses = store.getState().wallet.expenses;

    storeExpenses.forEach((expense, index) => (
      expect(expense.id).toBe(index)
    ));

    expect(storeExpenses).toEqual(updatedExpenses);
    expect(totalField.innerHTML).toBe(getTotal(updatedExpenses));
    expect(valueInput.value).toBe(initialForm.value);
    expect(descriptionInput.value).toBe(initialForm.description);
    expect(currencyInput.value).toBe(initialForm.currency);
    expect(methodInput.value).toBe(initialForm.method);
    expect(tagInput.value).toBe(initialForm.tag);
    expect(store.getState().wallet.nextExpenseId).toBe(4);
    expect(global.fetch).toBeCalledWith('https://economia.awesomeapi.com.br/json/all');
  });
  it('Deve ser possível editar despesas corretamente', async () => {
    const { store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });

    let storeExpenses = store.getState().wallet.expenses;
    const uneditedExpense = storeExpenses[ID_TO_EDIT];

    const formData = {
      value: (uneditedExpense.value * 2).toString(),
      description: uneditedExpense.description,
      currency: uneditedExpense.currency,
      method: uneditedExpense.method,
      tag: uneditedExpense.tag,
    };

    const updatedExpenses = initialExpenses.map((expense) => (
      expense.id === ID_TO_EDIT ? { ...expense, ...formData } : expense
    ));

    const totalField = screen.getByTestId(TOTAL_FIELD_ID);
    let editBtns = screen.getAllByTestId(EDIT_BTN_ID);
    let editExpenseBtn = screen.queryByRole('button', { name: /Editar despesa/i });

    userEvent.type(screen.getByTestId(VALUE_INPUT_ID), formData.value);
    userEvent.type(screen.getByTestId(DESCRIPTION_INPUT_ID), formData.description);
    userEvent.selectOptions(screen.getByTestId(METHOD_INPUT_ID), [formData.method]);
    userEvent.selectOptions(screen.getByTestId(TAG_INPUT_ID), [formData.tag]);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
    userEvent.selectOptions(screen.getByTestId(CURRENCY_INPUT_ID), [formData.currency]);

    expect(storeExpenses).toEqual(initialExpenses);
    expect(totalField.innerHTML).toBe(getTotal(initialExpenses));
    expect(editExpenseBtn).not.toBeInTheDocument();
    expect(editBtns.length).toBe(initialExpenses.length);

    userEvent.click(editBtns[ID_TO_EDIT]);

    editExpenseBtn = screen.queryByRole('button', { name: /Editar despesa/i });
    expect(editExpenseBtn).toBeInTheDocument();

    userEvent.click(editExpenseBtn);

    storeExpenses = store.getState().wallet.expenses;
    editBtns = screen.getAllByTestId(EDIT_BTN_ID);
    expect(storeExpenses).toEqual(updatedExpenses);
    expect(totalField.innerHTML).toBe(getTotal(updatedExpenses));
    expect(editBtns.length).toBe(initialExpenses.length);
  });
  it('Deve ser possível deletar despesas corretamente', () => {
    const { store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });

    const updatedExpenses = initialExpenses.filter((expense) => (
      expense.id !== ID_TO_REMOVE
    ));

    const totalField = screen.getByTestId(TOTAL_FIELD_ID);
    let deleteBtns = screen.getAllByTestId(DELETE_BTN_ID);
    let storeExpenses = store.getState().wallet.expenses;

    expect(storeExpenses).toEqual(initialExpenses);
    expect(totalField.innerHTML).toBe(getTotal(initialExpenses));
    expect(deleteBtns.length).toBe(initialExpenses.length);

    userEvent.click(deleteBtns[ID_TO_REMOVE]);

    deleteBtns = screen.getAllByTestId(DELETE_BTN_ID);
    storeExpenses = store.getState().wallet.expenses;
    expect(storeExpenses).toEqual(updatedExpenses);
    expect(totalField.innerHTML).toBe(getTotal(updatedExpenses));
    expect(deleteBtns.length).toBe(updatedExpenses.length);
  });
});

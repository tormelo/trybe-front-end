import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWith';
import { EMAIL_INPUT_ID, PASSWORD_INPUT_ID, VALID_EMAIL, INVALID_EMAIL, VALID_PASSWORD, INVALID_PASSWORD } from './helpers/constants';

describe('Testa a página Login', () => {
  it('Deve renderizar a tela de Login corretamente', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');
    expect(screen.getByTestId(EMAIL_INPUT_ID)).toBeInTheDocument();
    expect(screen.getByTestId(PASSWORD_INPUT_ID)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Entrar/i })).toBeInTheDocument();
  });
  it('Deve validar inputs corretamente para habilitar/desabilitar botao de entrar', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId(EMAIL_INPUT_ID);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT_ID);
    const loginButton = screen.getByRole('button', { name: /Entrar/i });

    userEvent.type(emailInput, INVALID_EMAIL);
    userEvent.type(passwordInput, VALID_PASSWORD);
    expect(loginButton).toBeDisabled();

    userEvent.clear(emailInput);
    userEvent.clear(passwordInput);
    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(passwordInput, INVALID_PASSWORD);
    expect(loginButton).toBeDisabled();

    userEvent.clear(emailInput);
    userEvent.clear(passwordInput);
    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(passwordInput, VALID_PASSWORD);
    expect(loginButton).toBeEnabled();
  });
  it('Deve salvar email no estado e direcionar para página da carteira corretamente', () => {
    const { history, store } = renderWithRouterAndRedux(<App />);

    const expectedState = {
      user: { email: VALID_EMAIL },
      wallet: {
        currencies: [],
        expenses: [],
        editor: false,
        idToEdit: 0,
        nextExpenseId: 0,
      },
    };

    const emailInput = screen.getByTestId(EMAIL_INPUT_ID);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT_ID);
    const loginButton = screen.getByRole('button', { name: /Entrar/i });

    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(passwordInput, VALID_PASSWORD);
    userEvent.click(loginButton);

    expect(history.location.pathname).toBe('/carteira');
    expect(store.getState()).toEqual(expectedState);
  });
});

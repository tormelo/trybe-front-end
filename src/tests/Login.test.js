import App from '../App';
import { screen } from "@testing-library/react"
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';

describe('Verifica a página de Login.', () => {
  it('1. Verifica se os componentes são renderizados normalmente', () => {
    renderWithRouterAndRedux(<App />);

    const image = screen.getByRole('img', { name: 'logo' });
    const inputName = screen.getByPlaceholderText(/coloque seu nome/i);
    const inputEmail = screen.getByPlaceholderText(/coloque seu e-mail/i);
    const buttonPlay = screen.getByRole('button', { name: /play/i });
    const buttonSettings = screen.getByRole('button', { name: /settings/i });

    expect(image).toBeInTheDocument();
    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(buttonPlay).toBeInTheDocument();
    expect(buttonSettings).toBeInTheDocument();
  });

  it('2. verifica se  ao clicar em settings é redirecionado', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const buttonSettings = screen.getByRole('button', { name: /settings/i });

    userEvent.click(buttonSettings);

    expect(history.location.pathname).toBe('/settings');
  });

  it('3. Verifica se ao preencher os inputs Play fica habilitado', () => {
    renderWithRouterAndRedux(<App />);

    const buttonPlay = screen.getByRole('button', { name: /play/i });

    expect(buttonPlay.disabled).toBeTruthy();

    const inputName = screen.getByPlaceholderText(/coloque seu nome/i);
    const inputEmail = screen.getByPlaceholderText(/coloque seu e-mail/i);

    userEvent.click(inputName);
    userEvent.type(inputName, 'bob');

    userEvent.click(inputEmail);
    userEvent.type(inputEmail, 'trybe@trybe.com');

    expect(buttonPlay.disabled).toBeFalsy();
  });

  it('4. Verifica se ao clicar no Play, faz a requisição', () => {
    renderWithRouterAndRedux(<App />);

    const inputName = screen.getByPlaceholderText(/coloque seu nome/i);
    const inputEmail = screen.getByPlaceholderText(/coloque seu e-mail/i);

    userEvent.click(inputName);
    userEvent.type(inputName, 'bob');

    userEvent.click(inputEmail);
    userEvent.type(inputEmail, 'trybe@trybe.com');

    const urlToken = 'https://opentdb.com/api_token.php?command=request';

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({ token: '12345678910' }),
    });

    const buttonPlay = screen.getByRole('button', { name: /play/i });
    userEvent.click(buttonPlay);

    expect(global.fetch).toBeCalledWith(urlToken);
  });
})
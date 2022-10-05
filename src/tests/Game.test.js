import App from '../App';
import { screen, waitFor } from "@testing-library/react"
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import { fetchTrivia } from '../services/triviaApi';
import questionsMock from './helpers/QuestionsMock';

const INITIAL_STATE = {
  player: {
    name: 'bob',
    gravatarEmail: 'trybe@trybe.com',
    score: 0,
  }
};

describe('Teste da página de Game', () => {

  it('1. Os componentes aparecem na tela', () => {
    renderWithRouterAndRedux(<App />, INITIAL_STATE, '/game');

    const image = screen.getByAltText(/Avatar do usuário/i);
    
    expect(image).toBeInTheDocument();
    expect(screen.getByText('bob')).toBeInTheDocument();
    expect(screen.getByText(30)).toBeInTheDocument();
  });

  it('2. testa o cronômetro', (done) => {
    const { history } = renderWithRouterAndRedux(<App />);

    const inputName = screen.getByPlaceholderText(/coloque seu nome/i);
    const inputEmail = screen.getByPlaceholderText(/coloque seu e-mail/i);

    userEvent.click(inputName);
    userEvent.type(inputName, 'bob');

    userEvent.click(inputEmail);
    userEvent.type(inputEmail, 'trybe@trybe.com');

    const buttonPlay = screen.getByRole('button', { name: /play/i });
    userEvent.click(buttonPlay);

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(questionsMock),
    });

    waitFor(() => {
      setTimeout(() => {
        const timer = screen.getByTestId('timer-question');
        expect(timer).toBeInTheDocument();
        const buttons = screen.getAllByRole('button');
        buttons.forEach((button) => {
          expect(button).toBeInTheDocument();
        });

        const score = screen.getByTestId('header-score');
        expect(parseInt(score.innerHTML)).toBe(0);

        const correctAnswer = screen.getByText(/the tornados/i);
        const wrong = screen.getByText(/The Ventures/i);
        userEvent.click(correctAnswer);
        expect(correctAnswer.disabled).toBeTruthy();
        expect(correctAnswer.className).toBe('green-border');
        expect(wrong.className).toBe('red-border');

        expect(parseInt(score.innerHTML)).toBeGreaterThan(0);

        const nextButton = screen.getByText(/next/i);
        expect(nextButton).toBeInTheDocument();
        userEvent.click(nextButton);

        const newAnswerCorrect = screen.getByText('False');
        userEvent.click(newAnswerCorrect);
        expect(parseInt(score.innerHTML)).toBeGreaterThan(66);

        userEvent.click(nextButton);
        expect(nextButton).not.toBeInTheDocument();

        expect(timer.innerHTML).toBe('30');

        userEvent.click(screen.getAllByRole('button')[0]);
        userEvent.click(screen.getByText(/next/i));

        userEvent.click(screen.getAllByRole('button')[0]);
        userEvent.click(screen.getByText(/next/i));

        userEvent.click(screen.getAllByRole('button')[0]);
        userEvent.click(screen.getByText(/next/i));

        userEvent.click(screen.getByText(/anselm of canterbury/i));
        userEvent.click(screen.getByText(/next/i));

        history.push('/feedback');

        const buttonsFeedback = screen.getAllByRole('button');
        expect(buttonsFeedback[0]).toBeInTheDocument();
        expect(buttonsFeedback[1]).toBeInTheDocument();

        done();
      }, 3000);
    });
  });
});
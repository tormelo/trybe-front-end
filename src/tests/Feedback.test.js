import { screen } from "@testing-library/react"
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import App from "../App";
import md5 from 'crypto-js/md5';

const HEADER_PIC_ID = 'header-profile-picture';
const HEADER_NAME_ID = 'header-player-name';
const HEADER_SCORE_ID = 'header-score';

const FEEDBACK_SCORE_ID = 'feedback-total-score';
const FEEDBACK_ASSERTIONS_ID = 'feedback-total-question';
const FEEDBACK_MSG_ID = 'feedback-text';

const PLAY_AGAIN_BTN_ID = 'btn-play-again';
const RANKING_BTN_ID = 'btn-ranking';

const initialState = {
  player: {
    name: 'trybeTest',
    assertions: 4,
    score: 310,
    gravatarEmail: 'trybe@teste.com',
  }
};

describe('Testa a página de Feedback', () => {
  it('Deve renderizar os componentes corretamente', () => {
    renderWithRouterAndRedux(<App />, initialState, '/feedback');
    const headerProfilePic = screen.getByTestId(HEADER_PIC_ID);
    const headerName = screen.getByTestId(HEADER_NAME_ID);
    const headerScore = screen.getByTestId(HEADER_SCORE_ID);
    const feedbackScore = screen.getByTestId(FEEDBACK_SCORE_ID);
    const feedbackAssertions = screen.getByTestId(FEEDBACK_ASSERTIONS_ID);
    const feedbackMessage = screen.getByTestId(FEEDBACK_MSG_ID);
    const playAgainBtn = screen.getByTestId(PLAY_AGAIN_BTN_ID);
    const rankingBtn = screen.getByTestId(RANKING_BTN_ID);
    expect(headerProfilePic).toBeInTheDocument();
    expect(headerName).toBeInTheDocument();
    expect(headerScore).toBeInTheDocument();
    expect(feedbackScore).toBeInTheDocument();
    expect(feedbackAssertions).toBeInTheDocument();
    expect(feedbackMessage).toBeInTheDocument();
    expect(playAgainBtn).toBeInTheDocument();
    expect(rankingBtn).toBeInTheDocument();
  });

  it('Deve renderizar o header da página de Feedback corretamente', () => {
    renderWithRouterAndRedux(<App />, initialState, '/feedback');
    const { player } = initialState;
    const hash = md5(player.gravatarEmail).toString();
    const expectedPicUrl = `https://www.gravatar.com/avatar/${hash}`;
    const headerProfilePic = screen.getByTestId(HEADER_PIC_ID);
    const headerName = screen.getByTestId(HEADER_NAME_ID);
    const headerScore = screen.getByTestId(HEADER_SCORE_ID);
    expect(headerProfilePic.src).toBe(expectedPicUrl);
    expect(headerName.innerHTML).toBe(player.name);
    expect(headerScore.innerHTML).toBe(player.score.toString());
  });

  it('Deve renderizar score e assertions da página de Feedback corretamente', () => {
    renderWithRouterAndRedux(<App />, initialState, '/feedback');
    const { player } = initialState;
    const feedbackScore = screen.getByTestId(FEEDBACK_SCORE_ID);
    const feedbackAssertions = screen.getByTestId(FEEDBACK_ASSERTIONS_ID);
    expect(feedbackScore.innerHTML).toBe(player.score.toString());
    expect(feedbackAssertions.innerHTML).toBe(player.assertions.toString());
  });

  it('Deve renderizar mensagem correta com pontuação menor que 3', () => {
    const notGreatState = {
      player: {
        name: 'trybeTest',
        assertions: 2,
        score: 310,
        gravatarEmail: 'trybe@teste.com',
      }
    };
    renderWithRouterAndRedux(<App />, notGreatState, '/feedback');
    const feedbackMessage = screen.getByTestId(FEEDBACK_MSG_ID);
    expect(feedbackMessage.innerHTML).toBe('Could be better...');
  });

  it('Deve renderizar mensagem correta com pontuação maior que 3', () => {
    renderWithRouterAndRedux(<App />, initialState, '/feedback');
    const feedbackMessage = screen.getByTestId(FEEDBACK_MSG_ID);
    expect(feedbackMessage.innerHTML).toBe('Well Done!');
  });

  it('Deve redirecionar para / ao clicar em Play Again', () => {
    const { history } = renderWithRouterAndRedux(<App />, initialState, '/feedback');
    const playAgainBtn = screen.getByRole('button', { name: /Play Again/i });
    userEvent.click(playAgainBtn);
    expect(history.location.pathname).toBe('/');
  });

  it('Deve redirecionar para /ranking ao clicar em Ranking', () => {
    const { history } = renderWithRouterAndRedux(<App />, initialState, '/feedback');
    const rankingBtn = screen.getByRole('button', { name: /Ranking/i });
    userEvent.click(rankingBtn);
    expect(history.location.pathname).toBe('/ranking');
  });
})

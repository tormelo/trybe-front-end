import App from '../App';
import { screen } from "@testing-library/react"
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';

describe('Testa a página de Ranking', () => {
  const gravatarAvatar = 'https://www.gravatar.com/avatar/4a845292446835cf9996426743a8c0de'
  it('1. Testa se mostra os dados do ranking', () => {
    const { history } = renderWithRouterAndRedux(<App />)
    window.localStorage.setItem('trivia-rank', JSON.stringify([{
      name: 'Rafaelvitor',
      assertions: 3,
      score: 176,
      gravatarEmail: 'rafaelvitor@itaoca.net'
    }]))
    history.push('/ranking')

    const playerName = screen.getByTestId('player-name-0')
    const playerAvatar = screen.getByRole('img', { src: gravatarAvatar })
    const playerScore = screen.getByTestId('player-score-0')
    expect(playerName.innerHTML).toBe('Rafaelvitor')
    expect(playerAvatar).toBeInTheDocument()
    expect(playerScore.innerHTML).toBe('176')
  })
  it('2. Testa se os dados estão na ordem', () => {
    const { history } = renderWithRouterAndRedux(<App />)
    window.localStorage.setItem('trivia-rank', JSON.stringify([{
      name: 'Rafaelvitor',
      assertions: 3,
      score: 176,
      gravatarEmail: 'rafaelvitor@itaoca.net'
    },
    {
      name: 'Rafael1234',
      assertions: 3,
      score: 1000,
      gravatarEmail: 'rafaelvitor@itaoca.net'
    }]))
    history.push('/ranking')

    const players = screen.getAllByTestId(/player-name-/i)
    expect(players[0].innerHTML).toBe('Rafael1234')
    expect(players[1].innerHTML).toBe('Rafaelvitor')
  })
  it('3. Testa se funcionalidade do botão "Início"', () => {
    const { history } = renderWithRouterAndRedux(<App />)
    window.localStorage.setItem('trivia-rank', JSON.stringify([{
      name: 'Rafaelvitor',
      assertions: 3,
      score: 176,
      gravatarEmail: 'rafaelvitor@itaoca.net'
    },
    {
      name: 'Rafael1234',
      assertions: 3,
      score: 1000,
      gravatarEmail: 'rafaelvitor@itaoca.net'
    }]))
    history.push('/ranking')

    const goHomeBtn = screen.getByTestId('btn-go-home')
    userEvent.click(goHomeBtn)
    const { pathname } = history.location
    expect(pathname).toBe('/')
  })
})
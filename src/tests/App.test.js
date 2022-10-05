import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('1 - Testa o componente App', () => {
  it('Deve conter um conjunto fixo de três links de navegação', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /home/i });
    const aboutLink = screen.getByRole('link', { name: /about/i });
    const favoritesLink = screen.getByRole('link', { name: /favorite/i });

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoritesLink).toBeInTheDocument();
  });
  it('Clicar no link Home deve redirecionar para a URL /', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();
    userEvent.click(homeLink);
    expect(history.location.pathname).toBe('/');
  });
  it('Clicar no link About deve redirecionar para a URL /about', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink).toBeInTheDocument();
    userEvent.click(aboutLink);
    expect(history.location.pathname).toBe('/about');
  });
  it('Clicar no link Favorite Pokémons deve redirecionar para /favorites', () => {
    const { history } = renderWithRouter(<App />);
    const favoritesLink = screen.getByRole('link', { name: /favorite/i });
    expect(favoritesLink).toBeInTheDocument();
    userEvent.click(favoritesLink);
    expect(history.location.pathname).toBe('/favorites');
  });
  it('Entrar em uma URL desconhecida deve redirecionar para a página Not Found ', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/urldesconhecida');
    const errorText = screen.getByRole('heading', { name: /not found/i, level: 2 });
    expect(errorText).toBeInTheDocument();
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import { FavoritePokemons } from '../pages';

describe('3 - Testa o componente FavoritePokemons', () => {
  it('Deve exibir a mensagem No favorite pokemon found caso não exista favoritos', () => {
    render(<FavoritePokemons />);
    const noFavoriteText = screen.getByText(/No favorite pokemon found/i);
    expect(noFavoriteText).toBeInTheDocument();
  });
  it('Deve exibir todos cards de pokemon favoritados caso existam favoritos', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/pokemons/4');
    userEvent.click(screen.getByLabelText(/pokémon favoritado/i));
    history.push('/pokemons/65');
    userEvent.click(screen.getByLabelText(/pokémon favoritado/i));
    history.push('/favorites');

    const favorites = screen.getAllByTestId('pokemon-name');
    expect(favorites.length).toBe(2);
    expect(favorites[0].innerHTML).toBe('Charmander');
    expect(favorites[1].innerHTML).toBe('Alakazam');
  });
});

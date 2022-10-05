import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pokemon } from '../components';
import pokemons from '../data';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('6 - Testa o componente Pokemon', () => {
  it('Deve renderizar as informações do pokémon corretamente', () => {
    const pokemon = pokemons[0];
    renderWithRouter(<Pokemon isFavorite pokemon={ pokemon } showDetailsLink />);

    const name = screen.getByTestId('pokemon-name');
    expect(name).toBeInTheDocument();
    expect(name.innerHTML).toBe(pokemon.name);

    const type = screen.getByTestId('pokemon-type');
    expect(type).toBeInTheDocument();
    expect(type.innerHTML).toBe(pokemon.type);

    const { averageWeight: { value: pokemonWeight, measurementUnit } } = pokemon;
    const weight = screen.getByTestId('pokemon-weight');
    expect(weight).toBeInTheDocument();
    expect(weight.innerHTML).toBe(`Average weight: ${pokemonWeight} ${measurementUnit}`);

    const sprite = screen.getByRole('img', { name: /Pikachu sprite/i });
    expect(sprite).toBeInTheDocument();
    expect(sprite.src).toBe(pokemon.image);

    const detailsLink = screen.getByRole('link', { name: /More details/i });
    expect(detailsLink).toBeInTheDocument();
    expect(detailsLink.href).toContain(`/pokemons/${pokemon.id}`);

    const favIconAlt = `${pokemon.name} is marked as favorite`;
    const favoriteIcon = screen.getByRole('img', { name: favIconAlt });
    expect(favoriteIcon).toBeInTheDocument();
    expect(favoriteIcon.src).toContain('/star-icon.svg');
  });
  it('Clicar no link More details redireciona para a página de detalhes', () => {
    const PIKACHU_ID = 25;

    const { history } = renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: /More details/i });
    expect(detailsLink).toBeInTheDocument();

    userEvent.click(detailsLink);
    expect(history.location.pathname).toBe(`/pokemons/${PIKACHU_ID}`);

    const detailsTitle = screen.getByRole('heading', { name: /Pikachu Details/i });
    expect(detailsTitle).toBeInTheDocument();
  });
});

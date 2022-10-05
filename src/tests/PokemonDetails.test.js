import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import pokemons from '../data';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('7 - Testa o componente PokemonDetails', () => {
  it('Deve renderizar o título e o sumário corretamente', () => {
    const pokemon = pokemons[0];
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: /More details/i });
    userEvent.click(detailsLink);

    expect(detailsLink).not.toBeInTheDocument();

    const title = screen.getByRole(
      'heading', { name: `${pokemon.name} Details`, level: 2 },
    );
    expect(title).toBeInTheDocument();

    const summaryHeader = screen.getByRole('heading', { name: /Summary/i, level: 2 });
    expect(summaryHeader).toBeInTheDocument();

    const summaryText = screen.getByText(pokemon.summary);
    expect(summaryText).toBeInTheDocument();
  });
  it('Deve mostras as localizações do pokemon corretamente', () => {
    const pokemon = pokemons[0];
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: /More details/i });
    userEvent.click(detailsLink);

    const locationHeader = screen.getByRole(
      'heading', { name: `Game Locations of ${pokemon.name}`, level: 2 },
    );
    expect(locationHeader).toBeInTheDocument();

    const mapImages = screen.getAllByRole('img', { name: `${pokemon.name} location` });
    pokemon.foundAt.forEach(({ location, map }, index) => {
      const locationName = screen.getByText(location);
      expect(locationName).toBeInTheDocument();
      expect(mapImages[index]).toBeInTheDocument();
      expect(mapImages[index].src).toBe(map);
    });
  });
  it('Deve ser possivel favoritar/desfavoritar o pokemon na página de detalhes', () => {
    const pokemon = pokemons[0];
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: /More details/i });
    userEvent.click(detailsLink);

    const isFavoriteLabel = screen.getByLabelText(/Pokémon favoritado/i);
    expect(isFavoriteLabel).toBeInTheDocument();

    userEvent.click(isFavoriteLabel);

    const favIconAlt = `${pokemon.name} is marked as favorite`;
    const favoriteIcon = screen.getByRole('img', { name: favIconAlt });
    expect(favoriteIcon).toBeInTheDocument();

    userEvent.click(isFavoriteLabel);

    expect(favoriteIcon).not.toBeInTheDocument();
  });
});

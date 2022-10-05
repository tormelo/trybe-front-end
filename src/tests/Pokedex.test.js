import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import pokemons from '../data';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('5 - Testa o componente Pokedex', () => {
  it('Deve renderizar o título corretamente', () => {
    renderWithRouter(<App />);
    const title = screen.getByRole('heading', { name: /Encountered pokémons/i });
    expect(title).toBeInTheDocument();
  });

  it('Deve renderizar somente um card de pokemon por vez', () => {
    renderWithRouter(<App />);
    const pokemonCards = screen.getAllByTestId('pokemon-name');
    expect(pokemonCards.length).toBe(1);
  });
  it('Deve renderizar os botões de filtro por tipo corretamente', () => {
    renderWithRouter(<App />);
    const types = [
      ...new Set(pokemons.reduce((array, { type }) => [...array, type], [])),
    ];
    const typeButtons = screen.getAllByTestId('pokemon-type-button');

    expect(typeButtons.length).toBe(types.length);
    typeButtons.forEach((button, index) => {
      expect(button).toBeInTheDocument();
      expect(button.innerHTML).toBe(types[index]);
    });

    const allButton = screen.getByText('All');
    expect(allButton).toBeInTheDocument();
  });
  it('Clicar em Próximo pokémon deve exibir o próximo respeitando filtros', () => {
    renderWithRouter(<App />);
    const filters = [
      'All',
      ...new Set(pokemons.reduce((array, { type }) => [...array, type], [])),
    ];

    const typeButtons = screen.getAllByTestId('pokemon-type-button');
    const allButton = screen.getByText('All');
    const nextPokemonBtn = screen.getByRole('button', { name: /Próximo pokémon/i });

    filters.forEach((filter) => {
      const isFiltering = filter !== 'All';
      const filteredPokemon = pokemons.filter(({ type }) => (
        type === filter || !isFiltering
      ));
      const currentButton = (
        isFiltering
          ? typeButtons.find(({ innerHTML }) => innerHTML === filter)
          : allButton
      );
      userEvent.click(currentButton);
      filteredPokemon.forEach(({ name }) => {
        const pokemonCard = screen.getByText(name);
        expect(pokemonCard).toBeInTheDocument();
        userEvent.click(nextPokemonBtn);
      });
      const loopCard = screen.getByText(filteredPokemon[0].name);
      expect(loopCard).toBeInTheDocument();
    });
  });
});

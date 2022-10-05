import React from 'react';
import { render, screen } from '@testing-library/react';
import { About } from '../pages';

describe('2 - Testa o componente About', () => {
  it('Deve renderizar um heading, dois paragrafos e uma imagem', () => {
    render(<About />);
    const title = screen.getByRole('heading', { name: /about pokédex/i, level: 2 });
    const firstParagraph = screen.getByText(/This application simulates a Pokédex/i);
    const secondParagraph = screen.getByText(/One can filter Pokémons by type/i);
    const pokedexImage = screen.getByRole('img', { name: /Pokédex/i });

    expect(title).toBeInTheDocument();
    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
    expect(pokedexImage).toBeInTheDocument();

    const expectedImgUrl = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(pokedexImage.src).toBe(expectedImgUrl);
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import { NotFound } from '../pages';

describe('4 - Testa o componente NotFound', () => {
  it('Deve renderizar o título e a imagem corretamente', () => {
    render(<NotFound />);
    const title = screen.getByRole('heading', { name: /not found/i, level: 2 });
    const notFoundImage = screen.getByRole('img', { name: /pikachu crying/i });

    expect(title).toBeInTheDocument();
    expect(notFoundImage).toBeInTheDocument();

    const expectedImgUrl = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(notFoundImage.src).toBe(expectedImgUrl);
  });
});

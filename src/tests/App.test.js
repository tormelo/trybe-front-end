import React from 'react';
import { render, screen, waitFor} from '@testing-library/react';
import App from '../App';
import mockData from './helpers/mockData';
import userEvent from '@testing-library/user-event';

describe('Testa o App', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
  });

  it('Deve fazer o fetch dos planetas e renderizar o app corretamente', async () => {
    render(<App />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toBeCalledWith('https://swapi.dev/api/planets');
    });

    expect(screen.getByTestId('name-filter')).toBeInTheDocument();

    expect(screen.getByTestId('column-filter')).toBeInTheDocument();
    expect(screen.getByTestId('comparison-filter')).toBeInTheDocument();
    expect(screen.getByTestId('value-filter')).toBeInTheDocument();
    expect(screen.getByTestId('button-filter')).toBeInTheDocument();
    expect(screen.getByTestId('button-remove-filters')).toBeInTheDocument();

    expect(screen.getByTestId('column-sort')).toBeInTheDocument();
    expect(screen.getByTestId('column-sort-input-asc')).toBeInTheDocument();
    expect(screen.getByTestId('column-sort-input-desc')).toBeInTheDocument();
    expect(screen.getByTestId('column-sort-button')).toBeInTheDocument();

    expect(screen.getAllByTestId('planet-name').length).toBe(10);
  })
  it('Deve filtrar por nome corretamente', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getAllByTestId('planet-name').length).toBe(10);
    });

    userEvent.type(screen.getByTestId('name-filter'), 'oo');

    expect(screen.getAllByTestId('planet-name').length).toBe(2);
  })
  it('Deve fazer filtragem númerica por coluna corretamente', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getAllByTestId('planet-name').length).toBe(10);
    });

    userEvent.type(screen.getByTestId('value-filter'), '200000');
    userEvent.click(screen.getByTestId('button-filter'));

    expect(screen.getAllByTestId('planet-name').length).toBe(6);

    userEvent.selectOptions(screen.getByTestId('column-filter'), ['diameter']);
    userEvent.selectOptions(screen.getByTestId('comparison-filter'), ['menor que']);
    userEvent.clear(screen.getByTestId('value-filter'));
    userEvent.type(screen.getByTestId('value-filter'), '18000');
    userEvent.click(screen.getByTestId('button-filter'));

    expect(screen.getAllByTestId('planet-name').length).toBe(4);
  })
  it('Deve remover todos filtros ao clicar em "Remover Filtros"', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getAllByTestId('planet-name').length).toBe(10);
    });

    userEvent.type(screen.getByTestId('value-filter'), '200000');
    userEvent.click(screen.getByTestId('button-filter'));

    userEvent.selectOptions(screen.getByTestId('column-filter'), ['rotation_period']);
    userEvent.selectOptions(screen.getByTestId('comparison-filter'), ['igual a']);
    userEvent.clear(screen.getByTestId('value-filter'));
    userEvent.type(screen.getByTestId('value-filter'), '24');
    userEvent.click(screen.getByTestId('button-filter'));

    expect(screen.getAllByTestId('planet-name').length).toBe(2);

    userEvent.click(screen.getByTestId('button-remove-filters'));

    expect(screen.getAllByTestId('planet-name').length).toBe(10);
  })
  it('Deve ser possivel remover filtros individualmente', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getAllByTestId('planet-name').length).toBe(10);
    });

    userEvent.type(screen.getByTestId('value-filter'), '200000');
    userEvent.click(screen.getByTestId('button-filter'));

    userEvent.selectOptions(screen.getByTestId('column-filter'), ['rotation_period']);
    userEvent.selectOptions(screen.getByTestId('comparison-filter'), ['igual a']);
    userEvent.clear(screen.getByTestId('value-filter'));
    userEvent.type(screen.getByTestId('value-filter'), '24');
    userEvent.click(screen.getByTestId('button-filter'));

    expect(screen.getAllByTestId('planet-name').length).toBe(2);

    userEvent.click(screen.getAllByRole('button', {name: 'x'})[1]);

    expect(screen.getAllByTestId('planet-name').length).toBe(6);
    
    userEvent.click(screen.getByRole('button', {name: 'x'}));

    expect(screen.getAllByTestId('planet-name').length).toBe(10);
  })
  it('Deve ser possivel ordenar a tabela corretamente', async () => {
    render(<App />);

    const defaultOrder = [
      'Tatooine', 'Alderaan', 'Yavin IV', 'Hoth', 'Dagobah',
      'Bespin', 'Endor', 'Naboo', 'Coruscant', 'Kamino'
    ];

    const popAscOrder = [
      'Yavin IV', 'Tatooine', 'Bespin', 'Endor', 'Kamino',
      'Alderaan', 'Naboo', 'Coruscant', 'Hoth', 'Dagobah'
    ];

    const popDescOrder = [
      'Coruscant', 'Naboo', 'Alderaan', 'Kamino', 'Endor',
      'Bespin', 'Tatooine', 'Yavin IV', 'Hoth', 'Dagobah'
    ];

    await waitFor(() => {
      expect(screen.getAllByTestId('planet-name').length).toBe(10);
    });

    defaultOrder.forEach((planetName, index) => {
      expect(screen.getAllByTestId('planet-name')[index].innerHTML).toBe(planetName);
    });
    
    userEvent.click(screen.getByTestId('column-sort-input-asc'));
    userEvent.click(screen.getByTestId('column-sort-button'));

    popAscOrder.forEach((planetName, index) => {
      expect(screen.getAllByTestId('planet-name')[index].innerHTML).toBe(planetName);
    });

    userEvent.click(screen.getByTestId('column-sort-input-desc'));
    userEvent.click(screen.getByTestId('column-sort-button'));

    popDescOrder.forEach((planetName, index) => {
      expect(screen.getAllByTestId('planet-name')[index].innerHTML).toBe(planetName);
    });
  })
});

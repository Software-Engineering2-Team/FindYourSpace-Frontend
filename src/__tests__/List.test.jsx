import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import List from '../pages/list/List';

describe('List Component', () => {
  test('renders list without crashing', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <List />
        </MemoryRouter>
      );
    });
    const listElement = screen.getByTestId('list-1');
    expect(listElement).toBeInTheDocument();
  });

  test('filters by category', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <List />
        </MemoryRouter>
      );
    });

    const categoryCheckbox = screen.getByText('Digital Billboard');
    fireEvent.click(categoryCheckbox);

    const searchItem = await screen.findByText('Digital Billboard');
    expect(searchItem).toBeInTheDocument();
  });

  test('filters by country', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <List />
        </MemoryRouter>
      );
    });

    const countryCheckbox = screen.getByText('USA');
    fireEvent.click(countryCheckbox);

    const searchItem = await screen.findByText('USA');
    expect(searchItem).toBeInTheDocument();
  });

  test('filters by city', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <List />
        </MemoryRouter>
      );
    });

    const cityCheckbox = screen.getByText('New York');
    fireEvent.click(cityCheckbox);

    const searchItem = await screen.findByText('New York');
    expect(searchItem).toBeInTheDocument();
  });

});

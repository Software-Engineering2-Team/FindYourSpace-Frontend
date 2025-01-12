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
});

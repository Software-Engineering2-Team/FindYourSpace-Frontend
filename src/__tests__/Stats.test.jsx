import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Stats from '../pages/stats/Stats';

test('renders Stats componenet', () => {
    render(
      <MemoryRouter>
        <Stats/>
      </MemoryRouter>
    );
    const statsPage = screen.getByTestId('statsPage-1');
    expect(statsPage).toBeInTheDocument();
  });
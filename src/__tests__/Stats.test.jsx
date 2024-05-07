import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Stats from '../pages/stats/Stats';

test('renders Stats componenet', () => {
    render(
      <MemoryRouter>
        <Stats/>
      </MemoryRouter>
    );
    const contactForm = screen.getByTestId('statsPage-1');
    expect(contactForm).toBeInTheDocument();
  });
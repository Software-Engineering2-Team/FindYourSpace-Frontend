import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Reviews from '../pages/reviews/Reviews';

test('renders reviews page', () => {
    render(
      <MemoryRouter>
        <Reviews/>
      </MemoryRouter>
    );
    const reviewsPage = screen.getByTestId('reviewsPage-1');
    expect(reviewsPage).toBeInTheDocument();
  });
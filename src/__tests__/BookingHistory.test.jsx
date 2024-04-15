import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BookingHistory from '../pages/bookingHistory/BookingHistory';

test('renders booking history page', () => {
    render(
      <MemoryRouter>
        <BookingHistory/>
      </MemoryRouter>
    );
    const bookingHistory = screen.getByTestId('bookingHistory-1');
    expect(bookingHistory).toBeInTheDocument();
  });
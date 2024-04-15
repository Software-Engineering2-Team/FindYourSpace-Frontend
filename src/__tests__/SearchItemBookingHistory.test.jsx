import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SearchItem from '../components/searchItemBookingHistory/SearchItemBookingHistory';

const mockSpaceBookingHistory = {
  id: 1,
  photos: 'https://t3.ftcdn.net/jpg/06/13/56/76/240_F_613567624_3sprurRaLiYV6jC4WbGdJRwbaFW09Suq.jpg',
  location: 'Warsaw',
  price: 100,
  size: 1,
  availability: true,
  owner: "Sam Smith"
};


test('renders search item of booking history', () => {
    render(
      <MemoryRouter>
        <SearchItem space={mockSpaceBookingHistory}/>
      </MemoryRouter>
    );
    const searchItemBookingHistory = screen.getByTestId('searchItemBookingHistory-1');
    expect(searchItemBookingHistory).toBeInTheDocument();
  });
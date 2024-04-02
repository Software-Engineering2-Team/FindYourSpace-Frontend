import { render, screen } from '@testing-library/react';
import SearchItem from '../components/searchItem/SearchItem';
import { MemoryRouter } from 'react-router-dom';

const mockSpace = {
  id: 1,
  mainPhoto: 'https://t3.ftcdn.net/jpg/06/13/56/76/240_F_613567624_3sprurRaLiYV6jC4WbGdJRwbaFW09Suq.jpg',
  address: 'Warsaw',
  pricePerDay: 100,
  name: 'AdSpace1'
};

describe('SearchItem component', () => {
  test('renders search item', () => {
    render(
      <MemoryRouter>
        <SearchItem space={mockSpace} />
      </MemoryRouter>
    );
    const searchItemElement = screen.getByTestId('searchItem-1');
    expect(searchItemElement).toBeInTheDocument();
  });

  test('renders image', () => {
    render(
      <MemoryRouter>
        <SearchItem space={mockSpace} />
      </MemoryRouter>
    );
    const imageElement = screen.getByAltText(mockSpace.name);
    expect(imageElement).toBeInTheDocument();
    expect(imageElement.src).toBe(mockSpace.mainPhoto);
  });

  test('renders address', () => {
    render(
      <MemoryRouter>
        <SearchItem space={mockSpace} />
      </MemoryRouter>
    );
    const addressElement = screen.getByText(mockSpace.address);
    expect(addressElement).toBeInTheDocument();
  });

  test('renders price', () => {
    render(
      <MemoryRouter>
        <SearchItem space={mockSpace} />
      </MemoryRouter>
    );
    const priceElement = screen.getByText(`$${mockSpace.pricePerDay}`);
    expect(priceElement).toBeInTheDocument();
  });

  test('navigates to correct URL when image clicked', () => {
    render(
      <MemoryRouter>
        <SearchItem space={mockSpace} />
      </MemoryRouter>
    );
    const imageElement = screen.getByAltText(mockSpace.name);
    expect(imageElement.parentElement).toHaveAttribute('href', `/space/${mockSpace.id}`);
  });
});

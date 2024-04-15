import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MySpaceItem from '../components/mySpaceItem/mySpaceItem';

const mockSpace = {
  id: 1,
  photos: 'https://t3.ftcdn.net/jpg/06/13/56/76/240_F_613567624_3sprurRaLiYV6jC4WbGdJRwbaFW09Suq.jpg',
  location: 'Warsaw',
  price: 100,
  size: 1,
  availability: true,
  owner: "Sam Smith"
};

test('renders my space elements', () => {
    render(
      <MemoryRouter>
        <MySpaceItem space={mockSpace}/>
      </MemoryRouter>
    );
    const mySpaceItem = screen.getByTestId('mySpaceItem-1');
    expect(mySpaceItem).toBeInTheDocument();
  });
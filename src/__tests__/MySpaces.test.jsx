import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MySpaces from '../pages/mySpaces/MySpaces';


test('renders MySpaces page', () => {
    render(
      <MemoryRouter>
        <MySpaces/>
      </MemoryRouter>
    );
    const mySpacesPage = screen.getByTestId('mySpacesPage-1');
    expect(mySpacesPage).toBeInTheDocument();
  });
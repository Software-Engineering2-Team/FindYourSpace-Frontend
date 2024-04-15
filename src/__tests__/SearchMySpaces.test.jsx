import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SearchBar from '../pages/mySpaces/SearchMySpaces';


test('renders SearchMySpaces component', () => {
    render(
      <MemoryRouter>
        <SearchBar/>
      </MemoryRouter>
    );
    const searchMySpacesPage = screen.getByTestId('searchMySpacesPage-1');
    expect(searchMySpacesPage).toBeInTheDocument();
  });
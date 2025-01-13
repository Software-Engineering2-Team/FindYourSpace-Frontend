import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SearchBar from '../components/searchBar/SearchBar';


test('renders SearchMySpaces component', () => {
    render(
      <MemoryRouter>
        <SearchBar testId="searchMySpacesPage-1"/>
      </MemoryRouter>
    );
    const searchMySpacesPage = screen.getByTestId('searchMySpacesPage-1');
    expect(searchMySpacesPage).toBeInTheDocument();
  });
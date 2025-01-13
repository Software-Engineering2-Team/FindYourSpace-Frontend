import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SearchBar from '../components/searchBar/SearchBar';


test('renders SearchUsers component', () => {
    render(
      <MemoryRouter>
        <SearchBar testId="searchUsersPage-1"/>
      </MemoryRouter>
    );
    const searchUsersPage = screen.getByTestId('searchUsersPage-1');
    expect(searchUsersPage).toBeInTheDocument();
  });
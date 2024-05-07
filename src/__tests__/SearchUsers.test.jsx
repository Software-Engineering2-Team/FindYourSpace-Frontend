import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SearchBar from '../pages/policyEnforcement/SearchUsers';


test('renders SearchUsers component', () => {
    render(
      <MemoryRouter>
        <SearchBar/>
      </MemoryRouter>
    );
    const searchMySpacesPage = screen.getByTestId('searchUsersPage-1');
    expect(searchMySpacesPage).toBeInTheDocument();
  });
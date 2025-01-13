import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SearchBar from '../components/searchBar/SearchBar';


test('renders SearchApproveSpaces component', () => {
    render(
      <MemoryRouter>
        <SearchBar testId="searchApproveSpacesPage-1"/>
      </MemoryRouter>
    );
    const searchApproveSpaces = screen.getByTestId('searchApproveSpacesPage-1');
    expect(searchApproveSpaces).toBeInTheDocument();
  });
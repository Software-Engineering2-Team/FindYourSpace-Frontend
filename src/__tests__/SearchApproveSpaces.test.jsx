import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SearchBar from '../pages/approveSpaces/SearchApproveSpaces';


test('renders SearchMySpaces component', () => {
    render(
      <MemoryRouter>
        <SearchBar/>
      </MemoryRouter>
    );
    const searchMySpacesPage = screen.getByTestId('searchApproveSpacesPage-1');
    expect(searchMySpacesPage).toBeInTheDocument();
  });
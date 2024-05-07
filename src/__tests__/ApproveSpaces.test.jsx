import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ApproveSpacesPage from '../pages/approveSpaces/ApproveSpaces';


test('renders SearchMySpaces component', () => {
    render(
      <MemoryRouter>
        <ApproveSpacesPage/>
      </MemoryRouter>
    );
    const searchMySpacesPage = screen.getByTestId('ApproveSpacesPage-1');
    expect(searchMySpacesPage).toBeInTheDocument();
  });
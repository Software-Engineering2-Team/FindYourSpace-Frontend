import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ApproveSpacesPage from '../pages/approveSpaces/ApproveSpaces';


test('renders ApproveSpacesPage component', () => {
    render(
      <MemoryRouter>
        <ApproveSpacesPage/>
      </MemoryRouter>
    );
    const approveSpacesPage = screen.getByTestId('ApproveSpacesPage-1');
    expect(approveSpacesPage).toBeInTheDocument();
  });
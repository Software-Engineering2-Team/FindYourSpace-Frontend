import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import EndpointRequestsTable from '../pages/platformHealth/EndpointRequestTable';


test('renders edit page', () => {
    render(
      <MemoryRouter>
        <EndpointRequestsTable/>
      </MemoryRouter>
    );
    const editPage = screen.getByTestId('platformHealth-1');
    expect(editPage).toBeInTheDocument();
  });
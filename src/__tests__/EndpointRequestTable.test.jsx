import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import EndpointRequestsTable from '../pages/platformHealth/EndpointRequestTable';


test('renders platformHealth page', () => {
    render(
      <MemoryRouter>
        <EndpointRequestsTable/>
      </MemoryRouter>
    );
    const platformHealth = screen.getByTestId('platformHealth-1');
    expect(platformHealth).toBeInTheDocument();
  });
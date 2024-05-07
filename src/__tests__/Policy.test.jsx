import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PolicyPage from '../pages/policyEnforcement/Policy';

test('renders Policy componenet', () => {
    render(
      <MemoryRouter>
        <PolicyPage/>
      </MemoryRouter>
    );
    const navBar = screen.getByTestId('policyPage-1');
    expect(navBar).toBeInTheDocument();
  });
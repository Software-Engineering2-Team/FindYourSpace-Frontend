import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NavbarUser from '../components/navbar/NavbarUser';

test('renders navbar', () => {
    render(
      <MemoryRouter>
        <NavbarUser/>
      </MemoryRouter>
    );
    const navBar = screen.getByTestId('navbar-1');
    expect(navBar).toBeInTheDocument();
  });
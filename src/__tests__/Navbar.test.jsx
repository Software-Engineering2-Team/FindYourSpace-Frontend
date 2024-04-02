import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';

test('renders navbar', () => {
    render(
      <MemoryRouter>
        <Navbar/>
      </MemoryRouter>
    );
    const navBar = screen.getByTestId('navbar-1');
    expect(navBar).toBeInTheDocument();
  });
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../pages/login/Login';


test('renders login page', () => {
    render(
      <MemoryRouter>
        <Login/>
      </MemoryRouter>
    );
    const loginpage = screen.getByTestId('login-1');
    expect(loginpage).toBeInTheDocument();
  });
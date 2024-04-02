import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Signup from '../pages/signup/Signup';

test('renders profile page', () => {
    render(
      <MemoryRouter>
        <Signup/>
      </MemoryRouter>
    );
    const signupPage = screen.getByTestId('signupPage-1');
    expect(signupPage).toBeInTheDocument();
  });
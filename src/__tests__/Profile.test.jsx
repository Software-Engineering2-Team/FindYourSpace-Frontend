import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Profile from '../pages/profile/Profile';


test('renders profile page', () => {
    render(
      <MemoryRouter>
        <Profile/>
      </MemoryRouter>
    );
    const profilePage = screen.getByTestId('profilePage-1');
    expect(profilePage).toBeInTheDocument();
  });
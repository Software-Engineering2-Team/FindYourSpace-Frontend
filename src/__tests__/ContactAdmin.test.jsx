import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ContactAdminForm from '../pages/contactAdmin/ContactAdmin';

test('renders contact admin page', () => {
    render(
      <MemoryRouter>
        <ContactAdminForm/>
      </MemoryRouter>
    );
    const contactForm = screen.getByTestId('contactAdminForm-1');
    expect(contactForm).toBeInTheDocument();
  });
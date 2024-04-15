import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ContactForm from '../pages/contactOwner/ContactOwner';

test('renders contact owner page', () => {
    render(
      <MemoryRouter>
        <ContactForm/>
      </MemoryRouter>
    );
    const contactForm = screen.getByTestId('contactForm-1');
    expect(contactForm).toBeInTheDocument();
  });
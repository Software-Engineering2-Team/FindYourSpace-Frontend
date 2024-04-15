import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AddOfficeSpaceForm from '../pages/add/add';

test('renders profile page', () => {
    render(
      <MemoryRouter>
        <AddOfficeSpaceForm/>
      </MemoryRouter>
    );
    const addOfficeSpaceForm = screen.getByTestId('addOfficeSpaceForm-1');
    expect(addOfficeSpaceForm).toBeInTheDocument();
  });
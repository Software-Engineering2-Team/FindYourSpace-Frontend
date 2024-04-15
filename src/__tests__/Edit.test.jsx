import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import EditOfficeSpaceForm from '../pages/edit/edit';


test('renders edit page', () => {
    render(
      <MemoryRouter>
        <EditOfficeSpaceForm/>
      </MemoryRouter>
    );
    const editPage = screen.getByTestId('editPage-1');
    expect(editPage).toBeInTheDocument();
  });
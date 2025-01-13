import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import EditAdSpaceSpaceForm from '../pages/edit/Edit';


test('renders edit page', () => {
    render(
        <MemoryRouter>
            <EditAdSpaceSpaceForm/>
        </MemoryRouter>
    );
    const editPage = screen.getByTestId('editPage-1');
    expect(editPage).toBeInTheDocument();
});
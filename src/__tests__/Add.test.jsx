import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import AddAdSpaceSpaceForm from '../pages/add/Add';

test('renders add page', () => {
    render(
        <MemoryRouter>
            <AddAdSpaceSpaceForm/>
        </MemoryRouter>
    );
    const addAdSpaceSpaceForm = screen.getByTestId('addAdSpaceSpaceForm-1');
    expect(addAdSpaceSpaceForm).toBeInTheDocument();
});
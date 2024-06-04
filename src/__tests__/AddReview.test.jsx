import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AddReviewForm from '../pages/reviews/AddReview';

test('renders SearchMySpaces component', () => {
    render(
      <MemoryRouter>
        <AddReviewForm/>
      </MemoryRouter>
    );
    const searchMySpacesPage = screen.getByTestId('addReviewForm-1');
    expect(searchMySpacesPage).toBeInTheDocument();
  });
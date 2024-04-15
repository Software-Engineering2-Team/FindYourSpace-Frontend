import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ReviewItem from '../components/reviewItems/reviewItem';

const mockReview = {
  "title": "Prime Location, Proven Results",
  "description": "I recently rented an ad space through this platform and found it to be in a prime location. The results were excellent, and my advertisement reached a wide audience. The foot traffic in the area was high, leading to increased visibility for my brand. Overall, I was very satisfied with the performance of this ad space.",
  "date": "October 21, 2020",
  "rating": "4",
  "name" : "Ryan"
}

test('renders review item', () => {
    render(
      <MemoryRouter>
        <ReviewItem review={mockReview}/>
      </MemoryRouter>
    );
    const reviewItem = screen.getByTestId('reviewItem-1');
    expect(reviewItem).toBeInTheDocument();
  });
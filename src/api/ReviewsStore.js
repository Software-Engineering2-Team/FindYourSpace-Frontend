import { create } from 'zustand';
const url = 'http://localhost:8000';
const ReviewsStore = create((set) => ({
    reviews: [],
    setReviews: (reviews) => set({ reviews }),
    fetchReviews: async () => {
        try {
            const response = await fetch(`${url}/api/get-all-ratings/`, {
                method: 'GET',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                }
            });
            const reviews = await response.json();
            set({ reviews });
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    },
    fetchReviewsBySpaceId: async (spaceId) => {
        try {

            await ReviewsStore.getState().fetchReviews();
            
            const entry = ReviewsStore.getState().reviews.find(entry => entry.id === parseInt(spaceId, 10));
            
            if (entry) {
                const reviews = entry.reviews;
                return Promise.resolve({
                    json: () => Promise.resolve(reviews)
                });
            } else {
                return Promise.reject(new Error(`No reviews found for space with id ${spaceId}`));
            }
        } catch (error) {
            return Promise.reject(error);
        }
    },
}));

export default ReviewsStore;
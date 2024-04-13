import { create } from 'zustand';
import { reviewEntries } from './reviewsdata.js';

const ReviewsStore = create((set) => ({
    reviews: [],
    setReviews: (reviews) => set({ reviews }),
    fetchReviewsBySpaceId: async (spaceId) => {
        try {
            // Find the entry with the matching id
            console.log(spaceId)
            const entry = reviewEntries.find(entry => entry.id === parseInt(spaceId, 10));
            console.log(entry)
            
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
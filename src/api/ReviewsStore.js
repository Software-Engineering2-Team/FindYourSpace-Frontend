import { create } from 'zustand';
import { reviewEntries } from './reviewsdata.js';

const ReviewsStore = create((set) => ({
    reviews: [],
    setReviews: (reviews) => set({ reviews }),
    fetchReviewsBySpaceId: async (spaceId) => {
        try {
            const reviews = reviewEntries.filter(entry => entry.id === spaceId);
            return Promise.resolve({
                json: () => Promise.resolve(reviews)
            });
        } catch (error) {
            return Promise.reject(error);
        }
    },
}));

export default ReviewsStore;
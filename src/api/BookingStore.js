import { create } from 'zustand';

const url = 'http://localhost:8000';

const BookingsStore = create((set) => ({
  userData: null,

  setBookingsData: (userData) => {
    set({ userData });
  },

  fetchBookings: async () => {
    try {
      const response = await fetch(`${url}/api/get-all-bookings/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await response.json();
      BookingsStore.getState().setBookingsData(data);

      console.log(data);
    } catch (error) {
      console.error('Fetching Bookings failed:', error.message);
      throw error;
    }
  },
 
}));

export default BookingsStore;

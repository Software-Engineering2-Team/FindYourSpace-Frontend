import { create } from 'zustand';

const apiUrl = 'http://localhost:8000';

const useBookingStore = create((set) => ({
  bookings: JSON.parse(localStorage.getItem('bookings')) || null,
  setBookings: (bookings) => {
    set({ bookings });
    // Store userData in localStorage
    localStorage.setItem('bookings', JSON.stringify(bookings));
    console.log("Value inside bookings",bookings);
  },
  
  fetchBookingsByClient: async (clientId) => {
    try {
      const response = await fetch(`${apiUrl}/api/bookings/client/${clientId}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch bookings');
      }
      const data = await response.json();
      useBookingStore.getState().setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      throw error;
    }
  },
}));

export default useBookingStore;

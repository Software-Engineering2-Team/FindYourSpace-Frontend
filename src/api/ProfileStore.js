import { create } from 'zustand';

const url = 'http://localhost:8000';

const ProfileStore = create((set) => ({
  userData: null,

  setUserData: (userData) => {
    set({ userData });
  },

  fetchUserProfile: async (username) => {
    try {
      const response = await fetch(`${url}/profile/?username=${username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }

      const data = await response.json();
      ProfileStore.getState().setUserData(data);

      console.log(data);
    } catch (error) {
      console.error('Fetching user profile failed:', error.message);
      throw error;
    }
  },

}));

export default ProfileStore;

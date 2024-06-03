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

  updateUserProfile: async (userData) => {
    try {
      const response = await fetch(`${url}/update_user/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      console.log("Response: ",response)
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData);
      }

      const data = await response.json();
      console.log("DATA: ",data)
      ProfileStore.getState().setUserData(data);


      console.log('Profile updated successfully');
    } catch (error) {
      console.error('Updating user profile failed:', error.message);
      throw error;
    }
  },
}));

export default ProfileStore;

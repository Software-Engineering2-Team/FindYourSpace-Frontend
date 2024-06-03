import { create } from 'zustand';

const url = 'http://localhost:8000';

const AddOfficeStore = create((set) => ({
  createdSpace: null,

  createAdSpace: async (adSpaceData) => {
    try {
      console.log('Creating new ad space with data:', adSpaceData);
      const response = await fetch(`${url}/api/create-adspace/`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(adSpaceData)
    });
      const data = await response.json();
      console.log('Created new ad space:', data);
      set({ createdSpace: data });
    } catch (error) {
      console.error('Error:', error);
    }
  },

}));

export default AddOfficeStore;
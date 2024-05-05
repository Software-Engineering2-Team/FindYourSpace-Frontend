import { create } from 'zustand';

const url = 'http://localhost:8000';

const ExpandedAdSpaceStore = create((set) => ({
  expandedAdSpace: null,

  fetchExpandedAdSpace: async (id) => {
    try {
      console.log('Fetching expanded ad space with id:', id);
      const response = await fetch(`${url}/api/adspace/${id}/`, {
        method: 'GET',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json(); // Parse JSON here
      console.log('Fetched expanded ad space:', data);
      set({ expandedAdSpace: data });
    } catch (error) {
      console.error('Error:', error);
    }
  },
}));

export default ExpandedAdSpaceStore;
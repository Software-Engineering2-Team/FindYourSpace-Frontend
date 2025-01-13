import {create} from 'zustand'

const url = 'http://localhost:8000';

const AdSpaceStore = create((set) => ({
    adspaces: [],
    setAdSpaces:
        (adspaces) => set({adspaces}),

    fetchAdSpaces:
        async (pageSize, pageNum) => fetch(`${url}/api/get-all-adspaces/`, {
            method: 'GET',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
            }
        }),
    fetchAdSpace: async (id) => {
        try {
            const response = await fetch(`${url}/api/adspace/${id}/`);
            if (!response.ok) {
                throw new Error('Failed to fetch adspace');
            }
            const data = await response.json();
            set((state) => ({
                adspaces: state.adspaces.map((adspace) =>
                    adspace.id === id ? {...adspace, ...data} : adspace
                )
            }));
            return data;
        } catch (error) {
            console.error('Error fetching adspace:', error);
            throw error;
        }
    },

    updateAdSpace: async (officeData) => {
        try {
            const response = await fetch(`${url}/api/adspace/${officeData.id}/update/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(officeData),
            });

            if (!response.ok) {
                throw new Error('Failed to update adspace');
            }

            const data = await response.json();
            set((state) => ({
                adspaces: state.adspaces.map((adspace) =>
                    adspace.id === officeData.id ? {...adspace, ...data} : adspace
                )
            }));
            return data;
        } catch (error) {
            console.error('Error updating adspace:', error);
            throw error;
        }
    },
    deleteAdSpace: async (id) => {
        try {
            const response = await fetch(`${url}/api/adspace/${id}/delete/`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete adspace');
            }

            set((state) => ({
                adspaces: state.adspaces.filter((adspace) => adspace.id !== id)
            }));
        } catch (error) {
            console.error('Error deleting adspace:', error);
            throw error;
        }
    },

    fetchAdSpacesByOwner: async (id) => {
        try {
            const response = await fetch(`${url}/api/adspaces/owner/${id}/`);
            console.log("Owner id: ", id)
            if (!response.ok) {
                throw new Error('Failed to fetch adspace');
            }
            const data = await response.json();
            set((state) => ({
                adspaces: state.adspaces.map((adspace) =>
                    adspace.id === id ? {...adspace, ...data} : adspace
                )
            }));
            return data;
        } catch (error) {
            console.error('Error fetching adspace:', error);
            throw error;
        }
    },
}));

export default AdSpaceStore;
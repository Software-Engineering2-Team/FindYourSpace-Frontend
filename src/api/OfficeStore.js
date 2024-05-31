    import { create } from 'zustand'
    const url = 'http://localhost:8000';

    const OfficeStore = create((set) => ({
        offices: [],
        setOffices:
            (offices) => set({ offices }),
        // fetchOffice: async (id) => {
        //     try {
        //         console.log('Fetching office with id:', id);
        //         const office = OfficeStore.getState.offices.find((office) => office.id === parseInt(id));
        //         console.log('Fetched office:', office);
        //         if (office) {
        //             return Promise.resolve({
        //                 json: () => Promise.resolve(office),
        //             });
        //         } else {
        //             return Promise.reject(new Error(`Office with id ${id} not found`));
        //         }
        //     } catch (error) {
        //         console.error('Error fetching office:', error);
        //         return Promise.reject(error);
        //     }
        // },
        
        fetchOffices:
            async (pageSize, pageNum) => fetch(`${url}/api/get-all-adspaces/`, {
                method: 'GET',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
            }}),
        fetchOffice: async (id) => {
            try {
                const response = await fetch(`${url}/api/adspace/${id}/`);
                if (!response.ok) {
                throw new Error('Failed to fetch office');
                }
                const data = await response.json();
                set((state) => ({
                offices: state.offices.map((office) => 
                    office.id === id ? { ...office, ...data } : office
                )
                }));
                return data;
            } catch (error) {
                console.error('Error fetching office:', error);
                throw error;
            }
        },
        
        updateOffice: async (officeData) => {
            try {
                const response = await fetch(`${url}/api/adspace/${officeData.id}/update/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(officeData),
                });
        
                if (!response.ok) {
                throw new Error('Failed to update office');
                }
        
                const data = await response.json();
                set((state) => ({
                offices: state.offices.map((office) =>
                    office.id === officeData.id ? { ...office, ...data } : office
                )
                }));
                return data;
            } catch (error) {
                console.error('Error updating office:', error);
                throw error;
            }
        },
    }));

    export default OfficeStore;
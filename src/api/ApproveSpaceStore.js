import {create} from 'zustand'
// const url = 'https://officely.azurewebsites.net';
//const url = 'http://localhost:8080';

const ApproveSpaceStore = create((set) => ({
    spaces: [],
    setSpaces: (spaces) => set({spaces}),
    fetchNonApprovedSpaces: async (pageSize, pageNum) => {
        try {
            const response = await fetch(`http://localhost:8000/api/get-unapproved-adspaces?pageSize=${pageSize}&pageNum=${pageNum}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return Promise.resolve({json: () => Promise.resolve(data)});
        } catch (error) {
            return Promise.reject(error);
        }
    },
}));

export default ApproveSpaceStore;
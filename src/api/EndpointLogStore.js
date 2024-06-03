import { create } from 'zustand'
const url = 'http://localhost:8000';

const EndPointLogStore = create((set) => ({
    endpointlogs: [],
    setEndpointLogs:
        (endpointlogs) => set({endpointlogs}),

    fetchLogs:
    async () => fetch(`${url}/logs/`, {
        method: 'GET',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
        }}),
    // fetchLogs: async (pageSize, pageNum) => {
    //         try {
    //             const officeData = await logs;
    //             const startIdx = pageNum * pageSize;
    //             const endIdx = startIdx + pageSize;
    //             const offices = officeData.slice(startIdx, endIdx);
    //             return Promise.resolve({
    //                 json: () => Promise.resolve(offices)
    //             });
    //         } catch (error) {
    //             return Promise.reject(error);
    //         }
    //     },
    
}));


export default EndPointLogStore;
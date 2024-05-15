import { create } from 'zustand'
import { logs } from './endpointLogData';
// const url = 'http://localhost:8000';

const EndPointLogStore = create((set) => ({
    endpointlogs: [],
    setEndpointLogs:
        (endpointlogs) => set({endpointlogs}),
    fetchLogs: async (pageSize, pageNum) => {
        try {
            const logsData = await logs;
            const startIdx = pageNum * pageSize;
            const endIdx = startIdx + pageSize;
            const slidedLogs = logsData.slice(startIdx, endIdx);
            return Promise.resolve({
                json: () => Promise.resolve(slidedLogs)
            });
        } catch (error) {
            return Promise.reject(error);
        }
    },
    
}));


export default EndPointLogStore;
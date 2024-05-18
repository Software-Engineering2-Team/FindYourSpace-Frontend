import { create } from 'zustand'
// import { logs } from './endpointLogData';
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
    
}));


export default EndPointLogStore;
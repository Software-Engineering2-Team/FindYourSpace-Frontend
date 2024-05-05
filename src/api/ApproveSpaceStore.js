import { create } from 'zustand'
import { spaces } from './spacedata';
// const url = 'https://officely.azurewebsites.net';
//const url = 'http://localhost:8080';

const ApproveSpaceStore = create((set) => ({
    users: [],
    setSpaces:
        (spaces) => set({ spaces }),
    fetchNonApprovedSpaces: async (pageSize, pageNum) => {
        try {
            const spaceData = await spaces;
            const startIdx = pageNum * pageSize;
            const endIdx = startIdx + pageSize;
            const slicedSpaces = spaceData.slice(startIdx, endIdx);
            return Promise.resolve({
                json: () => Promise.resolve(slicedSpaces)
            });
        } catch (error) {
            return Promise.reject(error);
        }
    },
}));

export default ApproveSpaceStore;
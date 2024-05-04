import { create } from 'zustand'
import { userManagementUsers } from './userdata';
// const url = 'https://officely.azurewebsites.net';
//const url = 'http://localhost:8080';

const UserStore = create((set) => ({
    users: [],
    setUsers:
        (users) => set({ users }),
    fetchUsers: async (pageSize, pageNum) => {
        try {
            const userData = await userManagementUsers;
            const startIdx = pageNum * pageSize;
            const endIdx = startIdx + pageSize;
            const offices = userData.slice(startIdx, endIdx);
            return Promise.resolve({
                json: () => Promise.resolve(offices)
            });
        } catch (error) {
            return Promise.reject(error);
        }
    },
    // fetchUser: async (username) => {
    //     try {
    //         console.log('Fetching office with id:', id);
    //         const office = officeSpaces.find((office) => office.id === parseInt(id));
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
    // }
    // fetchOffices:
    //     async (pageSize, pageNum) => fetch(`${url}/offices?pageSize=${pageSize}&pageNum=${pageNum}`, {
    //         method: 'GET',
    //         headers: {
    //             'Accept': '*/*',
    //             'Content-Type': 'application/json',
    //         }}),
    
    // fetchOffice:
    //     async (officeId) => fetch(`${url}/offices/${officeId}`, {
    //         method: 'GET',
    //         headers: {
    //             'Accept': '*/*',
    //             'Content-Type': 'application/json',
    //         }}),
    // addOffice: (office) => {
    //     let newData = {
    //         availableFrom: formatDateTime(office.availableFrom),
    //         availableTo: formatDateTime(office.availableTo),
    //     };
    //     office = { ...office, ...newData };
    //     office = { ...office, pricePerDay: parseFloat(office.pricePerDay) };
    //     console.log(office);
    //     return fetch(`${url}/offices`, {
    //         method: 'POST',
    //         headers: {
    //             'Accept': '*/*',
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${LoginStore.getState().jwttoken}`,
    //         },
    //         body: JSON.stringify([office]),
    //     });
    // },
    // updateOffice:
    //     (office) =>
    //     {
    //         let newData = {
    //             availableFrom : formatDateTime(office.availableFrom),
    //             availableTo : formatDateTime(office.availableTo) }
    //         office = { ...office, ...newData }
    //         office = { ...office, pricePerDay: parseFloat(office.pricePerDay)}

    //         return fetch(`${url}/offices/${office.id}`, {
    //             method: 'PUT',
    //             headers: {
    //                 'Accept': '*/*',
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${LoginStore.getState().jwttoken}`},
    //             body: JSON.stringify(office)
    //         })
    //     },
    // deleteOffice:
    //     async (office) => fetch(`${url}/offices/${office.id}`, {
    //         method: 'DELETE',
    //         headers: {
    //             'Accept': '*/*',
    //             'Authorization': `Bearer ${LoginStore.getState().jwttoken}`}
    //     })
}));

export default UserStore;
import { create } from 'zustand'
import LoginStore from './LoginStore';
import { officeSpaces } from './data.js';
const url = 'https://officely.azurewebsites.net';
//const url = 'http://localhost:8080';

const OfficeStore = create((set) => ({
    offices: [],
    setOffices:
        (offices) => set({ offices }),
    // fetchOffices:
    //     async (pageSize, pageNum) => fetch(`${url}/offices?pageSize=${pageSize}&pageNum=${pageNum}`, {
    //         method: 'GET',
    //         headers: {
    //             'Accept': '*/*',
    //             'Content-Type': 'application/json',
    //         }}),
    fetchOffices: async (pageSize, pageNum) => {
        try {
            const officeData = await officeSpaces;
            const startIdx = pageNum * pageSize;
            const endIdx = startIdx + pageSize;
            const offices = officeData.slice(startIdx, endIdx);
            return Promise.resolve({
                json: () => Promise.resolve(offices)
            });
        } catch (error) {
            return Promise.reject(error);
        }
    },
    fetchOffice:
        async (officeId) => fetch(`${url}/offices/${officeId}`, {
            method: 'GET',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
            }}),
    addOffice: (office) => {
        let newData = {
            availableFrom: formatDateTime(office.availableFrom),
            availableTo: formatDateTime(office.availableTo),
        };
        office = { ...office, ...newData };
        office = { ...office, pricePerDay: parseFloat(office.pricePerDay) };
        console.log(office);
        return fetch(`${url}/offices`, {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${LoginStore.getState().jwttoken}`,
            },
            body: JSON.stringify([office]),
        });
    },
    updateOffice:
        (office) =>
        {
            let newData = {
                availableFrom : formatDateTime(office.availableFrom),
                availableTo : formatDateTime(office.availableTo) }
            office = { ...office, ...newData }
            office = { ...office, pricePerDay: parseFloat(office.pricePerDay)}

            return fetch(`${url}/offices/${office.id}`, {
                method: 'PUT',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${LoginStore.getState().jwttoken}`},
                body: JSON.stringify(office)
            })
        },
    deleteOffice:
        async (office) => fetch(`${url}/offices/${office.id}`, {
            method: 'DELETE',
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${LoginStore.getState().jwttoken}`}
        })
}))

const formatDateTime = (dateTime) =>
{
    return dateTime.substring(0,19);
}

export default OfficeStore;
// import { create } from 'zustand'
// const url = 'http://localhost:8000';

// const UserStore = create((set) => ({
//     users: [],
//     setUsers:
//         (users) => set({ users }),
//     fetchUsers:
//         async () => fetch(`${url}/users`, {
//             method: 'GET',
//             headers: {
//                 'Accept': '*/*',
//                 'Content-Type': 'application/json',
//             }}),

//     deleteUser: async (userId) => {
//         try {
//             const response = await fetch(`${url}/delete-user/${userId}/`, {
//                 method: 'DELETE',
//                 headers: {
//                     'Accept': '*/*',
//                     'Content-Type': 'application/json',
//                 },
//             });
//             if (response.ok) {
//                 UserStore.setUsers(UserStore.users.filter((user) =>user.id !== userId))
//             } else {
//                 console.error(`Failed to delete user with ID: ${userId}`);
//             }
//         } catch (error) {
//             console.error("Error deleting user:", error);
//         }
//     },
    
    
// }));

// export default UserStore;

import { create } from 'zustand';

const url = 'http://localhost:8000';

const UserStore = create((set) => ({
    users: [],
    setUsers: (users) => set({ users }),

    fetchUsers:
        async () => fetch(`${url}/users`, {
            method: 'GET',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
            }}),
            
    
    deleteUser: async (userId) => {
        try {
            const response = await fetch(`${url}/delete-user/${userId}/`, {
                method: 'DELETE',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                console.log("Deleted Succesfully!")
            } else {
                console.error(`Failed to delete user with ID: ${userId}`);
            }
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    }
}));

export default UserStore;

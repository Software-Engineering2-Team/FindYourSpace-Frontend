import { create } from 'zustand';

const url = 'http://localhost:8000';

const LoginStore = create((set) => ({
  userData: null,

  setUserData: (userData) => {
    set({ userData });
  },

  login: async (username, password) => {
    try {
      const response = await fetch(`${url}/api/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await response.json();
      LoginStore.getState().setUserData(data);

      console.log(data);
    } catch (error) {
      console.error('Login failed:', error.message);
      throw error;
    }
  },
  // login: async (username, password) => {
  //   try {
  //     const response = await fetch(`${url}/api/login/`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ username, password }),
  //     });
  
  //     if (!response.ok) {
  //       const errorMessage = await response.text();
  //       throw new Error(errorMessage || 'Invalid credentials');
  //     }
  
  //     const data = await response.json();
  //     set({ userData: data }); // Use the set function to update state
  
  //     console.log(data);
  //   } catch (error) {
  //     console.error('Login failed:', error.message);
  //     throw error;
  //   }
  // },

  logout: async () => {
    try {
      const response = await fetch(`${url}/api/logout/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      // Clear user data
      LoginStore.getState().setUserData(null);

      console.log('Logout successful');
    } catch (error) {
      console.error('Logout failed:', error.message);
      throw error;
    }
  },
}));

export default LoginStore;


// TODD: check if user is admin, probably it will be done server side 
// const LoginStore = create((set) => ({
// 	jwttoken: Cookies.get('jwttoken'),
//     setToken: 
//         (jwttoken) => 
//         {
//             Cookies.set('jwttoken', jwttoken, { expires: 1 })
//             set({ jwttoken })
//         },
// 	login: 
//         async (username, password) => 
//         {
//             try {
//                 const response = await fetch(`${url}/auth/login`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ username, password }),
//                 });
//                 if (!response.ok) {
//                     throw new Error('Invalid credentials');
//                 }
//                 const data = await response.json();
//                 LoginStore.getState().setToken(data.jwttoken)
//                 console.log(data)
//             } catch (error) {
//                 console.error('Login failed:', error.message);
//                 throw error;
//             }
//         },
// 	// logout: 
//     //     async () => 
//     //     {      
//     //         try {     
//     //             const response = await fetch(`${url}/auth/logout`, {
//     //               method: 'POST',
//     //               headers: {
//     //                 'Content-Type': 'application/json',
//     //                 'Authorization': `Bearer ${LoginStore.getState().jwttoken}`,
//     //               }
//     //             });

//     //             if (!response.ok) {
//     //               throw new Error(`Request failed: ${response.statusText}`);
//     //             }
//     //             set({ jwttoken: "" })
//     //             Cookies.remove('jwttoken');
//     //             return response;
//     //         } catch (error) {
//     //             console.error('Authenticated request failed:', error.message);
//     //             throw error;
//     //         }
//     //     }
//     logout: async () => {
//         try {
//             const response = await fetch(`${url}/auth/logout`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${LoginStore.getState().jwttoken}`,
//                 },
//             });

//             if (!response.ok) {
//                 throw new Error(`Request failed: ${response.statusText}`);
//             }

//             set({ jwttoken: "" });
//             localStorage.removeItem('jwttoken'); // Clear from localStorage on logout
//             return response;
//         } catch (error) {
//             console.error('Authenticated request failed:', error.message);
//             throw error;
//         }
//     },
// }))

// export default LoginStore;
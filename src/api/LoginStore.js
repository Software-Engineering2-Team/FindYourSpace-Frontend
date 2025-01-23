import {create} from 'zustand';

const url = 'http://localhost:8000';

const LoginStore = create((set) => ({
    userData: JSON.parse(localStorage.getItem('userData')) || null,

    setUserData: (userData) => {
        set({userData});
        localStorage.setItem('userData', JSON.stringify(userData));
        console.log("Value inside userData", userData);
    },

    login: async (username, password) => {
        try {
            const response = await fetch(`${url}/api/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, password}),
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
            set(() => {
                localStorage.removeItem('userData');
                return {userData: null};
            });
            console.log('Logout successful');
        } catch (error) {
            console.error('Logout failed:', error.message);
            throw error;
        }
    }


}));

export default LoginStore;

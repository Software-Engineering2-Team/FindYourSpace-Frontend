import {create} from "zustand";

const url = "http://localhost:8000";

const SignupStore = create((set) => ({
    userData: null,

    setUserData: (userData) => {
        set({userData});
    },

    signup: async (username, email, password1, password2) => {
        try {
            const response = await fetch(`${url}/signup/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({username, email, password1, password2}),
            });

            const data = await response.json();

            if (!response.ok) {
                console.log(data.error);
                throw new Error(data.error);
            }

            SignupStore.getState().setUserData(data);

            console.log(data);
        } catch (error) {
            console.error("Signup failed:", error.message);
            throw error;
        }
    },
}));

export default SignupStore;

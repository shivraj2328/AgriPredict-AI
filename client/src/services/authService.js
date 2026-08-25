import api from "./api";

const registerUser = async (userData) => {
    try {
        const response = await api.post("/auth/register", userData);

        return response.data;
    } catch (error) {
        throw error.response?.data || {
            success: false,
            message: "Unable to connect to the server"
        };
    }
};

const loginUser = async (credentials) => {
    try {
        const response = await api.post("/auth/login", credentials);

        return response.data;
    } catch (error) {
        throw error.response?.data || {
            success: false,
            message: "Unable to connect to the server"
        };
    }
};

const getCurrentUser = async () => {
    try {
        const response = await api.get("/auth/me");

        return response.data;
    } catch (error) {
        throw error.response?.data || {
            success: false,
            message: "Unable to connect to the server"
        };
    }
};

export {
    registerUser,
    loginUser,
    getCurrentUser
};
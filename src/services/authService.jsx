import axios from "./axiosInstance";

export const signup = async (userData) => {
    const response = await axios.post('/auth/signup', userData);
    return response.data;
}

export const signin = async (credentials) => {
    const response = await axios.post('/auth/signin', credentials);
    console.log("signin",response.data);
    return response.data;
}
    
export const refreshToken = async (refreshToken) => {
    const response = await axios.post('/auth/refresh', refreshToken);
    return response.data;
}

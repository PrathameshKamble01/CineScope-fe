import axios from "./axiosInstance";

export const allUsers = async (accessToken) => {
    const response = await axios.get('/user/getAllUsers', {
        headers: {
            'Authorization': `Bearer ${accessToken}` // Assuming it's a Bearer token
        },
    });
    console.log("users", response.data);
    return response.data;
}

export const updateStatus = async (id, status, accessToken) => {
    const response = await axios.patch(`/updateStatus/${id}`, { status }, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });
    console.debug("status changed", response.data);
    return response.data;
}
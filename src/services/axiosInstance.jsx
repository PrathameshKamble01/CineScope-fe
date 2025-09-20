import axios from "axios";
import { getAccessToken, setAccessToken, clearAccessToken } from './tokenManager';
import { clearAuthToken, getAuthToken, setAuthToken } from "../api/authTokenHolder";

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8081/api/v1',
  withCredentials: true
});

axiosInstance.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry && !originalRequest.url.includes('/auth/refresh')) {
      originalRequest._retry = true;

      try {
        const res = await axiosInstance.post("/auth/refresh");
        const newToken = res.data.accessToken;
        setAuthToken(newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        clearAuthToken();
        window.location.href = '/signin';
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
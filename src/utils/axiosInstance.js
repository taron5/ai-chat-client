import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  (response) => response, 
  (error) => {
    console.error('API call failed:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;

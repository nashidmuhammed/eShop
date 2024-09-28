// lib/axiosInstance.js

import axios from 'axios';
import { baseUrl } from './GlobalVariables';
import toast from 'react-hot-toast';

const axiosInstance = axios.create({
  baseURL: baseUrl, // or your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add the access token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('access');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors and refresh token
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh the token
        const refreshToken = localStorage.getItem('refresh');
        const response = await axios.post(`${baseUrl}/accounts/v1/authentication/token/refresh/`, {
          refresh: refreshToken,
        });

        const { access } = response.data;

        // Store new access token
        localStorage.setItem('access', access);

        // Update the original request's authorization header
        axiosInstance.defaults.headers['Authorization'] = `Bearer ${access}`;
        originalRequest.headers['Authorization'] = `Bearer ${access}`;

        // Retry the original request with the new access token
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Handle refresh token error (e.g., redirect to login)
        console.log("refreshError===>",refreshError);
        
        console.log('Refresh token expired, redirecting to login...');
        window.location.href = '/login';
        toast.error("Token expired")
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
import axios from 'axios';

import { getStoredAuthToken } from '../utils/authStorage';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = getStoredAuthToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const normalizedError = {
      message:
        error.response?.data?.message ||
        error.message ||
        'Something went wrong. Please try again.',
      statusCode: error.response?.status || 500,
      errors: error.response?.data?.errors || null,
    };

    return Promise.reject(normalizedError);
  },
);
import { apiClient } from './apiClient';

export async function loginAdmin(credentials) {
  const response = await apiClient.post('/auth/login', credentials);

  return response.data;
}

export async function logoutAdmin() {
  const response = await apiClient.post('/auth/logout');

  return response.data;
}
import { apiClient } from './apiClient';

export async function getAnalyticsSummary() {
  const response = await apiClient.get('/analytics/summary');

  return response.data;
}
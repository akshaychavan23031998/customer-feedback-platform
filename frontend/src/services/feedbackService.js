import { apiClient } from './apiClient';

export async function submitFeedback(feedbackPayload) {
  const response = await apiClient.post('/feedback', feedbackPayload);

  return response.data;
}

export async function getFeedbackList(filters = {}) {
  const response = await apiClient.get('/feedback', {
    params: filters,
  });

  return response.data;
}
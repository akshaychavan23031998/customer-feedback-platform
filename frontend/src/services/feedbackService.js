import { mockFeedbackResponse } from '../data/feedback.mock';

function simulateNetworkDelay(delay = 500) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export async function submitFeedback(feedbackPayload) {
  await simulateNetworkDelay(700);

  const now = new Date().toISOString();

  return {
    success: true,
    message: 'Feedback submitted successfully.',
    data: {
      id: `fb_${Date.now()}`,
      category: feedbackPayload.category,
      comment: feedbackPayload.comment,
      rating: feedbackPayload.rating,
      status: 'New',
      source: feedbackPayload.source || 'Web',
      user: {
        name: feedbackPayload.name || 'Anonymous',
        email: feedbackPayload.email || '',
      },
      metadata: {
        browser: 'Browser',
        device: 'Web',
        ipAddress: 'hidden',
      },
      createdAt: now,
      updatedAt: now,
    },
  };
}

export async function getFeedbackList() {
  await simulateNetworkDelay();

  return mockFeedbackResponse;
}
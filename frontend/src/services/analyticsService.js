import { mockAnalyticsResponse } from '../data/analytics.mock';

function simulateNetworkDelay(delay = 500) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export async function getAnalyticsSummary() {
  await simulateNetworkDelay();

  return mockAnalyticsResponse;
}
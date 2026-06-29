export const feedbackStore = [
  {
    id: 'fb_001',
    category: 'Bug',
    comment: 'The dashboard is loading slowly on mobile devices.',
    rating: 3,
    status: 'New',
    source: 'Web',
    user: {
      name: 'Rahul Sharma',
      email: 'rahul@example.com',
    },
    metadata: {
      browser: 'Chrome',
      device: 'Mobile',
      ipAddress: 'hidden',
    },
    createdAt: '2026-06-29T10:30:00.000Z',
    updatedAt: '2026-06-29T10:30:00.000Z',
  },
  {
    id: 'fb_002',
    category: 'Feature Request',
    comment: 'Please add export to CSV option in the dashboard.',
    rating: 5,
    status: 'In Review',
    source: 'Web',
    user: {
      name: 'Priya Nair',
      email: 'priya@example.com',
    },
    metadata: {
      browser: 'Edge',
      device: 'Desktop',
      ipAddress: 'hidden',
    },
    createdAt: '2026-06-29T09:15:00.000Z',
    updatedAt: '2026-06-29T09:15:00.000Z',
  },
  {
    id: 'fb_003',
    category: 'UI/UX',
    comment: 'The feedback form looks clean, but the submit button could be more visible.',
    rating: 4,
    status: 'Resolved',
    source: 'Web',
    user: {
      name: 'Amit Verma',
      email: 'amit@example.com',
    },
    metadata: {
      browser: 'Firefox',
      device: 'Desktop',
      ipAddress: 'hidden',
    },
    createdAt: '2026-06-28T18:45:00.000Z',
    updatedAt: '2026-06-28T18:45:00.000Z',
  },
];

export const allowedCategories = [
  'Bug',
  'Feature Request',
  'UI/UX',
  'Performance',
  'Support',
  'Billing',
  'General',
  'Other',
];

export const allowedStatuses = ['New', 'In Review', 'Resolved', 'Archived'];
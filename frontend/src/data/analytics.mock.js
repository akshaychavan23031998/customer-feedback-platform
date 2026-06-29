export const mockAnalyticsResponse = {
  success: true,
  message: 'Analytics summary fetched successfully.',
  data: {
    overview: {
      totalFeedback: 8,
      totalNew: 3,
      totalInReview: 2,
      totalResolved: 2,
      totalArchived: 1,
      averageRating: 3.9,
    },
    categoryDistribution: [
      {
        category: 'Bug',
        count: 1,
        percentage: 12.5,
      },
      {
        category: 'Feature Request',
        count: 1,
        percentage: 12.5,
      },
      {
        category: 'UI/UX',
        count: 1,
        percentage: 12.5,
      },
      {
        category: 'Performance',
        count: 1,
        percentage: 12.5,
      },
      {
        category: 'Support',
        count: 1,
        percentage: 12.5,
      },
      {
        category: 'Billing',
        count: 1,
        percentage: 12.5,
      },
      {
        category: 'General',
        count: 1,
        percentage: 12.5,
      },
      {
        category: 'Other',
        count: 1,
        percentage: 12.5,
      },
    ],
    ratingDistribution: [
      {
        rating: 1,
        count: 0,
      },
      {
        rating: 2,
        count: 1,
      },
      {
        rating: 3,
        count: 2,
      },
      {
        rating: 4,
        count: 2,
      },
      {
        rating: 5,
        count: 3,
      },
    ],
    recentSubmissions: [
      {
        id: 'fb_001',
        category: 'Bug',
        comment: 'The dashboard is loading slowly on mobile devices.',
        rating: 3,
        status: 'New',
        user: {
          name: 'Rahul Sharma',
          email: 'rahul@example.com',
        },
        createdAt: '2026-06-29T10:30:00.000Z',
      },
      {
        id: 'fb_002',
        category: 'Feature Request',
        comment: 'Please add export to CSV option in the dashboard.',
        rating: 5,
        status: 'In Review',
        user: {
          name: 'Priya Nair',
          email: 'priya@example.com',
        },
        createdAt: '2026-06-29T09:15:00.000Z',
      },
      {
        id: 'fb_003',
        category: 'UI/UX',
        comment: 'The feedback form looks clean, but the submit button could be more visible.',
        rating: 4,
        status: 'Resolved',
        user: {
          name: 'Amit Verma',
          email: 'amit@example.com',
        },
        createdAt: '2026-06-28T18:45:00.000Z',
      },
    ],
    trends: {
      todayCount: 2,
      yesterdayCount: 2,
      weeklyCount: 8,
      monthlyCount: 8,
    },
  },
};
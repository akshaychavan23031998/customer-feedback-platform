import { allowedCategories, allowedStatuses, feedbackStore } from '../data/feedback.store.js';

function getPaginationMetadata({ page, limit, totalRecords }) {
  const totalPages = Math.ceil(totalRecords / limit) || 1;

  return {
    page,
    limit,
    totalRecords,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
}

function normalizeText(value) {
  return String(value || '').trim().toLowerCase();
}

export function createFeedback(payload, requestMetadata = {}) {
  const now = new Date().toISOString();

  const feedback = {
    id: `fb_${Date.now()}`,
    category: payload.category,
    comment: payload.comment.trim(),
    rating: Number(payload.rating),
    status: 'New',
    source: payload.source || 'Web',
    user: {
      name: payload.name?.trim() || 'Anonymous',
      email: payload.email?.trim() || '',
    },
    metadata: {
      browser: requestMetadata.userAgent || 'unknown',
      device: 'Web',
      ipAddress: requestMetadata.ipAddress || 'hidden',
    },
    createdAt: now,
    updatedAt: now,
  };

  feedbackStore.unshift(feedback);

  return feedback;
}

export function getFeedbackList(query = {}) {
  const page = Math.max(Number(query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(query.limit) || 10, 1), 50);
  const search = normalizeText(query.search);
  const category = query.category || 'All';
  const status = query.status || 'All';
  const rating = query.rating || 'All';
  const sortBy = query.sortBy || 'latest';

  let filteredFeedback = [...feedbackStore];

  if (search) {
    filteredFeedback = filteredFeedback.filter((item) => {
      const searchableText = [
        item.comment,
        item.category,
        item.status,
        item.user?.name,
        item.user?.email,
      ]
        .join(' ')
        .toLowerCase();

      return searchableText.includes(search);
    });
  }

  if (category !== 'All' && allowedCategories.includes(category)) {
    filteredFeedback = filteredFeedback.filter((item) => item.category === category);
  }

  if (status !== 'All' && allowedStatuses.includes(status)) {
    filteredFeedback = filteredFeedback.filter((item) => item.status === status);
  }

  if (rating !== 'All') {
    filteredFeedback = filteredFeedback.filter((item) => item.rating === Number(rating));
  }

  filteredFeedback.sort((a, b) => {
    if (sortBy === 'oldest') {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }

    if (sortBy === 'highestRating') {
      return b.rating - a.rating;
    }

    if (sortBy === 'lowestRating') {
      return a.rating - b.rating;
    }

    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const totalRecords = filteredFeedback.length;
  const startIndex = (page - 1) * limit;
  const paginatedFeedback = filteredFeedback.slice(startIndex, startIndex + limit);

  return {
    data: paginatedFeedback,
    pagination: getPaginationMetadata({
      page,
      limit,
      totalRecords,
    }),
  };
}

export function getAnalyticsSummary() {
  const totalFeedback = feedbackStore.length;

  const totalNew = feedbackStore.filter((item) => item.status === 'New').length;
  const totalInReview = feedbackStore.filter((item) => item.status === 'In Review').length;
  const totalResolved = feedbackStore.filter((item) => item.status === 'Resolved').length;
  const totalArchived = feedbackStore.filter((item) => item.status === 'Archived').length;

  const averageRating =
    totalFeedback === 0
      ? 0
      : Number(
          (
            feedbackStore.reduce((sum, item) => sum + Number(item.rating || 0), 0) /
            totalFeedback
          ).toFixed(1),
        );

  const categoryDistribution = allowedCategories.map((category) => {
    const count = feedbackStore.filter((item) => item.category === category).length;

    return {
      category,
      count,
      percentage: totalFeedback === 0 ? 0 : Number(((count / totalFeedback) * 100).toFixed(1)),
    };
  });

  const ratingDistribution = [1, 2, 3, 4, 5].map((rating) => ({
    rating,
    count: feedbackStore.filter((item) => item.rating === rating).length,
  }));

  const recentSubmissions = feedbackStore.slice(0, 3).map((item) => ({
    id: item.id,
    category: item.category,
    comment: item.comment,
    rating: item.rating,
    status: item.status,
    user: item.user,
    createdAt: item.createdAt,
  }));

  return {
    overview: {
      totalFeedback,
      totalNew,
      totalInReview,
      totalResolved,
      totalArchived,
      averageRating,
    },
    categoryDistribution,
    ratingDistribution,
    recentSubmissions,
    trends: {
      todayCount: totalFeedback,
      yesterdayCount: 0,
      weeklyCount: totalFeedback,
      monthlyCount: totalFeedback,
    },
  };
}
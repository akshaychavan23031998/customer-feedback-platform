import { allowedCategories, allowedStatuses } from '../data/feedback.store.js';
import Feedback from '../models/Feedback.js';

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
  return String(value || '').trim();
}

function mapFeedbackDocument(document) {
  return {
    id: document._id.toString(),
    category: document.category,
    comment: document.comment,
    rating: document.rating,
    status: document.status,
    source: document.source,
    user: document.user,
    metadata: document.metadata,
    createdAt: document.createdAt,
    updatedAt: document.updatedAt,
  };
}

export async function createFeedback(payload, requestMetadata = {}) {
  const feedback = await Feedback.create({
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
  });

  return mapFeedbackDocument(feedback);
}

export async function getFeedbackList(query = {}) {
  const page = Math.max(Number(query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(query.limit) || 10, 1), 50);
  const search = normalizeText(query.search);
  const category = query.category || 'All';
  const status = query.status || 'All';
  const rating = query.rating || 'All';
  const sortBy = query.sortBy || 'latest';

  const mongoQuery = {};

  if (search) {
    mongoQuery.$or = [
      { comment: { $regex: search, $options: 'i' } },
      { category: { $regex: search, $options: 'i' } },
      { status: { $regex: search, $options: 'i' } },
      { 'user.name': { $regex: search, $options: 'i' } },
      { 'user.email': { $regex: search, $options: 'i' } },
    ];
  }

  if (category !== 'All' && allowedCategories.includes(category)) {
    mongoQuery.category = category;
  }

  if (status !== 'All' && allowedStatuses.includes(status)) {
    mongoQuery.status = status;
  }

  if (rating !== 'All') {
    mongoQuery.rating = Number(rating);
  }

  let sortOption = { createdAt: -1 };

  if (sortBy === 'oldest') {
    sortOption = { createdAt: 1 };
  }

  if (sortBy === 'highestRating') {
    sortOption = { rating: -1, createdAt: -1 };
  }

  if (sortBy === 'lowestRating') {
    sortOption = { rating: 1, createdAt: -1 };
  }

  const totalRecords = await Feedback.countDocuments(mongoQuery);

  const feedbackDocuments = await Feedback.find(mongoQuery)
    .sort(sortOption)
    .skip((page - 1) * limit)
    .limit(limit);

  return {
    data: feedbackDocuments.map(mapFeedbackDocument),
    pagination: getPaginationMetadata({
      page,
      limit,
      totalRecords,
    }),
  };
}

export async function getAnalyticsSummary() {
  const totalFeedback = await Feedback.countDocuments();

  const [totalNew, totalInReview, totalResolved, totalArchived] = await Promise.all([
    Feedback.countDocuments({ status: 'New' }),
    Feedback.countDocuments({ status: 'In Review' }),
    Feedback.countDocuments({ status: 'Resolved' }),
    Feedback.countDocuments({ status: 'Archived' }),
  ]);

  const ratingStats = await Feedback.aggregate([
    {
      $group: {
        _id: null,
        averageRating: { $avg: '$rating' },
      },
    },
  ]);

  const averageRating =
    ratingStats.length === 0
      ? 0
      : Number((ratingStats[0].averageRating || 0).toFixed(1));

  const categoryCounts = await Feedback.aggregate([
    {
      $group: {
        _id: '$category',
        count: { $sum: 1 },
      },
    },
  ]);

  const categoryCountMap = categoryCounts.reduce((accumulator, item) => {
    accumulator[item._id] = item.count;
    return accumulator;
  }, {});

  const categoryDistribution = allowedCategories.map((category) => {
    const count = categoryCountMap[category] || 0;

    return {
      category,
      count,
      percentage:
        totalFeedback === 0 ? 0 : Number(((count / totalFeedback) * 100).toFixed(1)),
    };
  });

  const ratingCounts = await Feedback.aggregate([
    {
      $group: {
        _id: '$rating',
        count: { $sum: 1 },
      },
    },
  ]);

  const ratingCountMap = ratingCounts.reduce((accumulator, item) => {
    accumulator[item._id] = item.count;
    return accumulator;
  }, {});

  const ratingDistribution = [1, 2, 3, 4, 5].map((ratingValue) => ({
    rating: ratingValue,
    count: ratingCountMap[ratingValue] || 0,
  }));

  const recentDocuments = await Feedback.find().sort({ createdAt: -1 }).limit(3);

  const recentSubmissions = recentDocuments.map((item) => ({
    id: item._id.toString(),
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
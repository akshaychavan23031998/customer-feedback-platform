import { getAnalyticsSummary } from '../services/feedback.service.js';

export function getAnalyticsSummaryController(req, res, next) {
  try {
    const analytics = getAnalyticsSummary();

    return res.status(200).json({
      success: true,
      message: 'Analytics summary fetched successfully.',
      data: analytics,
    });
  } catch (error) {
    return next(error);
  }
}
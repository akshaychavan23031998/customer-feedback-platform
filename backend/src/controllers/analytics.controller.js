import { getAnalyticsSummary } from '../services/feedback.service.js';

export async function getAnalyticsSummaryController(req, res, next) {
  try {
    const analytics = await getAnalyticsSummary();

    return res.status(200).json({
      success: true,
      message: 'Analytics summary fetched successfully.',
      data: analytics,
    });
  } catch (error) {
    return next(error);
  }
}
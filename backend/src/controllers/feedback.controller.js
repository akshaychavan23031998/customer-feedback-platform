import {
  createFeedback,
  getFeedbackList,
} from '../services/feedback.service.js';
import { validateCreateFeedbackPayload } from '../validators/feedback.validator.js';

export function createFeedbackController(req, res, next) {
  try {
    const validationErrors = validateCreateFeedbackPayload(req.body);

    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed.',
        errors: validationErrors,
      });
    }

    const feedback = createFeedback(req.body, {
      userAgent: req.get('user-agent'),
      ipAddress: req.ip,
    });

    return res.status(201).json({
      success: true,
      message: 'Feedback submitted successfully.',
      data: feedback,
    });
  } catch (error) {
    return next(error);
  }
}

export function getFeedbackListController(req, res, next) {
  try {
    const result = getFeedbackList(req.query);

    return res.status(200).json({
      success: true,
      message: 'Feedback fetched successfully.',
      data: result.data,
      pagination: result.pagination,
    });
  } catch (error) {
    return next(error);
  }
}
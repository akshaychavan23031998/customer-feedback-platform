import { Router } from 'express';

import {
  createFeedbackController,
  getFeedbackListController,
} from '../controllers/feedback.controller.js';
import { requireAdminAuth } from '../middlewares/auth.middleware.js';
import { feedbackRateLimiter } from '../middlewares/rateLimit.middleware.js';

const router = Router();

router.post('/', feedbackRateLimiter, createFeedbackController);
router.get('/', requireAdminAuth, getFeedbackListController);

export default router;
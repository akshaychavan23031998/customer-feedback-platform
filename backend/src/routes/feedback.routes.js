import { Router } from 'express';

import {
  createFeedbackController,
  getFeedbackListController,
} from '../controllers/feedback.controller.js';
import { requireAdminAuth } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/', createFeedbackController);
router.get('/', requireAdminAuth, getFeedbackListController);

export default router;
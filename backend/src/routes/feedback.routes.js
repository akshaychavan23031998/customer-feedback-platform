import { Router } from 'express';

import {
  createFeedbackController,
  getFeedbackListController,
} from '../controllers/feedback.controller.js';

const router = Router();

router.post('/', createFeedbackController);
router.get('/', getFeedbackListController);

export default router;
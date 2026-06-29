import { Router } from 'express';

import { getAnalyticsSummaryController } from '../controllers/analytics.controller.js';
import { requireAdminAuth } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/summary', requireAdminAuth, getAnalyticsSummaryController);

export default router;
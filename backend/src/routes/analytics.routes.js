import { Router } from 'express';

import { getAnalyticsSummaryController } from '../controllers/analytics.controller.js';

const router = Router();

router.get('/summary', getAnalyticsSummaryController);

export default router;
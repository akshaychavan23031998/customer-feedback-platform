import { Router } from 'express';

import { getAnalyticsSummaryController } from '../controllers/analytics.controller.js';
import { requireAdminAuth } from '../middlewares/auth.middleware.js';

const router = Router();

/**
 * @swagger
 * /analytics/summary:
 *   get:
 *     summary: Get analytics summary for admin dashboard
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Analytics summary fetched successfully
 *       401:
 *         description: Authentication token is required
 */
router.get('/summary', requireAdminAuth, getAnalyticsSummaryController);

export default router;
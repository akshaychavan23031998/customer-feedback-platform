import { Router } from 'express';

import { getHealthStatus } from '../controllers/health.controller.js';

const router = Router();

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Check API health status
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: API is healthy
 */
router.get('/', getHealthStatus);

export default router;
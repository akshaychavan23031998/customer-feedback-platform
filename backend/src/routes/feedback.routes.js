import { Router } from 'express';

import {
  createFeedbackController,
  getFeedbackListController,
} from '../controllers/feedback.controller.js';
import { requireAdminAuth } from '../middlewares/auth.middleware.js';

const router = Router();

/**
 * @swagger
 * /feedback:
 *   post:
 *     summary: Submit public feedback
 *     tags: [Feedback]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FeedbackRequest'
 *     responses:
 *       201:
 *         description: Feedback submitted successfully
 *       400:
 *         description: Validation failed
 */
router.post('/', createFeedbackController);

/**
 * @swagger
 * /feedback:
 *   get:
 *     summary: Get feedback list for admin dashboard
 *     tags: [Feedback]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search text
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Category filter
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Status filter
 *       - in: query
 *         name: rating
 *         schema:
 *           type: string
 *         description: Rating filter
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Sorting option
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Page size
 *     responses:
 *       200:
 *         description: Feedback fetched successfully
 *       401:
 *         description: Authentication token is required
 */
router.get('/', requireAdminAuth, getFeedbackListController);

export default router;
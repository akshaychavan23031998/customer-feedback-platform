import { Router } from 'express';

import {
  createFeedbackController,
  getFeedbackListController,
} from '../controllers/feedback.controller.js';
import { requireAdminAuth } from '../middlewares/auth.middleware.js';
import { feedbackRateLimiter } from '../middlewares/rateLimit.middleware.js';

const router = Router();

/**
 * @swagger
 * /feedback:
 *   post:
 *     summary: Submit public feedback
 *     description: Allows any user to submit feedback without authentication.
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
 *       429:
 *         description: Too many feedback submissions
 */
router.post('/', feedbackRateLimiter, createFeedbackController);

/**
 * @swagger
 * /feedback:
 *   get:
 *     summary: Get feedback list for admin dashboard
 *     description: Returns submitted feedback with search, filters, sorting, and pagination. Requires admin JWT token.
 *     tags: [Feedback]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by comment, category, status, user name, or email
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           enum:
 *             - All
 *             - Bug
 *             - Feature Request
 *             - UI/UX
 *             - Performance
 *             - Support
 *             - Billing
 *             - General
 *             - Other
 *         description: Category filter
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum:
 *             - All
 *             - New
 *             - In Review
 *             - Resolved
 *             - Archived
 *         description: Status filter
 *       - in: query
 *         name: rating
 *         schema:
 *           type: string
 *           example: All
 *         description: Rating filter. Use All or a rating from 1 to 5.
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum:
 *             - latest
 *             - oldest
 *             - highestRating
 *             - lowestRating
 *         description: Sorting option
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Number of records per page
 *     responses:
 *       200:
 *         description: Feedback fetched successfully
 *       401:
 *         description: Authentication token is required
 */
router.get('/', requireAdminAuth, getFeedbackListController);

export default router;
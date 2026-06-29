import { Router } from 'express';

import {
  loginAdminController,
  logoutAdminController,
} from '../controllers/auth.controller.js';
import { requireAdminAuth } from '../middlewares/auth.middleware.js';
import { authRateLimiter } from '../middlewares/rateLimit.middleware.js';

const router = Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login admin user
 *     description: Authenticates the admin user and returns a JWT token.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Email and password are required
 *       401:
 *         description: Invalid email or password
 *       429:
 *         description: Too many login attempts
 */
router.post('/login', authRateLimiter, loginAdminController);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout admin user
 *     description: Logs out the admin user. The frontend clears the stored JWT token after this call.
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 *       401:
 *         description: Authentication token is required or invalid
 */
router.post('/logout', requireAdminAuth, logoutAdminController);

export default router;
import { Router } from 'express';

import {
  loginAdminController,
  logoutAdminController,
} from '../controllers/auth.controller.js';
import { requireAdminAuth } from '../middlewares/auth.middleware.js';

const router = Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login admin user
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
 */
router.post('/login', loginAdminController);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout admin user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 *       401:
 *         description: Authentication token is required
 */
router.post('/logout', requireAdminAuth, logoutAdminController);

export default router;
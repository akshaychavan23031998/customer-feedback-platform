import { Router } from 'express';

import {
  loginAdminController,
  logoutAdminController,
} from '../controllers/auth.controller.js';
import { requireAdminAuth } from '../middlewares/auth.middleware.js';
import { authRateLimiter } from '../middlewares/rateLimit.middleware.js';

const router = Router();

router.post('/login', authRateLimiter, loginAdminController);
router.post('/logout', requireAdminAuth, logoutAdminController);

export default router;
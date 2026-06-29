import { Router } from 'express';

import {
  loginAdminController,
  logoutAdminController,
} from '../controllers/auth.controller.js';
import { requireAdminAuth } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/login', loginAdminController);
router.post('/logout', requireAdminAuth, logoutAdminController);

export default router;
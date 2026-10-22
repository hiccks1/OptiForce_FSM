import { Router } from 'express';
import { login, me, listDemoUsers } from '../controllers/auth';
import { attachCtx } from '../middleware/attachCtx';
import { requireDemoMode, requireStaff } from '../middleware/requireRole';
import { config } from '../config/env';

const router = Router();

router.post('/login', login);
router.get('/me', attachCtx, requireStaff(), me);
router.get('/users', requireDemoMode(config.demoMode), attachCtx, listDemoUsers);

export default router;

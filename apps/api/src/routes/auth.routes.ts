import { Router } from 'express';
import { login, me, listDemoUsers, inviteInfo, acceptInvite, customerLogin } from '../controllers/auth';
import { attachCtx } from '../middleware/attachCtx';
import { requireDemoMode, requireStaff } from '../middleware/requireRole';
import { config } from '../config/env';

const router = Router();

router.post('/login', login);
router.get('/me', attachCtx, requireStaff(), me);
router.get('/users', requireDemoMode(config.demoMode), attachCtx, listDemoUsers);

// Customer portal accounts (public: the invite token / password authenticates).
router.get('/invite', inviteInfo);
router.post('/invite/accept', acceptInvite);
router.post('/customer/login', customerLogin);

export default router;

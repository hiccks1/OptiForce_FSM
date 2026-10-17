import { Router } from 'express';
import authRoutes from './auth.routes';
import customersRoutes from './customers.routes';
import jobsRouter from './jobs.routes';
import documentsRouter from './documents.routes';
import portalRouter from './portal.routes';
import { attachCtx } from '../middleware/attachCtx';
import { requireStaff } from '../middleware/requireRole';

const router = Router();

router.use('/auth', authRoutes);
router.use('/customers', attachCtx, requireStaff(), customersRoutes);
router.use('/jobs', attachCtx, requireStaff(), jobsRouter);
router.use('/documents', attachCtx, requireStaff(), documentsRouter);
router.use('/portal', attachCtx, portalRouter);

export default router;

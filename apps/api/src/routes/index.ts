import { Router } from 'express';
import authRoutes from './auth.routes';
import customersRoutes from './customers.routes';
import jobsRouter from './jobs.routes';
import documentsRouter from './documents.routes';
import portalRouter from './portal.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/customers', customersRoutes);
router.use('/jobs', jobsRouter);
router.use('/documents', documentsRouter);
router.use('/portal', portalRouter);

export default router;

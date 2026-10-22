import { Router } from 'express';
import {
  portalConfig,
  portalUpcoming,
  createPortalLink,
  portalRescheduleVisit,
  portalCancelVisit,
} from '../controllers/portal';
import { requirePortalOrStaff, requireStaff } from '../middleware/requireRole';

const router = Router();

router.post('/links', requireStaff(['OWNER', 'ADMIN', 'MANAGER', 'CSR', 'FIELD']), createPortalLink);

router.use(requirePortalOrStaff);
router.get('/config', portalConfig);
router.get('/upcoming', portalUpcoming);
router.patch('/jobs/:jobId/visits/:visitId', portalRescheduleVisit);
router.delete('/jobs/:jobId/visits/:visitId', portalCancelVisit);

export default router;

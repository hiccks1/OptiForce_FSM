import { Router } from 'express';
import { portalConfig, portalUpcoming } from '../controllers/portal';

const router = Router();

router.get('/config', portalConfig);
router.get('/upcoming', portalUpcoming);

export default router;

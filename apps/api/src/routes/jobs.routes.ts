// apps/api/src/routes/jobs.routes.ts

export const DRIFTY_FILE_CONTRACT = {
  driftyVersion: "1.0.0",
  layers: ["L3_INTEGRATION"],
};


import { Router } from 'express';
import { calendarJobs } from '../controllers/jobs';
import {
  createJob,
  listJobs,
  getJobById,
  scheduleJob,
  updateJobStatus
} from '../controllers/jobs';

const router = Router();

router.post('/', createJob);
router.get('/', listJobs);
router.get('/calendar', calendarJobs);
router.get('/:id', getJobById);
router.patch('/:id/schedule', scheduleJob);
router.patch('/:id/status', updateJobStatus);

export default router;

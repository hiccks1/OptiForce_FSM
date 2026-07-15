import { Router } from 'express';
import {
  listJobs,
  getJobById,
  createJob,
  calendarJobs,
  addVisit,
  updateVisit,
  cancelVisit,
} from '../controllers/jobs';

const router = Router();

router.get('/', listJobs);
router.post('/', createJob);
router.get('/calendar', calendarJobs);
router.get('/:id', getJobById);
router.post('/:jobId/visits', addVisit);
router.patch('/:jobId/visits/:visitId', updateVisit);
router.delete('/:jobId/visits/:visitId', cancelVisit);

export default router;

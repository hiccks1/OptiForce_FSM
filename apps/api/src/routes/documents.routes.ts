import { Router } from 'express';
import { listDocuments } from '../controllers/documents';

const router = Router();

router.get('/', listDocuments);

export default router;

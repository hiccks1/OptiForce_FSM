import { Router } from 'express';
import { login, me } from '../controllers/auth';

const router = Router();

router.post('/login', login);
router.get('/users', me);

export default router;

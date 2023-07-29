// backend/main-api/src/routes/UserRoutes.ts
import express from 'express';
import { createUser, login } from '../controllers/UserController';

const router = express.Router();

router.post('/api/users', createUser);
router.post('/api/login', login);

export default router;

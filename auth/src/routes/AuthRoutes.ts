// backend/auth-service/src/routes/AuthRoutes.ts
import express from 'express';
import { login } from '../controllers/AuthController';

const router = express.Router();

router.post('/api/login', login);

export default router;

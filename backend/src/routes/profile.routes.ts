import express from 'express'
import ProfileController from '../controllers/profile.controller'
import { authMiddleware } from '../middleware/auth.middleware'

const router = express.Router();

router.get('/', authMiddleware,ProfileController.index);
router.put('/', authMiddleware,ProfileController.update);

export default router;
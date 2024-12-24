import express from 'express';
import AttendanceController from '../controllers/attendance.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import fileUploadMiddleware from '../middleware/file-upload.middleware';

const router = express.Router();

router.post('/submit', authMiddleware,fileUploadMiddleware('photo','attendance'), AttendanceController.submit);
router.get('/report',authMiddleware, AttendanceController.report)
export default router;
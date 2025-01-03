import { Request, Response } from 'express';
import { ApiResponse } from '../types/common';
import { AttendanceRequest } from '../dtos/attendance-request.dto';
import { AttendanceService } from '../service/attendance.service';

class AttendanceController {
    public async submit(
        req: Request<{}, ApiResponse>,
        res: Response<ApiResponse>
    ): Promise<any> {
        try {
            const { latitude, longitude, type} = req.body;
            
            if (!req.file?.path || !latitude || !longitude) {
                throw new Error("Missing required fields: photo, latitude, and longitude are required")
            }

            const data: AttendanceRequest = {
                ...req.body,
                user_id: req.user.id,
                ip: req.ip!,
                photo: req.file.path,
                timestamp: new Date().toISOString()
            }
            let result = null
            if(type == 'in'){
                result = await AttendanceService.clockIn(data);
            } else {
                result = await AttendanceService.clockOut(data);
            }

            return res.status(200).json({
                success: true,
                message: 'Success',
                data: result
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Failed'
            });
        }
    }

    public async report(
        req: Request<{}, ApiResponse>,
        res: Response<ApiResponse>
    ): Promise<any> {
        try {
            const timezone = typeof req.query.timezone == 'string' ? req.query.timezone : 'UTC'

            const result = await AttendanceService.report(timezone, req.user.id);

            return res.status(200).json({
                success: true,
                message: 'Success',
                data: result
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Failed'
            });
        }
    }

    public async todayAttendance(
        req: Request<{}, ApiResponse>,
        res: Response<ApiResponse>
    ): Promise<any> {
        try {
            
            const result = await AttendanceService.todayAttendance(req.user.id);

            return res.status(200).json({
                success: true,
                message: 'Success',
                data: result
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Failed'
            });
        }
    }

}

export default new AttendanceController;
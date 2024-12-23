import { Request, RequestHandler, Response } from 'express';
import { ProfileService } from '../service/profile.service';
import { ApiResponse } from '../types/common';
class ProfileController {
    public async index(
        req: Request<{}, ApiResponse>,
        res: Response<ApiResponse>
    ): Promise<any> {
        try {
            const result = await ProfileService.getUser(req.user.email);

            return res.status(200).json({
                success: true,
                message: 'Successfully processed',
                data: result
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Error'
            });
        }
    }

    public async update(
        req: Request<{}, ApiResponse>,
        res: Response<ApiResponse>
    ): Promise<any> {
        try {
            const email = req.user.email
            const user = await ProfileService.getUser(email)

            const result = await ProfileService.update(user, req.body)
            
            return res.status(200).json({
                success: true,
                message: 'Successfully processed',
                data: result
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Error'
            });
        }
    }

}

export default new ProfileController;
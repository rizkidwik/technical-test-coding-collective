import { Request, RequestHandler, Response } from 'express';
import { AuthService } from '../service/auth.service';
import { ApiResponse } from '../types/common';
import { Role } from '../dtos/create-user.dto';
interface RegisterRequest {
    email: string;
    password: string;
    name?: string;
    roles?: Role;
}

interface LoginRequest {
    email: string;
    password: string;
}

interface AuthRequest {
    id: number;
    token: string;
}
class AuthController {
    public async register(
        req: Request<{}, ApiResponse, RegisterRequest>,
        res: Response<ApiResponse>
    ): Promise<any> {
        try {
            const { email, password, name, roles }  = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Email and password are required'
                });
            }

            const result = await AuthService.register({email, password, name, roles});

            return res.status(201).json({
                success: true,
                message: 'User registered successfully',
                data: result
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Registration failed'
            });
        }
    }

    public async login(
        req: Request<{}, ApiResponse, LoginRequest>,
        res: Response<ApiResponse>
    ): Promise<any> {
        try {
            const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }

        const result = await AuthService.login(email, password);

        return res.status(200).json({
            success: true,
            message: 'Login Successfully',
            data: result
        });
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: error instanceof Error ? error.message : 'Login failed'
            });
        
        }
    }

    public async me(
        req: Request<{}, ApiResponse,{}>,
        res: Response<ApiResponse>
    ): Promise<any> {
        try {

        return res.status(200).json({
            success: true,
            message: 'Data fetched Successfully',
            data: req.user
        });
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: error instanceof Error ? error.message : 'Data fetch failed'
            });
        
        }
    }
}

export default new AuthController;
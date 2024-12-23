import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt.util";
import { CreateUserDTO, Role } from "../dtos/create-user.dto";
import User from "../models/user";

export class AuthService {
    static async register(userData: CreateUserDTO){
        const existingUser = await User.findOne({
            where: {
                email: userData.email
            }
        });

        if(existingUser){
            throw new Error('User already exists');
        }

        const hashedPassword = await bcrypt.hash(userData.password, 10)
        const roles = userData.roles ?? Role.USER
        const newUser = {
            ...userData,
            password: hashedPassword,
            roles
        };

        const user = await User.create(newUser);
        const token = generateToken({id: user.id, email: userData.email})

        return { user, token };
    }

    static async login(email:string, password: string){
        const user = await User.findOne({
            where: {
                email: email
            }
        });

        if(!user){
            throw new Error('Invalid credentials');
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if(!isValidPassword){
            throw new Error('Invalid credentials');
        }

        const token = generateToken({id: user.id, email: user.email});
        return { user: user, token};
    }
}
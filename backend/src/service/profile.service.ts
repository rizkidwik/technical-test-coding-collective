import { UpdateProfileDTO } from "../dtos/update-profile.dto";
import User from "../models/user";
import bcrypt from "bcryptjs";


export class ProfileService {
    static async getUser(email: string){
        const user = await User.findOne({
            where: {
                email: email
            },
            attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
        });

        if(!user){
            throw new Error('User not found');
        }


        return user;
    }

    static async update(user: User, data: UpdateProfileDTO){
        if (data.name) {
            user.name = data.name;
        }

        if (data.email) {
            const existingUser = await User.findOne({
                where: {
                    email: data.email
                }
            });
    
            if(existingUser){
                throw new Error('Email is already exists');
            }

            user.email = data.email;
        }

        if (data.password) {
            user.password = await bcrypt.hash(data.password, 10);
        }

        await user.save();

        return user.dataValues;
    }

}
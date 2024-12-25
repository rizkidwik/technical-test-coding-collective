import moment from "moment-timezone";
import { AttendanceRequest } from "../dtos/attendance-request.dto";
import Attendance from "../models/attendance";

import dotenv from "dotenv"
import { Op } from "sequelize";

dotenv.config()

export class AttendanceService {
    static async clockIn(data: AttendanceRequest){
        const attendanceExist = await Attendance.findOne({
            where: {
                user_id: data.user_id,
                clock_out: null
            }
        })
        
        if(attendanceExist){
            throw Error('Already have an active attendance')
        }

        const attendance = await Attendance.create({
            user_id: data.user_id,
            clock_in: data.timestamp,
            clock_in_location: '(' + data.latitude + ',' + data.longitude + ')',
            clock_in_ip: data.ip,
            clock_in_photo: data.photo
        });

        return attendance;
    }

    static async clockOut(data: AttendanceRequest){
        const attendance = await Attendance.findOne({
            where: {
                user_id: data.user_id,
                clock_out: null
            }
        })
        
        if(!attendance){
            throw Error('Attendance not found.')
        }

        await attendance.update({
            clock_out: data.timestamp,
            clock_out_location: '(' + data.latitude + ',' + data.longitude + ')',
            clock_out_ip: data.ip,
            clock_out_photo: data.photo
        });

        return attendance;
    }

    static async report(timezone: string, user_id: number){
        const report = await Attendance.findAll({
            where: {
                user_id: user_id
            }
        })
        const baseUrl = process.env.BASE_URL

        const reportMap = report.map(item => ({
            ...item.get(),
            clock_in: moment(item.clock_in).tz(timezone).format('YYYY-MM-DD HH:mm'),
            clock_in_photo: `${baseUrl}/${item.clock_in_photo}`,
            clock_out: moment(item.clock_out).tz(timezone).format('YYYY-MM-DD HH:mm'),
            clock_out_photo: `${baseUrl}/${item.clock_out_photo}`,
        }))
        

        return reportMap
    }

    static async todayAttendance(user_id: number){
        const today = new Date()

        const attendance = await Attendance.findOne({
            where: {
                user_id: user_id,
                createdAt: {
                    [Op.between]: [today.setHours(0,0,0,0), today.setHours(23,59,59,59)]
                }
            }
        })

        return attendance
    }
}
import moment from "moment-timezone";
import { AttendanceRequest } from "../dtos/attendance-request.dto";
import Attendance from "../models/attendance";

export class AttendanceService {
    static async submit(data: AttendanceRequest){
        const attendance = await Attendance.create(data as any);

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
            photo: `${baseUrl}/${item.photo}`,
            timestamp: moment(item.timestamp).tz(timezone).format('YYYY-MM-DD HH:mm'),
        }))
        

        return reportMap
    }

}
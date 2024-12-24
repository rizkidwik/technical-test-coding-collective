import { AttendanceRequest } from "../dtos/attendance-request.dto";
import Attendance from "../models/attendance";

export class AttendanceService {
    static async submit(data: AttendanceRequest){
        const attendance = await Attendance.create(data as any);

        return attendance;
    }

}
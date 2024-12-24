export interface AttendanceRequest {
    latitude: string;
    longitude: string;
    ip: string;
    photo: string | null;
    timestamp: string;
}
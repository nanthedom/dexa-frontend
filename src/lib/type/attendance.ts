import type { GeneralListResponse, GeneralResponse } from "./general-response"

export interface Attendance {
    id: string
    userId: string
    workdayId: string
    checkInAt: string
    checkOutAt: string
    checkInPhoto: string
    checkOutPhoto: string
    notes: string
    createdAt: string
    updatedAt: string
}

export interface Workday {
    id: string
    startTime: string
    endTime: string
}

export interface Window {
    checkInOpenTime: string
    checkInCloseTime: string
    checkOutOpenTime: string
    checkOutCloseTime: string
}

export interface TodayStatus {
    isWorkday: boolean
    workday: Workday
    attendance: Attendance
    window: Window
    canCheckIn: boolean
    canCheckOut: boolean
}

export interface DetailWorkday extends Workday {
    date: string;
}

export interface ListAttendance extends Attendance {
    workday: DetailWorkday
    user: {
        fullName: string
        department: string
    }
}

export interface DetailAttendance extends Attendance {
    user: {
        id: string
        fullName: string
        email: string
        department: string
        position: string
    };
    workday: DetailWorkday
}

export interface AttendanceListParams {
    page?: number
    limit?: number
    userId?: string | null
    q?: string
    startDate?: string
    endDate?: string
}

export type TodayStatusResponse = GeneralResponse<TodayStatus>

export type AttendanceResponse = GeneralResponse<Attendance>

export type AttendanceListResponse = GeneralListResponse<ListAttendance>

export type DetailAttendanceResponse = GeneralResponse<DetailAttendance>;

export type AttendanceStatus =
    | "not-open"
    | "open"
    | "checked-in"
    | "completed"
    | "missed"

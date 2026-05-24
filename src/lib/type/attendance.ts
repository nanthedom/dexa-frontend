import type { GeneralResponse } from "./general-response"

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
    isWorkday: boolean,
    workday: Workday,
    attendance: Attendance,
    window: Window,
    canCheckIn: boolean,
    canCheckOut: boolean
}

export type TodayStatusResponse = GeneralResponse<TodayStatus>

export type AttendanceResponse = GeneralResponse<Attendance>

export type AttendanceStatus =
    | "not-open"
    | "open"
    | "checked-in"
    | "completed"
    | "missed"

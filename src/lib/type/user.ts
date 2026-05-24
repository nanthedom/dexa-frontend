import type { GeneralResponse } from "./general-response"

export interface ProfileData {
    userId: string
    email: string
    employeeCode: string
    fullName: string
    role: string
    department: string
    position: string
}

export type ProfileResponse = GeneralResponse<ProfileData>

import type { GeneralListResponse, GeneralResponse } from "./general-response"

export interface User {
    email: string
    employeeCode: string
    fullName: string
    role: string
    department: string
    position: string
}

export interface ProfileData extends User {
    userId: string
}

export interface UserData extends User {
    id: string
    createdAt: string
    updatedAt: string
}

export interface UserListParams {
    page?: number;
    limit?: number;
    q?: string | null;
}

export type ProfileResponse = GeneralResponse<ProfileData>

export type UserResponse = GeneralResponse<UserData>

export type UserListResponse = GeneralListResponse<UserData>

import { GeneralResponse } from "./general-response"

export interface LoginRequest {
    email: string
    password: string
}

export interface LoginResponseData {
    access_token: string
    user: {
        userId: string,
        email: string,
        fullName: string,
        role: string
    }
}

export type LoginResponse = GeneralResponse<LoginResponseData>

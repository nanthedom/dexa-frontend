import axios, { type AxiosError } from "axios"
import { clearSession, getToken, LOGIN_PATH } from "@/lib/session"
import type { ErrorResponse } from "@/lib/type/general-response"

const UNAUTHORIZED_STATUSES = [401] as const
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const apiConfig = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
})

apiConfig.interceptors.request.use((config) => {
    config.headers = config.headers ?? {}
    if (typeof window !== "undefined") {
        const token = getToken()
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
    }
    return config
})

apiConfig.interceptors.response.use(
    (response) => response,
    (error: AxiosError<ErrorResponse>) => {
        const status = error.response?.status

        if (status && UNAUTHORIZED_STATUSES.includes(status as 401) && window.location.pathname !== LOGIN_PATH) {
            clearSession()
            if (typeof window !== "undefined") {
                window.location.href = LOGIN_PATH
            }
            return Promise.reject(new Error(status === 401 ? "Unauthorized" : "Forbidden"))
        }

        if (status === 500) return Promise.reject(new Error("Something went wrong on our server. Please try again in a few moments."))

        const errorData = error.response?.data
        if (errorData?.message) return Promise.reject(new Error(errorData.message))

        return Promise.reject(new Error("An error occurred"))
    }
)

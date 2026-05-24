import { apiConfig as api } from "@/lib/axios"
import { setSession } from "@/lib/session"
import type { LoginRequest, LoginResponse, LoginResponseData } from "@/lib/type/auth"

export const authApi = {
    async login(credentials: LoginRequest): Promise<LoginResponseData> {
        const { data } = await api.post<LoginResponse>("/auth/login", credentials)

        const payload = data?.data
        if (payload?.access_token && payload?.user) {
            setSession(payload.access_token, payload.user.userId)
        }

        return payload as LoginResponseData
    }
}

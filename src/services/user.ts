import { apiConfig as api } from "@/lib/axios"
import type { ProfileResponse, ProfileData } from "@/lib/type/user"

export const userApi = {
    async getProfile(): Promise<ProfileData> {
        const { data } = await api.get<ProfileResponse>("/auth/profile")
        return data?.data as ProfileData
    },
}

import { apiConfig as api } from "@/lib/axios"
import { GeneralResponse } from "@/lib/type/general-response"
import type { ProfileResponse, User, UserListParams, UserListResponse, UserResponse } from "@/lib/type/user"

export const userApi = {
    async getProfile(): Promise<ProfileResponse> {
        const { data } = await api.get<ProfileResponse>("/auth/profile")
        return data
    },

    async create(payload: User,): Promise<UserResponse> {
        const { data } = await api.post<UserResponse>("/users", payload)
        return data
    },

    async update(id: string, payload: User): Promise<UserResponse> {
        const { data } = await api.patch<UserResponse>(`/users/${id}`, payload)
        return data
    },

    async getList(params: UserListParams): Promise<UserListResponse> {
        const { data } = await api.get<UserListResponse>("/users", { params });
        return data;
    },

    async getDetail(id: string): Promise<UserResponse> {
        const { data } = await api.get<UserResponse>(`/users/${id}`);
        return data;
    },

    async delete(id: string): Promise<GeneralResponse<{ message: string }>> {
        const { data } = await api.delete<GeneralResponse<{ message: string }>>(`/users/${id}`);
        return data;
    },
}

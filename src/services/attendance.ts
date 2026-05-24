import { AttendanceListParams, AttendanceListResponse, AttendanceResponse, DetailAttendanceResponse, TodayStatusResponse } from "@/lib/type/attendance"
import { apiConfig as api } from "@/lib/axios"

export const attendanceApi = {
    async todayStatus(): Promise<TodayStatusResponse> {
        const { data } = await api.get<TodayStatusResponse>("/attendances/today-status")
        return data;
    },

    async checkIn(payload: { photo: File, notes?: string }): Promise<AttendanceResponse> {
        const formData = new FormData();
        formData.append("photo", payload.photo);
        if (payload.notes) formData.append("notes", payload.notes);

        const { data } = await api.post<AttendanceResponse>("/attendances/check-in", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return data;
    },

    async checkOut(payload: { photo: File, notes?: string }): Promise<AttendanceResponse> {
        const formData = new FormData();
        formData.append("photo", payload.photo);
        if (payload.notes) formData.append("notes", payload.notes);

        const { data } = await api.post<AttendanceResponse>("/attendances/check-out", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return data;
    },

    async getList(params: AttendanceListParams): Promise<AttendanceListResponse> {
        const { data } = await api.get<AttendanceListResponse>("/attendances", { params });
        return data;
    },

    async getDetail(id: string): Promise<DetailAttendanceResponse> {
        const { data } = await api.get<DetailAttendanceResponse>(`/attendances/${id}`);
        return data;
    },
}

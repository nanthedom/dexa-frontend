import { AttendanceResponse, TodayStatusResponse } from "@/lib/type/attendance"
import { apiConfig as api } from "@/lib/axios"

export const attendanceApi = {
    async todayStatus(): Promise<TodayStatusResponse> {
        const { data } = await api.get<TodayStatusResponse>("/attendances/today-status")
        return data as TodayStatusResponse
    },

    async checkIn(payload: { photo: File, notes?: string }): Promise<AttendanceResponse> {
        const formData = new FormData();
        formData.append("photo", payload.photo);
        if (payload.notes) formData.append("notes", payload.notes);

        const { data } = await api.post<AttendanceResponse>("/attendances/check-in", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return data as AttendanceResponse;
    },

    async checkOut(payload: { photo: File, notes?: string }): Promise<AttendanceResponse> {
        const formData = new FormData();
        formData.append("photo", payload.photo);
        if (payload.notes) formData.append("notes", payload.notes);

        const { data } = await api.post<AttendanceResponse>("/attendances/check-out", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return data as AttendanceResponse;
    },
}

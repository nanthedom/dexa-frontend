import { AttendanceListParams } from "./type/attendance";

export const queryKeys = {
    users: {
        profile: ["auth", "profile"] as const,
    },
    attendances: {
        todayStatus: ["attendances", "today-status"] as const,
        list: (params: AttendanceListParams) =>
            ["attendances", "list", params] as const,
        detail: (params: string) =>
            ["attendances", "detail", params] as const,
    },
}

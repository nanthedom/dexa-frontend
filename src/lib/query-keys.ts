import { AttendanceListParams } from "./type/attendance";
import { UserListParams } from "./type/user";

export const queryKeys = {
    users: {
        profile: ["auth", "profile"] as const,
        list: (params: UserListParams) =>
            ["users", "list", params] as const,
        detail: (params: string) =>
            ["users", "detail", params] as const,
    },
    attendances: {
        todayStatus: ["attendances", "today-status"] as const,
        list: (params: AttendanceListParams) =>
            ["attendances", "list", params] as const,
        detail: (params: string) =>
            ["attendances", "detail", params] as const,
    },
}

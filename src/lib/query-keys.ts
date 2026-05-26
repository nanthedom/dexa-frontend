import { AttendanceListParams } from "./type/attendance";
import { UserListParams } from "./type/user";

export const queryKeys = {
    users: {
        profile: ["auth", "profile"] as const,
        list: (params: UserListParams) =>
            ["users", "list", params] as const,
        detail: (id: string) =>
            ["users", "detail", id] as const,
    },
    attendances: {
        todayStatus: ["attendances", "today-status"] as const,
        monitorEmployee: (id:string, params: AttendanceListParams) =>
            ["attendances", "monitor-employee", id, params] as const,
        list: (params: AttendanceListParams) =>
            ["attendances", "list", params] as const,
        detail: (id: string) =>
            ["attendances", "detail", id] as const,
    },
}

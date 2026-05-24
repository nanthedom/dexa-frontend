export const queryKeys = {
    users: {
        profile: ["auth", "profile"] as const,
    },
    attendances: {
        todayStatus: ["attendances", "today-status"] as const,
    },
}
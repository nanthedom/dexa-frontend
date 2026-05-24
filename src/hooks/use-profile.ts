"use client"

import { useQuery } from "@tanstack/react-query"
import { getToken } from "@/lib/session"
import { queryKeys } from "@/lib/query-keys"
import { userApi } from "@/services/user"

export function useProfile() {
    return useQuery({
        queryKey: queryKeys.user.profile,
        queryFn: () => userApi.getProfile(),
        enabled: typeof window !== "undefined" && !!getToken(),
    })
}

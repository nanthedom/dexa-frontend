"use client"

import { useQuery } from "@tanstack/react-query"
import { getToken } from "@/lib/session"
import { queryKeys } from "@/lib/query-keys"
import { userApi } from "@/services/user"

export function useProfile() {
    const query = useQuery({
        queryKey: queryKeys.users.profile,
        queryFn: () => userApi.getProfile(),
        enabled: typeof window !== "undefined" && !!getToken(),
    })

    const data = query.data?.data ?? null;

    return {
        ...query,
        data,
    };
}

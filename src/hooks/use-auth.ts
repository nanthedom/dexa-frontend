"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { authApi } from "@/services/auth"
import { queryKeys } from "@/lib/query-keys"
import { LOGIN_PATH } from "@/lib/session"

export function useAuth() {
    const router = useRouter()
    const queryClient = useQueryClient()

    const loginMutation = useMutation({
        mutationFn: (credentials: { email: string; password: string }) =>
            authApi.login(credentials),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.users.profile })
            router.push("/")
        },
    })

    const logout = () => {
        localStorage.removeItem("bearerToken")
        localStorage.removeItem("userId")
        router.push(LOGIN_PATH)
    }

    return {
        login: loginMutation.mutateAsync,
        loginMutation,
        logout,
    }
}

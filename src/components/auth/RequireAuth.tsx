"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { getToken, clearSession, LOGIN_PATH } from "@/lib/session"
import { useProfile } from "@/hooks/use-profile"

export function RequireAuth({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const { data: profile, isError: profileError } = useProfile()

    const token = typeof window !== "undefined" ? getToken() : null
    const isTokenValid = !!token?.trim()

    useEffect(() => {
        if (typeof window === "undefined") return

        if (!isTokenValid) {
            router.replace(LOGIN_PATH)
            return
        }

        if (profileError && !profile) {
            clearSession()
            router.replace(LOGIN_PATH)
        }
    }, [profileError, profile, isTokenValid, router])

    if (profile && isTokenValid) return <>{children}</>

    return (
        <div className="flex flex-col gap-8 py-4 px-8 shadow-none w-full">
            <div className="h-[200px] bg-muted animate-pulse rounded-[12px] w-full" />
            <div className="h-[200px] bg-muted animate-pulse rounded-[12px] w-full" />
        </div>
    )
}

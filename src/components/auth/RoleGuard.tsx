"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { clearSession, getToken, LOGIN_PATH } from "@/lib/session"
import { useProfile } from "@/hooks/use-profile"

interface RoleGuardProps {
    children: React.ReactNode,
    allowedRoles: string[],
    redirectTo?: string
}

export function RoleGuard({ children, allowedRoles, redirectTo = "/" }: RoleGuardProps) {
    const router = useRouter()

    const { data: profile, isError: profileError } = useProfile()

    const token = typeof window !== "undefined" ? getToken() : null

    const isTokenValid = !!token?.trim()

    useEffect(() => {
        if (typeof window === "undefined") return

        // no token
        if (!isTokenValid) {
            router.replace(LOGIN_PATH)
            return
        }

        // invalid profile / token expired
        if (profileError && !profile) {
            clearSession()
            router.replace(LOGIN_PATH)
            return
        }

        // role not allowed
        if (profile && !allowedRoles.includes(profile.role)) router.replace(redirectTo)
    }, [profile, profileError, isTokenValid, allowedRoles, redirectTo, router])

    const isAuthorized = profile && allowedRoles.includes(profile.role)

    if (isAuthorized && isTokenValid) return <>{children}</>

    return (
        <div className="flex w-full flex-col gap-8 px-8 py-4">
            <div className="h-[200px] w-full animate-pulse rounded-[12px] bg-muted" />
            <div className="h-[200px] w-full animate-pulse rounded-[12px] bg-muted" />
        </div>
    )
}

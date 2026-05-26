export const LOGIN_PATH = '/login' as const
export const TOKEN_KEY = 'bearerToken'
export const USER_ID_KEY = 'userId'

export function getToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(TOKEN_KEY)
}

export function getUserId(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(USER_ID_KEY)
}

export function setSession(token: string, userId: string): void {
    if (typeof window === 'undefined') return
    localStorage.setItem(TOKEN_KEY, token)
    localStorage.setItem(USER_ID_KEY, userId)
}

export function clearSession(): void {
    if (typeof window === 'undefined') return
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_ID_KEY)
}

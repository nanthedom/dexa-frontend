"use client"

import { useState } from "react"
import { toast } from "sonner"
import { useAuth } from "@/hooks/use-auth"

export function useLogin() {
    const { login, loginMutation } = useAuth()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const isLoading = loginMutation.isPending

    const validateEmail = (emailValue: string) => {
        if (!emailValue.trim()) {
            setError("Please enter your email")
            return false
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(emailValue)) {
            setError("Please enter a valid email address (e.g. name@example.com)")
            return false
        }
        return true
    }

    const validatePassword = (passwordValue: string) => {
        if (!passwordValue.trim()) {
            setError("Please enter your password")
            return false
        }
        if (passwordValue.length < 8) {
            setError("Password must be at least 8 characters long")
            return false
        }
        return true
    }

    const validateForm = () => {
        if (!email.trim() || !password.trim()) {
            setError("Please enter both email and password")
            return false
        }
        if (!validateEmail(email)) return false
        if (!validatePassword(password)) return false
        return true
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        try {
            if (!validateForm()) return
            await login({ email: email.trim(), password })
            toast.success("Login successful")
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Something went wrong on our server. Please try again in a few moments.")
        }
    }

    const dismissError = () => setError(null)

    return {
        email,
        setEmail,
        password,
        setPassword,
        showPassword,
        setShowPassword,
        isLoading,
        handleLogin,
        error,
        dismissError,
    }
}

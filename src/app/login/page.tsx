"use client";

import { Eye, EyeOff, Info, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/hooks/use-login";
import { useEffect } from "react";
import { getToken } from "@/lib/session";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const {
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
  } = useLogin()

  const router = useRouter()

  useEffect(() => {
    if (typeof window !== "undefined" && getToken()) router.replace("/")
  }, [router])

  return (
    <div className="h-screen bg-primary-foreground flex flex-col p-10 min-w-0">
      <div className="flex-1 min-h-0 min-w-0 grid grid-cols-1 min-[768px]:grid-cols-[minmax(334px,1fr)_minmax(334px,1fr)] gap-6">
        {/* Left panel */}
        <div className="hidden min-[768px]:flex min-w-0 p-10 flex-col items-center justify-center min-h-full gap-5">
          <h1 className="text-center text-[37px] font-orbitron font-bold text-foreground">
            Dexa Attendance
          </h1>
          <p className="text-center text-muted-foreground text-[16px] italic">
            Manage employee attendance seamlessly.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-card/80 min-w-0 rounded-[24px] border p-10 flex flex-col justify-center min-h-full gap-8">
          <div className="flex flex-col gap-2 items-center">
            <h2 className="text-[24px] text-center font-semibold text-foreground">
              Login to Your Account
            </h2>
            <p className="text-center text-muted-foreground text-[16px]">
              Enter your credentials to continue using Dexa Attendance.
            </p>
          </div>

          {error && (
            <div className="flex items-center gap-3 rounded-[12px] border border-red-500 bg-red-50 px-4 py-2 rounded-[12px]">
              <Info className="h-5 w-5 shrink-0 text-red-600" />

              <p className="flex-1 text-red-600 text-[14px] font-medium">
                {error}
              </p>

              <button
                type="button"
                onClick={dismissError}
                className="shrink-0 text-amber-700 hover:text-amber-900 rounded p-1 flex items-center justify-center"
                aria-label="Dismiss"
              >
                <X className="h-5 w-5 text-red-600 cursor-pointer" />
              </button>
            </div>
          )}

          <form
            onSubmit={handleLogin}
            className="space-y-6"
          >
            {/* IDENTIFIER */}
            <div className="space-y-2">
              <Label htmlFor="identifier">
                Email
              </Label>

              <Input
                id="identifier"
                type="text"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                disabled={isLoading}
                className="h-12 rounded-xl"
              />
            </div>

            {/* PASSWORD */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">
                  Password
                </Label>
              </div>

              <div className="relative">
                <Input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  disabled={isLoading}
                  className="h-12 rounded-xl pr-12"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-foreground cursor-pointer"
                >
                  {showPassword ? (
                    <Eye className="h-5 w-5" />
                  ) : (
                    <EyeOff className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* SUBMIT */}
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-primary h-12 w-full rounded-xl text-base font-semibold cursor-pointer"
            >
              {isLoading
                ? "Signing in..."
                : "Login"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

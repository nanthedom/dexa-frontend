"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      console.log({
        identifier,
        password,
      });

      // TODO:
      // integrate login API here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen bg-primary-foreground flex flex-col p-10 min-w-0">
      <div className="flex-1 min-h-0 min-w-0 grid grid-cols-1 min-[768px]:grid-cols-[minmax(334px,1fr)_minmax(334px,1fr)] gap-6">
        {/* Left panel */}
        <div className="hidden min-[768px]:flex min-w-0 p-10 flex-col items-center justify-center min-h-full gap-5">
          <h1 className="text-[37px] font-orbitron font-bold text-foreground">
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
                value={identifier}
                onChange={(e) =>
                  setIdentifier(e.target.value)
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
              className="h-12 w-full rounded-xl text-base font-semibold cursor-pointer"
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

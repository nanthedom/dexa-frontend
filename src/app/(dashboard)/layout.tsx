"use client";

import type React from "react";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { Header } from "@/components/layout/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <RequireAuth>
        <div className="min-h-screen bg-zinc-100">
          <main className="mx-auto flex max-w-7xl flex-col gap-6 p-4 md:p-6">
            {children}
          </main>
        </div>
      </RequireAuth>
    </>
  );
}

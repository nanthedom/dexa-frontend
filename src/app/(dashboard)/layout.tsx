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
        {children}
      </RequireAuth>
    </>
  );
}

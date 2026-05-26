"use client";

import type React from "react";
import { RoleGuard } from "@/components/auth/RoleGuard";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <RoleGuard allowedRoles={["HRD"]}>
            {children}
        </RoleGuard>
    );
}

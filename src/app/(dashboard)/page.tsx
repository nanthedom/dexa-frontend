"use client";

import { Profile } from "@/components/user/Profile";
import { Stats } from "@/components/attendance/Stats";
import { AttendanceActivity } from "@/components/attendance/AttendanceActivity";
import { getUserId } from "@/lib/session";

export default function DashboardPage() {
    const userId = getUserId()
    if (!userId) return

    return (
        <>
            <Profile />

            <Stats />

            <AttendanceActivity
                userId={userId}
                isMonitor={false}
            />

        </>
    );
}

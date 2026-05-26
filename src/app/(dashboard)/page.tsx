"use client";

import { Profile } from "@/components/user/Profile";
import { Stats } from "@/components/attendance/Stats";
import { HistoryAttendance } from "@/components/attendance/HistoryAttendance";

export default function DashboardPage() {

    return (
        <>
            <Profile />

            <Stats />

            <HistoryAttendance />

        </>
    );
}

"use client";

import { Profile } from "@/components/user/Profile";
import { Stats } from "@/components/attendance/Stats";
import { AttendanceList } from "@/components/attendance/AttendanceList";

export default function DashboardPage() {

    return (
        <>
            <Profile />

            <Stats />

            <AttendanceList />

        </>
    );
}

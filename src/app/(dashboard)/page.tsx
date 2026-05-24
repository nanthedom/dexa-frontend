"use client";

import { Profile } from "@/components/user/Profile";
import { Stats } from "@/components/attendance/Stats";
import { AttendanceList } from "@/components/attendance/AttendanceList";

export default function DashboardPage() {

    return (
        <div className="min-h-screen bg-zinc-100">
            <main className="mx-auto flex max-w-7xl flex-col gap-6 p-4 md:p-6">
                <Profile />

                <Stats />

                <AttendanceList />

            </main>
        </div>
    );
}

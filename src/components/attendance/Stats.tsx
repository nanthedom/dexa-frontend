"use client"

import { CalendarCheck, Clock3, XCircle } from "lucide-react"
import { AttendanceStatus } from "@/lib/type/attendance";
import { calculateAttendanceStatus } from "@/lib/utils";
import { useTodayStatus } from "@/hooks/use-attendance";

export const Stats = () => {
    const { data: todayStatus, isError: todayStatusError, isLoading: todayStatusLoading } = useTodayStatus();

    const attendanceStatus: AttendanceStatus | undefined = todayStatus
        ? calculateAttendanceStatus(todayStatus)
        : undefined;

    const formatTime = (dateString?: string | null) => {
        if (!dateString) return "--:--:--";
        return new Date(dateString).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    const renderStatus = () => {
        switch (attendanceStatus) {
            case "completed":
                return (
                    <div className="flex items-center gap-2 rounded-2xl bg-green-100 px-4 py-3">
                        <CalendarCheck className="h-5 w-5 text-green-500" />
                        <p className="text-sm font-semibold text-green-900">
                            Attendance Completed
                        </p>
                    </div>
                );

            case "checked-in":
                return (
                    <div className="flex items-center gap-2 rounded-2xl bg-green-100 px-4 py-3">
                        <CalendarCheck className="h-5 w-5 text-green-500" />
                        <p className="text-sm font-semibold text-green-900">
                            Checked In
                        </p>
                    </div>
                );

            case "not-open":
                return (
                    <div className="flex items-center gap-2 rounded-2xl bg-zinc-100 px-4 py-3">
                        <Clock3 className="h-5 w-5 text-zinc-500" />
                        <p className="text-sm font-semibold text-zinc-900">
                            Attendance Not Open Yet
                        </p>
                    </div>
                );

            case "open":
                return (
                    <div className="flex items-center gap-2 rounded-2xl bg-yellow-100 px-4 py-3">
                        <Clock3 className="h-5 w-5 text-yellow-500" />
                        <p className="text-sm font-semibold text-yellow-900">
                            Attendance Open
                        </p>
                    </div>
                );

            case "missed":
                return (
                    <div className="flex items-center gap-2 rounded-2xl bg-red-100 px-4 py-3">
                        <XCircle className="h-5 w-5 text-red-500" />
                        <p className="text-sm font-semibold text-red-900">
                            Missed Attendance
                        </p>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <section className="grid grid-cols-1 gap-4 md:grid-cols-3">

            {/* STATUS CARD */}
            <div className="rounded-[28px] bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                    <div className="rounded-2xl bg-zinc-100 p-3">
                        <CalendarCheck className="h-5 w-5 text-zinc-700" />
                    </div>

                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                        Today
                    </span>
                </div>

                <div className="mt-6">
                    <p className="text-sm text-zinc-500">
                        Attendance Status
                    </p>
                    {todayStatusError || todayStatusLoading ? (
                        <div className="h-[50px] bg-muted animate-pulse rounded-[28px] w-full mt-2" />
                    ) : (

                        <h3 className="mt-2 text-2xl font-bold text-zinc-900">
                            {renderStatus()}
                        </h3>
                    )}
                </div>
            </div>

            {/* CHECK IN CARD */}
            <div className="rounded-[28px] bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                    <div className="rounded-2xl bg-zinc-100 p-3">
                        <Clock3 className="h-5 w-5 text-zinc-700" />
                    </div>

                    <span className="text-sm text-zinc-500">
                        Check In
                    </span>
                </div>

                <div className="mt-6">
                    <p className="text-sm text-zinc-500">
                        Check In Time
                    </p>

                    {todayStatusError || todayStatusLoading ? (
                        <div className="h-[50px] bg-muted animate-pulse rounded-[28px] w-full mt-2" />
                    ) : (
                        <h3 className="mt-2 text-2xl font-bold text-zinc-900">
                            {formatTime(todayStatus?.attendance?.checkInAt)}
                        </h3>
                    )}
                </div>
            </div>

            {/* CHECK OUT CARD */}
            <div className="rounded-[28px] bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                    <div className="rounded-2xl bg-zinc-100 p-3">
                        <Clock3 className="h-5 w-5 text-zinc-700" />
                    </div>

                    <span className="text-sm text-zinc-500">
                        Check Out
                    </span>
                </div>

                <div className="mt-6">
                    <p className="text-sm text-zinc-500">
                        Check Out Time
                    </p>
                    {todayStatusError || todayStatusLoading ? (
                        <div className="h-[50px] bg-muted animate-pulse rounded-[28px] w-full mt-2" />
                    ) : (
                        <h3 className="mt-2 text-2xl font-bold text-zinc-900">
                            {formatTime(todayStatus?.attendance?.checkOutAt)}
                        </h3>
                    )}
                </div>
            </div>
        </section>
    );
};

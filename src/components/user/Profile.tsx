"use client"

import { Button } from "@/components/ui/button";
import { ActionDialog } from "../attendance/ActionDialog";
import { useState } from "react";
import { useProfile } from "@/hooks/use-profile";
import { useTodayStatus } from "@/hooks/use-attendance";
import { calculateAttendanceStatus } from "@/lib/utils";
import Link from "next/link";
import { ChevronRight, ClipboardList, ShieldCheck, Users } from "lucide-react";

export const Profile = () => {
    const { data: profile, isError: profileError, isLoading: profileLoading } = useProfile();
    const { data: todayStatus, isError: todayStatusError, isLoading: todayStatusLoading } = useTodayStatus();

    const canCheckIn = todayStatus?.canCheckIn ?? false;
    const canCheckOut = todayStatus?.canCheckOut ?? false;

    const [openDialog, setOpenDialog] = useState(false);
    const [attendanceType, setAttendanceType] = useState<"check-in" | "check-out">("check-in");

    const openAttendanceDialog = (type: "check-in" | "check-out") => {
        setOpenDialog(true);
        setAttendanceType(type);
    };

    return (
        <>
            <section className="overflow-hidden rounded-[32px] bg-white shadow-sm p-6 lg:p-8 space-y-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6">

                    {/* USER INFO */}
                    {!profile || profileError || profileLoading ? (
                        <div className="h-[100px] bg-muted animate-pulse rounded-[12px] w-[60%]" />
                    ) : (
                        <div className="flex items-start gap-4">
                            <div className="space-y-4 flex-col w-full">
                                <div>
                                    <p className="text-sm text-zinc-500">Welcome back!</p>
                                    <h2 className="mt-1 text-3xl font-bold tracking-tight text-zinc-900">
                                        {profile.fullName}
                                    </h2>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3">
                                    <div className="rounded-2xl bg-zinc-100 px-4 py-3">
                                        <p className="text-xs text-zinc-500">Employee Code</p>
                                        <p className="mt-1 text-sm font-semibold text-zinc-900">
                                            {profile.employeeCode}
                                        </p>
                                    </div>

                                    <div className="rounded-2xl bg-zinc-100 px-4 py-3">
                                        <p className="text-xs text-zinc-500">Department</p>
                                        <p className="mt-1 text-sm font-semibold text-zinc-900">
                                            {profile.department}
                                        </p>
                                    </div>

                                    <div className="rounded-2xl bg-zinc-100 px-4 py-3">
                                        <p className="text-xs text-zinc-500">Position</p>
                                        <p className="mt-1 text-sm font-semibold text-zinc-900">
                                            {profile.position}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ACTION */}
                    {todayStatusError || todayStatusLoading ? (
                        <div className="h-[50px] bg-muted animate-pulse rounded-[12px] w-[20%]" />
                    ) : (
                        todayStatus && calculateAttendanceStatus(todayStatus) === "open" && (
                            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                                <Button
                                    disabled={!canCheckIn}
                                    className="h-12 rounded-2xl px-6 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                                    onClick={() => openAttendanceDialog("check-in")}
                                >
                                    Check In
                                </Button>

                                <Button
                                    disabled={!canCheckOut}
                                    className="h-12 rounded-2xl px-6 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                                    onClick={() => openAttendanceDialog("check-out")}
                                >
                                    Check Out
                                </Button>
                            </div>
                        )
                    )}
                </div>

                {/* MENU */}
                {!profile || profileError || profileLoading ? (
                    <div className="h-[100px] w-full animate-pulse rounded-[24px] bg-muted" />
                ) : (
                    profile.role === "HRD" && (
                        <div className="w-full rounded-[28px] border border-zinc-200 bg-gradient-to-br from-zinc-50 to-white p-5">

                            {/* HEADER */}
                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white">
                                    <ShieldCheck className="h-6 w-6" />
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-zinc-900">
                                        HR Dashboard
                                    </h3>

                                    <p className="text-sm text-zinc-500">
                                        Manage employee and attendance monitoring
                                    </p>
                                </div>
                            </div>

                            {/* MENU LIST */}
                            <div className="mt-5 grid gap-3 md:grid-cols-2">

                                <Link href="/user-management">
                                    <div className="group flex cursor-pointer items-center justify-between rounded-2xl border border-zinc-200 bg-white p-4 transition-all hover:border-zinc-300 hover:shadow-sm">

                                        <div className="flex items-center gap-4">
                                            <div className="rounded-2xl bg-zinc-100 p-3 transition group-hover:bg-zinc-200">
                                                <Users className="h-5 w-5 text-zinc-700" />
                                            </div>

                                            <div>
                                                <p className="text-sm font-semibold text-zinc-900">
                                                    Employee Management & Monitor
                                                </p>

                                                <p className="text-xs text-zinc-500">
                                                    Manage employee accounts and monitor their attendance
                                                </p>
                                            </div>
                                        </div>

                                        <ChevronRight className="h-5 w-5 text-zinc-400 transition group-hover:translate-x-1" />
                                    </div>
                                </Link>

                                <Link href="/monitor-attendance">
                                    <div className="group flex cursor-pointer items-center justify-between rounded-2xl border border-zinc-200 bg-white p-4 transition-all hover:border-zinc-300 hover:shadow-sm">

                                        <div className="flex items-center gap-4">
                                            <div className="rounded-2xl bg-zinc-100 p-3 transition group-hover:bg-zinc-200">
                                                <ClipboardList className="h-5 w-5 text-zinc-700" />
                                            </div>

                                            <div>
                                                <p className="text-sm font-semibold text-zinc-900">
                                                    Attendance History
                                                </p>

                                                <p className="text-xs text-zinc-500">
                                                    View all time attendance activity from all users
                                                </p>
                                            </div>
                                        </div>

                                        <ChevronRight className="h-5 w-5 text-zinc-400 transition group-hover:translate-x-1" />
                                    </div>
                                </Link>

                            </div>
                        </div>
                    )
                )}
            </section>

            <ActionDialog
                openDialog={openDialog}
                setOpenDialog={setOpenDialog}
                attendanceType={attendanceType}
            />
        </>
    );
};

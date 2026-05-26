"use client"

import { Button } from "@/components/ui/button"
import { X, Loader2, CalendarClock } from "lucide-react"
import { useAttendanceDetail } from "@/hooks/use-attendance"
import { formatDate, formatTimeOnly } from "@/lib/utils";

interface AttendanceDetailDialogProps {
    attendanceId: string | null;
    openDetailDialog: boolean;
    setOpenDetailDialog: (open: boolean) => void;
}

export const AttendanceDetailDialog = ({
    attendanceId,
    openDetailDialog,
    setOpenDetailDialog
}: AttendanceDetailDialogProps) => {
    const { data: selectedAttendance, isLoading, isError } = useAttendanceDetail(attendanceId, openDetailDialog);

    if (!openDetailDialog || !attendanceId) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
            <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-[8px] bg-white shadow-2xl">

                {/* HEADER */}
                <div className="flex shrink-0 items-start justify-between border-b px-6 py-5">
                    <div>
                        <h2 className="text-2xl font-bold text-zinc-900">
                            Attendance Detail
                        </h2>
                        <p className="mt-1 text-sm text-zinc-500">
                            Detailed attendance information
                        </p>
                    </div>

                    <button
                        onClick={() => setOpenDetailDialog(false)}
                        className="rounded-xl p-2 transition hover:bg-zinc-100 cursor-pointer"
                    >
                        <X className="h-5 w-5 text-zinc-500" />
                    </button>
                </div>

                {/* BODY */}
                <div className="flex-1 overflow-y-auto px-6 py-5">
                    {isLoading ? (
                        <div className="flex h-64 flex-col items-center justify-center">
                            <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
                            <p className="mt-4 text-sm text-zinc-500">Loading details...</p>
                        </div>
                    ) : isError || !selectedAttendance ? (
                        <div className="flex h-64 flex-col items-center justify-center">
                            <p className="text-sm text-red-500">Failed to load attendance details.</p>
                        </div>
                    ) : (
                        <>
                            {/* USER & WORKDAY INFO */}
                            <div className="mb-6 grid gap-4 md:grid-cols-2">
                                {selectedAttendance.user && (
                                    <div className="rounded-2xl bg-zinc-50 p-4 border">
                                        <p className="text-sm font-semibold text-zinc-900">{selectedAttendance.user.fullName}</p>
                                        <p className="text-xs text-zinc-500">{selectedAttendance.user.email}</p>
                                        <p className="text-xs text-zinc-500">- Department: {selectedAttendance.user.department}</p>
                                        <p className="text-xs text-zinc-500">- Position: {selectedAttendance.user.position}</p>
                                    </div>
                                )}

                                {selectedAttendance.workday && (
                                    <div className="rounded-2xl bg-indigo-50/50 p-4 border border-indigo-100 flex items-center gap-3">
                                        <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
                                            <CalendarClock className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-indigo-900">Work Day</p>
                                            <p className="text-sm text-indigo-700 font-semibold">
                                                {new Date(selectedAttendance.workday.date).toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" })}
                                            </p>
                                            <p className="text-xs text-indigo-600">
                                                {formatTimeOnly(selectedAttendance.workday.startTime)} - {formatTimeOnly(selectedAttendance.workday.endTime)} WIB
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="grid gap-6 lg:grid-cols-2">
                                {/* CHECK IN */}
                                <div className="space-y-4 rounded-3xl border p-5">
                                    <div>
                                        <h3 className="text-lg font-semibold text-zinc-900">
                                            Check In
                                        </h3>
                                        <p className="mt-1 text-sm text-zinc-500">
                                            at {formatDate(selectedAttendance.checkInAt)}
                                        </p>
                                    </div>

                                    <div className="overflow-hidden rounded-2xl border bg-zinc-50 flex items-center justify-center">
                                        {selectedAttendance.checkInPhoto ? (
                                            <img
                                                src={selectedAttendance.checkInPhoto}
                                                alt="Check In"
                                                className="h-72 w-full object-cover"
                                            />
                                        ) : (
                                            <div className="h-72 text-sm text-zinc-400 flex items-center justify-center">
                                                No photo
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* CHECK OUT */}
                                <div className="space-y-4 rounded-3xl border p-5">
                                    <div>
                                        <h3 className="text-lg font-semibold text-zinc-900">
                                            Check Out
                                        </h3>
                                        <p className="mt-1 text-sm text-zinc-500">
                                            {selectedAttendance.checkOutAt
                                                ? `at ${formatDate(selectedAttendance.checkOutAt)}`
                                                : "Not checked out yet"}
                                        </p>
                                    </div>

                                    {selectedAttendance.checkOutPhoto ? (
                                        <div className="overflow-hidden rounded-2xl border">
                                            <img
                                                src={selectedAttendance.checkOutPhoto}
                                                alt="Check Out"
                                                className="h-72 w-full object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex h-72 items-center justify-center rounded-2xl border border-dashed bg-zinc-50 text-sm text-zinc-500">
                                            No check out photo
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* NOTES */}
                            <div className="mt-6 rounded-3xl border p-5">
                                <h3 className="text-lg font-semibold text-zinc-900">
                                    Notes
                                </h3>
                                <p className="mt-3 text-sm leading-7 text-zinc-600">
                                    {selectedAttendance.notes || "No notes provided."}
                                </p>
                            </div>
                        </>
                    )}
                </div>

                {/* FOOTER */}
                <div className="flex shrink-0 justify-end border-t px-6 py-5">
                    <Button
                        variant="outline"
                        className="rounded-2xl cursor-pointer"
                        onClick={() => setOpenDetailDialog(false)}
                    >
                        Close
                    </Button>
                </div>
            </div>
        </div>
    )
}

import { Button } from "@/components/ui/button"
import { ActionDialog } from "../attendance/ActionDialog";
import { useState } from "react";
type AttendanceStatus =
    | "not-open"
    | "open"
    | "completed"
    | "missed";

export const Profile = () => {
    const user = {
        fullName: "John Doe",
        employeeCode: "EMP12345",
        position: "Software Engineer",
        department: "Engineering",
    };

    const canCheckIn = false;
    const canCheckOut = true;

    const attendanceStatus: AttendanceStatus = "open";

    const [openDialog, setOpenDialog] = useState(false)
    const [attendanceType, setAttendanceType] = useState<"check-in" | "check-out">("check-in");

    const openAttendanceDialog = (type: "check-in" | "check-out") => {
        setOpenDialog(true)
        setAttendanceType(type)
    };

    return (
        <>
            <section className="overflow-hidden rounded-[32px] bg-white shadow-sm">
                <div className="flex flex-col gap-8 p-6 lg:flex-row lg:items-center lg:justify-between lg:p-8">
                    {/* USER INFO */}
                    <div className="flex items-start gap-4">
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-zinc-500">
                                    Welcome back!
                                </p>

                                <h2 className="mt-1 text-3xl font-bold tracking-tight text-zinc-900">
                                    {user.fullName}
                                </h2>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <div className="rounded-2xl bg-zinc-100 px-4 py-3">
                                    <p className="text-xs text-zinc-500">
                                        Employee Code
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-zinc-900">
                                        {user.employeeCode}
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-zinc-100 px-4 py-3">
                                    <p className="text-xs text-zinc-500">
                                        Department
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-zinc-900">
                                        {user.department}
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-zinc-100 px-4 py-3">
                                    <p className="text-xs text-zinc-500">
                                        Position
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-zinc-900">
                                        {user.position}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ACTION */}
                    {attendanceStatus === "open" && (
                        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                            <Button
                                disabled={!canCheckIn}
                                className="h-12 rounded-2xl px-6 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                                onClick={() =>
                                    openAttendanceDialog("check-in")
                                }
                            >
                                Check In
                            </Button>

                            <Button
                                disabled={!canCheckOut}
                                className="h-12 rounded-2xl px-6 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                                onClick={() =>
                                    openAttendanceDialog("check-out")
                                }
                            >
                                Check Out
                            </Button>
                        </div>
                    )}
                </div>
            </section>

            <ActionDialog
                openDialog={openDialog}
                setOpenDialog={setOpenDialog}
                attendanceType={attendanceType}
            />
        </>
    )
}

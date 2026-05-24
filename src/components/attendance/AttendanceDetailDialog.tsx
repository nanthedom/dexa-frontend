import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export const AttendanceDetailDialog = ({ openDetailDialog, setOpenDetailDialog }: { openDetailDialog: boolean; setOpenDetailDialog: (open: boolean) => void }) => {
    const selectedAttendance = {
        id: "2",
        checkInAt: "22 May 2026, 08:03 WIB",
        checkOutAt: "22 May 2026, 17:01 WIB",
        checkInPhoto:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200",
        checkOutPhoto:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200",
        notes: "Finished sprint tasks.",
        createdAt: "22 May 2026",
        status: "Completed",
    };

    if (!openDetailDialog || !selectedAttendance) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm" >
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
                        onClick={() => {
                            setOpenDetailDialog(false);
                        }}
                        className="rounded-xl p-2 transition hover:bg-zinc-100 cursor-pointer"
                    >
                        <X className="h-5 w-5 text-zinc-500" />
                    </button>
                </div>

                {/* BODY */}
                <div className="flex-1 overflow-y-auto px-6 py-5">
                    <div className="grid gap-6 lg:grid-cols-2">

                        {/* CHECK IN */}
                        <div className="space-y-4 rounded-3xl border p-5">
                            <div>
                                <h3 className="text-lg font-semibold text-zinc-900">
                                    Check In
                                </h3>

                                <p className="mt-1 text-sm text-zinc-500">
                                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                </p>
                            </div>

                            <div className="overflow-hidden rounded-2xl border">
                                <img
                                    src={
                                        selectedAttendance.checkInPhoto
                                    }
                                    alt="Check In"
                                    className="h-72 w-full object-cover"
                                />
                            </div>
                        </div>

                        {/* CHECK OUT */}
                        <div className="space-y-4 rounded-3xl border p-5">
                            <div>
                                <h3 className="text-lg font-semibold text-zinc-900">
                                    Check Out
                                </h3>

                                <p className="mt-1 text-sm text-zinc-500">
                                    {selectedAttendance.checkOutAt ||
                                        "Not checked out yet"}
                                </p>
                            </div>

                            {selectedAttendance.checkOutPhoto ? (
                                <div className="overflow-hidden rounded-2xl border">
                                    <img
                                        src={
                                            selectedAttendance.checkOutPhoto
                                        }
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
                            {selectedAttendance.notes ||
                                "No notes provided."}
                        </p>
                    </div>
                </div>

                {/* FOOTER */}
                <div className="flex shrink-0 justify-end border-t px-6 py-5">
                    <Button
                        variant="outline"
                        className="rounded-2xl cursor-pointer"
                        onClick={() => {
                            setOpenDetailDialog(false);
                        }}
                    >
                        Close
                    </Button>
                </div>
            </div>
        </div >
    )
}
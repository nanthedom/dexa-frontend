import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import { useState } from "react"
import { AttendanceDetailDialog } from "./AttendanceDetailDialog"

export const AttendanceList = () => {
    const [history, setHistory] = useState([
        {
            id: "1",
            checkInAt: "23 May 2026, 08:12 WIB",
            checkOutAt: null,
            checkInPhoto:
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200",
            checkOutPhoto: null,
            notes: "Working from home today.",
            createdAt: "23 May 2026",
            status: "Active",
        },
        {
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
        },
    ]);

    const getTodayDate = () => {
        return new Date().toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    const todayAttendance = history.find((item) => item.createdAt === getTodayDate());

    const [openDetailDialog, setOpenDetailDialog] = useState(false);

    return (
        <>
            <section className="rounded-[32px] bg-white p-6 shadow-sm">
                <div className="mb-6">
                    <h3 className="text-xl font-bold text-zinc-900">
                        Recent Attendance
                    </h3>

                    <p className="mt-1 text-sm text-zinc-500">
                        Your attendance history
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[640px]">
                        <thead>
                            <tr className="border-b border-zinc-200">
                                <th className="pb-4 text-left text-sm font-semibold text-zinc-500">
                                    Date
                                </th>

                                <th className="pb-4 text-left text-sm font-semibold text-zinc-500">
                                    Check In
                                </th>

                                <th className="pb-4 text-left text-sm font-semibold text-zinc-500">
                                    Check Out
                                </th>

                                <th className="pb-4 text-left text-sm font-semibold text-zinc-500">
                                    Status
                                </th>
                                <th className="pb-4 text-left text-sm font-semibold text-zinc-500">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {history.map((item) => (
                                <tr
                                    key={item.id}
                                    className="border-b border-zinc-100 last:border-none"
                                >
                                    <td className="py-4 text-sm text-zinc-700">
                                        {item.createdAt}
                                    </td>

                                    <td className="py-4 text-sm text-zinc-700">
                                        {item.checkInAt}
                                    </td>

                                    <td className="py-4 text-sm text-zinc-700">
                                        {item.checkOutAt || "-"}
                                    </td>

                                    <td className="py-4">
                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-medium ${item.status === "Completed"
                                                ? "bg-emerald-100 text-emerald-700"
                                                : "bg-amber-100 text-amber-700"
                                                }`}
                                        >
                                            {item.status}
                                        </span>
                                    </td>

                                    <td className="py-4">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="rounded-xl cursor-pointer"
                                            onClick={() => {
                                                setOpenDetailDialog(true);
                                            }}
                                        >
                                            <Eye className="mr-2 h-4 w-4" />
                                            Detail
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <AttendanceDetailDialog
                openDetailDialog={openDetailDialog}
                setOpenDetailDialog={setOpenDetailDialog}
            />
        </>
    )
}

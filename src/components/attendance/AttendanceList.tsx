"use client"

import { Button } from "@/components/ui/button"
import { Eye, Loader2 } from "lucide-react"
import { useState } from "react"
import { AttendanceDetailDialog } from "./AttendanceDetailDialog"
import { PaginationBar } from "../pagination/Pagination"
import { useAttendanceList } from "@/hooks/use-attendance"
import { getUserId } from "@/lib/session"
import { ListAttendance } from "@/lib/type/attendance"
import { formatDate } from "@/lib/utils"
import { toast } from "sonner"

export const AttendanceList = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [pageInput, setPageInput] = useState("1");

    const [openDetailDialog, setOpenDetailDialog] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const userId = getUserId()
    const { data: currentData, meta, isLoading, isError } = useAttendanceList({ userId, page, limit });

    const handleLimitChange = (newLimit: number) => {
        setLimit(newLimit);
        setPage(1);
        setPageInput("1");
    };

    const handleClickDetail = (id: string | null) => {
        if (!id) {
            toast.error("No Attendance Data!")
            return
        }

        setSelectedId(id);
        setOpenDetailDialog(true);
    }

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

                <div className="overflow-x-auto mb-6">
                    <table className="w-full min-w-[640px]">
                        <thead>
                            <tr className="border-b border-zinc-200">
                                <th className="p-4 text-left text-sm font-semibold text-zinc-500 w-[200px]">Date</th>
                                <th className="p-4 text-left text-sm font-semibold text-zinc-500 w-[200px]">Check In</th>
                                <th className="p-4 text-left text-sm font-semibold text-zinc-500 w-[200px]">Check Out</th>
                                <th className="p-4 text-left text-sm font-semibold text-zinc-500 w-[200px]">Notes</th>
                                <th className="p-4 text-left text-sm font-semibold text-zinc-500 w-[100px]">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan={5} className="py-10 text-center">
                                        <Loader2 className="mx-auto h-6 w-6 animate-spin text-zinc-400" />
                                    </td>
                                </tr>
                            ) : isError ? (
                                <tr>
                                    <td colSpan={5} className="py-10 text-center text-sm text-red-500">
                                        Failed to load attendance records.
                                    </td>
                                </tr>
                            ) : currentData.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-10 text-center text-sm text-zinc-500">
                                        No attendance data found.
                                    </td>
                                </tr>
                            ) : (
                                currentData.map((item: ListAttendance) => (
                                    <tr
                                        key={item.id}
                                        className="border-b border-zinc-100 last:border-none hover:bg-zinc-50/50"
                                    >
                                        <td className="p-4 text-sm text-zinc-700">
                                            {formatDate(item.date).split(",")[0]}
                                        </td>
                                        <td className="p-4 text-sm text-zinc-700">
                                            {item.attendances[0] ? formatDate(item.attendances[0].checkInAt) : "-"}
                                        </td>
                                        <td className="p-4 text-sm text-zinc-700">
                                            {item.attendances[0] ? formatDate(item.attendances[0].checkOutAt) : "-"}
                                        </td>
                                        <td className="p-4 text-sm text-zinc-700">
                                            {item.attendances[0] ? item.attendances[0].notes : "-"}
                                        </td>
                                        <td className="p-4">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="rounded-xl cursor-pointer"
                                                onClick={() => handleClickDetail(item.attendances[0] ? item.attendances[0].id : null)}
                                            >
                                                <Eye className="mr-2 h-4 w-4" />
                                                Detail
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {!isLoading && !isError && (
                    <PaginationBar
                        page={page}
                        totalPage={meta.totalPage}
                        totalData={meta.totalData}
                        limit={limit}
                        pageInput={pageInput}
                        onPageInputChange={setPageInput}
                        onLimitChange={handleLimitChange}
                        onPageChange={setPage}
                    />
                )}
            </section >

            {openDetailDialog && (
                <AttendanceDetailDialog
                    attendanceId={selectedId}
                    openDetailDialog={openDetailDialog}
                    setOpenDetailDialog={(open) => {
                        setOpenDetailDialog(open);
                        if (!open) setSelectedId(null);
                    }}
                />
            )
            }
        </>
    )
}

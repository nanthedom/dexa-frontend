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
import { Input } from "../ui/input"

export const HistoryAttendance = () => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [pageInput, setPageInput] = useState("1");

    const [openDetailDialog, setOpenDetailDialog] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const userId = getUserId()
    const { data: currentData, meta, isFetching, isError } = useAttendanceList({ userId, startDate, endDate, page, limit });

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
                <div className="flex flex-col sm:flex-row sm:justify-between">
                    <div className="mb-6">
                        <h3 className="text-xl font-bold text-zinc-900">
                            Activity
                        </h3>
                        <p className="mt-1 text-sm text-zinc-500">
                            Your attendance history
                        </p>
                    </div>
                    {/* START DATE */}
                    <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center">
                        <label className="text-sm font-medium text-zinc-700">
                            Periode:
                        </label>
                        <div className="relative">
                            <Input
                                type="date"
                                value={startDate}
                                max={endDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                onClick={(e) => e.currentTarget.showPicker()}
                                className="h-11 rounded-2xl cursor-pointer"
                            />
                        </div>

                        -

                        {/* END DATE */}
                        <div className="relative">
                            <Input
                                type="date"
                                value={endDate}
                                min={startDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                onClick={(e) => e.currentTarget.showPicker()}
                                className="h-11 rounded-2xl cursor-pointer"
                            />
                        </div>
                    </div>
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
                            {isFetching ? (
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
                                            {formatDate(item.workday.date).split(",")[0]}
                                        </td>
                                        <td className="p-4 text-sm text-zinc-700">
                                            {formatDate(item.checkInAt)}
                                        </td>
                                        <td className="p-4 text-sm text-zinc-700">
                                            {formatDate(item.checkOutAt)}
                                        </td>
                                        <td className="p-4 text-sm text-zinc-700">
                                            {item.notes}
                                        </td>
                                        <td className="p-4">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="rounded-xl cursor-pointer"
                                                onClick={() => handleClickDetail(item.id)}
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

                {!isFetching && !isError && (
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
            )}
        </>
    )
}

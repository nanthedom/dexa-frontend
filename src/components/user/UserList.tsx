import { useUserList } from "@/hooks/use-user";
import { UserData } from "@/lib/type/user";
import { Eye, ChevronUp, Loader2, Search, User2 } from "lucide-react";
import { useState, Fragment } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { PaginationBar } from "../pagination/Pagination";
import { UserDetailDialog } from "./UserDialog";
import { Input } from "../ui/input";
import { AttendanceActivity } from "../attendance/AttendanceActivity";

export const UserList = () => {
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [pageInput, setPageInput] = useState("1");

    const [openDetailDialog, setOpenDetailDialog] = useState(false);
    const [activeMonitorId, setActiveMonitorId] = useState<string | null>(null);
    const [selectedId, setSelectedId] = useState("");

    const { data: users, meta, isFetching, isError } = useUserList({ q: search, page, limit });

    const handleLimitChange = (newLimit: number) => {
        setLimit(newLimit);
        setPage(1);
        setPageInput("1");
    };

    const handleClickDetail = (id: string | null) => {
        if (!id) {
            toast.error("No User Data!")
            return
        }
        setSelectedId(id);
        setOpenDetailDialog(true);
    }

    const handleToggleMonitor = (id: string) => {
        if (activeMonitorId === id) {
            setActiveMonitorId(null);
        } else {
            setActiveMonitorId(id);
        }
    }

    return (
        <>
            <section className="rounded-[32px] bg-white p-6 shadow-sm">
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-zinc-900">
                        User List
                    </h2>
                    <p className="mt-1 text-sm text-zinc-500">
                        List of all registered employees
                    </p>
                </div>

                <div className="mb-6 relative">
                    <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                    <Input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search user..."
                        className="h-12 w-full rounded-2xl border-zinc-200 pl-11 sm:w-[400px]"
                    />
                </div>

                <div className="overflow-x-auto mb-6">
                    <table className="w-full min-w-[900px]">
                        <thead>
                            <tr className="border-b border-zinc-200">
                                <th className="p-4 text-left text-sm font-semibold text-zinc-500">
                                    Employee Code
                                </th>
                                <th className="p-4 text-left text-sm font-semibold text-zinc-500 w-[35%]">
                                    Full Name
                                </th>
                                <th className="p-4 text-left text-sm font-semibold text-zinc-500 w-[20%]">
                                    Department
                                </th>
                                <th className="p-4 text-left text-sm font-semibold text-zinc-500 w-[12%]">
                                    Role
                                </th>
                                <th className="p-4 text-center text-sm font-semibold text-zinc-500 w-[18%]">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody className={`transition-opacity duration-200 ${isFetching && users ? "opacity-60 pointer-events-none" : ""}`}>
                            {isFetching && !users ? (
                                <tr>
                                    <td colSpan={5} className="py-12 text-center">
                                        <Loader2 className="mx-auto h-6 w-6 animate-spin text-zinc-400" />
                                    </td>
                                </tr>
                            ) : isError ? (
                                <tr>
                                    <td colSpan={5} className="py-12 text-center text-sm text-red-500 font-medium">
                                        Failed to load user records.
                                    </td>
                                </tr>
                            ) : !users || users.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-12 text-center text-sm text-zinc-500">
                                        No user data found.
                                    </td>
                                </tr>
                            ) : (
                                users.map((user: UserData) => {
                                    const isCurrentMonitoring = activeMonitorId === user.id;

                                    return (
                                        <Fragment key={user.id}>
                                            <tr className={`border-b border-zinc-100 hover:bg-zinc-50/60 transition-colors ${isCurrentMonitoring ? "bg-zinc-50/80" : ""}`}>
                                                <td className="p-4 text-sm font-medium text-zinc-600 truncate">
                                                    {user.employeeCode}
                                                </td>
                                                <td className="p-4 text-sm font-semibold text-zinc-900 truncate">
                                                    {user.fullName}
                                                </td>
                                                <td className="p-4 text-sm text-zinc-600 truncate">
                                                    {user.department}
                                                </td>
                                                <td className="p-4 align-middle">
                                                    <span
                                                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold select-none ${user.role === "HRD"
                                                            ? "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-700/10"
                                                            : "bg-zinc-100 text-zinc-700"
                                                            }`}
                                                    >
                                                        {user.role}
                                                    </span>
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex items-center justify-center gap-2.5">
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            className="h-9 rounded-xl cursor-pointer hover:bg-zinc-100 border-zinc-200"
                                                            onClick={() => handleClickDetail(user.id)}
                                                        >
                                                            <User2 className="mr-1.5 h-4 w-4 text-zinc-500" />
                                                            Detail
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            className={`h-9 rounded-xl cursor-pointer shadow-none ${isCurrentMonitoring
                                                                ? "bg-zinc-800 text-white hover:bg-zinc-900"
                                                                : "bg-primary text-white hover:bg-primary/90"
                                                                }`}
                                                            onClick={() => handleToggleMonitor(user.id)}
                                                        >
                                                            {isCurrentMonitoring ? (
                                                                <>
                                                                    <ChevronUp className="mr-1.5 h-4 w-4" />
                                                                    Close
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Eye className="mr-1.5 h-4 w-4" />
                                                                    Monitor
                                                                </>
                                                            )}
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>

                                            {isCurrentMonitoring && (
                                                <tr className="bg-zinc-50/40 border-b border-zinc-100 face-in duration-200">
                                                    <td colSpan={5} className="p-6">
                                                        <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-inner">
                                                            <AttendanceActivity
                                                                userId={user.id}
                                                                isMonitor={true}
                                                            />
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </Fragment>
                                    )
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {!isFetching && !isError && users && users.length > 0 && (
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
            </section>

            {openDetailDialog && (
                <UserDetailDialog
                    userId={selectedId}
                    openDetailDialog={openDetailDialog}
                    setOpenDetailDialog={(open) => {
                        setOpenDetailDialog(open);
                        if (!open) setSelectedId("");
                    }}
                    mode="view"
                />
            )}
        </>
    )
}

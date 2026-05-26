import { useUserList } from "@/hooks/use-user";
import { UserData } from "@/lib/type/user";
import { Eye, Loader2, Search } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { PaginationBar } from "../pagination/Pagination";
import { UserDetailDialog } from "./UserDialog";
import { Input } from "../ui/input";

export const UserList = () => {
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [pageInput, setPageInput] = useState("1");

    const [openDetailDialog, setOpenDetailDialog] = useState(false);
    const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

    const { data: users, meta, isLoading, isError } = useUserList({ q: search, page, limit });

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
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
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

                                <th className="p-4 text-left text-sm font-semibold text-zinc-500">
                                    Full Name
                                </th>

                                <th className="p-4 text-left text-sm font-semibold text-zinc-500">
                                    Department
                                </th>

                                <th className="p-4 text-left text-sm font-semibold text-zinc-500">
                                    Position
                                </th>

                                <th className="p-4 text-left text-sm font-semibold text-zinc-500">
                                    Role
                                </th>

                                <th className="p-4 text-left text-sm font-semibold text-zinc-500">
                                    Action
                                </th>
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
                                        Failed to load user records.
                                    </td>
                                </tr>
                            ) : users.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-10 text-center text-sm text-zinc-500">
                                        No user data found.
                                    </td>
                                </tr>
                            ) : (
                                users.map((user: UserData) => (
                                    <tr
                                        key={user.id}
                                        className="border-b border-zinc-100 hover:bg-zinc-50"
                                    >
                                        <td className="p-4 text-sm text-zinc-700">
                                            {user.employeeCode}
                                        </td>

                                        <td className="p-4 text-sm font-medium text-zinc-900">
                                            {user.fullName}
                                        </td>

                                        <td className="p-4 text-sm text-zinc-700">
                                            {user.department}
                                        </td>

                                        <td className="p-4 text-sm text-zinc-700">
                                            {user.position}
                                        </td>

                                        <td className="p-4">
                                            <div
                                                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${user.role === "HRD"
                                                    ? "bg-indigo-100 text-indigo-700"
                                                    : "bg-zinc-100 text-zinc-700"
                                                    }`}
                                            >
                                                {user.role}
                                            </div>
                                        </td>

                                        <td className="p-4">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="rounded-xl cursor-pointer"
                                                onClick={() => handleClickDetail(user.id)}
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
            </section>

            {openDetailDialog && (
                <UserDetailDialog
                    userId={selectedId}
                    openDetailDialog={openDetailDialog}
                    setOpenDetailDialog={(open) => {
                        setOpenDetailDialog(open);
                        if (!open) setSelectedId(undefined);
                    }}
                    mode="view"
                />
            )}
        </>

    )
}
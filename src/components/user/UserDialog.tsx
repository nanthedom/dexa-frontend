"use client"

import { useUserDetail } from "@/hooks/use-user";
import { Loader2, X } from "lucide-react";
import { UserForm } from "./UserForm";

interface UserDetailDialogProps {
    userId?: string;
    openDetailDialog: boolean;
    setOpenDetailDialog: (open: boolean) => void;
    mode: "view" | "create" | "update";
}

export const UserDetailDialog = ({
    userId,
    openDetailDialog,
    setOpenDetailDialog,
    mode
}: UserDetailDialogProps) => {

    const { data: selectedUser, isLoading: isLoadingUser, isError: isErrorUser } = useUserDetail(userId, mode !== "create");

    if (!openDetailDialog) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
            <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-[8px] bg-white shadow-2xl">

                {/* HEADER */}
                <div className="flex shrink-0 items-start justify-between border-b px-6 py-5">
                    <div>
                        <h2 className="text-2xl font-bold text-zinc-900">
                            {mode === "create" ? "Add User" : "Edit User"}
                        </h2>
                        <p className="mt-1 text-sm text-zinc-500">
                            Fill all required user information
                        </p>
                    </div>

                    <button
                        onClick={() => setOpenDetailDialog(false)}
                        className="rounded-xl p-2 transition hover:bg-zinc-100 cursor-pointer"
                    >
                        <X className="h-5 w-5 text-zinc-500" />
                    </button>
                </div>

                {isLoadingUser && mode !== "create" ? (
                    <div className="flex-1 py-20 text-center">
                        <Loader2 className="mx-auto h-6 w-6 animate-spin text-zinc-400" />
                    </div>
                ) : isErrorUser && mode !== "create" ? (
                    <div className="flex-1 py-20 text-center text-sm text-red-500">
                        Failed to load user records.
                    </div>
                ) : (
                    <UserForm
                        selectedUser={selectedUser}
                        mode={mode}
                        userId={userId}
                        setOpenDetailDialog={setOpenDetailDialog}
                    />
                )}
            </div>
        </div>
    );
};

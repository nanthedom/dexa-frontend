"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { ArrowLeft, Plus, Search } from "lucide-react"
import { UserList } from "@/components/user/UserList"
import Link from "next/link"
import { UserDetailDialog } from "@/components/user/UserDialog"

export default function UserManagementPage() {
    const [search, setSearch] = useState("")
    const [openFormDialog, setOpenFormDialog] = useState(false);

    return (
        <div className="space-y-6">
            {/* HEADER */}
            <section className="rounded-[32px] bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="space-y-3">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition hover:text-zinc-900"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back
                        </Link>

                        <div>
                            <h1 className="text-3xl font-bold text-zinc-900">
                                User Management
                            </h1>

                            <p className="mt-1 text-sm text-zinc-500">
                                Manage employee accounts and access
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />

                            <Input
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                placeholder="Search user..."
                                className="h-12 w-full rounded-2xl border-zinc-200 pl-11 sm:w-[260px]"
                            />
                        </div>

                        <Button
                            className="h-12 rounded-2xl px-5 font-semibold cursor-pointer"
                            onClick={() => setOpenFormDialog(true)}
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Add User
                        </Button>
                    </div>
                </div>
            </section>

            {/* USER LIST */}
            <UserList search={search} />

            {/* FORM DIALOG */}
            {openFormDialog && (
                <UserDetailDialog
                    openDetailDialog={openFormDialog}
                    setOpenDetailDialog={(open) => { setOpenFormDialog(open) }}
                    mode="create"
                />
            )}
        </div>
    )
}

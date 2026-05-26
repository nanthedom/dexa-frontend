"use client";

import { useState } from "react";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Search, ArrowLeft } from "lucide-react";
import { HistoryAttendance } from "@/components/attendance/HistoryAttendance";

export default function MonitorAttendancePage() {
    const [search, setSearch] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    return (
        <>
            <section className="rounded-[32px] bg-white p-6 shadow-sm">

                {/* HEADER */}
                <div className="mb-6">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition hover:text-zinc-900"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                    </Link>

                    <div>
                        <h1 className="text-3xl font-bold text-zinc-900">
                            Attendance History
                        </h1>

                        <p className="mt-1 text-sm text-zinc-500">
                            View all time attendance activity from all users
                        </p>
                    </div>
                </div>

                {/* FILTER */}
                <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center">

                    {/* SEARCH USER */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />

                        <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search employee..."
                            className="h-11 rounded-2xl pl-10 lg:w-[300px]"
                        />
                    </div>

                    <label className="text-sm font-medium text-zinc-700">
                        Periode:
                    </label>

                    {/* START DATE */}
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
            </section>

            <HistoryAttendance
                search={search}
                startDate={startDate}
                endDate={endDate}
            />
        </>
    );
}

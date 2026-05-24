"use client";

import { useQuery, keepPreviousData, useMutation } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { attendanceApi } from "@/services/attendance";
import { queryClient } from "@/lib/react-query";
import { toast } from "sonner";
import { AttendanceListParams } from "@/lib/type/attendance";

export function useTodayStatus() {
    const query = useQuery({
        queryKey: queryKeys.attendances.todayStatus,
        queryFn: () => attendanceApi.todayStatus(),
        placeholderData: keepPreviousData,
    });

    const data = query.data?.data ?? null;

    return {
        ...query,
        data,
    };
}

export function useCheckInMutation() {
    return useMutation({
        mutationFn: ({
            photo,
            notes,
        }: {
            photo: File;
            notes?: string;
        }) => attendanceApi.checkIn({ photo, notes }),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.attendances.todayStatus });
            queryClient.invalidateQueries({ queryKey: ["attendances", "list"] });
            toast.success("Check in attendance success");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
}

export function useCheckOutMutation() {
    return useMutation({
        mutationFn: ({
            photo,
            notes,
        }: {
            photo: File;
            notes?: string;
        }) => attendanceApi.checkOut({ photo, notes }),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.attendances.todayStatus });
            queryClient.invalidateQueries({ queryKey: queryKeys.attendances.detail(data.data.id) });
            queryClient.invalidateQueries({ queryKey: ["attendances", "list"] });
            toast.success("Check out attendance success");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
}

export function useAttendanceList(params: AttendanceListParams) {
    const query = useQuery({
        queryKey: queryKeys.attendances.list(params),
        queryFn: () => attendanceApi.getList(params),
        placeholderData: keepPreviousData,
    });

    const data = query.data?.data.data ?? [];
    const meta = query.data?.data.meta ?? {
        totalData: 0,
        totalPage: 1,
        from: null,
        to: null,
    };

    return {
        ...query,
        data,
        meta,
    };
}

export function useAttendanceDetail(id: string | null, isOpen: boolean) {
    const query = useQuery({
        queryKey: queryKeys.attendances.detail(id as string),
        queryFn: () => attendanceApi.getDetail(id as string),
        enabled: !!id && isOpen,
    });

    const data = query.data?.data ?? null;

    return {
        ...query,
        data,
    };
}

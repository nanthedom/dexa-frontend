"use client";

import { useQuery, keepPreviousData, useMutation } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { attendanceApi } from "@/services/attendance";
import { queryClient } from "@/lib/react-query";
import { toast } from "sonner";

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
            toast.success("Check out attendance success");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
}

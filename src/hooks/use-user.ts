import { queryKeys } from "@/lib/query-keys";
import { queryClient } from "@/lib/react-query";
import { User, UserListParams } from "@/lib/type/user";
import { userApi } from "@/services/user";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateMutation() {
    return useMutation({
        mutationFn: (payload: User) => userApi.create(payload),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["users", "list"] });
            toast.success("User created successfully");
        },
        onError: (error) => {
            toast.error(error.message || "Failed to create user");
        },
    });
}

export function useUpdateMutation() {
    return useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: User }) => userApi.update(id, payload),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["users", "list"] });
            queryClient.invalidateQueries({ queryKey: queryKeys.users.detail(data.data.id) });
            toast.success("User updated successfully");
        },
        onError: (error) => {
            toast.error(error.message || "Failed to update user");
        },
    });
}

export function useUserList(params: UserListParams) {
    const query = useQuery({
        queryKey: queryKeys.users.list(params),
        queryFn: () => userApi.getList(params),
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

export function useUserDetail(id: string | undefined, isOpen: boolean) {
    const query = useQuery({
        queryKey: queryKeys.users.detail(id as string),
        queryFn: () => userApi.getDetail(id as string),
        enabled: !!id && isOpen,
    });

    const data = query.data?.data ?? null;

    return {
        ...query,
        data,
    };
}

export function useDeleteMutation() {
    return useMutation({
        mutationFn: (id: string) => userApi.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users", "list"] });
            toast.success("User deleted successfully");
        },
        onError: (error) => {
            toast.error(error.message || "Failed to delete user");
        },
    });
}

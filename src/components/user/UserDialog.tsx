"use client"

import { useUserDetail, useCreateMutation, useUpdateMutation } from "@/hooks/use-user";
import { Loader2, UserCog, X } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import { Button } from "../ui/button";
import { User } from "@/lib/type/user";

interface UserDetailDialogProps {
    userId?: string;
    openDetailDialog: boolean;
    setOpenDetailDialog: (open: boolean) => void;
    mode: "create" | "update";
}

type FormKeys = "employeeCode" | "fullName" | "email" | "department" | "position" | "role" | "password";

export const UserDetailDialog = ({
    userId,
    openDetailDialog,
    setOpenDetailDialog,
    mode
}: UserDetailDialogProps) => {

    const { data: selectedUser, isLoading: isLoadingUser, isError: isErrorUser } = useUserDetail(userId, openDetailDialog);

    const createMutation = useCreateMutation();
    const updateMutation = useUpdateMutation();

    const [form, setForm] = useState({
        employeeCode: selectedUser?.employeeCode || "",
        fullName: selectedUser?.fullName || "",
        email: selectedUser?.email || "",
        department: selectedUser?.department || "",
        position: selectedUser?.position || "",
        role: (selectedUser?.role as "HRD" | "EMPLOYEE") || "EMPLOYEE",
        password: "",
    });

    const [errors, setErrors] = useState<Partial<Record<FormKeys, string>>>({});

    if (!openDetailDialog) return null;

    const resetForm = () => {
        setForm({
            employeeCode: "",
            fullName: "",
            email: "",
            department: "",
            position: "",
            role: "EMPLOYEE",
            password: "",
        });

        setErrors({});
    };

    const handleInputChange = (key: FormKeys, value: string) => {
        setForm((prev) => ({ ...prev, [key]: value }));
        if (errors[key]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[key];
                return newErrors;
            });
        }
    };

    const handleSubmit = async () => {
        const newErrors: Partial<Record<FormKeys, string>> = {};

        // REQUIRED FIELD
        ([
            "employeeCode",
            "fullName",
            "email",
            "department",
            "position",
            "role",
        ] as FormKeys[]).forEach((key) => {
            if (!form[key] || form[key].toString().trim() === "") {
                newErrors[key] =
                    `${key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')} is required`;
            }
        });

        // PASSWORD REQUIRED ONLY CREATE
        if (mode === "create") {
            if (!form.password || form.password.trim() === "") {
                newErrors.password = "Password is required";
            } else if (form.password.length < 8) {
                newErrors.password = "Password must be at least 8 characters";
            }
        }

        // PASSWORD OPTIONAL UPDATE
        if (
            mode === "update" &&
            form.password &&
            form.password.trim() !== "" &&
            form.password.length < 8
        ) {
            newErrors.password = "Password must be at least 8 characters";
        }

        // EMAIL VALIDATION
        if (form.email && form.email.trim() !== "") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(form.email)) {
                newErrors.email = "Invalid email format";
            }
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const payload =
            mode === "update" && !form.password
                ? {
                    employeeCode: form.employeeCode,
                    fullName: form.fullName,
                    email: form.email,
                    department: form.department,
                    position: form.position,
                    role: form.role,
                }
                : form;

        if (mode === "create") {
            createMutation.mutate(payload as User, {
                onSuccess: () => {
                    setOpenDetailDialog(false);
                    resetForm();
                },
            });
        } else if (mode === "update" && userId) {
            updateMutation.mutate(
                {
                    id: userId,
                    payload: payload as User,
                },
                {
                    onSuccess: () => {
                        setOpenDetailDialog(false);
                        resetForm();
                    },
                }
            );
        }
    };

    const isMutating = createMutation.isPending || updateMutation.isPending;

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

                {/* BODY */}
                <div className="flex-1 overflow-y-auto px-6 py-5">
                    <div className="mb-6 rounded-3xl border border-indigo-100 bg-indigo-50/50 p-5">
                        <div className="flex items-center gap-3">
                            <div className="rounded-2xl bg-indigo-100 p-3 text-indigo-600">
                                <UserCog className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-indigo-900">Employee Account</p>
                                <p className="text-xs text-indigo-700">User data and access configuration</p>
                            </div>
                        </div>
                    </div>

                    {isLoadingUser && mode === "update" ? (
                        <div className="py-10 text-center">
                            <Loader2 className="mx-auto h-6 w-6 animate-spin text-zinc-400" />
                        </div>
                    ) : isErrorUser && mode === "update" ? (
                        <div className="py-10 text-center text-sm text-red-500">
                            Failed to load user records.
                        </div>
                    ) : (
                        <div className="grid gap-5 md:grid-cols-2">
                            {/* EMPLOYEE CODE */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-700">
                                    Employee Code <span className="text-red-600">*</span>
                                </label>
                                <Input
                                    value={form.employeeCode}
                                    onChange={(e) => handleInputChange("employeeCode", e.target.value)}
                                    className={`h-12 rounded-2xl ${errors.employeeCode ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                                    placeholder="EMP001"
                                />
                                {errors.employeeCode && (
                                    <p className="text-xs text-red-500 font-medium pl-1">{errors.employeeCode}</p>
                                )}
                            </div>

                            {/* FULL NAME */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-700">
                                    Full Name <span className="text-red-600">*</span>
                                </label>
                                <Input
                                    value={form.fullName}
                                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                                    className={`h-12 rounded-2xl ${errors.fullName ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                                    placeholder="John Doe"
                                />
                                {errors.fullName && (
                                    <p className="text-xs text-red-500 font-medium pl-1">{errors.fullName}</p>
                                )}
                            </div>

                            {/* EMAIL */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-700">
                                    Email <span className="text-red-600">*</span>
                                </label>
                                <Input
                                    type="email"
                                    value={form.email}
                                    onChange={(e) => handleInputChange("email", e.target.value)}
                                    className={`h-12 rounded-2xl ${errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                                    placeholder="john@example.com"
                                />
                                {errors.email && (
                                    <p className="text-xs text-red-500 font-medium pl-1">{errors.email}</p>
                                )}
                            </div>

                            {/* DEPARTMENT */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-700">
                                    Department <span className="text-red-600">*</span>
                                </label>
                                <Input
                                    value={form.department}
                                    onChange={(e) => handleInputChange("department", e.target.value)}
                                    className={`h-12 rounded-2xl ${errors.department ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                                    placeholder="Engineering"
                                />
                                {errors.department && (
                                    <p className="text-xs text-red-500 font-medium pl-1">{errors.department}</p>
                                )}
                            </div>

                            {/* POSITION */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-700">
                                    Position <span className="text-red-600">*</span>
                                </label>
                                <Input
                                    value={form.position}
                                    onChange={(e) => handleInputChange("position", e.target.value)}
                                    className={`h-12 rounded-2xl ${errors.position ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                                    placeholder="Backend Engineer"
                                />
                                {errors.position && (
                                    <p className="text-xs text-red-500 font-medium pl-1">{errors.position}</p>
                                )}
                            </div>

                            {/* ROLE */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-700">
                                    Role <span className="text-red-600">*</span>
                                </label>
                                <select
                                    value={form.role}
                                    onChange={(e) => handleInputChange("role", e.target.value)}
                                    className={`h-12 w-full rounded-2xl border bg-white px-4 text-sm outline-none cursor-pointer ${errors.role ? "border-red-500 focus:border-red-500" : "border-zinc-200"}`}
                                >
                                    <option value="EMPLOYEE">EMPLOYEE</option>
                                    <option value="HRD">HRD</option>
                                </select>
                                {errors.role && (
                                    <p className="text-xs text-red-500 font-medium pl-1">{errors.role}</p>
                                )}
                            </div>

                            {/* PASSWORD */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-700">
                                    {mode === "update" && <span>Change</span>} Password {mode === "create" && <span className="text-red-600">*</span>}
                                </label>

                                <Input
                                    type="password"
                                    value={form.password}
                                    onChange={(e) => handleInputChange("password", e.target.value)}
                                    className={`h-12 rounded-2xl ${errors.password ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                                    placeholder={
                                        mode === "create" ? "Minimum 8 characters" : "Leave blank if unchanged"
                                    }
                                />

                                {errors.password && (
                                    <p className="pl-1 text-xs font-medium text-red-500">{errors.password}</p>
                                )}
                            </div>

                            {/* NOTES */}
                            <div className="flex items-center">
                                <div className="px-4 py-2 mt-6 h-12">
                                    <p className="text-xs text-amber-800">
                                        Remember the password. <br /> You can still change it later when updating the account.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* FOOTER */}
                <div className="flex shrink-0 justify-end gap-3 border-t px-6 py-5">
                    <Button
                        variant="outline"
                        className="rounded-2xl cursor-pointer"
                        onClick={() => setOpenDetailDialog(false)}
                    >
                        Cancel
                    </Button>

                    <Button
                        disabled={isMutating || (isLoadingUser && mode === "update")}
                        onClick={handleSubmit}
                        className="rounded-2xl cursor-pointer"
                    >
                        {isMutating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {mode === "create" ? "Create User" : "Save Changes"}
                    </Button>
                </div>
            </div>
        </div>
    );
};
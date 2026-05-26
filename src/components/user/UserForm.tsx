import { Loader2, UserCog } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { User, UserData } from "@/lib/type/user";
import { useState } from "react";
import { useCreateMutation, useUpdateMutation } from "@/hooks/use-user";

interface UserFormProps {
    selectedUser: UserData | null;
    mode: "view" | "create" | "update";
    userId?: string;
    setOpenDetailDialog: (open: boolean) => void;
}

type FormKeys = "employeeCode" | "fullName" | "email" | "department" | "position" | "role" | "password";

export const UserForm = ({
    selectedUser,
    mode,
    userId,
    setOpenDetailDialog
}: UserFormProps) => {
    const createMutation = useCreateMutation();
    const updateMutation = useUpdateMutation();
    const [currentMode, setCurrentMode] = useState<"view" | "create" | "update">(mode)

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

        (["employeeCode", "fullName", "email", "department", "position", "role"] as FormKeys[]).forEach((key) => {
            if (!form[key] || form[key].toString().trim() === "") newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')} is required`;
        });

        if (currentMode === "create") {
            if (!form.password || form.password.trim() === "") {
                newErrors.password = "Password is required";
            } else if (form.password.length < 8) {
                newErrors.password = "Password must be at least 8 characters";
            }
        }

        if (currentMode === "update" && form.password && form.password.trim() !== "" && form.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        }

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
            currentMode === "update" && !form.password
                ? {
                    employeeCode: form.employeeCode,
                    fullName: form.fullName,
                    email: form.email,
                    department: form.department,
                    position: form.position,
                    role: form.role,
                }
                : form;

        if (currentMode === "create") {
            createMutation.mutate(payload as User, {
                onSuccess: () => {
                    setOpenDetailDialog(false);
                },
            });
        } else if (currentMode === "update" && userId) {
            updateMutation.mutate(
                {
                    id: userId,
                    payload: payload as User,
                },
                {
                    onSuccess: () => {
                        setOpenDetailDialog(false);
                    },
                }
            );
        }
    };

    const isUnchanged =
        form.employeeCode === (selectedUser?.employeeCode || "") &&
        form.fullName === (selectedUser?.fullName || "") &&
        form.email === (selectedUser?.email || "") &&
        form.department === (selectedUser?.department || "") &&
        form.position === (selectedUser?.position || "") &&
        form.role === (selectedUser?.role || "EMPLOYEE") &&
        form.password === "";

    const isMutating = createMutation.isPending || updateMutation.isPending;

    return (
        <>
            {/* BODY FORM */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
                <div className="mb-6 rounded-3xl border border-indigo-100 bg-indigo-50/50 p-5">
                    <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-indigo-100 p-3 text-indigo-600">
                            <UserCog className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-indigo-900">Employee Account</p>
                            <p className="text-xs text-indigo-700">User data and access configuration</p>
                        </div>
                    </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                    {/* EMPLOYEE CODE */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-700">
                            Employee Code <span className="text-red-600">*</span>
                        </label>
                        <Input
                            value={form.employeeCode}
                            onChange={(e) => handleInputChange("employeeCode", e.target.value)}
                            className={`disabled:bg-white disabled:cursor-not-allowed disabled:opacity-70 disabled:text-muted-foreground h-12 rounded-xl ${errors.employeeCode ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                            placeholder="EMP001"
                            disabled={currentMode === "view"}
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
                            className={`disabled:bg-white disabled:cursor-not-allowed disabled:opacity-70 disabled:text-muted-foreground h-12 rounded-xl ${errors.fullName ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                            placeholder="John Doe"
                            disabled={currentMode === "view"}
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
                            className={`disabled:bg-white disabled:cursor-not-allowed disabled:opacity-70 disabled:text-muted-foreground h-12 rounded-xl ${errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                            placeholder="john@example.com"
                            disabled={currentMode === "view"}
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
                            className={`disabled:bg-white disabled:cursor-not-allowed disabled:opacity-70 disabled:text-muted-foreground h-12 rounded-xl ${errors.department ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                            placeholder="Engineering"
                            disabled={currentMode === "view"}
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
                            className={`disabled:bg-white disabled:cursor-not-allowed disabled:opacity-70 disabled:text-muted-foreground h-12 rounded-xl ${errors.position ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                            placeholder="Backend Engineer"
                            disabled={currentMode === "view"}
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
                            disabled={currentMode === "view"}
                            onChange={(e) => handleInputChange("role", e.target.value)}
                            className={`disabled:bg-white disabled:cursor-not-allowed disabled:opacity-70 disabled:text-muted-foreground h-12 w-full rounded-xl border bg-white px-4 text-sm outline-none cursor-pointer ${errors.role ? "border-red-500 focus:border-red-500" : "border-zinc-200"}`}
                        >
                            <option value="EMPLOYEE">EMPLOYEE</option>
                            <option value="HRD">HRD</option>
                        </select>
                        {errors.role && (
                            <p className="text-xs text-red-500 font-medium pl-1">{errors.role}</p>
                        )}
                    </div>

                    {/* PASSWORD */}
                    {currentMode !== "view" && (
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-700">
                                {currentMode === "update" && <span>Change</span>} Password {currentMode === "create" && <span className="text-red-600">*</span>}
                            </label>
                            <Input
                                type="password"
                                value={form.password}
                                onChange={(e) => handleInputChange("password", e.target.value)}
                                className={`disabled:bg-white disabled:opacity-70 disabled:text-muted-foreground h-12 rounded-xl ${errors.password ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                                placeholder={
                                    currentMode === "create" ? "Minimum 8 characters" : "Leave blank if unchanged"
                                }
                            />
                            {errors.password && (
                                <p className="pl-1 text-xs font-medium text-red-500">{errors.password}</p>
                            )}
                        </div>
                    )}

                    {/* NOTES */}
                    {currentMode !== "view" && (
                        <div className="flex items-center">
                            <div className="px-4 py-2 mt-6 h-12">
                                <p className="text-xs text-amber-800">
                                    Remember the password. <br /> You can still change it later when updating the account.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* FOOTER */}
            {currentMode !== "view" ? (
                <div className="flex shrink-0 justify-end gap-3 border-t px-6 py-5">
                    <Button
                        variant="outline"
                        className="rounded-xl cursor-pointer"
                        onClick={() => currentMode === "create" ? setOpenDetailDialog(false) : setCurrentMode("view")}
                    >
                        Cancel
                    </Button>

                    <Button
                        disabled={isMutating || (currentMode === "update" && isUnchanged)}
                        onClick={handleSubmit}
                        className="rounded-xl cursor-pointer px-4"
                    >
                        {isMutating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {currentMode === "create" ? "Create User" : "Save Changes"}
                    </Button>
                </div>
            ) : (
                <div className="flex shrink-0 justify-end gap-3 border-t px-6 py-5">
                    <Button
                        disabled={isMutating}
                        onClick={() => setCurrentMode("update")}
                        className="rounded-xl cursor-pointer px-10"
                    >
                        Edit
                    </Button>
                </div>
            )}
        </>
    );
};

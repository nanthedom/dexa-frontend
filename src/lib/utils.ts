import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { AttendanceStatus, TodayStatus } from "./type/attendance"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateAttendanceStatus(
  todayStatus: TodayStatus
): AttendanceStatus {
  if (!todayStatus.isWorkday || !todayStatus.window) return "not-open";

  const hasCheckedIn = !!todayStatus.attendance?.checkInAt;
  const hasCheckedOut = !!todayStatus.attendance?.checkOutAt;

  if (hasCheckedIn && hasCheckedOut) return "completed";

  const now = new Date().getTime();
  const checkInOpen = new Date(todayStatus.window.checkInOpenTime).getTime();
  const checkInClose = new Date(todayStatus.window.checkInCloseTime).getTime();
  const checkOutOpen = new Date(todayStatus.window.checkOutOpenTime).getTime();
  const checkOutClose = new Date(todayStatus.window.checkOutCloseTime).getTime();

  if (now < checkInOpen) return "not-open";

  if (!hasCheckedIn && now > checkInClose) return "missed";
  if (hasCheckedIn && !hasCheckedOut && now > checkOutClose) return "missed";

  const isCheckInWindow = now >= checkInOpen && now <= checkInClose;
  const isCheckOutWindow = now >= checkOutOpen && now <= checkOutClose;

  if (!hasCheckedIn && isCheckInWindow) return "open";
  if (hasCheckedIn && !hasCheckedOut && isCheckOutWindow) return "open";

  if (hasCheckedIn && !hasCheckedOut && now < checkOutOpen) return "checked-in";

  return "not-open";
}

export function getPaginationPages(
  currentPage: number,
  totalPage: number
): (number | "ellipsis")[] {
  if (totalPage <= 5) {
    return Array.from({ length: totalPage }, (_, i) => i + 1)
  }
  if (currentPage <= 2) {
    return [1, 2, 3, 4, "ellipsis", totalPage]
  }
  if (currentPage >= totalPage - 1) {
    return [1, "ellipsis", totalPage - 3, totalPage - 2, totalPage - 1, totalPage]
  }
  return [
    1,
    "ellipsis",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "ellipsis",
    totalPage,
  ]
}

export const formatDate = (dateString?: string | null) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleString("id-ID", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit"
  }) + " WIB";
};

export const formatTimeOnly = (dateString: string) => {
  return new Date(dateString).toLocaleTimeString("id-ID", {
    hour: "2-digit", minute: "2-digit"
  });
};

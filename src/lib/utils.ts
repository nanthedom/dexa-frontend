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

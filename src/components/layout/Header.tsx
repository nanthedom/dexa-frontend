import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import Link from "next/link"

export const Header = () => {
    return (
        < header className="sticky top-0 z-20 border-b bg-white/90 backdrop-blur" >
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
                <Link href="/">
                    <div className="flex items-center gap-3 cursor-pointer">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-black text-white">
                            <span className="text-sm font-bold">
                                D
                            </span>
                        </div>

                        <div className="leading-tight">
                            <h1 className="text-base font-semibold">
                                Dexa Attendance
                            </h1>

                            <p className="text-xs text-zinc-500">
                                Manage employee attendance seamlessly.
                            </p>
                        </div>
                    </div>
                </Link>

                <Button
                    variant="outline"
                    className="gap-2 rounded-xl cursor-pointer"
                >
                    <LogOut className="h-4 w-4" />
                    Logout
                </Button>
            </div>
        </header >
    )
}

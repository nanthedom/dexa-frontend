"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { getPaginationPages, cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination"

interface PaginationBarProps {
    page: number
    totalPage: number
    totalData: number
    limit: number
    pageInput: string
    onPageChange: (page: number) => void
    onPageInputChange: (value: string) => void
    onLimitChange: (limit: number) => void
}

export function PaginationBar({
    page,
    totalPage,
    totalData,
    limit,
    pageInput,
    onPageChange,
    onPageInputChange,
    onLimitChange,
}: PaginationBarProps) {
    const canPrev = page > 1
    const canNext = page < totalPage
    const pages = getPaginationPages(page, totalPage)

    const handleGoToPage = () => {
        const n = Number(pageInput)
        if (Number.isFinite(n) && n >= 1 && n <= totalPage) {
            onPageChange(n)
        }
    }

    return (
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between overflow-auto">
            <div className="flex flex-col lg:flex-row items-center gap-4">
                <div className="flex flex-row items-center gap-3">
                    <span className="text-sm font-normal leading-[140%] tracking-[0.005em] text-foreground p-2">
                        Item Per page
                    </span>
                    <Select
                        value={String(limit)}
                        onValueChange={(v) => {
                            onLimitChange(Number(v))
                            onPageChange(1)
                            onPageInputChange("1")
                        }}
                    >
                        <SelectTrigger className="h-[33px] w-[90px] rounded-[2px] bg-white px-3 text-xs font-semibold text-foreground">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="25">25</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                            <SelectItem value="100">100</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex flex-row items-center gap-3">
                    <span className="text-sm font-normal leading-[140%] tracking-[0.005em] text-foreground p-2">
                        Go To
                    </span>
                    <div className="flex flex-row">
                        <Input
                            aria-label="Page number"
                            className="h-[33px] lg:max-w-[80px] max-w-[70px] px-3 py-2 rounded-l-[2px] rounded-r-none border border-r-0 text-center text-xs font-normal text-foreground placeholder:text-[#C1C1C1]"
                            placeholder="Page No"
                            value={pageInput}
                            onChange={(e) => onPageInputChange(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") handleGoToPage()
                            }}
                        />
                        <Button
                            className="h-[33px] rounded-l-none rounded-r-[2px] bg-primary px-3 text-xs font-semibold leading-[140%] text-white cursor-pointer"
                            onClick={handleGoToPage}
                        >
                            Go
                        </Button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row items-center gap-4">
                <span className="text-center lg:text-left w-full text-sm font-normal leading-[140%] tracking-[0.005em] text-foreground">
                    Number of entries <span className="font-bold">{totalData}</span>
                </span>
                <Pagination>
                    <PaginationContent className="flex flex-row items-center gap-2">
                        <PaginationItem>
                            <Button
                                variant="ghost"
                                size="sm"
                                className={cn(
                                    "h-9 gap-1 rounded-[12px] text-sm font-normal leading-[140%] tracking-[0.005em] disabled:opacity-100",
                                    !canPrev ? "text-muted-foreground" : "text-foreground cursor-pointer"
                                )}
                                disabled={!canPrev}
                                onClick={() => {
                                    const newPage = Math.max(1, page - 1)
                                    onPageChange(newPage)
                                    onPageInputChange(String(newPage))
                                }}
                            >
                                <ChevronLeft className="h-4 w-4" />
                                Prev
                            </Button>
                        </PaginationItem>
                        {pages.map((item, idx) =>
                            item === "ellipsis" ? (
                                <PaginationItem key={`ellipsis-${idx}`}>
                                    <span className="flex h-5 min-w-5 items-center justify-center px-1 text-sm font-normal leading-[140%] tracking-[0.005em] text-foreground">
                                        ...
                                    </span>
                                </PaginationItem>
                            ) : (
                                <PaginationItem key={item}>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className={cn(
                                            "h-5 min-w-5 rounded-[2px] px-1 text-sm font-normal leading-[140%] tracking-[0.005em] cursor-pointer",
                                            page === item
                                                ? "bg-primary text-white hover:bg-primary hover:text-white"
                                                : "text-foreground hover:bg-muted"
                                        )}
                                        onClick={() => {
                                            onPageChange(item)
                                            onPageInputChange(String(item))
                                        }}
                                    >
                                        {item}
                                    </Button>
                                </PaginationItem>
                            )
                        )}
                        <PaginationItem>
                            <Button
                                variant="ghost"
                                size="sm"
                                className={cn(
                                    "h-9 gap-1 rounded-[12px] text-sm font-normal leading-[140%] tracking-[0.005em] disabled:opacity-100",
                                    !canNext ? "text-muted-foreground" : "text-foreground cursor-pointer"
                                )}
                                disabled={!canNext}
                                onClick={() => {
                                    const newPage = Math.min(totalPage, page + 1)
                                    onPageChange(newPage)
                                    onPageInputChange(String(newPage))
                                }}
                            >
                                Next
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    )
}

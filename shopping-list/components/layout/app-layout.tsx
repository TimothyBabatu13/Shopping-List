"use client"

import type React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

type SyncStatus = "offline" | "syncing" | "synced"

export function AppLayout({ children }: { children: React.ReactNode }) {
  const syncStatus: SyncStatus = "synced"

  const syncStatusColors = {
    offline: "bg-muted-foreground",
    syncing: "bg-warning",
    synced: "bg-success",
  }

  const syncStatusStyles: Record<SyncStatus, React.CSSProperties> = {
    offline: { backgroundColor: "#6B7280" },
    syncing: { backgroundColor: "#D97706" },
    synced: { backgroundColor: "#16A34A" },
  }

  const syncStatusLabels = {
    offline: "Offline",
    syncing: "Syncing",
    synced: "Synced",
  }

  console.log(syncStatusLabels[syncStatus])
  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex h-14 max-w-[720px] items-center justify-between px-4">
          <h1 className="text-lg font-semibold text-foreground">Shopping List</h1>

          <div className="flex items-center gap-4">
            <Badge 
              variant="secondary" 
              className={`text-xs font-normal text-white`}
              style={syncStatusStyles[syncStatus]}
            >
              {syncStatusLabels[syncStatus]}
            </Badge>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 gap-1 px-2">
                  <span className="text-sm">User</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-[720px] px-4 py-4">{children}</main>
    </div>
  )
}

"use client"

import type React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
import { useEffect, useState } from "react"
import Link from "next/link"
import { SyncStatus } from "@/types/type"
import { useAuthContext } from "@/context/auth-context"

const syncStatusLabels = {
  offline: "Offline",
  syncing: "Syncing",
  synced: "Synced",
}

const AppLayout = () => {
  
  const [syncStatus, setSyncStatus] = useState<SyncStatus>("offline")

  const syncStatusStyles: Record<SyncStatus, React.CSSProperties> = {
    offline: { backgroundColor: "#6B7280" },
    syncing: { backgroundColor: "#D97706" },
    synced: { backgroundColor: "#16A34A" },
  }
 
  const { logout } = useAuthContext();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    
    setSyncStatus(navigator.onLine ? "synced" : "offline");
    
    const handleOnline = () => {  
      setSyncStatus("syncing")
      setTimeout(() => setSyncStatus("synced"), 1000)
    }

    const handleOffline = () => {
      setSyncStatus("offline")
    }

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const handleLogOut =  () => {
   setIsLoggingOut(true)
    try {
      logout().then(() => setIsLoggingOut(false))
    } catch (error) {
      console.log(error)
    }
    finally{
      setIsLoggingOut(false)
    }
  }

  return (
    <div className="bg-background">

      <header className="border-b border-border bg-card">
        <div className="mx-auto flex h-14 max-w-180 items-center justify-between px-4">
          <Link href={'/'}>
            <h1 className="text-lg font-semibold text-foreground">Shopping List</h1>
          </Link>

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
                <DropdownMenuItem asChild>
                  <Link href={'/settings'}>
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogOut}>
                    Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
    </div>
  )
}

export default AppLayout
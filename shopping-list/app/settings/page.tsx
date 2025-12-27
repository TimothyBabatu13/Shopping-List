"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useAuthContext } from "@/context/auth-context"
import { useState } from "react"

const SettingsPage = () => {
  const { user, logout } = useAuthContext()
  // if(!user) return <></>
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  
  const handleLogOut = () => {
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

      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>

        <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold text-foreground">Account Information</h2>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-muted-foreground">Email</span>
              {user && <span className="text-sm text-foreground">{user.email}</span>}
            </div>
          </div>
          <Separator />
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold text-foreground">Account Actions</h2>
            <Button 
              variant="destructive" 
              className="h-10 w-full"
              onClick={handleLogOut}
            >
              {isLoggingOut ? 'Logging out...' : 'Logout'}
              
            </Button>
          </div>
        </div>
      </div>
  )
}

export default SettingsPage
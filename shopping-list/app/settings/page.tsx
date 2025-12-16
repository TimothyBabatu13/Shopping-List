"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function SettingsPage() {
  return (
    <AppLayout>
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>

        <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold text-foreground">Account Information</h2>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-muted-foreground">Email</span>
              <span className="text-sm text-foreground">user@example.com</span>
            </div>
          </div>

          <Separator />

          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold text-foreground">Security</h2>
            <Button variant="outline" className="h-10 w-full bg-transparent">
              Change Password
            </Button>
          </div>

          <Separator />

          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold text-foreground">Account Actions</h2>
            <Button variant="destructive" className="h-10 w-full">
              Logout
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

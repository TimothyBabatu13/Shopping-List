"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Copy } from "lucide-react"
import { toast } from "sonner"

type InviteCollaboratorDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function InviteCollaboratorDialog({ open, onOpenChange }: InviteCollaboratorDialogProps) {
  const [email, setEmail] = useState("")


  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      toast.success(`Invitation sent Invited ${email} to collaborate`)
      setEmail("")
    }
  }

  const handleCopyLink = () => {
    const inviteLink = `${window.location.origin}/invite/abc123`
    navigator.clipboard.writeText(inviteLink)
    toast(`Link copied. Invite link copied to clipboard`)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Invite Collaborator</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleInvite} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-10"
            />
          </div>
          <Button type="submit" className="h-10 w-full" disabled={!email.trim()}>
            Invite
          </Button>
        </form>

        <div className="relative">
          <Separator className="my-4" />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-popover px-2 text-xs text-muted-foreground">
            OR
          </span>
        </div>

        <Button variant="outline" className="h-10 w-full bg-transparent" onClick={handleCopyLink}>
          <Copy className="mr-2 h-4 w-4" />
          Copy Invite Link
        </Button>
      </DialogContent>
    </Dialog>
  )
}

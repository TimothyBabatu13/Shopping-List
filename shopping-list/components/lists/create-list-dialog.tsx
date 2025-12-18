"use client"

import type React from "react"
import { Dispatch, SetStateAction, useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ViewList } from "@/types/type"
import { generateId } from "@/lib/lib"
import { useLists } from "@/hooks/use-db"

export const CreateListDialog = ({ open, onOpenChange }: {
  open: boolean
  onOpenChange: (open: boolean) => void
  // setLists: Dispatch<SetStateAction<ViewList[]>>
}) => {
  
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const { addList } = useLists()
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      addList(name.trim(), description.trim() || undefined)
      setName("")
      setDescription("")
      onOpenChange(false)
    }
  }


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Create List</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="List name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-10"
              required
            />
          </div>
          <div>
            <Input
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="h-10"
            />
          </div>
          <Button type="submit" className="h-10 w-full" disabled={!name.trim()}>
            Create
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

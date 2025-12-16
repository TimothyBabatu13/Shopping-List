"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { UserPlus, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { ListItemRow } from "./list-item-row"
import { AddItemInput } from "./add-item-input"
import { InviteCollaboratorDialog } from "./invite-collaborator-dialog"

type ListItem = {
  id: string
  name: string
  quantity?: string
  checked: boolean
}

export function SingleListView({ listId }: { listId: string }) {
  const [items, setItems] = useState<ListItem[]>([
    { id: "1", name: "Milk", quantity: "2L", checked: false },
    { id: "2", name: "Bread", checked: true },
    { id: "3", name: "Eggs", quantity: "12", checked: false },
  ])
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false)

  const handleAddItem = (name: string, quantity?: string) => {
    const newItem: ListItem = {
      id: Date.now().toString(),
      name,
      quantity,
      checked: false,
    }
    setItems([...items, newItem])
  }

  const handleToggleItem = (id: string) => {
    setItems(items.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)))
  }

  const handleEditItem = (id: string, name: string, quantity?: string) => {
    setItems(items.map((item) => (item.id === id ? { ...item, name, quantity } : item)))
  }

  const handleDeleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  return (
    <>
      <div className="mb-4 flex items-center gap-2">
        <Link href="/lists">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h2 className="text-2xl font-bold text-foreground">Groceries</h2>
      </div>

      <div className="mb-4">
        <Button onClick={() => setIsInviteDialogOpen(true)} variant="outline" className="h-10">
          <UserPlus className="mr-2 h-4 w-4" />
          Invite Collaborators
        </Button>
      </div>

      <div className="mb-4 space-y-2">
        {items.map((item) => (
          <ListItemRow
            key={item.id}
            item={item}
            onToggle={handleToggleItem}
            onEdit={handleEditItem}
            onDelete={handleDeleteItem}
          />
        ))}
      </div>

      <AddItemInput onAddItem={handleAddItem} />

      <InviteCollaboratorDialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen} />
    </>
  )
}

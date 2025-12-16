"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Pencil, Trash2, Check, X } from "lucide-react"

type ListItem = {
  id: string
  name: string
  quantity?: string
  checked: boolean
}

type ListItemRowProps = {
  item: ListItem
  onToggle: (id: string) => void
  onEdit: (id: string, name: string, quantity?: string) => void
  onDelete: (id: string) => void
}

export function ListItemRow({ item, onToggle, onEdit, onDelete }: ListItemRowProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editName, setEditName] = useState(item.name)
  const [editQuantity, setEditQuantity] = useState(item.quantity || "")

  const handleSave = () => {
    if (editName.trim()) {
      onEdit(item.id, editName.trim(), editQuantity.trim() || undefined)
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setEditName(item.name)
    setEditQuantity(item.quantity || "")
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-3">
        <div className="flex flex-1 gap-2">
          <Input
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            placeholder="Item name"
            className="h-10 flex-1"
          />
          <Input
            value={editQuantity}
            onChange={(e) => setEditQuantity(e.target.value)}
            placeholder="Quantity"
            className="h-10 w-24"
          />
        </div>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleSave}>
            <Check className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleCancel}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
      <Checkbox checked={item.checked} onCheckedChange={() => onToggle(item.id)} />
      <div className="flex-1">
        <span className={`text-sm ${item.checked ? "text-muted-foreground line-through" : "text-foreground"}`}>
          {item.name}
          {item.quantity && <span className="ml-2 text-muted-foreground">({item.quantity})</span>}
        </span>
      </div>
      <div className="flex gap-1">
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsEditing(true)}>
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-destructive hover:text-destructive"
          onClick={() => onDelete(item.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

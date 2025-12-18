"use client"

import { Dispatch, SetStateAction, useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Pencil, Trash2, Check, X } from "lucide-react"
import { ListItem } from "@/types/type"
import { useList } from "@/hooks/use-db"

export const ListItemRow = ({ item, listId }: {
  item: ListItem
  listId: string
}) => {

  const [isEditing, setIsEditing] = useState(false)
  const [editName, setEditName] = useState(item.name)
  const [editQuantity, setEditQuantity] = useState(item.quantity || "")

  const { deleteItem, toggleItemChecked, updateItem } = useList(listId);

  const handleUpdate = async () => {
    if (editName.trim()) {
      await updateItem(item.id, editName.trim(), editQuantity.trim())
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
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleUpdate}>
            <Check className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleCancel}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    )
  }


  const handleDelete = async () => {
    await deleteItem(item.id)
  }
  
  const getToggleValue = () => {
    return item.checked ? false : true 
  }

  const handleToggle = async () => {
    toggleItemChecked(item.id, getToggleValue())
  }

  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
      <Checkbox checked={item.checked} onCheckedChange={handleToggle} />
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
          onClick={handleDelete}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

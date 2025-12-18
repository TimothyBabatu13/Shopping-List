"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react"
import { useList } from "@/hooks/use-db"


export const AddItemInput = ({ listId } : {
  listId: string
}) => {

  const [name, setName] = useState("")
  const [quantity, setQuantity] = useState("")
  const { addItem } = useList(listId)
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      await addItem(name.trim(), quantity.trim())
      setName("")
      setQuantity("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input placeholder="Item name" value={name} onChange={(e) => setName(e.target.value)} className="h-10 flex-1" />
      <Input
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        className="h-10 w-24"
      />
      <Button type="submit" className="h-10" disabled={!name.trim()}>
        <Plus className="h-4 w-4" />
      </Button>
    </form>
  )
}

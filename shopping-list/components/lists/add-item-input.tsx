"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react"

type AddItemInputProps = {
  onAddItem: (name: string, quantity?: string) => void
}

export function AddItemInput({ onAddItem }: AddItemInputProps) {
  const [name, setName] = useState("")
  const [quantity, setQuantity] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      onAddItem(name.trim(), quantity.trim() || undefined)
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

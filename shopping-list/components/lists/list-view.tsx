"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Users, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { CreateListDialog } from "./create-list-dialog"

type List = {
  id: string
  name: string
  description?: string
  itemCount: number
  collaboratorCount: number
}

export function ListsView() {
  const [lists, setLists] = useState<List[]>([
    {
      id: "1",
      name: "Groceries",
      description: "Weekly shopping",
      itemCount: 12,
      collaboratorCount: 2,
    },
    {
      id: "2",
      name: "Home Supplies",
      itemCount: 5,
      collaboratorCount: 1,
    },
  ])
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const handleCreateList = (name: string, description?: string) => {
    const newList: List = {
      id: Date.now().toString(),
      name,
      description,
      itemCount: 0,
      collaboratorCount: 1,
    }
    setLists([...lists, newList])
  }

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Your Lists</h2>
        <Button onClick={() => setIsCreateDialogOpen(true)} className="h-10">
          <Plus className="mr-2 h-4 w-4" />
          Create List
        </Button>
      </div>

      <div className="space-y-4">
        {lists.map((list) => (
          <Link key={list.id} href={`/lists/${list.id}`}>
            <div className="rounded-lg border border-border bg-card p-4 transition-colors hover:bg-muted">
              <h3 className="mb-1 text-lg font-semibold text-foreground">{list.name}</h3>
              {list.description && <p className="mb-3 text-sm text-muted-foreground">{list.description}</p>}
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <ShoppingCart className="h-4 w-4" />
                  <span>{list.itemCount} items</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{list.collaboratorCount} collaborators</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <CreateListDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onCreateList={handleCreateList}
      />
    </>
  )
}

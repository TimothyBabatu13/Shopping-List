"use client"

import { Dispatch, SetStateAction, useState } from "react"
import { CreateListDialog } from "./create-list-dialog"
import CreateList from "./create-list"
import ListCard from "./list-card"
import { useLists } from "@/hooks/use-db"

import { EmptyState } from "./empty-state"
import { LoadingSpinner } from "./loading-state"




const data: Array<any> = [
  {
      id: "1",
      name: "Groceries",
      description: "Weekly shopping",
      itemCount: 12,
      collaboratorCount: 2,
      createdAt: Date.now()
    },
    {
      id: "2",
      name: "Home Supplies",
      itemCount: 5,
      collaboratorCount: 1,
      createdAt: Date.now()
    },
]

const Header = ({ setIsCreateDialogOpen } : {
  setIsCreateDialogOpen: Dispatch<SetStateAction<boolean>>
}) => {
  return(
    <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Your Lists</h2>
        <CreateList setIsCreateDialogOpen={setIsCreateDialogOpen}/>
    </div>
  )
}

export const ListsView = () => {
  const { lists, isLoading } = useLists()

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  
  if(isLoading) return (
    <>
    <Header setIsCreateDialogOpen={setIsCreateDialogOpen}/>
    <LoadingSpinner />
    </>
  )
  if(!lists.length) return (
    <>
    <Header setIsCreateDialogOpen={setIsCreateDialogOpen}/>
    <EmptyState message="No lists yet. Add a new list to get started." />
    <CreateListDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </>)
 console.log(lists)
  return (
    <>
      <Header setIsCreateDialogOpen={setIsCreateDialogOpen}/>
      <div className="space-y-4 grid">
        {lists.map((list) => (
          <ListCard 
            list={list}
            key={list.id}
          />
        ))}
      </div>
      <CreateListDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        // setLists={setLists}
      />
    </>
  )
}

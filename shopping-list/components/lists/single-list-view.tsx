"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { User, UserPlus } from "lucide-react"
import { ListItemRow } from "./list-item-row"
import { AddItemInput } from "./add-item-input"
import { InviteCollaboratorDialog } from "./invite-collaborator-dialog"
import GoBack from "./go-back"
import { useList } from "@/hooks/use-db"
import { useAuthContext } from "@/context/auth-context"
import { toast } from "sonner"

export const SingleListView = ({ listId }: { listId: string }) => {
  const { loginWithGoogle, user } = useAuthContext();
  const [checkIfToLogin, setCheckToLogin] = useState(false);
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false)

  const { list } = useList(listId);
  
  if(!list) return null

  return (
    <>
      <div className="mb-4 flex items-center gap-2">
        <GoBack />
        <h2 className="text-2xl font-bold text-foreground">{list.name}</h2>
      </div>
      {list.description && <h3 className="text-[18px] font-normal text-foreground mb-4">{list.description}</h3>}
      <div className="mb-4 flex items-center gap-2">
        <Button 
          onClick={()=>{
            console.log(user)
            if(!user) {
              toast.error("You need to be logged in to invite collaborators");
              setCheckToLogin(true)
              return
            }
            setIsInviteDialogOpen(true)
          }} 
          variant="outline" 
          className="h-10"
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Invite Collaborators
        </Button>


        {checkIfToLogin && !user && 
        <Button 
          onClick={()=>{
            loginWithGoogle()
          }} 
          variant="outline" 
          className="h-10"
        >
          <User className="mr-2 h-4 w-4" />
          Login
        </Button>}
      </div>

      <div className="mb-4 space-y-2">
        {
          list.items.length < 1 && (
            <p>You have nothing here for now</p>
          )
        }
        {list.items.length > 0 && list.items.map((item) => (
          <ListItemRow
            key={item.id}
            listId={listId}
            item={item}
          />
        ))}
      </div>

      <AddItemInput listId={listId}/>

      <InviteCollaboratorDialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen} />
    </>
  )
}

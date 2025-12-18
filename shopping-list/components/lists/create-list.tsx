"use client";

import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { SetStateAction } from "react";

const CreateList = ({setIsCreateDialogOpen } : {
    setIsCreateDialogOpen: (value: SetStateAction<boolean>) => void
}) => {
  return (
     <Button 
        onClick={() => {
          setIsCreateDialogOpen(true)
          console.log('hi')
        }} 
        className="h-10"
    >
        <Plus className="mr-2 h-4 w-4" />
        Create List
    </Button>
  )
}

export default CreateList
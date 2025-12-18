"use client";

import { ViewList } from "@/types/type";
import { ShoppingCart, Trash2, Users } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion"
import { Button } from "../ui/button";
// import { DeleteAnimation } from "./delete-animation";
import { MouseEvent, useState } from "react";
import { formatDate } from "@/lib/lib";
import { useLists } from "@/hooks/use-db";
import { DeleteAnimation } from "./delete-animation";

const ListCard = ({ list } : {
    list: ViewList,
}) => {
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const { deleteList } = useLists();
  const deleteItem = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation()
    setIsHidden(true)
    deleteList(list.id);
  }

  return (
    // <GlassBreak trigger={isHidden} onComplete={()=>{}}>
    //   <DeleteAnimation hidden={isHidden}>
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className=""
        >
          <Link key={list.id} href={`/lists/${list.id}`}>
            <div className="rounded-lg border border-border bg-card p-4 transition-colors hover:bg-muted">
              <div className="mb-1 flex items-start justify-between">
                <h3 className="text-lg font-semibold text-foreground">{list.name}</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  onClick={(e)=>{
                    deleteItem(e)
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              {list.description && <p className="mb-3 text-sm text-muted-foreground">{list.description}</p>}
              <p className="mb-3 text-xs text-muted-foreground">Created {formatDate(list.createdAt)}</p>
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
        </motion.div>
      // {/* </DeleteAnimation> */}
    // </GlassBreak>
  )
}

export default ListCard

import { ViewList } from "@/types/type"
import Dexie from "dexie"

export interface ListItem {
  id: string
  listId: string
  name: string
  quantity: string
  checked: boolean
}

class AppDB extends Dexie {
  lists: Dexie.Table<ViewList, string>
  items: Dexie.Table<ListItem, string>

  constructor() {
    super("ShoppingListDB")
    this.version(1).stores({
      lists: "id,name,createdAt",
      items: "id,listId,name,checked"
    })
    this.lists = this.table("lists")
    this.items = this.table("items")
  }
}

export const db = new AppDB()
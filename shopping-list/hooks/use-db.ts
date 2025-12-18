import { db } from "@/db/db"
import { generateId } from "@/lib/lib"
import { ViewList } from "@/types/type"
import { useEffect, useState } from "react"

export const useLists = () => {
  const [lists, setLists] = useState<ViewList[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchLists = async () => {
    const allLists = await db.lists
    .orderBy("createdAt")
    .reverse()
    .toArray()
    setLists(allLists)
}

  useEffect(() => {
    fetchLists()
    .then(()=>{
        setIsLoading(false)
    })
    
    const handleChange = () => {
        fetchLists()
    }

    db.lists.hook("creating", (_primKey, _obj, transaction)=>{
        transaction.on("complete", () => {
            fetchLists()
        })
    })
    db.lists.hook("updating", ()=>{
        handleChange()
    })
    db.lists.hook("deleting", (_primKey, _obj, transaction)=>{
      transaction.on('complete', () => {
        fetchLists()
      })
    })

    return () => {
      db.lists.hook("creating").unsubscribe(handleChange)
      db.lists.hook("updating").unsubscribe(handleChange)
      db.lists.hook("deleting").unsubscribe(handleChange)
    }
  }, [])

  const addList = async (name: string, description?: string) => {
    const newList: ViewList = {
      id: generateId(),
      name,
      description,
      itemCount: 0,
      collaboratorCount: 1,
      createdAt: Date.now()
    }
    await db.lists.add(newList)
  }

  const deleteList = async (id: string) => {
    await db.lists.delete(id)
    await db.items.where("listId").equals(id).delete()
    fetchLists()
  }

  return { lists, addList, deleteList, isLoading }
}

/* This is for data lists/[id] */

export interface listTypeItemsType { 
  id: string; 
  name: string; 
  quantity: string; 
  checked: boolean 
}

export interface listType {
  id: string;
  name: string;
  description?: string;
  items: Array<listTypeItemsType>;
}

export const useList = (id: string) => {
  const [list, setList] = useState<listType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchList = async () => {
    const parent = await db.lists.get(id);
    if (!parent) {
      setList(null);
      setIsLoading(false);
      return;
    }

    const items = await db.items
      .where("listId")
      .equals(id)
      .toArray();

    setList({
      id: parent.id,
      name: parent.name,
      description: parent.description,
      items: items.map((i) => ({
        id: i.id,
        name: i.name,
        quantity: i.quantity,
        checked: i.checked,
      })),
    });

    setIsLoading(false);
  };

  useEffect(() => {
    if(!id) return
  fetchList();

  const handleChange = () => fetchList();

  db.items.hook("creating", (_primKey, _obj, transaction) => {
    transaction.on("complete", () => fetchList());
  });
  
  db.items.hook("updating", (_mods, _primKey, _obj, transaction) => {
    transaction.on("complete", () => fetchList());
  });

  db.items.hook("deleting", (_primKey, _obj, transaction) => {
    transaction.on("complete", () => fetchList());
  });

  return () => {
    db.items.hook("creating").unsubscribe(handleChange)
    db.items.hook("updating").unsubscribe(handleChange)
    db.items.hook("deleting").unsubscribe(handleChange)
  };
}, [id]);


  const addItem = async (name: string, quantity: string) => {
    await db.items.add({
      id: generateId(),
      listId: id,
      name,
      quantity,
      checked: false,
    });
  };

  const toggleItemChecked = async (itemId: string, checked: boolean) => {
    await db.items.update(itemId, { checked });
  };

  const updateItem = async (itemId: string, name: string, quantity: string) => {
    await db.items.update(itemId, { name, quantity });
  };

  const deleteItem = async (itemId: string) => {
    await db.items.delete(itemId);
  };

  return { list, isLoading, addItem, toggleItemChecked, deleteItem, updateItem };
};
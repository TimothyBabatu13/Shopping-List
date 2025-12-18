export type SyncStatus = "offline" | "syncing" | "synced"

export type ViewList = {
  id: string
  name: string
  description?: string
  itemCount: number
  collaboratorCount: number,
  createdAt: number
}

export type ListItem = {
  id: string
  name: string
  quantity?: string
  checked: boolean
}
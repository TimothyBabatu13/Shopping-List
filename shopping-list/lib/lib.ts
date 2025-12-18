import { v4 as uuidv4 } from 'uuid';
import {
  format,
  isToday,
  isYesterday,
  formatDistanceToNow
} from "date-fns"

export const generateId = () => {
    return uuidv4()
}

export const formatDate = (timestamp: number) => {
  const date = new Date(timestamp)

  if (isToday(date)) {
    return formatDistanceToNow(date, { addSuffix: true })
  }

  if (isYesterday(date)) {
    return "Yesterday"
  }

  return format(date, "MMM d, yyyy, h:mm a")
}
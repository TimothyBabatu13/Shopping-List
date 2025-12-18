import { ShoppingCart } from "lucide-react"

export const EmptyState = ({ message }: { message: string }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
      <p className="text-sm sm:text-base text-muted-foreground">{message}</p>
    </div>
  )
}

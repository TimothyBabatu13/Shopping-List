import { Skeleton } from "../ui/skeleton"

const LoadingSkeleton = () => {
  return(
    <div className="h-37.25 rounded-lg border border-border bg-card p-4 transition-colors hover:bg-muted">
      <div className="h-[32px]">
        <Skeleton className="h-[32px] mb-1"/>
        <Skeleton className="h-5 mb-3"/>
        <Skeleton className="h-4 mb-3"/>
        <Skeleton className="h-5"/>
      </div>
    </div>
  )
}
export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center py-12">

      <div className="h-8 w-8 animate-spin rounded-full border-4 border-border border-t-foreground"></div>
    </div>
  )
}

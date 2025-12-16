"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter()
  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center p-4">
      <div className="w-full max-w-[720px] bg-white rounded-lg p-16 text-center">
        <h1 className="text-2xl font-bold text-[#111827] mb-4">Something went wrong</h1>
        {error && error.message && <p className="text-sm text-[#DC2626] mb-8">{error.message}</p>}
        <Button
          onClick={() => router.back()}
          className="h-10 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg px-4"
        >
          Go Back
        </Button>
      </div>
    </div>
  )
}

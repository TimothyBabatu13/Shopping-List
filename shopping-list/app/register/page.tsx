"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function RegisterPage() {
  const handleTestShitOut = async () => {
    try {
      const api = await fetch('/api/start-email-job', {
        method: 'POST',
      })
      console.log(api)
      const data = await api.json();
      console.log(data);
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-100 rounded-lg border border-border bg-card p-8">
        <h1 className="mb-6 text-2xl font-bold text-foreground">Register</h1>

        <Button
          onClick={handleTestShitOut}
        >
          Test Shit out
        </Button>
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium text-foreground">
              Email
            </label>
            <Input id="email" type="email" placeholder="Enter your email" className="h-10" />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-medium text-foreground">
              Password
            </label>
            <Input id="password" type="password" placeholder="Enter your password" className="h-10" />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="confirm-password" className="text-sm font-medium text-foreground">
              Confirm Password
            </label>
            <Input id="confirm-password" type="password" placeholder="Confirm your password" className="h-10" />
          </div>

          <Button 
          type="submit" className="h-10 w-full">
            Register
          </Button>
        </form>

        <div className="mt-4 text-center">
          <Link href="/login" className="text-sm text-primary hover:underline">
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  )
}

"use client"

import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export function MobileMenu() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/verify')
        const data = await response.json()
        setIsAuthenticated(data.authenticated)
      } catch (error) {
        console.error('Error checking authentication:', error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const handleSignOut = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      })
      setIsAuthenticated(false)
      router.push('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <nav className="flex flex-col gap-4 mt-8">
          <Link href="/" className="text-lg font-medium hover:text-purple-600">
            Home
          </Link>
          <Link href="/explore" className="text-lg font-medium hover:text-purple-600">
            Explore
          </Link>
          <Link href="/subscriptions" className="text-lg font-medium hover:text-purple-600">
            Subscriptions
          </Link>
          <Link href="/my-comics" className="text-lg font-medium hover:text-purple-600">
            My Comics
          </Link>
          <Link href="/history" className="text-lg font-medium hover:text-purple-600">
            History
          </Link>
          <Link href="/liked" className="text-lg font-medium hover:text-purple-600">
            Liked Comics
          </Link>
          <Link href="/saved" className="text-lg font-medium hover:text-purple-600">
            Saved
          </Link>
          <div className="border-t my-4"></div>
          <Link href="/settings" className="text-lg font-medium hover:text-purple-600">
            Settings
          </Link>
          <Link href="/help" className="text-lg font-medium hover:text-purple-600">
            Help
          </Link>
          <Link href="/feedback" className="text-lg font-medium hover:text-purple-600">
            Send Feedback
          </Link>
          <div className="border-t my-4"></div>
          {!isLoading && (
            isAuthenticated ? (
              <button 
                onClick={handleSignOut} 
                className="text-lg font-medium text-red-600 hover:text-red-700"
              >
                Sign Out
              </button>
            ) : (
              <>
                <Link href="/signin" className="text-lg font-medium hover:text-purple-600">
                  Sign In
                </Link>
                <Link href="/signup" className="text-lg font-medium hover:text-purple-600">
                  Sign Up
                </Link>
              </>
            )
          )}
        </nav>
      </SheetContent>
    </Sheet>
  )
}

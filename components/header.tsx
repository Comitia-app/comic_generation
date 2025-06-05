'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { MobileMenu } from "@/components/mobile-menu"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

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

  // Check authentication on mount
  useEffect(() => {
    checkAuth()
  }, [])

  // Check authentication when window gets focus
  useEffect(() => {
    const handleFocus = () => {
      checkAuth()
    }

    window.addEventListener('focus', handleFocus)

    // Also check every second for the first 5 seconds after component mounts
    // This helps detect cookie changes right after login
    const intervalId = setInterval(() => {
      checkAuth()
    }, 1000)

    // Clear interval after 5 seconds
    const timeoutId = setTimeout(() => {
      clearInterval(intervalId)
    }, 5000)

    return () => {
      window.removeEventListener('focus', handleFocus)
      clearInterval(intervalId)
      clearTimeout(timeoutId)
    }
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
    <header className="border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold">
            Comitia
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          {!isLoading && (
            isAuthenticated ? (
              <Button 
                onClick={handleSignOut} 
                className="bg-red-600 hover:bg-red-700"
              >
                Sign Out
              </Button>
            ) : (
              <>
                <Link href="/signup">
                  <Button variant="outline" className="ml-2">
                    Sign Up
                  </Button>
                </Link>
                <Link href="/signin">
                  <Button className="bg-purple-600 hover:bg-purple-700">Sign In</Button>
                </Link>
              </>
            )
          )}
        </div>

        <div className="md:hidden">
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}

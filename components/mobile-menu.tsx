"use client"

import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"

export function MobileMenu() {
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
          <Link href="/signin" className="text-lg font-medium hover:text-purple-600">
            Sign In
          </Link>
          <Link href="/signup" className="text-lg font-medium hover:text-purple-600">
            Sign Up
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

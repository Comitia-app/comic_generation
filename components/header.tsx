import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { MobileMenu } from "@/components/mobile-menu"

export default function Header() {
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
          <Link href="/signup">
            <Button variant="outline" className="ml-2">
              Sign Up
            </Button>
          </Link>
          <Link href="/signin">
            <Button className="bg-purple-600 hover:bg-purple-700">Sign In</Button>
          </Link>
        </div>

        <div className="md:hidden">
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}

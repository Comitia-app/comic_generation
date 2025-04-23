import Link from "next/link"
import {
  Home,
  Compass,
  Users,
  BookOpen,
  History,
  Heart,
  Bookmark,
  Settings,
  HelpCircle,
  MessageSquare,
} from "lucide-react"

export default function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-64 border-r p-4 h-[calc(100vh-64px)] sticky top-16">
      <nav className="space-y-6">
        <div className="space-y-2">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Home className="h-5 w-5" />
            <span>Home</span>
          </Link>
          <Link
            href="/explore"
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Compass className="h-5 w-5" />
            <span>Explore</span>
          </Link>
          <Link
            href="/subscriptions"
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Users className="h-5 w-5" />
            <span>Subscriptions</span>
          </Link>
        </div>

        <div className="space-y-2">
          <Link
            href="/my-comics"
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <BookOpen className="h-5 w-5" />
            <span>My Comics</span>
          </Link>
          <Link
            href="/history"
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <History className="h-5 w-5" />
            <span>History</span>
          </Link>
          <Link
            href="/liked"
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Heart className="h-5 w-5" />
            <span>Liked Comics</span>
          </Link>
          <Link
            href="/saved"
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Bookmark className="h-5 w-5" />
            <span>Saved</span>
          </Link>
        </div>

        <div className="space-y-2">
          <Link
            href="/settings"
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </Link>
          <Link
            href="/help"
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <HelpCircle className="h-5 w-5" />
            <span>Help</span>
          </Link>
          <Link
            href="/feedback"
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <MessageSquare className="h-5 w-5" />
            <span>Send Feedback</span>
          </Link>
        </div>
      </nav>

      <div className="mt-auto pt-6 text-xs text-gray-500">
        <p>© 2025 Comitia</p>
        <p className="mt-1">Terms · Privacy · Policy · Safety</p>
      </div>
    </aside>
  )
}

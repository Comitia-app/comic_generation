import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart } from "lucide-react"

// Mock data for the landing page
const characters = [
  {
    id: 1,
    name: "Luna Starlight",
    description: "A celestial warrior with the power to control stars",
    creator: "cosmic_creator",
    like_count: 245,
    image: "/placeholder.svg?height=300&width=200",
  },
  {
    id: 2,
    name: "Axel Blaze",
    description: "A fire-wielding hero with a troubled past",
    creator: "flame_artist",
    like_count: 189,
    image: "/placeholder.svg?height=300&width=200",
  },
  {
    id: 3,
    name: "Zephyr",
    description: "A wind spirit who brings messages across realms",
    creator: "wind_whisperer",
    like_count: 167,
    image: "/placeholder.svg?height=300&width=200",
  },
]

const memes = [
  { id: 1, creator: "meme_master", like_count: 523, image: "/placeholder.svg?height=250&width=250" },
  { id: 2, creator: "joke_crafter", like_count: 412, image: "/placeholder.svg?height=250&width=250" },
  { id: 3, creator: "humor_artist", like_count: 378, image: "/placeholder.svg?height=250&width=250" },
]

const comics = [
  {
    id: 1,
    title: "The Last Guardian",
    description: "A tale of the final protector of a dying world",
    creator: "epic_storyteller",
    updated_at: "2025-04-15",
    view_count: 12453,
    like_count: 3241,
    hashtags: "#fantasy #adventure",
    thumbnail: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 2,
    title: "Neon Dreams",
    description: "Cyberpunk adventures in a dystopian future",
    creator: "digital_dreamer",
    updated_at: "2025-04-10",
    view_count: 9876,
    like_count: 2198,
    hashtags: "#cyberpunk #scifi",
    thumbnail: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 3,
    title: "Whispers of Magic",
    description: "A young wizard discovers ancient secrets",
    creator: "magic_weaver",
    updated_at: "2025-04-05",
    view_count: 8765,
    like_count: 1987,
    hashtags: "#magic #fantasy",
    thumbnail: "/placeholder.svg?height=400&width=300",
  },
]

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Section 1: Introduction */}
      <section className="introduction relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-700 to-indigo-800 text-white p-8 md:p-12">
        <div className="max-w-3xl relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Someone made a joke on AI</h1>

         
        </div>
      
      </section>

      

    </div>
  )
}

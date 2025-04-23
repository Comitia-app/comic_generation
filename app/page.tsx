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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Create and Share Your Universe</h1>
          <p className="text-xl mb-6">
            Comitia is a platform where anyone, even without drawing skills, can create and share their own comics using
            AI.
          </p>
          <Link href="/create">
            <Button size="lg" className="bg-white text-purple-800 hover:bg-gray-100">
              Start Creating
            </Button>
          </Link>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/2 opacity-20 md:opacity-40">
          <Image src="/placeholder.svg?height=600&width=800" alt="Comitia Hero Image" fill className="object-cover" />
        </div>
      </section>

      {/* Section 2: Events */}
      <section className="events">
        <h2 className="text-3xl font-bold mb-8 text-center">Be The Star of Comitia</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Game of Comics",
              image: "/placeholder.svg?height=300&width=400",
              description: "Users create and select the best comics of the year.",
            },
            {
              title: "Character of the Year",
              image: "/placeholder.svg?height=300&width=400",
              description: "Users create and select the best character of the year.",
            },
            {
              title: "Voice of Voiceless",
              image: "/placeholder.svg?height=300&width=400",
              description: "Users create and select editorial cartoons based on social issues.",
            },
          ].map((event, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="h-48 relative">
                <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                <p className="mb-4 text-gray-600">{event.description}</p>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">Participate</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Section 3: Character of the Month */}
      <section className="character-of-month">
        <h2 className="text-3xl font-bold mb-8 text-center">Character of the Month</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {characters.map((character) => (
            <Card key={character.id} className="overflow-hidden">
              <div className="h-64 relative">
                <Image src={character.image || "/placeholder.svg"} alt={character.name} fill className="object-cover" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">{character.name}</h3>
                <p className="mb-2 text-gray-600">{character.description}</p>
                <p className="text-sm text-gray-500 mb-4">Creator: {character.creator}</p>
                <div className="flex items-center text-gray-500">
                  <Heart className="h-5 w-5 mr-1 cursor-pointer hover:text-red-500" />
                  <span>{character.like_count}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Section 4: CoMEMEtia */}
      <section className="comemetia bg-gray-50 dark:bg-gray-900 p-8 rounded-xl">
        <h2 className="text-3xl font-bold mb-8 text-center">CoMEMEtia : Leading the MEME-volution</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {memes.map((meme) => (
            <Card key={meme.id} className="overflow-hidden">
              <div className="h-64 relative">
                <Image src={meme.image || "/placeholder.svg"} alt="Meme" fill className="object-cover" />
              </div>
              <CardContent className="p-4">
                <p className="text-sm text-gray-500 mb-2">Creator: {meme.creator}</p>
                <div className="flex items-center text-gray-500">
                  <Heart className="h-5 w-5 mr-1 cursor-pointer hover:text-red-500" />
                  <span>{meme.like_count}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Section 5: Comitia Bestsellers */}
      <section className="bestsellers">
        <h2 className="text-3xl font-bold mb-8 text-center">Comitia Bestsellers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {comics.map((comic) => (
            <Card key={comic.id} className="overflow-hidden">
              <div className="h-64 relative">
                <Image src={comic.thumbnail || "/placeholder.svg"} alt={comic.title} fill className="object-cover" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">{comic.title}</h3>
                <p className="mb-2 text-gray-600">{comic.description}</p>
                <p className="text-sm text-gray-500">Creator: {comic.creator}</p>
                <p className="text-sm text-gray-500">Updated: {comic.updated_at}</p>
                <p className="text-sm text-gray-500">Views: {comic.view_count}</p>
                <div className="flex items-center text-gray-500 mb-2">
                  <Heart className="h-5 w-5 mr-1 cursor-pointer hover:text-red-500" />
                  <span>{comic.like_count}</span>
                </div>
                <p className="text-sm text-purple-600">{comic.hashtags}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Additional sections would follow the same pattern */}
    </div>
  )
}

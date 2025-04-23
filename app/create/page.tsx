import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brush, BookOpen, Smile } from "lucide-react"

export default function CreatePage() {
  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Start Creating</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Choose what you'd like to create. You can create characters for your comics first, or go straight to creating
          a full comic story.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Character Creation Card */}
        <Card className="overflow-hidden">
          <CardHeader className="pb-0">
            <div className="w-full h-48 relative mb-4">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                <Brush className="h-20 w-20 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl">Create a Character</CardTitle>
            <CardDescription className="text-base">
              Design unique characters that you can use in your comics and share with the community
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="mb-6">
              <h4 className="font-medium mb-2">With Character Creation, you can:</h4>
              <ul className="space-y-2 list-disc pl-5 text-gray-600">
                <li>Generate character designs with AI assistance</li>
                <li>Create detailed backstories and personalities</li>
                <li>Build a library of characters to use in your comics</li>
                <li>Share your characters with the community</li>
              </ul>
            </div>
            <p className="text-sm text-gray-500 mb-4">Takes about 5-10 minutes</p>
            <Link href="/create/character">
              <Button className="w-full bg-purple-600 hover:bg-purple-700">Create Character</Button>
            </Link>
          </CardContent>
        </Card>

        {/* Comic Creation Card */}
        <Card className="overflow-hidden">
          <CardHeader className="pb-0">
            <div className="w-full h-48 relative mb-4">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                <BookOpen className="h-20 w-20 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl">Create a Comic</CardTitle>
            <CardDescription className="text-base">
              Jump straight into creating a complete comic with AI-powered panel generation
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="mb-6">
              <h4 className="font-medium mb-2">With Comic Creation, you can:</h4>
              <ul className="space-y-2 list-disc pl-5 text-gray-600">
                <li>Generate stunning comic panels with AI</li>
                <li>Get AI suggestions for story ideas and plots</li>
                <li>Arrange panels in any order you want</li>
                <li>Add captions and dialogues to tell your story</li>
              </ul>
            </div>
            <p className="text-sm text-gray-500 mb-4">Takes about 15-20 minutes</p>
            <Link href="/create/comic">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">Create Comic</Button>
            </Link>
          </CardContent>
        </Card>

        {/* Meme Creation Card */}
        <Card className="overflow-hidden">
          <CardHeader className="pb-0">
            <div className="w-full h-48 relative mb-4">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
                <Smile className="h-20 w-20 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl">Create a Meme</CardTitle>
            <CardDescription className="text-base">Unleash your humor and create shareable memes</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="mb-6">
              <h4 className="font-medium mb-2">With Meme Creation, you can:</h4>
              <ul className="space-y-2 list-disc pl-5 text-gray-600">
                <li>Use a variety of meme templates</li>
                <li>Add your own text and captions</li>
                <li>Share your memes with the world</li>
              </ul>
            </div>
            <p className="text-sm text-gray-500 mb-4">Takes about 2-5 minutes</p>
            <Link href="/create/meme">
              <Button className="w-full bg-pink-600 hover:bg-pink-700">Create Meme</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 text-center">
        <Link href="/explore">
          <Button variant="outline" size="lg">
            Explore Before Creating
          </Button>
        </Link>
      </div>
    </div>
  )
}

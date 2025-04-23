"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import Link from "next/link"
import { Download, Share2 } from "lucide-react"

// Mock meme templates
const memeTemplates = [
  { id: 1, name: "Drake Hotline Bling", image: "/placeholder.svg?height=400&width=400" },
  { id: 2, name: "Two Buttons", image: "/placeholder.svg?height=400&width=400" },
  { id: 3, name: "Distracted Boyfriend", image: "/placeholder.svg?height=400&width=400" },
  { id: 4, name: "Change My Mind", image: "/placeholder.svg?height=400&width=400" },
  { id: 5, name: "Expanding Brain", image: "/placeholder.svg?height=400&width=400" },
  { id: 6, name: "Woman Yelling at Cat", image: "/placeholder.svg?height=400&width=400" },
]

export default function MemeCreation() {
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null)
  const [topText, setTopText] = useState("")
  const [bottomText, setBottomText] = useState("")
  const [generatedMeme, setGeneratedMeme] = useState<string | null>(null)
  const [step, setStep] = useState<"template" | "customize" | "complete">("template")

  const handleSelectTemplate = (id: number) => {
    setSelectedTemplate(id)
    setStep("customize")
  }

  const handleGenerateMeme = () => {
    // In a real app, this would call an API to generate the meme
    // For now, we'll just use the template image
    const template = memeTemplates.find((t) => t.id === selectedTemplate)
    if (template) {
      setGeneratedMeme(template.image)
      setStep("complete")
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Meme Creation</h1>

      {step === "template" && (
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-6">Select a Meme Template</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {memeTemplates.map((template) => (
                <div
                  key={template.id}
                  className={`border rounded-lg p-2 cursor-pointer transition-all hover:shadow-md ${
                    selectedTemplate === template.id ? "ring-2 ring-purple-500" : ""
                  }`}
                  onClick={() => handleSelectTemplate(template.id)}
                >
                  <div className="relative h-40 w-full mb-2">
                    <Image
                      src={template.image || "/placeholder.svg"}
                      alt={template.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <p className="text-center font-medium">{template.name}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {step === "customize" && selectedTemplate && (
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-6">Customize Your Meme</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="relative h-80 w-full mb-4">
                  <Image
                    src={memeTemplates.find((t) => t.id === selectedTemplate)?.image || ""}
                    alt="Selected template"
                    fill
                    className="object-contain"
                  />
                  {topText && (
                    <div className="absolute top-4 left-0 right-0 text-center">
                      <p className="text-white text-2xl font-bold uppercase drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                        {topText}
                      </p>
                    </div>
                  )}
                  {bottomText && (
                    <div className="absolute bottom-4 left-0 right-0 text-center">
                      <p className="text-white text-2xl font-bold uppercase drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                        {bottomText}
                      </p>
                    </div>
                  )}
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500">Preview</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="top-text">Top Text:</Label>
                  <Input
                    id="top-text"
                    value={topText}
                    onChange={(e) => setTopText(e.target.value)}
                    placeholder="Enter top text"
                  />
                </div>

                <div>
                  <Label htmlFor="bottom-text">Bottom Text:</Label>
                  <Input
                    id="bottom-text"
                    value={bottomText}
                    onChange={(e) => setBottomText(e.target.value)}
                    placeholder="Enter bottom text"
                  />
                </div>

                <div className="pt-4">
                  <Button onClick={handleGenerateMeme} className="w-full bg-purple-600 hover:bg-purple-700">
                    Generate Meme
                  </Button>
                </div>

                <div>
                  <Button variant="outline" className="w-full" onClick={() => setStep("template")}>
                    Choose Different Template
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {step === "complete" && generatedMeme && (
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-6 text-center">Your Meme is Ready!</h2>
            <div className="flex flex-col items-center">
              <div className="relative h-96 w-full max-w-md mb-6">
                <Image src={generatedMeme || "/placeholder.svg"} alt="Generated meme" fill className="object-contain" />
                {topText && (
                  <div className="absolute top-4 left-0 right-0 text-center">
                    <p className="text-white text-2xl font-bold uppercase drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                      {topText}
                    </p>
                  </div>
                )}
                {bottomText && (
                  <div className="absolute bottom-4 left-0 right-0 text-center">
                    <p className="text-white text-2xl font-bold uppercase drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                      {bottomText}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-col md:flex-row gap-4 w-full max-w-md">
                <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Meme
                </Button>
                <Button variant="outline" className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>

              <div className="mt-8 flex flex-col md:flex-row gap-4 w-full max-w-md">
                <Link href="/create/meme" className="flex-1">
                  <Button variant="outline" className="w-full">
                    Create Another Meme
                  </Button>
                </Link>
                <Link href="/" className="flex-1">
                  <Button variant="ghost" className="w-full">
                    Back to Home
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import Link from "next/link"
import { Plus, Trash2, MoveUp, MoveDown, Save } from "lucide-react"

type Panel = {
  id: string
  image: string
  caption: string
  dialogue: string
}

export default function ComicCreation() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [prompt, setPrompt] = useState("")
  const [panels, setPanels] = useState<Panel[]>([])
  const [step, setStep] = useState<"setup" | "panels" | "complete">("setup")

  const handleGeneratePanel = () => {
    // In a real app, this would call an AI service
    // For now, we'll just add a placeholder panel
    const newPanel: Panel = {
      id: `panel-${Date.now()}`,
      image: "/placeholder.svg?height=400&width=300",
      caption: "",
      dialogue: "",
    }

    setPanels([...panels, newPanel])
  }

  const handleRemovePanel = (id: string) => {
    setPanels(panels.filter((panel) => panel.id !== id))
  }

  const handleMovePanel = (id: string, direction: "up" | "down") => {
    const index = panels.findIndex((panel) => panel.id === id)
    if ((direction === "up" && index === 0) || (direction === "down" && index === panels.length - 1)) {
      return
    }

    const newPanels = [...panels]
    const newIndex = direction === "up" ? index - 1 : index + 1
    const panel = newPanels[index]
    newPanels.splice(index, 1)
    newPanels.splice(newIndex, 0, panel)
    setPanels(newPanels)
  }

  const handleUpdatePanel = (id: string, field: "caption" | "dialogue", value: string) => {
    setPanels(panels.map((panel) => (panel.id === id ? { ...panel, [field]: value } : panel)))
  }

  const handleCreateComic = () => {
    // In a real app, this would save the comic data
    setStep("complete")
  }

  const handleStartCreating = () => {
    setStep("panels")
  }

  return (
    <div className="max-w-5xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Comic Creation</h1>

      {step === "setup" && (
        <Card>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div>
                <Label htmlFor="title">Comic Title (Required):</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter a title for your comic"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Comic Description (Required):</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe what your comic is about"
                  className="h-32"
                  required
                />
              </div>

              <div className="text-center pt-4">
                <Button
                  onClick={handleStartCreating}
                  className="bg-purple-600 hover:bg-purple-700 px-8"
                  disabled={!title || !description}
                >
                  Start Creating Panels
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {step === "panels" && (
        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Generate Comic Panels</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="prompt">Panel Description:</Label>
                  <Textarea
                    id="prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe what you want to see in this panel"
                    className="h-24"
                  />
                </div>

                <div className="flex justify-center">
                  <Button
                    onClick={handleGeneratePanel}
                    className="bg-purple-600 hover:bg-purple-700"
                    disabled={!prompt}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Generate Panel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {panels.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Your Comic Panels</h2>
                <div className="space-y-8">
                  {panels.map((panel, index) => (
                    <div key={panel.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium">Panel {index + 1}</h3>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleMovePanel(panel.id, "up")}
                            disabled={index === 0}
                          >
                            <MoveUp className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleMovePanel(panel.id, "down")}
                            disabled={index === panels.length - 1}
                          >
                            <MoveDown className="h-4 w-4" />
                          </Button>
                          <Button variant="destructive" size="icon" onClick={() => handleRemovePanel(panel.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="relative h-64 w-full">
                          <Image
                            src={panel.image || "/placeholder.svg"}
                            alt={`Panel ${index + 1}`}
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>

                        <div className="space-y-4">
                          <div>
                            <Label htmlFor={`caption-${panel.id}`}>Caption:</Label>
                            <Textarea
                              id={`caption-${panel.id}`}
                              value={panel.caption}
                              onChange={(e) => handleUpdatePanel(panel.id, "caption", e.target.value)}
                              placeholder="Add a caption for this panel"
                              className="h-20"
                            />
                          </div>

                          <div>
                            <Label htmlFor={`dialogue-${panel.id}`}>Dialogue:</Label>
                            <Textarea
                              id={`dialogue-${panel.id}`}
                              value={panel.dialogue}
                              onChange={(e) => handleUpdatePanel(panel.id, "dialogue", e.target.value)}
                              placeholder="Add dialogue for this panel"
                              className="h-20"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <Button
                    onClick={handleCreateComic}
                    className="bg-purple-600 hover:bg-purple-700 px-8"
                    disabled={panels.length === 0}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Comic
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {step === "complete" && (
        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="text-2xl font-semibold mb-4">Comic Created Successfully!</h3>
            <p className="text-lg mb-8">Your comic has been published and is now available for others to read.</p>

            <div className="flex flex-col md:flex-row justify-center gap-4">
              <Link href="/create/comic">
                <Button variant="outline" size="lg">
                  Create Another Comic
                </Button>
              </Link>
              <Link href="/my-comics">
                <Button className="bg-purple-600 hover:bg-purple-700" size="lg">
                  View My Comics
                </Button>
              </Link>
              <Link href="/">
                <Button variant="ghost" size="lg">
                  Back to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

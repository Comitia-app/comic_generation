"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import Link from "next/link"

export default function CharacterCreation() {
  const [step, setStep] = useState<"description" | "preview" | "details" | "complete">("description")
  const [characterImage, setCharacterImage] = useState<string>("/placeholder.svg?height=400&width=300")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [textDescription, setTextDescription] = useState("")
  const [isOriginal, setIsOriginal] = useState<string>("yes")

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImageFile(file)
      const imageUrl = URL.createObjectURL(file)
      setCharacterImage(imageUrl)
    }
  }

  const handleGenerate = () => {
    // In a real app, this would call an AI service
    // For now, we'll just move to the next step
    setStep("preview")
  }

  const handleRegenerate = () => {
    // In a real app, this would call an AI service again
    // For now, we'll just use a placeholder
    setCharacterImage("/placeholder.svg?height=400&width=300")
  }

  const handleSelectCharacter = () => {
    setStep("details")
  }

  const handleSubmitDetails = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would save the character data
    setStep("complete")
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Character Creation</h1>
      <p className="text-lg mb-8">
        Describe your character or upload an image to generate a unique character design with AI.
      </p>

      {step === "description" && (
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Text Description</h3>
                <Textarea
                  id="text-description"
                  placeholder="Describe your character"
                  className="h-40 mb-4"
                  value={textDescription}
                  onChange={(e) => setTextDescription(e.target.value)}
                />
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Image Upload</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <Label htmlFor="image-upload" className="cursor-pointer">
                    {imageFile ? (
                      <div className="relative h-40 w-full">
                        <Image
                          src={URL.createObjectURL(imageFile) || "/placeholder.svg"}
                          alt="Uploaded image"
                          fill
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <div className="py-8">
                        <p className="text-gray-500">Click to upload an image</p>
                        <p className="text-sm text-gray-400 mt-2">PNG, JPG, GIF up to 5MB</p>
                      </div>
                    )}
                  </Label>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Button
                onClick={handleGenerate}
                className="bg-purple-600 hover:bg-purple-700 px-8"
                disabled={!textDescription && !imageFile}
              >
                Generate Character
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === "preview" && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">Character Preview</h3>
            <div className="flex flex-col items-center">
              <div className="relative h-80 w-64 mb-6">
                <Image
                  src={characterImage || "/placeholder.svg"}
                  alt="Generated character"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>

              <div className="flex space-x-4 mt-4">
                <Button onClick={handleRegenerate} variant="outline">
                  Regenerate Character
                </Button>
                <Button onClick={handleSelectCharacter} className="bg-purple-600 hover:bg-purple-700">
                  Select Character
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {step === "details" && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">Character Details</h3>
            <form onSubmit={handleSubmitDetails} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name (Required):</Label>
                    <Input id="name" name="name" required />
                  </div>

                  <div>
                    <Label htmlFor="species">Species (Optional):</Label>
                    <Input id="species" name="species" />
                  </div>

                  <div>
                    <Label htmlFor="gender">Gender (Optional):</Label>
                    <Select>
                      <SelectTrigger id="gender">
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="age">Age (Optional):</Label>
                    <Input id="age" name="age" type="number" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="personality">Personality (Optional):</Label>
                    <Input id="personality" name="personality" />
                  </div>

                  <div>
                    <Label htmlFor="occupation">Occupation (Optional):</Label>
                    <Input id="occupation" name="occupation" />
                  </div>

                  <div>
                    <Label htmlFor="series">Appearing in (Required):</Label>
                    <Select required>
                      <SelectTrigger id="series">
                        <SelectValue placeholder="Select Series" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New Series (Coming Soon)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="original">Original Character (Required):</Label>
                    <Select required value={isOriginal} onValueChange={setIsOriginal}>
                      <SelectTrigger id="original">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {isOriginal === "no" && (
                    <div>
                      <Label htmlFor="model_character">Model Character (Required if not original):</Label>
                      <Input id="model_character" name="model_character" required />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description (Required, max 100 words):</Label>
                <Textarea id="description" name="description" required className="h-32" />
              </div>

              <div className="flex justify-center pt-4">
                <Button type="submit" className="bg-purple-600 hover:bg-purple-700 px-8">
                  Confirm Character
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {step === "complete" && (
        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="text-2xl font-semibold mb-4">Character Created Successfully!</h3>
            <p className="text-lg mb-8">Your character has been added to your collection.</p>

            <div className="flex flex-col md:flex-row justify-center gap-4">
              <Link href="/create/character">
                <Button variant="outline" size="lg">
                  Create Another Character
                </Button>
              </Link>
              <Link href="/create/comic">
                <Button className="bg-purple-600 hover:bg-purple-700" size="lg">
                  Create Comic
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

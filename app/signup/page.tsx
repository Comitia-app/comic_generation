"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    birthYear: "",
    birthMonth: "",
    birthDay: "",
    gender: "Male",
    country: "KR",
    genreIds: [] as number[]
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleGenderChange = (value: string) => {
    setFormData({ ...formData, gender: value === "male" ? "Male" : value === "female" ? "Female" : "Other" });
  };

  const handleGenreChange = (genreId: number, checked: boolean) => {
    if (checked) {
      setFormData({ ...formData, genreIds: [...formData.genreIds, genreId] });
    } else {
      setFormData({ ...formData, genreIds: formData.genreIds.filter(id => id !== genreId) });
    }
  };

  const handleSubmit = async () => {
    try {
      // Validate form
      if (!formData.username) {
        setError("Username is required");
        return;
      }
      if (!formData.email) {
        setError("Email is required");
        return;
      }
      if (!formData.password) {
        setError("Password is required");
        return;
      }
      if (formData.password.length < 8) {
        setError("Password must be at least 8 digits");
        return;
      }

      if (!formData.birthYear || !formData.birthMonth || !formData.birthDay) {
        setError("Date of birth is required");
        return;
      }
      if (formData.genreIds.length === 0) {
        setError("Please select at least one genre");
        return;
      }

      setLoading(true);
      setError("");

      // Format birth date
      const birthDate = `${formData.birthYear}-${formData.birthMonth.padStart(2, '0')}-${formData.birthDay.padStart(2, '0')}`;

      const response = await fetch("https://comitia-api.onrender.com/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          username: formData.username,
          birthDate,
          gender: formData.gender,
          country: formData.country,
          genreIds: formData.genreIds
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Signup failed");
      }

      // Show success dialog instead of redirecting immediately
      setShowSuccessDialog(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred during signup");
    } finally {
      setLoading(false);
    }
  };

  const handleDialogClose = () => {
    setShowSuccessDialog(false);
    // Redirect to home page
    router.push("/");
  };

  return (
      <div className="container flex items-center justify-center min-h-screen py-12">
        <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Registration Successful</DialogTitle>
              <DialogDescription>
                Please do email authentication to complete the registration.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={handleDialogClose}>OK</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">Sign Up</CardTitle>
            <CardDescription>Enter your information below to create an account.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input 
                id="username" 
                type="text" 
                placeholder="Enter your username" 
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="your@email.com" 
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label>Date of Birth</Label>
              <div className="grid grid-cols-3 gap-2">
                <Select 
                  value={formData.birthYear} 
                  onValueChange={(value) => handleSelectChange("birthYear", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select 
                  value={formData.birthMonth} 
                  onValueChange={(value) => handleSelectChange("birthMonth", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                        <SelectItem key={month} value={month.toString()}>
                          {month < 10 ? `0${month}` : month}
                        </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select 
                  value={formData.birthDay} 
                  onValueChange={(value) => handleSelectChange("birthDay", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Day" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                        <SelectItem key={day} value={day.toString()}>
                          {day < 10 ? `0${day}` : day}
                        </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Gender</Label>
              <RadioGroup 
                value={formData.gender === "Male" ? "male" : formData.gender === "Female" ? "female" : "other"} 
                onValueChange={handleGenderChange}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other">Other</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Select 
                value={formData.country} 
                onValueChange={(value) => handleSelectChange("country", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="KR">Korea</SelectItem>
                  <SelectItem value="US">United States</SelectItem>
                  <SelectItem value="JP">Japan</SelectItem>
                  <SelectItem value="CN">China</SelectItem>
                  <SelectItem value="UK">United Kingdom</SelectItem>
                  <SelectItem value="FR">France</SelectItem>
                  <SelectItem value="DE">Germany</SelectItem>
                  <SelectItem value="CA">Canada</SelectItem>
                  <SelectItem value="AU">Australia</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Preferred Genres (Select multiple)</Label>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="genre-1" 
                    checked={formData.genreIds.includes(1)}
                    onCheckedChange={(checked) => handleGenreChange(1, checked as boolean)}
                  />
                  <Label htmlFor="genre-1">Action</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="genre-2" 
                    checked={formData.genreIds.includes(2)}
                    onCheckedChange={(checked) => handleGenreChange(2, checked as boolean)}
                  />
                  <Label htmlFor="genre-2">Adventure</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="genre-3" 
                    checked={formData.genreIds.includes(3)}
                    onCheckedChange={(checked) => handleGenreChange(3, checked as boolean)}
                  />
                  <Label htmlFor="genre-3">Comedy</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="genre-4" 
                    checked={formData.genreIds.includes(4)}
                    onCheckedChange={(checked) => handleGenreChange(4, checked as boolean)}
                  />
                  <Label htmlFor="genre-4">Drama</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="genre-5" 
                    checked={formData.genreIds.includes(5)}
                    onCheckedChange={(checked) => handleGenreChange(5, checked as boolean)}
                  />
                  <Label htmlFor="genre-5">Fantasy</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="genre-6" 
                    checked={formData.genreIds.includes(6)}
                    onCheckedChange={(checked) => handleGenreChange(6, checked as boolean)}
                  />
                  <Label htmlFor="genre-6">Horror</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="genre-7" 
                    checked={formData.genreIds.includes(7)}
                    onCheckedChange={(checked) => handleGenreChange(7, checked as boolean)}
                  />
                  <Label htmlFor="genre-7">Mystery</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="genre-8" 
                    checked={formData.genreIds.includes(8)}
                    onCheckedChange={(checked) => handleGenreChange(8, checked as boolean)}
                  />
                  <Label htmlFor="genre-8">Romance</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="genre-9" 
                    checked={formData.genreIds.includes(9)}
                    onCheckedChange={(checked) => handleGenreChange(9, checked as boolean)}
                  />
                  <Label htmlFor="genre-9">Science Fiction</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="genre-10" 
                    checked={formData.genreIds.includes(10)}
                    onCheckedChange={(checked) => handleGenreChange(10, checked as boolean)}
                  />
                  <Label htmlFor="genre-10">Slice of Life</Label>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button 
              className="w-full" 
              onClick={handleSubmit} 
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </Button>
            <div className="text-sm text-center text-gray-500">
              Already have an account? <Link href="/login" className="text-blue-500 hover:underline">Login</Link>
            </div>
          </CardFooter>
        </Card>
      </div>
  );
}

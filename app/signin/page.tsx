"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SigninPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async () => {
    try {
      // Validate form
      if (!formData.email) {
        setError("Email is required");
        return;
      }
      if (!formData.password) {
        setError("Password is required");
        return;
      }

      setLoading(true);
      setError("");

      const response = await fetch("https://comitia-api.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();

      // Store token in HttpOnly cookie via API route
      if (data.accessToken) {
        const cookieResponse = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: data.accessToken }),
        });

        if (!cookieResponse.ok) {
          throw new Error("Failed to set authentication cookie");
        }
      }


      window.dispatchEvent(new Event('focus'));
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container flex items-center justify-center min-h-screen py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Sign In</CardTitle>
          <CardDescription>Enter your credentials to access your account.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

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
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button 
            className="w-full" 
            onClick={handleSubmit} 
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
          <div className="text-sm text-center text-gray-500">
            Don't have an account? <Link href="/signup" className="text-blue-500 hover:underline">Sign Up</Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

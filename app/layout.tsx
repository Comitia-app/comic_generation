import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Sidebar from "@/components/sidebar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Comitia - Create and Share Your Universe",
  description: "A platform where anyone can create and share their own comics using AI",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex flex-1">
              <Sidebar />
              <main className="flex-1 p-4 md:p-6">{children}</main>
            </div>
            <footer className="py-4 px-6 border-t text-center text-sm text-gray-500">
              <p>© 2025 Comitia</p>
              <p>Terms · Privacy · Policy · Safety</p>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

import type React from "react"
import type { Metadata } from "next"
import { Inter, Lora } from "next/font/google"
import "./globals.css"
import { FavoritesProvider } from "@/context/favorites-context"
import { HouseProvider } from "@/context/house-context"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-serif",
})

export const metadata: Metadata = {
  title: "Harry Potter - Mischief Managed",
  description: "Explore the wizarding world of Harry Potter",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${lora.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <HouseProvider>
            <FavoritesProvider>{children}</FavoritesProvider>
          </HouseProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'
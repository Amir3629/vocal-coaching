import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })
const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair'
})

export const metadata: Metadata = {
  title: "Melanie Wainwright | Jazz Vocal Coaching in Berlin",
  description:
    "Professional jazz vocal coaching services in Berlin. Private lessons, workshops, and performance coaching for all levels.",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`dark ${playfair.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}



import './globals.css'
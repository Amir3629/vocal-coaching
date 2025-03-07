import type React from "react"
import "./globals.css"
import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import CookieConsent from "./components/cookie-consent"
import Footer from "./components/footer"

const inter = Inter({ subsets: ["latin"] })
const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair'
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
}

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
      <body className={`${inter.className} antialiased`}>
        {children}
        <Footer />
        <CookieConsent />
      </body>
    </html>
  )
}



import './globals.css'
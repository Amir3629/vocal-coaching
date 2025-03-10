import type React from "react"
import "./globals.css"
import "./styles/responsive.css"
import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import CookieConsent from "./components/cookie-consent"
import Footer from "./components/footer"
import { LanguageProvider } from "@/app/components/language-switcher"

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
}

export const metadata: Metadata = {
  title: "Mel jazz - Vocal Coaching Berlin",
  description: "Professional vocal coaching in Berlin. Discover your voice with experienced vocal coach Melanie Wainwright.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className={`dark ${playfair.variable}`}>
      <body className={`${inter.className} antialiased`}>
        <LanguageProvider>
          {children}
          <Footer />
          <CookieConsent />
        </LanguageProvider>
      </body>
    </html>
  )
}

import './globals.css'
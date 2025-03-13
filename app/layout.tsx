import type React from "react"
import "./globals.css"
import "./styles/responsive.css"
import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import CookieConsent from "./components/cookie-consent"
import Footer from "./components/footer"
import { LanguageProvider } from "./components/language-switcher"

const inter = Inter({ subsets: ["latin"] })
const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export const metadata: Metadata = {
  title: "Mel jazz - Vocal Coaching in Berlin",
  description: "Professional vocal coaching and performance in Berlin",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`dark-theme-black ${playfair.variable}`}>
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
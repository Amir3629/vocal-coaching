"use client"

import React from "react"
import { LanguageProvider } from "./components/language-switcher"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      {children}
    </LanguageProvider>
  )
} 
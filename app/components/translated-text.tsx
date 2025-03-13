"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useTranslatedText } from "@/lib/translation"

interface TranslatedTextProps {
  text: string
  className?: string
  tag?: keyof JSX.IntrinsicElements
}

export default function TranslatedText({ text, className = "", tag = "span" }: TranslatedTextProps) {
  const { translatedText, isLoading } = useTranslatedText(text)
  const Tag = tag

  return (
    <Tag className={`relative inline-block ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={translatedText}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="block"
        >
          {translatedText}
        </motion.span>
      </AnimatePresence>
    </Tag>
  )
} 
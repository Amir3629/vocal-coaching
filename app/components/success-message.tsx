"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Check } from "lucide-react"

interface SuccessMessageProps {
  isOpen: boolean
  onClose: () => void
  title: string
  message: string
}

export default function SuccessMessage({ isOpen, onClose, title, message }: SuccessMessageProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[calc(100%-2rem)] max-w-md"
          >
            <div className="bg-[#0A0A0A] rounded-xl p-6 border border-[#C8A97E]/20">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#C8A97E]/20 flex items-center justify-center mb-4">
                  <Check className="w-8 h-8 text-[#C8A97E]" />
                </div>
                <h3 className="text-xl font-medium text-white mb-2">{title}</h3>
                <p className="text-gray-400">{message}</p>
                <button
                  onClick={onClose}
                  className="mt-6 px-6 py-2 bg-[#C8A97E] hover:bg-[#B89A6F] text-black rounded-lg transition-colors"
                >
                  Schließen
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
} 
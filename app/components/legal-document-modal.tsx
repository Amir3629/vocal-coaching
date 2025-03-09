"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { useEffect } from "react"

interface LegalDocumentModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

export default function LegalDocumentModal({ isOpen, onClose, title, children }: LegalDocumentModalProps) {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="min-h-full flex items-center justify-center p-4">
              {/* Modal Content */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ 
                  opacity: 0, 
                  scale: 0.95, 
                  y: 20,
                  transition: {
                    duration: 0.3,
                    ease: "easeInOut"
                  }
                }}
                transition={{ 
                  duration: 0.4,
                  ease: "easeOut"
                }}
                className="relative w-full max-w-4xl bg-[#0A0A0A] rounded-xl border border-[#C8A97E]/20 shadow-2xl"
              >
                {/* Header */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="sticky top-0 z-10 px-8 py-5 bg-[#0A0A0A]/95 border-b border-[#C8A97E]/10 flex items-center justify-between backdrop-blur-md backdrop-saturate-150"
                >
                  <h2 className="text-2xl font-medium text-[#C8A97E]">{title}</h2>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    onClick={onClose}
                    className="p-2 hover:bg-[#C8A97E]/10 rounded-lg transition-all duration-300"
                  >
                    <X className="w-5 h-5 text-[#C8A97E]" />
                  </motion.button>
                </motion.div>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar"
                >
                  <div className="prose prose-invert prose-gold max-w-none">
                    {children}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
} 
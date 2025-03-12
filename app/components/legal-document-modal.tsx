"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { useEffect } from "react"

interface LegalDocumentModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export default function LegalDocumentModal({ isOpen, onClose, children }: LegalDocumentModalProps) {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    
    if (isOpen) {
      window.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    
    return () => {
      window.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 25,
                duration: 0.5
              }
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.95, 
              y: 20,
              transition: {
                type: "spring",
                stiffness: 200,
                damping: 25,
                duration: 0.8
              }
            }}
            className="fixed left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] w-[90%] max-w-2xl max-h-[85vh] bg-[#0A0A0A] rounded-xl border-2 border-[#C8A97E]/20 shadow-2xl z-[101] overflow-hidden"
          >
            <div className="flex items-center justify-end p-4 border-b border-[#C8A97E]/20">
              <button
                onClick={onClose}
                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-white/70 hover:text-white transition-colors" />
              </button>
            </div>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="p-6 overflow-y-auto max-h-[calc(85vh-80px)] custom-scrollbar"
            >
              {children}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
} 
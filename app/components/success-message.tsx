"use client"

import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, X } from "lucide-react"

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
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9998]"
            onClick={onClose}
          />
          
          <div className="fixed inset-0 z-[9999] flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ 
                type: "spring",
                duration: 1.5,
                bounce: 0.1,
                stiffness: 80,
                damping: 15
              }}
              className="w-[calc(100%-2rem)] md:w-full max-w-md"
            >
              <div className="relative bg-[#0A0A0A] rounded-xl p-6 md:p-8 border border-[#C8A97E]/20 w-full">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#C8A97E]/10 flex items-center justify-center"
                  >
                    <CheckCircle className="w-8 h-8 text-[#C8A97E]" />
                  </motion.div>

                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl font-light text-white mb-2"
                  >
                    {title}
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-400"
                  >
                    {message}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-6"
                  >
                    <button
                      onClick={onClose}
                      className="px-6 py-2 bg-[#C8A97E] hover:bg-[#B69A6E] text-black text-sm font-medium rounded-lg transition-colors"
                    >
                      Verstanden
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
} 
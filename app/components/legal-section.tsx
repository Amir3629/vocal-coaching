"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface LegalSectionProps {
  title: string;
  content: React.ReactNode;
}

export default function LegalSection({ title, content }: LegalSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button
        onClick={handleOpen}
        className="text-gray-400 hover:text-white transition-colors"
      >
        {title}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-black/90 rounded-xl p-6"
            >
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 text-white/60 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
              
              <h2 className="text-2xl font-semibold mb-6">{title}</h2>
              <div className="prose prose-invert max-w-none">
                {content}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 
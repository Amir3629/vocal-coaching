"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Music } from "lucide-react"

export default function MusicNotes() {
  const [notes, setNotes] = useState<{ id: number; x: number; delay: number }[]>([])

  useEffect(() => {
    const createNote = () => {
      const id = Date.now()
      const x = Math.random() * 100 // Random position across the width
      const delay = Math.random() * 2 // Random delay for staggered animation

      setNotes((prev) => [...prev, { id, x, delay }])

      // Remove note after animation
      setTimeout(() => {
        setNotes((prev) => prev.filter((note) => note.id !== id))
      }, 4000)
    }

    const interval = setInterval(createNote, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <AnimatePresence>
        {notes.map((note) => (
          <motion.div
            key={note.id}
            initial={{ y: "100vh", x: `${note.x}vw`, opacity: 0 }}
            animate={{ y: "-20vh", opacity: [0, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 4,
              delay: note.delay,
              ease: "linear",
            }}
            className="absolute text-[#C8A97E]/30"
          >
            <Music className="w-8 h-8" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}


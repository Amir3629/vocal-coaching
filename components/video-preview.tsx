"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Play } from "lucide-react"
import { Card } from "@/components/ui/card"

export default function VideoPreview() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-4xl mx-auto">
      <Card className="relative aspect-video overflow-hidden bg-[#1a1a1a]/80 backdrop-blur-sm border-[#C8A97E]/20">
        {!isPlaying ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <img
                src="/placeholder.svg?height=720&width=1280"
                alt="Video thumbnail"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-20 h-20 rounded-full bg-[#C8A97E] text-black flex items-center justify-center"
                  onClick={() => setIsPlaying(true)}
                >
                  <Play className="w-10 h-10" />
                </motion.button>
              </div>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <p className="text-[#C8A97E]">Video content coming soon!</p>
          </div>
        )}
      </Card>
      <p className="text-center text-sm text-gray-400 mt-4">Preview video will be available soon. Check back later!</p>
    </motion.div>
  )
}


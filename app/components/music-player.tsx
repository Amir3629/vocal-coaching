"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"
import Image from "next/image"

const tracks = [
  {
    id: 1,
    title: "Jazz Performance",
    subtitle: "Live at B-Flat Jazz Club Berlin",
    image: "/images/gallery/performance1.jpg",
  },
  {
    id: 2,
    title: "Vocal Workshop",
    subtitle: "Complete Vocal Technique Demonstration",
    image: "/images/gallery/performance2.jpg",
  },
  {
    id: 3,
    title: "Jazz Standards",
    subtitle: "Live Performance Highlights",
    image: "/images/gallery/performance3.jpg",
  },
  {
    id: 4,
    title: "Vocal Jazz",
    subtitle: "Studio Session",
    image: "/images/gallery/performance4.jpg",
  }
]

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(tracks[0])
  const [isMuted, setIsMuted] = useState(false)

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleTrackChange = (track: typeof tracks[0]) => {
    setCurrentTrack(track)
    setIsPlaying(true)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  return (
    <>
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          {/* Main Player */}
          <div className="relative aspect-[16/9] bg-black rounded-xl overflow-hidden">
            <Image
              src={currentTrack.image}
              alt={currentTrack.title}
              fill
              className="object-cover opacity-40"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h3 className="text-xl font-medium text-white mb-2">{currentTrack.title}</h3>
              <p className="text-sm text-gray-400 mb-6">{currentTrack.subtitle}</p>
              <div className="flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleMute}
                  className="p-3 rounded-full bg-[#C8A97E]/20 text-[#C8A97E]"
                >
                  {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePlayPause}
                  className="p-4 rounded-full bg-[#C8A97E] text-black"
                >
                  {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
                </motion.button>
              </div>
            </div>
          </div>

          {/* Track Selection */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mt-8">
            {tracks.map((track) => (
              <motion.button
                key={track.id}
                onClick={() => handleTrackChange(track)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative aspect-[16/9] rounded-xl overflow-hidden border ${
                  currentTrack.id === track.id
                    ? "border-[#C8A97E]"
                    : "border-white/10"
                }`}
              >
                <Image
                  src={track.image}
                  alt={track.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/60 flex flex-col items-start justify-end p-4">
                  <h3 className="text-sm font-medium text-white">{track.title}</h3>
                  <p className="text-xs text-gray-400">{track.subtitle}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Mini Player - Only shows when music is playing */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-4 right-4 z-50"
          >
            <div className="bg-black/90 backdrop-blur-lg rounded-full p-2 border border-[#C8A97E]/20 shadow-lg flex items-center gap-4">
              <div className="w-12 h-12 relative rounded-full overflow-hidden">
                <Image
                  src={currentTrack.image}
                  alt={currentTrack.title}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="pr-4">
                <h4 className="text-sm font-medium text-white truncate max-w-[120px]">
                  {currentTrack.title}
                </h4>
                <p className="text-xs text-gray-400 truncate max-w-[120px]">
                  {currentTrack.subtitle}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleMute}
                  className="p-2 rounded-full hover:bg-white/5"
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-[#C8A97E]" /> : <Volume2 className="w-4 h-4 text-[#C8A97E]" />}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePlayPause}
                  className="p-2 rounded-full hover:bg-white/5"
                >
                  {isPlaying ? 
                    <Pause className="w-4 h-4 text-[#C8A97E]" /> : 
                    <Play className="w-4 h-4 text-[#C8A97E]" />
                  }
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
} 
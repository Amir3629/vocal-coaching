"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react"

interface Track {
  id: number
  title: string
  subtitle: string
  duration: string
  src: string
}

const tracks: Track[] = [
  {
    id: 1,
    title: "Jazz Standards",
    subtitle: "Live Performance Highlights",
    duration: "3:45",
    src: "/audio/jazz-standards.mp3"
  },
  {
    id: 2,
    title: "Vocal Jazz",
    subtitle: "Studio Session",
    duration: "4:20",
    src: "/audio/vocal-jazz.mp3"
  },
  {
    id: 3,
    title: "Jazz Performance",
    subtitle: "Live at B-Flat Jazz Club Berlin",
    duration: "5:15",
    src: "/audio/jazz-performance.mp3"
  },
  {
    id: 4,
    title: "Vocal Workshop",
    subtitle: "Complete Vocal Technique Demonstration",
    duration: "3:30",
    src: "/audio/vocal-workshop.mp3"
  }
]

export default function MusicSection() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState<Track>(tracks[0])
  const [progress, setProgress] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const progressRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (progressRef.current) {
        clearInterval(progressRef.current)
      }
    }
  }, [])

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        if (progressRef.current) {
          clearInterval(progressRef.current)
        }
      } else {
        audioRef.current.play()
        progressRef.current = setInterval(() => {
          if (audioRef.current) {
            setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100)
          }
        }, 100)
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTrackChange = (direction: "next" | "prev") => {
    const currentIndex = tracks.findIndex(track => track.id === currentTrack.id)
    let newIndex: number

    if (direction === "next") {
      newIndex = currentIndex + 1 >= tracks.length ? 0 : currentIndex + 1
    } else {
      newIndex = currentIndex - 1 < 0 ? tracks.length - 1 : currentIndex - 1
    }

    setCurrentTrack(tracks[newIndex])
    setProgress(0)
    setIsPlaying(false)
    if (progressRef.current) {
      clearInterval(progressRef.current)
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted
      setIsMuted(!isMuted)
    }
  }

  return (
    <section id="music" className="py-20 bg-[#040202]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-heading mb-4">Meine Musik</h2>
          <div className="w-12 h-0.5 bg-[#C8A97E] mx-auto"></div>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm rounded-2xl border border-[#C8A97E]/20 p-6 relative overflow-hidden"
          >
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute inset-0 opacity-30"
                animate={{
                  background: [
                    "radial-gradient(circle at 0% 0%, #C8A97E 0%, transparent 50%)",
                    "radial-gradient(circle at 100% 100%, #C8A97E 0%, transparent 50%)",
                    "radial-gradient(circle at 0% 100%, #C8A97E 0%, transparent 50%)",
                    "radial-gradient(circle at 100% 0%, #C8A97E 0%, transparent 50%)",
                  ]
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            </div>

            {/* Music Visualizer */}
            <div className="relative">
              <div className="flex justify-center items-center gap-1 h-16 mb-6">
                {Array.from({ length: 12 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-[#C8A97E]"
                    animate={{
                      height: isPlaying ? [20, 40, 15, 35, 25] : 20
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.1,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>

              {/* Track Info */}
              <div className="text-center mb-8">
                <motion.h3
                  key={currentTrack.id + "-title"}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xl font-medium text-white mb-2"
                >
                  {currentTrack.title}
                </motion.h3>
                <motion.p
                  key={currentTrack.id + "-subtitle"}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[#C8A97E]"
                >
                  {currentTrack.subtitle}
                </motion.p>
              </div>

              {/* Progress Bar */}
              <div className="relative w-full h-1 bg-white/10 rounded-full mb-6">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-[#C8A97E] rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-8">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleTrackChange("prev")}
                  className="p-2 text-white/70 hover:text-white transition-colors"
                >
                  <SkipBack className="w-6 h-6" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handlePlayPause}
                  className="p-4 rounded-full bg-[#C8A97E] text-black hover:bg-[#B69A6E] transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6" />
                  )}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleTrackChange("next")}
                  className="p-2 text-white/70 hover:text-white transition-colors"
                >
                  <SkipForward className="w-6 h-6" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleMute}
                  className="p-2 text-white/70 hover:text-white transition-colors"
                >
                  {isMuted ? (
                    <VolumeX className="w-6 h-6" />
                  ) : (
                    <Volume2 className="w-6 h-6" />
                  )}
                </motion.button>
              </div>
            </div>

            {/* Hidden Audio Element */}
            <audio
              ref={audioRef}
              src={currentTrack.src}
              onEnded={() => handleTrackChange("next")}
            />
          </motion.div>

          {/* Playlist */}
          <div className="mt-8 space-y-2">
            {tracks.map((track) => (
              <motion.button
                key={track.id}
                onClick={() => {
                  setCurrentTrack(track)
                  setProgress(0)
                  setIsPlaying(false)
                }}
                className={`w-full p-4 rounded-xl transition-all duration-300 ${
                  currentTrack.id === track.id
                    ? "bg-[#C8A97E]/20 border border-[#C8A97E]/50"
                    : "bg-black/20 border border-white/5 hover:border-[#C8A97E]/30"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <p className="text-white font-medium">{track.title}</p>
                    <p className="text-sm text-gray-400">{track.subtitle}</p>
                  </div>
                  <span className="text-sm text-[#C8A97E]">{track.duration}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 
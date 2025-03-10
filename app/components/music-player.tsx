"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, Volume2, VolumeX, Music } from "lucide-react"
import Image from "next/image"

interface Track {
  id: number
  title: string
  subtitle: string
  image: string
  audioSrc: string
}

const tracks: Track[] = [
  {
    id: 1,
    title: "Jazz Performance",
    subtitle: "Live at B-Flat Jazz Club Berlin",
    image: process.env.NODE_ENV === 'production' ? "/vocal-coaching/images/music/track1.jpg" : "/images/music/track1.jpg",
    audioSrc: process.env.NODE_ENV === 'production' ? "/vocal-coaching/audio/track1.mp3" : "/audio/track1.mp3"
  },
  {
    id: 2,
    title: "Vocal Workshop",
    subtitle: "Complete Vocal Technique Demonstration",
    image: process.env.NODE_ENV === 'production' ? "/vocal-coaching/images/music/track2.jpg" : "/images/music/track2.jpg",
    audioSrc: process.env.NODE_ENV === 'production' ? "/vocal-coaching/audio/track2.mp3" : "/audio/track2.mp3"
  },
  {
    id: 3,
    title: "Jazz Standards",
    subtitle: "Live Performance Highlights",
    image: process.env.NODE_ENV === 'production' ? "/vocal-coaching/images/music/track3.jpg" : "/images/music/track3.jpg",
    audioSrc: process.env.NODE_ENV === 'production' ? "/vocal-coaching/audio/track3.mp3" : "/audio/track3.mp3"
  },
  {
    id: 4,
    title: "Vocal Jazz",
    subtitle: "Studio Session",
    image: process.env.NODE_ENV === 'production' ? "/vocal-coaching/images/music/track4.jpg" : "/images/music/track4.jpg",
    audioSrc: process.env.NODE_ENV === 'production' ? "/vocal-coaching/audio/track4.mp3" : "/audio/track4.mp3"
  }
]

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState<Track>(tracks[0])
  const [isMuted, setIsMuted] = useState(false)
  const [showMiniPlayer, setShowMiniPlayer] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [armRotation, setArmRotation] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const musicSection = document.getElementById('music')
      if (musicSection) {
        const sectionTop = musicSection.offsetTop
        const sectionBottom = sectionTop + musicSection.offsetHeight
        setShowMiniPlayer(scrollPosition < sectionTop || scrollPosition > sectionBottom)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play()
        setArmRotation(-15) // Move arm to playing position
      } else {
        audioRef.current.pause()
        setArmRotation(0) // Return arm to rest position
      }
      audioRef.current.muted = isMuted
    }
  }, [isPlaying, isMuted, currentTrack])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleTrackChange = (track: Track) => {
    setCurrentTrack(track)
    setIsPlaying(true)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  return (
    <>
      <section id="music" className="py-20 bg-[#040202] relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="section-heading mb-4">Meine Musik</h2>
            <div className="w-24 h-0.5 bg-[#C8A97E] mx-auto opacity-80"></div>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Gramophone Base */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative w-full aspect-square max-w-2xl mx-auto"
              >
                {/* Gramophone Body */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A] to-black rounded-full shadow-2xl border border-[#C8A97E]/20">
                  {/* Record Player Surface */}
                  <motion.div
                    animate={{ rotate: isPlaying ? 360 : 0 }}
                    transition={{ duration: 2, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4"
                  >
                    <div className="absolute inset-0 rounded-full bg-[#0A0A0A] border-4 border-[#C8A97E]/30">
                      <Image
                        src={currentTrack.image}
                        alt={currentTrack.title}
                        fill
                        className="rounded-full object-cover opacity-60"
                      />
                    </div>
                  </motion.div>

                  {/* Tonearm */}
                  <motion.div
                    animate={{ rotate: armRotation }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="absolute top-1/4 right-1/4 w-1/3 h-2 bg-gradient-to-r from-[#C8A97E] to-[#8B7355] origin-right"
                    style={{ transformOrigin: "100% 50%" }}
                  >
                    <div className="absolute -left-2 -top-2 w-4 h-4 rounded-full bg-[#C8A97E]" />
                  </motion.div>
                </div>

                {/* Controls */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-6">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleMute}
                    className="p-3 rounded-full bg-[#C8A97E]/20 text-[#C8A97E] hover:bg-[#C8A97E]/30 transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePlayPause}
                    className="p-4 rounded-full bg-[#C8A97E] text-black hover:bg-[#B69A6E] transition-colors"
                  >
                    {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
                  </motion.button>
                </div>
              </motion.div>

              {/* Track Selection */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                {tracks.map((track) => (
                  <motion.button
                    key={track.id}
                    onClick={() => handleTrackChange(track)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-4 rounded-xl border ${
                      currentTrack.id === track.id
                        ? "border-[#C8A97E] bg-[#C8A97E]/10"
                        : "border-white/10 hover:border-[#C8A97E]/50 bg-black/30"
                    } transition-all`}
                  >
                    <div className="aspect-square relative mb-2 rounded-lg overflow-hidden">
                      <Image
                        src={track.image}
                        alt={track.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-sm font-medium text-white truncate">{track.title}</h3>
                    <p className="text-xs text-gray-400 truncate">{track.subtitle}</p>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <audio
          ref={audioRef}
          src={currentTrack.audioSrc}
          onEnded={() => setIsPlaying(false)}
        />
      </section>

      {/* Mini Player */}
      <AnimatePresence>
        {showMiniPlayer && (
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
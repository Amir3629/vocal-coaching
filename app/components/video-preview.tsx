"use client"

import { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { VolumeX, Volume2 } from "lucide-react"

export default function VideoPreview() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [showControls, setShowControls] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  // Initial autoplay setup
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const playVideo = async () => {
      try {
        await video.play()
      } catch (error) {
        console.log("Autoplay prevented:", error)
        setIsPlaying(false)
      }
    }

    playVideo()
  }, [])

  // Handle video end
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleEnded = () => {
      setIsPlaying(false)
      setIsExpanded(false)
      if (video) {
        video.currentTime = 0
      }
    }

    video.addEventListener('ended', handleEnded)
    return () => video.removeEventListener('ended', handleEnded)
  }, [])

  // Handle play/pause changes
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.play()
      setIsExpanded(true)
    } else {
      video.pause()
    }
  }, [isPlaying])

  const handleVideoClick = () => {
    const video = videoRef.current
    if (!video) return

    if (!isPlaying) {
      video.currentTime = 0
    }
    setIsPlaying(!isPlaying)
  }

  const handleMuteToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!videoRef.current) return
    setIsMuted(!isMuted)
    videoRef.current.muted = !isMuted
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.div 
        className="relative rounded-xl overflow-hidden cursor-pointer bg-[#080505]"
        initial={{ scale: 0.7 }}
        animate={{ 
          scale: isExpanded ? 1 : 0.7
        }}
        transition={{ 
          type: "spring",
          stiffness: 100,
          damping: 20,
          duration: 0.6
        }}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
        onClick={handleVideoClick}
      >
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <div className="absolute inset-0">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              src={process.env.NODE_ENV === 'production'
                ? "/vocal-coaching/videos/preview.mp4"
                : "/videos/preview.mp4"}
              playsInline
              muted={isMuted}
              autoPlay
              style={{
                objectFit: 'contain',
                backgroundColor: '#080505'
              }}
            />
          </div>
        </div>

        <AnimatePresence>
          {showControls && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute top-4 right-4 z-10"
            >
              <button
                onClick={handleMuteToggle}
                className="p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5 text-white" />
                ) : (
                  <Volume2 className="w-5 h-5 text-white" />
                )}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
} 
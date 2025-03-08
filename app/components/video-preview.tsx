"use client"

import { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { VolumeX, Volume2, Play, Pause } from "lucide-react"

export default function VideoPreview() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [showControls, setShowControls] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const posterImage = process.env.NODE_ENV === 'production'
    ? '/vocal-coaching/images/preview-poster.svg'
    : '/images/preview-poster.svg'

  const videoSrc = process.env.NODE_ENV === 'production'
    ? '/vocal-coaching/videos/preview.mp4'
    : '/videos/preview.mp4'

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load()
    }
  }, [])

  const handleLoadStart = () => {
    setIsLoading(true)
    setHasError(false)
  }

  const handleLoadedData = () => {
    setIsLoading(false)
  }

  const handleError = (e: any) => {
    console.error('Video loading error:', e)
    setIsLoading(false)
    setHasError(true)
  }

  const handleVideoClick = async () => {
    if (!videoRef.current) return

    try {
      if (isPlaying) {
        await videoRef.current.pause()
      } else {
        await videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    } catch (error) {
      console.error('Error playing video:', error)
      setHasError(true)
    }
  }

  const handleMuteToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    const video = videoRef.current
    if (!video) return
    
    setHasInteracted(true)
    setIsMuted(!isMuted)
    video.muted = !isMuted
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-[#040202]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#040202]/20 to-[#040202]/60 z-10 pointer-events-none" />
        
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-20 bg-[#040202]">
            <div className="w-12 h-12 border-4 border-[#C8A97E]/20 border-t-[#C8A97E] rounded-full animate-spin" />
          </div>
        )}

        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center z-20 bg-[#040202]">
            <p className="text-[#C8A97E]/80">Video konnte nicht geladen werden</p>
          </div>
        )}

        <div className="absolute inset-0 bg-[#040202] transition-opacity duration-300">
          <video
            ref={videoRef}
            className={`w-full h-full object-contain transition-transform duration-500 ${isPlaying ? 'scale-100' : 'scale-[0.98]'}`}
            poster={posterImage}
            playsInline
            onClick={handleVideoClick}
            onLoadStart={handleLoadStart}
            onLoadedData={handleLoadedData}
            onError={handleError}
          >
            <source
              src={videoSrc}
              type="video/mp4"
            />
          </video>
        </div>

        {!isPlaying && !isLoading && !hasError && (
          <motion.button
            onClick={handleVideoClick}
            className="absolute inset-0 flex items-center justify-center z-20 group"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="w-16 h-16 rounded-full bg-[#C8A97E]/10 backdrop-blur-sm flex items-center justify-center transition-all duration-500 group-hover:bg-[#C8A97E]/20">
              <div className="w-0 h-0 border-y-8 border-y-transparent border-l-[16px] border-l-[#C8A97E] translate-x-0.5" />
            </div>
          </motion.button>
        )}
      </div>
    </div>
  )
}
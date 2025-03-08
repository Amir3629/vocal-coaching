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
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mx-auto">
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black">
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            poster={posterImage}
            onLoadStart={handleLoadStart}
            onLoadedData={handleLoadedData}
            onError={handleError}
            muted={isMuted}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
          
          {/* Dark overlay - only visible when not playing */}
          <div 
            className={`absolute inset-0 bg-black transition-opacity duration-700 ${
              isPlaying ? 'opacity-0' : 'opacity-100'
            }`} 
          />

          {/* Play button with smooth transition */}
          {!isPlaying && (
            <motion.button
              onClick={handleVideoClick}
              className="absolute inset-0 w-full h-full flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-16 h-16 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110">
                <div className="w-0 h-0 border-y-8 border-y-transparent border-l-12 border-l-[#C8A97E] translate-x-0.5" />
              </div>
            </motion.button>
          )}
        </div>
      </div>
    </div>
  )
}
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
    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black/20">
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60 z-10" />
      
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
              </div>
      )}

      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/80">
          <p className="text-white/80">Video konnte nicht geladen werden</p>
                </div>
              )}

              <video
                ref={videoRef}
        className="w-full h-full object-cover cursor-pointer"
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

      {!isPlaying && !isLoading && !hasError && (
        <button
          onClick={handleVideoClick}
          className="absolute inset-0 flex items-center justify-center z-20 group"
        >
          <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center transition-transform group-hover:scale-110">
            <div className="w-0 h-0 border-y-8 border-y-transparent border-l-[16px] border-l-white translate-x-0.5" />
            </div>
        </button>
      )}
    </div>
  )
}
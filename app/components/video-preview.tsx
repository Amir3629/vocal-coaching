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

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleLoadStart = () => {
      setIsLoading(true)
      console.log('Video loading started')
    }

    const handleLoadedData = () => {
      setIsLoading(false)
      console.log('Video loaded successfully')
      // Try to play the video if it's supposed to be playing
      if (isPlaying && !video.playing) {
        video.play().catch(console.error)
      }
    }

    const handleError = (e: Event) => {
      const target = e.target as HTMLVideoElement
      console.error('Video error:', target.error)
      setHasError(true)
      setIsLoading(false)
    }

    video.addEventListener('loadstart', handleLoadStart)
    video.addEventListener('loadeddata', handleLoadedData)
    video.addEventListener('error', handleError)

    // Set initial source
    const videoPath = process.env.NODE_ENV === 'production'
      ? "/vocal-coaching/videos/preview.mp4"
      : "/videos/preview.mp4"
    
    video.src = videoPath
    video.load()

    return () => {
      video.removeEventListener('loadstart', handleLoadStart)
      video.removeEventListener('loadeddata', handleLoadedData)
      video.removeEventListener('error', handleError)
    }
  }, [isPlaying])

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

  const handleVideoClick = async () => {
    const video = videoRef.current
    if (!video) return

    setHasInteracted(true)
    
    try {
      if (!isPlaying) {
        setIsLoading(true)
        await video.play()
        setIsPlaying(true)
        setIsExpanded(true)
      } else {
        await video.pause()
        setIsPlaying(false)
      }
    } catch (error) {
      console.error("Video playback error:", error)
      setHasError(true)
    } finally {
      setIsLoading(false)
    }
  }

  const handleMuteToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!videoRef.current) return
    
    setHasInteracted(true)
    setIsMuted(!isMuted)
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div 
        className="relative rounded-xl overflow-hidden cursor-pointer bg-[#080505] group"
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
          {hasError ? (
            <div className="absolute inset-0 flex items-center justify-center bg-[#080505] text-gray-400">
              <div className="text-center">
                <p>Sorry, the video is currently unavailable.</p>
                <p className="text-sm mt-2">Please try again later.</p>
              </div>
            </div>
          ) : (
            <div className="absolute inset-0">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#080505] z-10">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#C8A97E]"></div>
                </div>
              )}
              <video
                ref={videoRef}
                className={`w-full h-full object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                playsInline
                muted={isMuted}
                preload="auto"
                poster={process.env.NODE_ENV === 'production'
                  ? "/vocal-coaching/videos/preview-poster.jpg"
                  : "/videos/preview-poster.jpg"}
                style={{
                  objectFit: 'contain',
                  backgroundColor: '#080505'
                }}
              />

              {/* Play/Pause Overlay */}
              <div className={`absolute inset-0 flex items-center justify-center bg-black/50 transition-opacity duration-300 ${
                showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
              }`}>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-16 h-16 rounded-full bg-[#C8A97E]/90 flex items-center justify-center text-black"
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8" />
                  ) : (
                    <Play className="w-8 h-8 ml-1" />
                  )}
                </motion.button>
              </div>
            </div>
          )}
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
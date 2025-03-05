"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Play } from "lucide-react"
import VideoControls from "./video-controls"

export default function VideoPreview() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }, [videoRef.current])

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleSeek = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  const handleFullScreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen()
      } else {
        videoRef.current.requestFullscreen()
      }
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  return (
    <section className="relative w-full py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto"
        >
          <motion.div
            layout
            animate={{
              width: isPlaying ? "100%" : "300px",
              maxWidth: isPlaying ? "1200px" : "300px"
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 25
            }}
            className="mx-auto overflow-hidden rounded-xl relative group"
          >
            <div className="relative aspect-video bg-black">
              <video
                ref={videoRef}
                src="/videos/video_2025-03-02_18-41-30.mp4"
                className="absolute inset-0 w-full h-full object-contain"
                playsInline
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={() => {
                  if (videoRef.current) {
                    setDuration(videoRef.current.duration)
                  }
                }}
              />

              {!isPlaying && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center cursor-pointer"
                  onClick={handlePlayPause}
                >
                  <div className="absolute inset-0 bg-black/60 transition-opacity group-hover:bg-black/40" />
                  <motion.div 
                    className="relative z-10"
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="absolute inset-0 bg-[#C8A97E] rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
                    <div className="relative w-16 h-16 rounded-full bg-[#C8A97E] flex items-center justify-center">
                      <Play className="w-8 h-8 text-black ml-1" />
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {isPlaying && (
                <VideoControls
                  isPlaying={isPlaying}
                  isMuted={isMuted}
                  currentTime={currentTime}
                  duration={duration}
                  onPlayPause={handlePlayPause}
                  onMuteToggle={handleMuteToggle}
                  onSeek={handleSeek}
                  onFullScreen={handleFullScreen}
                />
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 
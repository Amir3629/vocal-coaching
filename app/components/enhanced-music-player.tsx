"use client";

import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause } from 'lucide-react'
import { getImagePath } from '../../lib/utils'

interface Track {
  title: string
  artist: string
  audioSrc: string
  coverArt: string
}

interface EnhancedMusicPlayerProps {
  tracks: Track[]
  initialTrackIndex?: number
  className?: string
}

export default function EnhancedMusicPlayer({
  tracks,
  initialTrackIndex = 0,
  className = ''
}: EnhancedMusicPlayerProps) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(initialTrackIndex)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const animationRef = useRef<number | null>(null)

  const currentTrack = tracks[currentTrackIndex]

  // Ensure paths are correctly prefixed for GitHub Pages
  const audioSrc = getImagePath(currentTrack.audioSrc)
  const coverArt = getImagePath(currentTrack.coverArt)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = audioSrc
      audioRef.current.load()
      if (isPlaying) {
        audioRef.current.play()
      }
    }
  }, [currentTrackIndex, audioSrc])

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
          animationRef.current = null
        }
      } else {
        audioRef.current.play()
        animationRef.current = requestAnimationFrame(updateProgress)
      }
      setIsPlaying(!isPlaying)
    }
  }

  const updateProgress = () => {
    if (audioRef.current) {
      const duration = audioRef.current.duration
      const currentTime = audioRef.current.currentTime
      if (duration > 0) {
        setProgress((currentTime / duration) * 100)
      }
      animationRef.current = requestAnimationFrame(updateProgress)
    }
  }

  const handleEnded = () => {
    if (currentTrackIndex < tracks.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1)
    } else {
      setCurrentTrackIndex(0)
      setIsPlaying(false)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
    }
  }

  return (
    <div className={`relative ${className}`}>
      <audio
        ref={audioRef}
        onEnded={handleEnded}
        onPlay={() => {
          setIsPlaying(true)
          animationRef.current = requestAnimationFrame(updateProgress)
        }}
        onPause={() => {
          setIsPlaying(false)
          if (animationRef.current) {
            cancelAnimationFrame(animationRef.current)
            animationRef.current = null
          }
        }}
        preload="metadata"
      >
        <source src={audioSrc} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <div className="flex items-center justify-center">
        <motion.div
          className="relative w-64 h-64 rounded-full overflow-hidden shadow-xl"
          animate={{
            rotate: isPlaying ? 360 : 0
          }}
          transition={{
            duration: 10,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop"
          }}
          style={{ 
            backgroundImage: `url(${coverArt})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-black/70 flex items-center justify-center cursor-pointer" onClick={togglePlayPause}>
              {isPlaying ? (
                <Pause className="w-8 h-8 text-white" />
              ) : (
                <Play className="w-8 h-8 text-white ml-1" />
              )}
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-10 h-10 rounded-full bg-white/90" />
          </div>
        </motion.div>
      </div>

      <div className="mt-6 text-center">
        <h3 className="text-xl font-semibold text-white">{currentTrack.title}</h3>
        <p className="text-gray-400">{currentTrack.artist}</p>
      </div>

      <div className="mt-4 w-full bg-gray-700 rounded-full h-1.5 overflow-hidden">
        <div
          className="bg-[#C8A97E] h-1.5 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
} 
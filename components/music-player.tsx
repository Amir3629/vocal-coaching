"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

interface Track {
  title: string
  artist: string
  duration: string
  cover: string
  audioUrl: string
}

const tracks: Track[] = [
  {
    title: "Jazz Standards",
    artist: "Melanie Wainwright Quartet",
    duration: "4:30",
    cover: "/placeholder.svg?height=400&width=400",
    audioUrl: "/path-to-audio-1.mp3", // You'll need to add actual audio files
  },
  {
    title: "Original Compositions",
    artist: "Melanie Wainwright",
    duration: "3:45",
    cover: "/placeholder.svg?height=400&width=400",
    audioUrl: "/path-to-audio-2.mp3",
  },
]

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)

  const audioRef = useRef<HTMLAudioElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
      setDuration(audioRef.current.duration)
    }
  }

  const handleProgressClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (progressRef.current && audioRef.current) {
      const rect = progressRef.current.getBoundingClientRect()
      const pos = (event.clientX - rect.left) / rect.width
      audioRef.current.currentTime = pos * duration
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div
        className="bg-[#1a1a1a] rounded-xl p-6 border border-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-6">
          <motion.div className="w-24 h-24 rounded-lg overflow-hidden" whileHover={{ scale: 1.05 }}>
            <img
              src={tracks[currentTrack].cover || "/placeholder.svg"}
              alt={tracks[currentTrack].title}
              className="w-full h-full object-cover"
            />
          </motion.div>

          <div className="flex-1">
            <h3 className="text-xl font-semibold">{tracks[currentTrack].title}</h3>
            <p className="text-gray-400">{tracks[currentTrack].artist}</p>

            <div
              ref={progressRef}
              className="mt-4 h-1 bg-gray-700 rounded-full cursor-pointer"
              onClick={handleProgressClick}
            >
              <div
                className="h-full bg-purple-600 rounded-full"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>

            <div className="flex justify-between mt-2 text-sm text-gray-400">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-white hover:bg-purple-600/20"
              onClick={toggleMute}
            >
              {isMuted ? <VolumeX /> : <Volume2 />}
            </Button>
            <Slider
              value={[volume * 100]}
              max={100}
              step={1}
              className="w-24"
              onValueChange={(value) => setVolume(value[0] / 100)}
            />
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-white hover:bg-purple-600/20"
              onClick={() => setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length)}
            >
              <SkipBack />
            </Button>
            <Button
              size="icon"
              className="bg-purple-600 hover:bg-purple-700 rounded-full h-12 w-12"
              onClick={togglePlay}
            >
              {isPlaying ? <Pause /> : <Play />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-white hover:bg-purple-600/20"
              onClick={() => setCurrentTrack((prev) => (prev + 1) % tracks.length)}
            >
              <SkipForward />
            </Button>
          </div>
          <div className="w-32" /> {/* Spacer to center play controls */}
        </div>
      </motion.div>

      <audio
        ref={audioRef}
        src={tracks[currentTrack].audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setCurrentTrack((prev) => (prev + 1) % tracks.length)}
      />
    </div>
  )
}


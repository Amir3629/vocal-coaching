"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Card } from "@/components/ui/card"

interface Track {
  id: string
  title: string
  artist: string
  duration: string
  cover: string
  audioUrl: string | null
}

const defaultTracks: Track[] = [
  {
    id: "1",
    title: "Sample Jazz Track",
    artist: "Melanie Wainwright",
    duration: "0:00",
    cover: "/placeholder.svg?height=400&width=400",
    audioUrl: null, // Will be replaced with actual audio files
  },
]

export default function EnhancedMusicPlayer() {
  const [tracks, setTracks] = useState<Track[]>(defaultTracks)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.8)
  const [isMuted, setIsMuted] = useState(false)

  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    // Here you would typically fetch the tracks from your API
    // For now we'll use the default tracks
  }, [])

  const togglePlay = () => {
    if (!tracks[currentTrack].audioUrl) {
      alert("No audio file available yet. Please check back later!")
      return
    }

    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-4xl mx-auto">
      <Card className="bg-[#1a1a1a]/80 backdrop-blur-sm border-[#C8A97E]/20 p-6">
        <div className="flex items-center gap-6">
          <motion.div className="relative w-24 h-24 rounded-lg overflow-hidden" whileHover={{ scale: 1.05 }}>
            <div className="absolute inset-0 bg-[#C8A97E]/10" />
            <img
              src={tracks[currentTrack].cover || "/placeholder.svg"}
              alt={tracks[currentTrack].title}
              className="w-full h-full object-cover"
            />
          </motion.div>

          <div className="flex-1">
            <h3 className="text-xl font-semibold text-white">{tracks[currentTrack].title}</h3>
            <p className="text-[#C8A97E]">{tracks[currentTrack].artist}</p>

            <div className="mt-4 relative h-1 bg-gray-800 rounded-full">
              <motion.div
                className="absolute h-full bg-[#C8A97E] rounded-full"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>

            <div className="flex justify-between mt-2 text-sm text-gray-400">
              <span>{formatTime(currentTime)}</span>
              <span>{tracks[currentTrack].duration}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-[#C8A97E] hover:text-white hover:bg-[#C8A97E]/20"
              onClick={() => setIsMuted(!isMuted)}
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
              className="text-[#C8A97E] hover:text-white hover:bg-[#C8A97E]/20"
              onClick={() => setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length)}
            >
              <SkipBack />
            </Button>
            <Button
              size="icon"
              className="bg-[#C8A97E] hover:bg-[#B89A6F] text-black rounded-full h-12 w-12"
              onClick={togglePlay}
            >
              {isPlaying ? <Pause /> : <Play />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-[#C8A97E] hover:text-white hover:bg-[#C8A97E]/20"
              onClick={() => setCurrentTrack((prev) => (prev + 1) % tracks.length)}
            >
              <SkipForward />
            </Button>
          </div>
          <div className="w-32" />
        </div>

        {!tracks[currentTrack].audioUrl && (
          <p className="text-center text-sm text-gray-400 mt-4">
            Audio tracks coming soon! Check back later for music samples.
          </p>
        )}
      </Card>

      {tracks[currentTrack].audioUrl && (
        <audio
          ref={audioRef}
          src={tracks[currentTrack].audioUrl || undefined}
          onTimeUpdate={() => {
            if (audioRef.current) {
              setCurrentTime(audioRef.current.currentTime)
              setDuration(audioRef.current.duration)
            }
          }}
          onEnded={() => {
            setIsPlaying(false)
            setCurrentTrack((prev) => (prev + 1) % tracks.length)
          }}
        />
      )}
    </motion.div>
  )
}


"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { SkipBack, Pause, Play, SkipForward } from "lucide-react"

interface Track {
  title: string
  artist: string
  duration: number
}

const tracks: Track[] = [
  {
    title: "Jazz Improvisation",
    artist: "Melanie Wainwright",
    duration: 180
  },
  {
    title: "Vocal Techniques",
    artist: "Melanie Wainwright",
    duration: 240
  }
]

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)

  const currentTrack = tracks[currentTrackIndex]

  const handlePrevious = () => {
    setCurrentTrackIndex(prev => (prev > 0 ? prev - 1 : tracks.length - 1))
  }

  const handleNext = () => {
    setCurrentTrackIndex(prev => (prev < tracks.length - 1 ? prev + 1 : 0))
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <Card className="bg-[#0A0A0A] rounded-xl p-6 border border-[#C8A97E]/20">
      <div className="relative w-full max-w-md mx-auto bg-black/20 rounded-xl overflow-hidden">
        <div className="p-4 flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-medium truncate">{currentTrack.title}</h3>
              <p className="text-sm text-gray-400 truncate">{currentTrack.artist}</p>
            </div>
          </div>
          
          <div className="flex items-center justify-center space-x-4 mt-2">
            <button 
              onClick={handlePrevious}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Previous track"
            >
              <SkipBack className="w-5 h-5" />
            </button>
            
            <button
              onClick={togglePlayPause}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </button>
            
            <button
              onClick={handleNext} 
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Next track"
            >
              <SkipForward className="w-5 h-5" />
            </button>
          </div>

          <div className="w-full flex items-center space-x-2">
            <span className="text-xs">{formatTime(currentTime)}</span>
            <div className="flex-1 h-1 bg-white/20 rounded-full">
              <div 
                className="h-full bg-white rounded-full"
                style={{ width: `${(currentTime / currentTrack.duration) * 100}%` }}
              />
            </div>
            <span className="text-xs">{formatTime(currentTrack.duration)}</span>
          </div>
        </div>
      </div>
    </Card>
  )
} 
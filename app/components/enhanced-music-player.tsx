"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Music } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { getAudioPath } from "@/app/utils/paths";

interface Track {
  id: number;
  title: string;
  artist: string;
  file: string;
  duration: number; // in seconds
}

const defaultTracks: Track[] = [
  {
    id: 1,
    title: "Jazz Improvisation",
    artist: "Mel Jazz",
    file: "/audio/music-sample-1",
    duration: 180
  },
  {
    id: 2,
    title: "Soul Expressions",
    artist: "Mel Jazz",
    file: "/audio/music-sample-2",
    duration: 210
  },
  {
    id: 3,
    title: "Vocal Techniques",
    artist: "Mel Jazz",
    file: "/audio/music-sample-3",
    duration: 195
  }
];

// Add event system for media coordination
const MEDIA_STOP_EVENT = 'stopAllMedia';

export default function EnhancedMusicPlayer() {
  const [tracks] = useState<Track[]>(defaultTracks);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const progressBarRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const currentTrack = tracks[currentTrackIndex];
  
  // Update progress tracking
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        if (audioRef.current) {
          setCurrentTime(audioRef.current.currentTime);
        }
      }, 100);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying]);

  useEffect(() => {
    // Listen for stop events from other media players
    const handleMediaStop = () => {
      if (isPlaying) {
        setIsPlaying(false);
        if (audioRef.current) {
          audioRef.current.pause();
        }
      }
    };

    window.addEventListener(MEDIA_STOP_EVENT, handleMediaStop);
    return () => window.removeEventListener(MEDIA_STOP_EVENT, handleMediaStop);
  }, [isPlaying]);

  // Handle play/pause
  const handlePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    } else {
      // Dispatch event to stop other media
      window.dispatchEvent(new Event(MEDIA_STOP_EVENT));
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.play().catch(err => {
          console.error("Failed to play audio:", err);
          setError("Failed to play audio. Please try again.");
        });
      }
    }
  };

  const handlePrevTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex - 1 + tracks.length) % tracks.length);
    setCurrentTime(0);
  };

  const handleNextTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
    setCurrentTime(0);
  };

  // Toggle mute
  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };

  // Format time in MM:SS
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Handle progress bar click
  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current) return;
    
    const progressBar = progressBarRef.current;
    const rect = progressBar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    
    if (audioRef.current) {
      const newTime = percent * currentTrack.duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    
    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  // Handle audio ended
  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    
    // Auto play next track
    handleNextTrack();
  };

  // Handle audio error
  const handleError = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
    console.error("Audio error:", e);
    setError("Failed to play audio. Please try again.");
    setIsPlaying(false);
    setIsLoading(false);
  };

  // Update audio src when track changes
  useEffect(() => {
    if (audioRef.current) {
      const audioPath = getAudioPath(currentTrack.file);
      audioRef.current.src = `${audioPath}.mp3`;
      
      if (isPlaying) {
        setIsLoading(true);
        audioRef.current.play()
          .then(() => {
            setIsLoading(false);
          })
          .catch(err => {
            console.error("Failed to play audio:", err);
            setIsLoading(false);
            setError("Failed to play audio. Please try again.");
          });
      }
    }
  }, [currentTrackIndex, currentTrack.file]);

  return (
    <div className="bg-[#0A0A0A] rounded-lg p-6 max-w-md mx-auto">
      <div className="flex flex-col items-center mb-6">
        <h3 className="text-lg font-semibold text-white mb-1 text-center">{currentTrack.title}</h3>
        <p className="text-sm text-[#C8A97E] mb-6 text-center">{currentTrack.artist}</p>
        
        {/* Vinyl Disc */}
        <div className="relative w-32 h-32 mb-6">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-4 border-[#333333]"></div>
          
          {/* Inner disc */}
          <motion.div 
            className="absolute inset-[4px] rounded-full bg-[#111] border border-[#222]"
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ 
              duration: 20, 
              ease: "linear", 
              repeat: Infinity,
              repeatType: "loop" 
            }}
          >
            {/* Grooves */}
            <div className="absolute inset-[8px] rounded-full border border-[#222]"></div>
            <div className="absolute inset-[16px] rounded-full border border-[#222]"></div>
            <div className="absolute inset-[24px] rounded-full border border-[#222]"></div>
            <div className="absolute inset-[32px] rounded-full border border-[#222]"></div>
            
            {/* Label */}
            <div className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-[#C8A97E]">
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.button
                  className="w-12 h-12 rounded-full bg-black flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePlay}
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-[#C8A97E] border-t-transparent rounded-full animate-spin"></div>
                  ) : isPlaying ? (
                    <Pause className="w-5 h-5 text-[#C8A97E]" />
                  ) : (
                    <Play className="w-5 h-5 text-[#C8A97E] ml-0.5" />
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div 
        ref={progressBarRef}
        className="h-1 bg-[#333] rounded-full mb-2 cursor-pointer"
        onClick={handleProgressBarClick}
      >
        <div 
          className="h-full bg-[#C8A97E] rounded-full"
          style={{ width: `${(currentTime / currentTrack.duration) * 100}%` }}
        ></div>
      </div>
      
      <div className="flex justify-between text-xs text-gray-500 mb-6">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(currentTrack.duration)}</span>
      </div>
      
      {/* Controls */}
      <div className="flex justify-center items-center gap-4 mb-8">
        <button 
          className="text-white hover:text-[#C8A97E] transition-colors"
          onClick={handlePrevTrack}
        >
          <SkipBack size={20} />
        </button>
        
        <button 
          className="text-white hover:text-[#C8A97E] transition-colors"
          onClick={handleNextTrack}
        >
          <SkipForward size={20} />
        </button>
        
        <div className="flex items-center gap-2 ml-4">
          <button 
            className="text-white hover:text-[#C8A97E] transition-colors"
            onClick={toggleMute}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          
          <input 
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-16 h-1 bg-[#333] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#C8A97E]"
          />
        </div>
      </div>
      
      {/* Track List */}
      <div className="space-y-2">
        {tracks.map((track) => (
          <div
            key={track.id}
            className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 ${
              track.id === currentTrack.id 
              ? "bg-[#C8A97E]/20 border border-[#C8A97E]/40" 
              : "bg-[#111] hover:bg-[#222]"
            }`}
            onClick={() => {
              setCurrentTrackIndex(tracks.indexOf(track));
              if (!isPlaying) setIsPlaying(true);
            }}
          >
            <div className="w-8 h-8 rounded-full bg-[#222] flex items-center justify-center mr-3">
              <Music className="w-4 h-4 text-[#C8A97E]" />
            </div>
            <div>
              <p className="text-white text-sm font-medium">{track.title}</p>
              <p className="text-gray-500 text-xs">{track.artist}</p>
            </div>
          </div>
        ))}
      </div>
      
      {error && (
        <div className="mt-4 p-3 bg-red-500/20 text-red-200 rounded-md text-sm">
          {error}
          <button 
            className="ml-2 underline"
            onClick={() => setError(null)}
          >
            Dismiss
          </button>
        </div>
      )}
      
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        onEnded={handleEnded}
        onError={handleError}
        className="hidden"
      />
    </div>
  );
} 
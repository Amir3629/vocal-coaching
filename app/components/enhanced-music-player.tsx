"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Music } from "lucide-react";
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
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [startDragPosition, setStartDragPosition] = useState({ x: 0, y: 0 });
  
  const progressBarRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const discRef = useRef<HTMLDivElement>(null);
  
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

  // Drag functionality
  const handleDragStart = (e: React.MouseEvent) => {
    if (isDragging) return;
    
    setIsDragging(true);
    setStartDragPosition({ x: e.clientX, y: e.clientY });
    
    // Add dragging class to body
    document.body.classList.add('dragging-disc');
  };

  const handleDragMove = (e: MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - startDragPosition.x;
    const deltaY = e.clientY - startDragPosition.y;
    
    // Apply some damping for smoother movement
    const damping = 0.5;
    setDragPosition({
      x: dragPosition.x + deltaX * damping,
      y: dragPosition.y + deltaY * damping
    });
    
    setStartDragPosition({ x: e.clientX, y: e.clientY });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    
    // Reset position with animation
    setDragPosition({ x: 0, y: 0 });
    
    // Remove dragging class from body
    document.body.classList.remove('dragging-disc');
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleDragMove);
      window.addEventListener('mouseup', handleDragEnd);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleDragMove);
      window.removeEventListener('mouseup', handleDragEnd);
    };
  }, [isDragging, startDragPosition]);

  // Dismiss error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="bg-black/90 backdrop-blur-lg rounded-lg p-8 max-w-md mx-auto relative overflow-hidden">
      {/* Background blur effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80 backdrop-blur-md z-0"></div>
      
      <div className="relative z-10">
        {/* Track title and artist */}
        <div className="text-center mb-8">
          <h3 className="text-xl font-medium text-white mb-1">{currentTrack.title}</h3>
          <p className="text-sm text-[#C8A97E]">{currentTrack.artist}</p>
        </div>
        
        {/* Vinyl Disc */}
        <div 
          ref={discRef}
          className={`relative w-48 h-48 mx-auto mb-8 cursor-grab ${isDragging ? 'cursor-grabbing' : ''}`}
          onMouseDown={handleDragStart}
          style={{
            transform: `translate(${dragPosition.x}px, ${dragPosition.y}px)`,
            transition: isDragging ? 'none' : 'transform 0.5s ease-out'
          }}
        >
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-[6px] border-[#222] shadow-lg"></div>
          
          {/* Inner disc */}
          <motion.div 
            className="absolute inset-[6px] rounded-full bg-black"
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ 
              duration: 20, 
              ease: "linear", 
              repeat: Infinity,
              repeatType: "loop" 
            }}
          >
            {/* Grooves */}
            <div className="absolute inset-[10px] rounded-full border border-[#222]"></div>
            <div className="absolute inset-[20px] rounded-full border border-[#222]"></div>
            <div className="absolute inset-[30px] rounded-full border border-[#222]"></div>
            <div className="absolute inset-[40px] rounded-full border border-[#222]"></div>
            <div className="absolute inset-[50px] rounded-full border border-[#222]"></div>
            
            {/* Label */}
            <div className="absolute inset-0 m-auto w-24 h-24 rounded-full bg-[#C8A97E]/90 flex items-center justify-center shadow-inner">
              <motion.button
                className="w-16 h-16 rounded-full bg-black flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlay();
                }}
                transition={{ duration: 0.3 }}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-[#C8A97E] border-t-transparent rounded-full animate-spin"></div>
                ) : isPlaying ? (
                  <Pause className="w-6 h-6 text-[#C8A97E]" />
                ) : (
                  <Play className="w-6 h-6 text-[#C8A97E] ml-1" />
                )}
              </motion.button>
            </div>
          </motion.div>
        </div>
        
        {/* Progress Bar */}
        <div 
          ref={progressBarRef}
          className="h-1 bg-[#333] rounded-full mb-2 cursor-pointer mx-4"
          onClick={handleProgressBarClick}
        >
          <div 
            className="h-full bg-[#C8A97E] rounded-full"
            style={{ width: `${(currentTime / currentTrack.duration) * 100}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between text-xs text-gray-500 mb-6 mx-4">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(currentTrack.duration)}</span>
        </div>
        
        {/* Controls */}
        <div className="flex justify-center items-center gap-6 mb-8">
          <motion.button 
            className="text-white hover:text-[#C8A97E] transition-colors"
            onClick={handlePrevTrack}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <SkipBack size={20} />
          </motion.button>
          
          <motion.button 
            className="text-white hover:text-[#C8A97E] transition-colors"
            onClick={handleNextTrack}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <SkipForward size={20} />
          </motion.button>
          
          <motion.div 
            className="flex items-center gap-2 ml-4"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
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
              className="w-16 h-1 bg-[#333] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#C8A97E]"
            />
          </motion.div>
        </div>
        
        {/* Track List */}
        <div className="space-y-2">
          {tracks.map((track) => (
            <motion.div
              key={track.id}
              className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                track.id === currentTrack.id 
                ? "bg-[#C8A97E]/20 border border-[#C8A97E]/40" 
                : "bg-black/50 hover:bg-[#222]/50"
              }`}
              onClick={() => {
                setCurrentTrackIndex(tracks.indexOf(track));
                if (!isPlaying) setIsPlaying(true);
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-8 h-8 rounded-full bg-[#222] flex items-center justify-center mr-3">
                <Music className="w-4 h-4 text-[#C8A97E]" />
              </div>
              <div>
                <p className="text-white text-sm font-medium">{track.title}</p>
                <p className="text-gray-500 text-xs">{track.artist}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Error message */}
        <AnimatePresence>
          {error && (
            <motion.div 
              className="mt-4 p-3 bg-red-500/20 text-red-200 rounded-md text-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {error}
              <button 
                className="ml-2 underline"
                onClick={() => setError(null)}
              >
                Dismiss
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        onEnded={handleEnded}
        onError={handleError}
        className="hidden"
      />
      
      {/* Add global styles for dragging */}
      <style jsx global>{`
        body.dragging-disc {
          cursor: grabbing;
          user-select: none;
        }
      `}</style>
    </div>
  );
} 
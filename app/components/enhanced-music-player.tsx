"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Play, Pause } from "lucide-react";
import { getAudioPath } from "@/app/utils/paths";

interface Track {
  id: number;
  title: string;
  artist: string;
  file: string;
  duration: number;
  image: string;
}

const defaultTracks: Track[] = [
  {
    id: 1,
    title: "Autumn Leaves - Jazz Piano",
    artist: "Melvo Jazz",
    file: "/audio/music-sample-1",
    duration: 180,
    image: "/images/music/jazz-piano.jpg"
  },
  {
    id: 2,
    title: "Soul Expressions",
    artist: "Melvo Jazz",
    file: "/audio/music-sample-2",
    duration: 210,
    image: "/images/music/soul-expressions.jpg"
  },
  {
    id: 3,
    title: "Vocal Techniques",
    artist: "Melvo Jazz",
    file: "/audio/music-sample-3",
    duration: 195,
    image: "/images/music/vocal-techniques.jpg"
  }
];

// Add event system for media coordination
const MEDIA_STOP_EVENT = 'stopAllMedia';

export default function EnhancedMusicPlayer() {
  const [tracks] = useState<Track[]>(defaultTracks);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [startDragPosition, setStartDragPosition] = useState({ x: 0, y: 0 });
  const [showBackDiscs, setShowBackDiscs] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const discRef = useRef<HTMLDivElement>(null);
  
  const currentTrack = tracks[currentTrackIndex];

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

  // Handle audio ended
  const handleEnded = () => {
    setIsPlaying(false);
    // Auto play next track
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
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

  // Disc interaction
  const handleDiscClick = (e: React.MouseEvent) => {
    // Only trigger if clicking outside the center button
    const rect = discRef.current?.getBoundingClientRect();
    if (rect) {
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.sqrt(
        Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
      );
      
      // If clicking outside the center button area (radius ~40px)
      if (distance > 60) {
        setShowBackDiscs(!showBackDiscs);
      }
    }
  };

  const handleDragStart = (e: React.MouseEvent) => {
    if (isDragging) return;
    
    // Prevent dragging when clicking the center button
    const rect = discRef.current?.getBoundingClientRect();
    if (rect) {
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.sqrt(
        Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
      );
      
      // If clicking inside the center button area, don't start dragging
      if (distance < 60) {
        return;
      }
    }
    
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

  const selectTrack = (index: number) => {
    setCurrentTrackIndex(index);
    setShowBackDiscs(false);
    if (!isPlaying) {
      setIsPlaying(true);
    }
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
    <div className="relative h-screen w-full flex flex-col items-center justify-center bg-black overflow-hidden">
      {/* Background blur effect */}
      <div className="absolute inset-0 bg-black/95 backdrop-blur-xl z-0"></div>
      
      <div className="relative z-10 flex flex-col items-center">
        <h2 className="text-3xl font-bold text-white mb-6">Meine Musik</h2>
        <div className="w-16 h-1 bg-[#C8A97E] mb-12"></div>
        
        {/* Main Vinyl Disc */}
        <div 
          ref={discRef}
          className={`relative w-96 h-96 mx-auto mb-8 cursor-grab ${isDragging ? 'cursor-grabbing' : ''}`}
          onClick={handleDiscClick}
          onMouseDown={handleDragStart}
          style={{
            transform: `translate(${dragPosition.x}px, ${dragPosition.y}px)`,
            transition: isDragging ? 'none' : 'transform 0.5s ease-out'
          }}
        >
          {/* Background discs */}
          <AnimatePresence>
            {showBackDiscs && tracks.map((track, index) => {
              if (index === currentTrackIndex) return null;
              
              // Calculate position for background discs
              const angle = (index * (360 / tracks.length)) * (Math.PI / 180);
              const distance = 220; // Distance from center
              const x = Math.cos(angle) * distance;
              const y = Math.sin(angle) * distance;
              
              return (
                <motion.div
                  key={track.id}
                  className="absolute w-72 h-72 rounded-full shadow-2xl cursor-pointer"
                  initial={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
                  animate={{ 
                    opacity: 0.8, 
                    x, 
                    y, 
                    scale: 0.8,
                    transition: { duration: 0.7, ease: "easeOut" }
                  }}
                  exit={{ 
                    opacity: 0, 
                    x: 0, 
                    y: 0, 
                    scale: 0.5,
                    transition: { duration: 0.5, ease: "easeIn" }
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    selectTrack(index);
                  }}
                  whileHover={{ scale: 0.85, opacity: 1 }}
                >
                  {/* Disc image */}
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <div className="absolute inset-0 rounded-full overflow-hidden">
                      <Image 
                        src={track.image} 
                        alt={track.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="opacity-90"
                      />
                    </div>
                    
                    {/* Vinyl grooves */}
                    <div className="absolute inset-0 rounded-full">
                      <div className="absolute inset-[5px] rounded-full border border-[#333]/60"></div>
                      <div className="absolute inset-[15px] rounded-full border border-[#333]/60"></div>
                      <div className="absolute inset-[25px] rounded-full border border-[#333]/60"></div>
                      <div className="absolute inset-[35px] rounded-full border border-[#333]/60"></div>
                    </div>
                    
                    {/* Center label */}
                    <div className="absolute inset-0 m-auto w-24 h-24 rounded-full bg-black flex items-center justify-center">
                      <p className="text-xs text-[#C8A97E] font-medium text-center px-2">{track.title.split(' - ')[0]}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
          
          {/* Main disc */}
          <div className="absolute inset-0 rounded-full overflow-hidden">
            {/* Disc image background */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <Image 
                src={currentTrack.image} 
                alt={currentTrack.title}
                fill
                style={{ objectFit: 'cover' }}
                className="opacity-100"
                priority
              />
            </div>
            
            {/* Inner disc with grooves */}
            <motion.div 
              className="absolute inset-0 rounded-full bg-black/30 backdrop-blur-sm"
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ 
                duration: 20, 
                ease: "linear", 
                repeat: Infinity,
                repeatType: "loop" 
              }}
            >
              {/* Vinyl grooves */}
              <div className="absolute inset-0 rounded-full">
                <div className="absolute inset-[15px] rounded-full border border-[#444]/70"></div>
                <div className="absolute inset-[30px] rounded-full border border-[#444]/70"></div>
                <div className="absolute inset-[45px] rounded-full border border-[#444]/70"></div>
                <div className="absolute inset-[60px] rounded-full border border-[#444]/70"></div>
                <div className="absolute inset-[75px] rounded-full border border-[#444]/70"></div>
                <div className="absolute inset-[90px] rounded-full border border-[#444]/70"></div>
                <div className="absolute inset-[105px] rounded-full border border-[#444]/70"></div>
                <div className="absolute inset-[120px] rounded-full border border-[#444]/70"></div>
              </div>
              
              {/* Center button */}
              <div className="absolute inset-0 m-auto w-32 h-32 rounded-full bg-black flex items-center justify-center">
                <motion.button
                  className="w-24 h-24 rounded-full bg-black flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlay();
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {isLoading ? (
                    <div className="w-8 h-8 border-2 border-[#C8A97E] border-t-transparent rounded-full animate-spin"></div>
                  ) : isPlaying ? (
                    <Pause className="w-10 h-10 text-[#C8A97E]" />
                  ) : (
                    <Play className="w-10 h-10 text-[#C8A97E] ml-1" />
                  )}
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Track title and artist - BELOW THE DISC */}
        <div className="text-center mt-4">
          <h3 className="text-xl font-medium text-white mb-1">{currentTrack.title}</h3>
          <p className="text-sm text-[#C8A97E]">{currentTrack.artist}</p>
        </div>
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
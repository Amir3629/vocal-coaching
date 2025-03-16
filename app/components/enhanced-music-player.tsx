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
  const [showMiniPlayer, setShowMiniPlayer] = useState(false);
  const [lastPlayTime, setLastPlayTime] = useState(Date.now());
  
  const progressBarRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const miniPlayerRef = useRef<HTMLDivElement>(null);

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
    const handleScroll = () => {
      const mainPlayerRect = document.getElementById('main-player')?.getBoundingClientRect();
      if (mainPlayerRect && isPlaying) {
        setShowMiniPlayer(mainPlayerRect.bottom < 0);
        setLastPlayTime(Date.now());
      }
    };

    const checkPlayStatus = setInterval(() => {
      if (!isPlaying && Date.now() - lastPlayTime > 3000) {
        setShowMiniPlayer(false);
      }
    }, 1000);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(checkPlayStatus);
    };
  }, [isPlaying, lastPlayTime]);

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
    <>
      <motion.div id="main-player" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-4xl mx-auto">
        <Card className="bg-[#080505]/80 backdrop-blur-sm border-[#C8A97E]/20 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-6">
            <div className="relative w-full sm:w-24 h-24 rounded-lg overflow-hidden bg-[#C8A97E]/20 flex items-center justify-center">
              <Music className="w-12 h-12 text-[#C8A97E]" />
            </div>

            <div className="flex-1">
              <h3 className="text-xl sm:text-2xl font-light text-white mb-2">{currentTrack.title}</h3>
              <p className="text-[#C8A97E] text-sm mb-1">{currentTrack.artist}</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mb-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrevTrack}
              className="w-10 h-10 rounded-full bg-[#C8A97E]/10 hover:bg-[#C8A97E]/20 flex items-center justify-center text-[#C8A97E] transition-colors"
            >
              <SkipBack className="w-5 h-5" />
            </motion.button>

            <div className="relative">
              <svg className="w-14 sm:w-16 h-14 sm:h-16" viewBox="0 0 48 48">
                <circle
                  cx="24"
                  cy="24"
                  r="23"
                  className="fill-[#C8A97E]/10"
                />
                <motion.circle
                  cx="24"
                  cy="24"
                  r="23"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  className="text-[#C8A97E]"
                  strokeDasharray="144.51326206513048"
                  strokeDashoffset={144.51326206513048 * (1 - currentTime / currentTrack.duration)}
                  transform="rotate(-90 24 24)"
                />
                <motion.circle
                  cx="24"
                  cy="24"
                  r="21"
                  className="fill-[#C8A97E] cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePlay}
                />
              </svg>
              <motion.div
                className="absolute inset-0 flex items-center justify-center text-black"
                onClick={handlePlay}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                ) : isPlaying ? (
                  <Pause className="w-5 sm:w-6 h-5 sm:h-6" />
                ) : (
                  <Play className="w-5 sm:w-6 h-5 sm:h-6 ml-1" />
                )}
              </motion.div>
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNextTrack}
              className="w-10 h-10 rounded-full bg-[#C8A97E]/10 hover:bg-[#C8A97E]/20 flex items-center justify-center text-[#C8A97E] transition-colors"
            >
              <SkipForward className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleMute}
              className="w-10 h-10 rounded-full bg-[#C8A97E]/10 hover:bg-[#C8A97E]/20 flex items-center justify-center text-[#C8A97E] transition-colors"
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </motion.button>
          </div>

          <div ref={progressBarRef} className="h-2 bg-gray-700 rounded-full mb-2 cursor-pointer" onClick={handleProgressBarClick}>
            <div 
              className="h-full bg-[#C8A97E] rounded-full"
              style={{ width: `${(currentTime / currentTrack.duration) * 100}%` }}
            ></div>
          </div>
          
          <div className="flex justify-between text-xs text-gray-400 mb-6">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(currentTrack.duration)}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {tracks.map((track) => (
              <motion.div
                key={track.id}
                className={`relative rounded-lg overflow-hidden cursor-pointer transition-all duration-300 p-4 ${
                  track.id === tracks[currentTrackIndex].id 
                  ? "bg-[#C8A97E]/20 ring-2 ring-[#C8A97E]" 
                  : "bg-black/30 hover:bg-[#C8A97E]/10"
                }`}
                onClick={() => {
                  setCurrentTrackIndex(tracks.indexOf(track));
                  if (!isPlaying) setIsPlaying(true);
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-[#C8A97E]/30 flex items-center justify-center mr-3">
                    <Music className="w-5 h-5 text-[#C8A97E]" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{track.title}</p>
                    <p className="text-gray-400 text-xs">{track.artist}</p>
                  </div>
                </div>
              </motion.div>
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
        </Card>
      </motion.div>
                
      {/* Floating Mini Player */}
      <AnimatePresence mode="wait">
        {showMiniPlayer && (
          <motion.div
            ref={miniPlayerRef}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{
              type: "spring", 
              stiffness: 50,
              damping: 15,
              mass: 1.2
            }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md"
          >
            <Card className="bg-[#1a1a1a]/90 backdrop-blur-lg border-[#C8A97E]/20 p-3 shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-[#C8A97E]/20 flex items-center justify-center">
                  <Music className="w-6 h-6 text-[#C8A97E]" />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-white truncate">
                    {currentTrack.title}
                  </h4>
                  <p className="text-xs text-[#C8A97E] truncate">
                    {currentTrack.artist}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Button
                      onClick={handlePrevTrack}
                      size="sm"
                      variant="outline"
                      className="text-white hover:text-[#C8A97E]"
                    >
                      <SkipBack className="h-4 w-4" />
                    </Button>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Button
                      onClick={handlePlay}
                      size="sm"
                      variant="outline"
                      className="text-white hover:text-[#C8A97E]"
                    >
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Button
                      onClick={handleNextTrack}
                      size="sm"
                      variant="outline"
                      className="text-white hover:text-[#C8A97E]"
                    >
                      <SkipForward className="h-4 w-4" />
                    </Button>
                  </motion.div>
                </div>
              </div>

              {/* Progress bar with smoother animation */}
              <div className="mt-2 relative h-1 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="absolute h-full bg-[#C8A97E] rounded-full"
                  style={{ width: `${(currentTime / currentTrack.duration) * 100}%` }}
                  transition={{ duration: 0.3, ease: "linear" }}
                />
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        onEnded={handleEnded}
        onError={handleError}
        className="hidden"
      />
    </>
  );
} 
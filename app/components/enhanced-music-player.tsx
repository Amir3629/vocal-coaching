"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Slider } from "@/app/components/ui/slider";

declare global {
  interface Window {
    YT: {
      Player: any;
      PlayerState: {
        PLAYING: number;
        PAUSED: number;
        ENDED: number;
      };
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

interface Track {
  id: number;
  title: string;
  artist: string;
  description: string;
  youtubeId: string;
  thumbnail: string;
}

const defaultTracks: Track[] = [
  {
    id: 1,
    title: "Jazz Performance",
    artist: "Melanie Wainwright",
    description: "Live at B-Flat Jazz Club Berlin",
    youtubeId: "K6x0zEA06uk",
    thumbnail: "https://img.youtube.com/vi/K6x0zEA06uk/maxresdefault.jpg"
  },
  {
    id: 2,
    title: "Vocal Workshop",
    artist: "Melanie Wainwright",
    description: "Complete Vocal Technique Demonstration",
    youtubeId: "AWsarzdZ1u8",
    thumbnail: "https://img.youtube.com/vi/AWsarzdZ1u8/maxresdefault.jpg"
  },
  {
    id: 3,
    title: "Jazz Standards",
    artist: "Melanie Wainwright",
    description: "Live Performance Highlights",
    youtubeId: "GidIMbCmtyk",
    thumbnail: "https://img.youtube.com/vi/GidIMbCmtyk/maxresdefault.jpg"
  },
  {
    id: 4,
    title: "Vocal Jazz",
    artist: "Melanie Wainwright",
    description: "Studio Session",
    youtubeId: "hFdMHvB6-Jk",
    thumbnail: "https://img.youtube.com/vi/hFdMHvB6-Jk/maxresdefault.jpg"
  }
];

// Add event system for media coordination
const MEDIA_STOP_EVENT = 'stopAllMedia'

export default function EnhancedMusicPlayer() {
  const [tracks, setTracks] = useState<Track[]>(defaultTracks);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [showMiniPlayer, setShowMiniPlayer] = useState(false);
  const [lastPlayTime, setLastPlayTime] = useState(Date.now());
  const [isAPIReady, setIsAPIReady] = useState(false);
  const [hasError, setHasError] = useState(false);
  const playerRef = useRef<Window['YT']['Player'] | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const miniPlayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadYouTubeAPI = () => {
      try {
      if (!window.YT) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
          tag.onerror = () => {
            console.error('Failed to load YouTube API');
            setHasError(true);
          };
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

        window.onYouTubeIframeAPIReady = () => {
          setIsAPIReady(true);
        };
      } else {
        setIsAPIReady(true);
        }
      } catch (error) {
        console.error('Error loading YouTube API:', error);
        setHasError(true);
      }
    };

    loadYouTubeAPI();

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isAPIReady && !playerRef.current) {
      try {
      playerRef.current = new window.YT.Player("youtube-player", {
        height: "0",
        width: "0",
          videoId: tracks[currentTrack].youtubeId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          rel: 0
        },
        events: {
          onStateChange: (event: any) => {
              try {
                if (event.data === window.YT.PlayerState.PLAYING) {
                  setIsPlaying(true);
                } else if (event.data === window.YT.PlayerState.PAUSED) {
                  setIsPlaying(false);
                }
              } catch (error) {
                console.error('Error in onStateChange:', error);
                setIsPlaying(false);
              }
          },
          onReady: () => {
            console.log("Player ready");
              if (isPlaying) {
                try {
                  playerRef.current?.playVideo();
                } catch (error) {
                  console.error('Error playing video:', error);
                  setIsPlaying(false);
                }
              }
            },
            onError: (event: any) => {
              console.error("YouTube player error:", event);
              setIsPlaying(false);
              setHasError(true);
            }
          }
        });
      } catch (error) {
        console.error("Error initializing YouTube player:", error);
        setHasError(true);
      }
    }
  }, [isAPIReady, currentTrack]);

  useEffect(() => {
    if (isAPIReady && playerRef.current?.loadVideoById) {
      try {
        playerRef.current.loadVideoById(tracks[currentTrack].youtubeId);
        if (isPlaying) {
          playerRef.current.playVideo();
        } else {
          playerRef.current.pauseVideo();
        }
        setCurrentTime(0);
        setDuration(playerRef.current.getDuration() || 0);
      } catch (error) {
        console.error("Error loading video:", error);
      }
    }
  }, [currentTrack, isAPIReady]);

  useEffect(() => {
    if (isPlaying) {
      progressInterval.current = setInterval(() => {
        if (playerRef.current) {
          const currentTime = playerRef.current.getCurrentTime() || 0;
          const duration = playerRef.current.getDuration() || 0;
          setCurrentTime(currentTime);
          setDuration(duration);
        }
      }, 100);
    } else if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
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
      if (isPlaying && playerRef.current) {
        playerRef.current.pauseVideo();
        setIsPlaying(false);
      }
    };

    window.addEventListener(MEDIA_STOP_EVENT, handleMediaStop);
    return () => window.removeEventListener(MEDIA_STOP_EVENT, handleMediaStop);
  }, [isPlaying]);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        // Dispatch event to stop other media
        window.dispatchEvent(new Event(MEDIA_STOP_EVENT));
        playerRef.current.playVideo();
      }
    }
  };

  const handlePrevTrack = () => {
    setCurrentTrack((prevIndex) => (prevIndex - 1 + tracks.length) % tracks.length);
    setCurrentTime(0);
  };

  const handleNextTrack = () => {
    setCurrentTrack((prevIndex) => (prevIndex + 1) % tracks.length);
    setCurrentTime(0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (playerRef.current) {
      if (isMuted) {
        playerRef.current.unMute();
      } else {
        playerRef.current.mute();
      }
    }
  };

  return (
    <>
      <motion.div id="main-player" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-4xl mx-auto">
        {hasError ? (
          <Card className="bg-[#080505]/80 backdrop-blur-sm border-[#C8A97E]/20 p-4 sm:p-6">
            <div className="text-center text-gray-400 py-4 sm:py-8">
              <p>Sorry, the music player is currently unavailable.</p>
              <p className="text-sm mt-2">Please try again later.</p>
            </div>
          </Card>
        ) : (
          <Card className="bg-[#080505]/80 backdrop-blur-sm border-[#C8A97E]/20 p-8 sm:p-10">
            <div id="youtube-player" className="hidden"></div>
            
            <div className="flex flex-col items-center">
              {/* Gramophone Design */}
              <div className="relative w-full max-w-md mx-auto mb-8">
                <motion.div 
                  className="relative"
                  animate={{ rotate: isPlaying ? 360 : 0 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  {/* Vinyl Record */}
                  <motion.div 
                    className="w-64 h-64 rounded-full bg-gradient-to-br from-gray-900 to-black border-4 border-[#C8A97E]/20 relative mx-auto"
                    animate={{ 
                      rotate: isPlaying ? 360 : 0,
                      scale: isPlaying ? 1 : 0.98
                    }}
                    transition={{ 
                      rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                      scale: { duration: 0.5 }
                    }}
                  >
                    {/* Record grooves */}
                    <div className="absolute inset-4 rounded-full border border-[#C8A97E]/10" />
                    <div className="absolute inset-8 rounded-full border border-[#C8A97E]/10" />
                    <div className="absolute inset-12 rounded-full border border-[#C8A97E]/10" />
                    <div className="absolute inset-16 rounded-full border border-[#C8A97E]/10" />
                    
                    {/* Center label */}
                    <motion.div 
                      className="absolute inset-20 rounded-full bg-[#C8A97E]/10 flex items-center justify-center overflow-hidden"
                      animate={{ rotate: isPlaying ? -360 : 0 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    >
                      <Image
                        src={tracks[currentTrack].thumbnail}
                        alt={tracks[currentTrack].title}
                        fill
                        className="object-cover opacity-80"
                      />
                    </motion.div>
                  </motion.div>

                  {/* Tonearm */}
                  <motion.div 
                    className="absolute top-1/2 right-0 origin-right"
                    initial={{ rotate: -30 }}
                    animate={{ rotate: isPlaying ? 0 : -30 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                  >
                    <div className="w-32 h-2 bg-gradient-to-r from-[#C8A97E] to-[#B89A6F] rounded-full transform -translate-x-1/2" />
                    <div className="absolute top-0 right-0 w-4 h-4 rounded-full bg-[#C8A97E]" />
                  </motion.div>
                </motion.div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-6 mt-8">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePrevTrack}
                    className="w-12 h-12 rounded-full bg-[#C8A97E]/10 hover:bg-[#C8A97E]/20 flex items-center justify-center text-[#C8A97E] transition-colors"
                  >
                    <SkipBack className="w-6 h-6" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePlay}
                    className="w-16 h-16 rounded-full bg-[#C8A97E] flex items-center justify-center text-black transition-colors relative overflow-hidden group"
                  >
                    <motion.div
                      className="absolute inset-0 bg-black/20 transform origin-left"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: currentTime / duration }}
                      transition={{ duration: 0.1 }}
                    />
                    {isPlaying ? (
                      <Pause className="w-8 h-8 relative z-10" />
                    ) : (
                      <Play className="w-8 h-8 relative z-10 ml-1" />
                    )}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextTrack}
                    className="w-12 h-12 rounded-full bg-[#C8A97E]/10 hover:bg-[#C8A97E]/20 flex items-center justify-center text-[#C8A97E] transition-colors"
                  >
                    <SkipForward className="w-6 h-6" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleMute}
                    className="w-12 h-12 rounded-full bg-[#C8A97E]/10 hover:bg-[#C8A97E]/20 flex items-center justify-center text-[#C8A97E] transition-colors"
                  >
                    {isMuted ? (
                      <VolumeX className="w-6 h-6" />
                    ) : (
                      <Volume2 className="w-6 h-6" />
                    )}
                  </motion.button>
                </div>
              </div>

              {/* Track Info */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={tracks[currentTrack].id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-center mb-8"
                >
                  <h3 className="text-2xl font-light text-white mb-2">{tracks[currentTrack].title}</h3>
                  <p className="text-[#C8A97E] text-sm mb-1">{tracks[currentTrack].artist}</p>
                  <p className="text-gray-400 text-sm">{tracks[currentTrack].description}</p>
                </motion.div>
              </AnimatePresence>

              {/* Track Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {tracks.map((track) => (
                  <motion.div
                    key={track.id}
                    className={`relative rounded-lg overflow-hidden cursor-pointer transition-all duration-300 aspect-video ${
                      track.id === tracks[currentTrack].id 
                      ? "ring-2 ring-[#C8A97E] scale-[1.02]" 
                      : "hover:ring-2 hover:ring-[#C8A97E]/50"
                    }`}
                    onClick={() => {
                      setCurrentTrack(tracks.indexOf(track));
                      if (!isPlaying) setIsPlaying(true);
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={track.thumbnail}
                        alt={track.title}
                        fill
                        className="object-cover"
                      />
                      <div className={`absolute inset-0 transition-opacity duration-300 ${
                        track.id === tracks[currentTrack].id && isPlaying
                        ? "bg-black/40"
                        : "bg-black/20"
                      }`} />
                      <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                        <p className="text-white text-xs sm:text-sm font-medium mb-0.5 sm:mb-1 line-clamp-1">{track.title}</p>
                        <p className="text-[#C8A97E] text-xs line-clamp-1">{track.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Card>
        )}
      </motion.div>

      {/* Mini Player with smoother animations */}
      <AnimatePresence mode="wait">
        {showMiniPlayer && (
          <motion.div
            ref={miniPlayerRef}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{
              type: "spring",
              stiffness: 40,
              damping: 20,
              mass: 1.5
            }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md"
          >
            <Card className="bg-[#1a1a1a]/90 backdrop-blur-lg border-[#C8A97E]/20 p-3 shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={tracks[currentTrack].id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="flex items-center gap-3"
                >
                  <motion.div 
                    className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0" 
                    animate={{ rotate: isPlaying ? 360 : 0 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <Image
                      src={tracks[currentTrack].thumbnail}
                      alt={tracks[currentTrack].title}
                      fill
                      className="object-cover"
                    />
                  </motion.div>

                  <div className="flex-1 min-w-0">
                    <motion.h4 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      className="text-sm font-medium text-white truncate"
                    >
                      {tracks[currentTrack].title}
                    </motion.h4>
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      className="text-xs text-[#C8A97E] truncate"
                    >
                      {tracks[currentTrack].artist}
                    </motion.p>
                  </div>

                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handlePlay}
                      className="w-10 h-10 rounded-full bg-[#C8A97E] flex items-center justify-center text-black"
                    >
                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                    </motion.button>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Progress bar with smoother animation */}
              <div className="mt-2 relative h-1 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="absolute h-full bg-[#C8A97E] rounded-full"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                  transition={{ duration: 0.3, ease: "linear" }}
                />
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
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
          <Card className="bg-[#080505]/80 backdrop-blur-sm border-[#C8A97E]/20 p-4 sm:p-6">
            <div id="youtube-player" className="hidden"></div>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={tracks[currentTrack].id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full sm:w-24 h-24 rounded-lg overflow-hidden"
                >
                  <Image
                    src={tracks[currentTrack].thumbnail}
                    alt={tracks[currentTrack].title}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.div
                  key={tracks[currentTrack].id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1"
                >
                  <h3 className="text-xl sm:text-2xl font-light text-white mb-2">{tracks[currentTrack].title}</h3>
                  <p className="text-[#C8A97E] text-sm mb-1">{tracks[currentTrack].artist}</p>
                  <p className="text-gray-400 text-sm">{tracks[currentTrack].description}</p>
                </motion.div>
              </AnimatePresence>
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
                    strokeDashoffset={144.51326206513048 * (1 - currentTime / duration * 100 / 100)}
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
                  {isPlaying ? (
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
          </Card>
        )}
      </motion.div>

      {/* Floating Mini Player */}
      <AnimatePresence>
        {showMiniPlayer && (
          <motion.div
            ref={miniPlayerRef}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md"
          >
            <Card className="bg-[#1a1a1a]/95 backdrop-blur-md border-[#C8A97E]/20 p-3 shadow-xl">
              <div className="flex items-center gap-3">
                <motion.div 
                  className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0" 
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="absolute inset-0 bg-[#C8A97E]/10" />
                  <img
                    src={tracks[currentTrack].thumbnail}
                    alt={tracks[currentTrack].title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-white truncate">{tracks[currentTrack].title}</h4>
                  <p className="text-xs text-[#C8A97E] truncate">{tracks[currentTrack].artist}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-[#C8A97E] hover:text-white hover:bg-[#C8A97E]/20"
                    onClick={handlePrevTrack}
                  >
                    <SkipBack className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    className="h-8 w-8 bg-[#C8A97E] hover:bg-[#B89A6F] text-black rounded-full"
                    onClick={handlePlay}
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-[#C8A97E] hover:text-white hover:bg-[#C8A97E]/20"
                    onClick={handleNextTrack}
                  >
                    <SkipForward className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-2 relative h-1 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="absolute h-full bg-[#C8A97E] rounded-full"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 
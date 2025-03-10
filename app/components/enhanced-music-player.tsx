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
}

const defaultTracks: Track[] = [
  {
    id: 1,
    title: "Jazz Performance",
    artist: "Melanie Wainwright",
    description: "Live at B-Flat Jazz Club Berlin",
    youtubeId: "K6x0zEA06uk"
  },
  {
    id: 2,
    title: "Vocal Workshop",
    artist: "Melanie Wainwright",
    description: "Complete Vocal Tech Demo",
    youtubeId: "AWsarzdZ1u8"
  },
  {
    id: 3,
    title: "Jazz Standards",
    artist: "Melanie Wainwright",
    description: "Live Performance Highlights",
    youtubeId: "GidIMbCmtyk"
  },
  {
    id: 4,
    title: "Vocal Jazz",
    artist: "Melanie Wainwright",
    description: "Studio Session",
    youtubeId: "hFdMHvB6-Jk"
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
    <section id="music" className="py-20 bg-[#040202]">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-heading mb-4">Meine Musik</h2>
          <div className="w-24 h-0.5 bg-[#C8A97E] mx-auto opacity-80"></div>
        </motion.div>

        <div id="youtube-player" className="hidden"></div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="w-full max-w-2xl mx-auto"
        >
          <Card className="bg-black/40 backdrop-blur-md border-[#C8A97E]/20 p-6 sm:p-8">
            <div className="flex flex-col items-center">
              {/* Current Track Info */}
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

              {/* Circular Progress */}
              <div className="relative mb-8">
                <svg className="w-48 h-48" viewBox="0 0 48 48">
                  <circle
                    cx="24"
                    cy="24"
                    r="23"
                    className="fill-[#C8A97E]/5"
                  />
                  <motion.circle
                    cx="24"
                    cy="24"
                    r="23"
                    stroke="currentColor"
                    strokeWidth="1"
                    fill="none"
                    className="text-[#C8A97E]/20"
                    strokeDasharray="144.51326206513048"
                    strokeDashoffset={144.51326206513048 * (1 - currentTime / duration * 100 / 100)}
                    transform="rotate(-90 24 24)"
                  />
                  <motion.circle
                    cx="24"
                    cy="24"
                    r="18"
                    className="fill-[#C8A97E]/10 cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePlay}
                  />
                </svg>
                <motion.div
                  className="absolute inset-0 flex items-center justify-center text-[#C8A97E]"
                  onClick={handlePlay}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isPlaying ? (
                    <Pause className="w-12 h-12" />
                  ) : (
                    <Play className="w-12 h-12 ml-2" />
                  )}
                </motion.div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-6 mb-8">
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
                  onClick={toggleMute}
                  className="w-12 h-12 rounded-full bg-[#C8A97E]/10 hover:bg-[#C8A97E]/20 flex items-center justify-center text-[#C8A97E] transition-colors"
                >
                  {isMuted ? (
                    <VolumeX className="w-6 h-6" />
                  ) : (
                    <Volume2 className="w-6 h-6" />
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
              </div>

              {/* Track List */}
              <div className="w-full space-y-2">
                {tracks.map((track, index) => (
                  <motion.button
                    key={track.id}
                    onClick={() => {
                      setCurrentTrack(index);
                      if (!isPlaying) setIsPlaying(true);
                    }}
                    className={`w-full p-3 rounded-lg text-left transition-all ${
                      index === currentTrack 
                        ? "bg-[#C8A97E]/20 text-white" 
                        : "bg-black/20 text-gray-400 hover:bg-[#C8A97E]/10 hover:text-white"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        index === currentTrack ? "bg-[#C8A97E]/20" : "bg-black/40"
                      }`}>
                        {index === currentTrack && isPlaying ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4 ml-0.5" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{track.title}</p>
                        <p className="text-xs text-[#C8A97E]">{track.description}</p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
} 
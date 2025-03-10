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
  coverImage: string;
}

const defaultTracks: Track[] = [
  {
    id: 1,
    title: "Vocal Workshop",
    artist: "Melanie Wainwright",
    description: "Complete Vocal Technique Demonstration",
    youtubeId: "AWsarzdZ1u8",
    coverImage: "/images/covers/vocal-workshop.jpg"
  },
  {
    id: 2,
    title: "Jazz Standards",
    artist: "Melanie Wainwright",
    description: "Live Performance Collection",
    youtubeId: "GidIMbCmtyk",
    coverImage: "/images/covers/jazz-standards.jpg"
  },
  {
    id: 3,
    title: "Special Performance",
    artist: "Melanie Wainwright",
    description: "Live Jazz Session",
    youtubeId: "QgZKO_f5FlM",
    coverImage: "/images/covers/special-performance.jpg"
  },
  {
    id: 4,
    title: "Vocal Jazz",
    artist: "Melanie Wainwright",
    description: "Studio Session",
    youtubeId: "hFdMHvB6-Jk",
    coverImage: "/images/covers/vocal-jazz.jpg"
  },
  {
    id: 5,
    title: "Jazz Ensemble",
    artist: "Melanie Wainwright",
    description: "Live Performance",
    youtubeId: "ZvWZr6TNh9Y",
    coverImage: "/images/covers/jazz-ensemble.jpg"
  },
  {
    id: 6,
    title: "Jazz Collection",
    artist: "Melanie Wainwright",
    description: "Selected Performances",
    youtubeId: "r58-5DBfMpY",
    coverImage: "/images/covers/jazz-collection.jpg"
  },
  {
    id: 7,
    title: "Jazz Highlights",
    artist: "Melanie Wainwright",
    description: "Best Moments",
    youtubeId: "0zARqh3xwnw",
    coverImage: "/images/covers/jazz-highlights.jpg"
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full max-w-6xl mx-auto"
        >
          <div className="relative h-[700px] perspective-1000">
            {/* Gramophone Base */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px]">
              <div className="relative w-full h-full">
                <div className="absolute bottom-0 w-full h-[120px] bg-gradient-to-t from-[#C8A97E] to-[#8B7355] rounded-t-[100px] shadow-xl">
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[80%] h-[8px] bg-[#040202]/20 rounded-full" />
                </div>
                {/* Gramophone Horn */}
                <motion.div
                  className="absolute -right-20 top-10 w-[300px] h-[150px] origin-left"
                  initial={{ rotateZ: -20 }}
                  animate={{ rotateZ: isPlaying ? -15 : -20 }}
                  transition={{ type: "spring", stiffness: 100 }}
                >
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#C8A97E] to-[#8B7355] skew-y-[10deg] rounded-r-full shadow-2xl transform-gpu" />
                    <div className="absolute inset-[2px] bg-gradient-to-r from-[#C8A97E]/20 to-[#8B7355]/20 skew-y-[10deg] rounded-r-full" />
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Vinyl Record Collection */}
            <div className="absolute inset-0 flex items-center justify-center -mt-20">
              <div className="relative w-full h-full">
                <AnimatePresence mode="wait">
                  {tracks.map((track, index) => {
                    const isActive = index === currentTrack;
                    const offset = index - currentTrack;
                    const zIndex = tracks.length - Math.abs(offset);
                    
                    return (
                      <motion.div
                        key={track.id}
                        className="absolute top-1/2 left-1/2 w-[300px] h-[300px]"
                        initial={false}
                        animate={{
                          x: `${offset * 60}%`,
                          y: "-50%",
                          rotateY: offset * -25,
                          rotateZ: isActive && isPlaying ? 360 : 0,
                          scale: isActive ? 1 : 0.8,
                          opacity: Math.abs(offset) > 2 ? 0 : 1,
                          zIndex
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                          rotateZ: {
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                            repeatType: "loop"
                          }
                        }}
                        onClick={() => {
                          if (!isActive) {
                            setCurrentTrack(index);
                            if (!isPlaying) setIsPlaying(true);
                          }
                        }}
                        style={{
                          cursor: isActive ? "default" : "pointer",
                          transformStyle: "preserve-3d"
                        }}
                      >
                        {/* Vinyl Record */}
                        <div className={`relative w-full h-full rounded-full overflow-hidden transform-gpu ${
                          isActive ? "ring-4 ring-[#C8A97E]" : ""
                        }`}>
                          {/* Record Surface */}
                          <div className="absolute inset-0 bg-[#1a1a1a]">
                            {/* Vinyl Grooves */}
                            <div className="absolute inset-[10%] rounded-full border-[1px] border-[#C8A97E]/10" style={{
                              background: "repeating-radial-gradient(circle at center, transparent 0, transparent 2px, rgba(200,169,126,0.1) 3px, transparent 4px)"
                            }} />
                            {/* Center Label */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] h-[30%] rounded-full bg-gradient-to-br from-[#C8A97E] to-[#8B7355]">
                              <div className="absolute inset-[15%] rounded-full bg-[#1a1a1a]" />
                            </div>
                          </div>

                          {/* Track Info Overlay */}
                          <div className={`absolute inset-0 flex flex-col items-center justify-center text-center p-4 transition-opacity duration-300 ${
                            isActive ? "opacity-100" : "opacity-0"
                          }`}>
                            <h3 className="text-lg font-medium text-white mb-1">{track.title}</h3>
                            <p className="text-sm text-[#C8A97E]">{track.description}</p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>

            {/* Controls */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center justify-center gap-8">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePrevTrack}
                className="w-14 h-14 rounded-full bg-[#C8A97E]/10 hover:bg-[#C8A97E]/20 flex items-center justify-center text-[#C8A97E] transition-colors"
              >
                <SkipBack className="w-8 h-8" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePlay}
                className="w-20 h-20 rounded-full bg-[#C8A97E] hover:bg-[#B69A6E] flex items-center justify-center text-black transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-10 h-10" />
                ) : (
                  <Play className="w-10 h-10 ml-1" />
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNextTrack}
                className="w-14 h-14 rounded-full bg-[#C8A97E]/10 hover:bg-[#C8A97E]/20 flex items-center justify-center text-[#C8A97E] transition-colors"
              >
                <SkipForward className="w-8 h-8" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleMute}
                className="w-14 h-14 rounded-full bg-[#C8A97E]/10 hover:bg-[#C8A97E]/20 flex items-center justify-center text-[#C8A97E] transition-colors"
              >
                {isMuted ? (
                  <VolumeX className="w-8 h-8" />
                ) : (
                  <Volume2 className="w-8 h-8" />
                )}
              </motion.button>
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-40 left-1/2 -translate-x-1/2 w-full max-w-md">
              <div className="relative h-1 bg-[#C8A97E]/10 rounded-full overflow-hidden">
                <motion.div
                  className="absolute h-full bg-[#C8A97E] rounded-full"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 
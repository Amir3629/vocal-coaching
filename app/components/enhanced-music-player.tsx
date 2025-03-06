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

const tracks: Track[] = [
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
  const [currentTrack, setCurrentTrack] = useState<Track>(tracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isAPIReady, setIsAPIReady] = useState(false);
  const playerRef = useRef<Window['YT']['Player'] | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const loadYouTubeAPI = () => {
      if (!window.YT) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

        window.onYouTubeIframeAPIReady = () => {
          setIsAPIReady(true);
        };
      } else {
        setIsAPIReady(true);
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
      playerRef.current = new window.YT.Player("youtube-player", {
        height: "0",
        width: "0",
        videoId: currentTrack.youtubeId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          rel: 0
        },
        events: {
          onStateChange: (event: any) => {
            setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
          },
          onReady: () => {
            console.log("Player ready");
          }
        }
      });
    }
  }, [isAPIReady, currentTrack]);

  useEffect(() => {
    if (isAPIReady && playerRef.current) {
      playerRef.current.loadVideoById(currentTrack.youtubeId);
      if (isPlaying) {
        playerRef.current.playVideo();
      } else {
        playerRef.current.pauseVideo();
      }
      setProgress(0);
    }
  }, [currentTrack, isAPIReady]);

  useEffect(() => {
    if (isPlaying) {
      progressInterval.current = setInterval(() => {
        if (playerRef.current) {
          const currentTime = playerRef.current.getCurrentTime() || 0;
          const duration = playerRef.current.getDuration() || 0;
          setProgress((currentTime / duration) * 100);
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
    const currentIndex = tracks.findIndex(track => track.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
    setCurrentTrack(tracks[prevIndex]);
    setProgress(0);
  };

  const handleNextTrack = () => {
    const currentIndex = tracks.findIndex(track => track.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % tracks.length;
    setCurrentTrack(tracks[nextIndex]);
    setProgress(0);
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
    <div ref={containerRef} className="w-full max-w-4xl mx-auto">
      <Card className="bg-[#080505]/80 backdrop-blur-sm border-[#C8A97E]/20 p-6">
        <div id="youtube-player" className="hidden"></div>
        
        <div className="flex items-center gap-6 mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTrack.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-24 h-24 rounded-lg overflow-hidden"
            >
              <Image
                src={currentTrack.thumbnail}
                alt={currentTrack.title}
                fill
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentTrack.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex-1"
            >
              <h3 className="text-2xl font-light text-white mb-2">{currentTrack.title}</h3>
              <p className="text-[#C8A97E] text-sm mb-1">{currentTrack.artist}</p>
              <p className="text-gray-400 text-sm">{currentTrack.description}</p>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center gap-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrevTrack}
              className="w-10 h-10 rounded-full bg-[#C8A97E]/10 hover:bg-[#C8A97E]/20 flex items-center justify-center text-[#C8A97E] transition-colors"
            >
              <SkipBack className="w-5 h-5" />
            </motion.button>

            <div className="relative">
              <svg className="w-16 h-16" viewBox="0 0 48 48">
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
                  strokeDashoffset={144.51326206513048 * (1 - progress / 100)}
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
                  <Pause className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6 ml-1" />
                )}
              </motion.div>
              
              {isPlaying && (
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-1 h-1 bg-[#C8A97E] rounded-full"
                      animate={{
                        scaleY: [1, 2, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>
              )}
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
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {tracks.map((track) => (
            <motion.div
              key={track.id}
              className={`relative rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                track.id === currentTrack.id 
                  ? "ring-2 ring-[#C8A97E] scale-[1.02]" 
                  : "hover:ring-2 hover:ring-[#C8A97E]/50"
              }`}
              onClick={() => {
                setCurrentTrack(track)
                if (!isPlaying) setIsPlaying(true)
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative aspect-video">
                <Image
                  src={track.thumbnail}
                  alt={track.title}
                  fill
                  className="object-cover"
                />
                <div className={`absolute inset-0 transition-opacity duration-300 ${
                  track.id === currentTrack.id && isPlaying
                    ? "bg-black/40"
                    : "bg-black/20"
                }`} />
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                  <p className="text-white text-sm font-medium mb-1">{track.title}</p>
                  <p className="text-[#C8A97E] text-xs">{track.description}</p>
                </div>
                
                {track.id === currentTrack.id && isPlaying && (
                  <div className="absolute top-2 right-2">
                    <motion.div
                      className="w-2 h-2 bg-[#C8A97E] rounded-full"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [1, 0.5, 1],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
} 
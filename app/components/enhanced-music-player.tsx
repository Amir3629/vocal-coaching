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
  const [isAPIReady, setIsAPIReady] = useState(false);
  const [hasError, setHasError] = useState(false);
  const playerRef = useRef<Window['YT']['Player'] | null>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

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

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
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

        <div className="max-w-4xl mx-auto">
          {/* Current Track Display */}
          <div className="bg-black/60 backdrop-blur-lg rounded-xl p-8 border border-[#C8A97E]/20 mb-8">
            <div className="text-center mb-8">
              <motion.h3
                key={tracks[currentTrack].title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-medium text-white mb-2"
              >
                {tracks[currentTrack].title}
              </motion.h3>
              <motion.p
                key={tracks[currentTrack].artist}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[#C8A97E]"
              >
                {tracks[currentTrack].description}
              </motion.p>
            </div>

            {/* Progress Bar */}
            <div className="relative h-1 bg-white/10 rounded-full overflow-hidden mb-6">
              <motion.div
                className="absolute h-full bg-[#C8A97E] rounded-full"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-8">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePrevTrack}
                className="p-3 rounded-full bg-[#C8A97E]/10 hover:bg-[#C8A97E]/20 text-[#C8A97E] transition-colors"
              >
                <SkipBack className="w-6 h-6" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePlay}
                className="p-6 rounded-full bg-[#C8A97E] hover:bg-[#B69A6E] text-black transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8" />
                ) : (
                  <Play className="w-8 h-8 ml-1" />
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNextTrack}
                className="p-3 rounded-full bg-[#C8A97E]/10 hover:bg-[#C8A97E]/20 text-[#C8A97E] transition-colors"
              >
                <SkipForward className="w-6 h-6" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleMute}
                className="p-3 rounded-full bg-[#C8A97E]/10 hover:bg-[#C8A97E]/20 text-[#C8A97E] transition-colors"
              >
                {isMuted ? (
                  <VolumeX className="w-6 h-6" />
                ) : (
                  <Volume2 className="w-6 h-6" />
                )}
              </motion.button>
            </div>
          </div>

          {/* Track List */}
          <div className="space-y-2">
            {tracks.map((track, index) => (
              <motion.button
                key={track.id}
                onClick={() => {
                  if (index !== currentTrack) {
                    setCurrentTrack(index);
                    setIsPlaying(true);
                  }
                }}
                className={`w-full p-4 rounded-lg text-left transition-all ${
                  index === currentTrack
                    ? "bg-[#C8A97E]/20 text-white border border-[#C8A97E]/40"
                    : "bg-black/40 hover:bg-[#C8A97E]/10 text-white/60"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium mb-1">{track.title}</p>
                    <p className="text-sm opacity-60">{track.description}</p>
                  </div>
                  {index === currentTrack && isPlaying && (
                    <div className="flex gap-1">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-0.5 h-3 bg-[#C8A97E] rounded-full"
                          animate={{
                            height: [12, 16, 12],
                            transition: {
                              duration: 0.6,
                              repeat: Infinity,
                              delay: i * 0.2
                            }
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 
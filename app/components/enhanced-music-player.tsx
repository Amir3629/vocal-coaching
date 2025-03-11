"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

const defaultTracks = [
  {
    id: 1,
    title: "Jazz Performance",
    description: "Live at B-Flat Jazz Club Berlin",
    youtubeId: "hFdMHvB6-Jk",
    coverImage: process.env.NODE_ENV === 'production' 
      ? "/vocal-coaching/images/performances/jazz-performance.jpg"
      : "/images/performances/jazz-performance.jpg"
  },
  {
    id: 2,
    title: "Vocal Workshop",
    description: "Complete Vocal Tech Demonstration",
    youtubeId: "AWsarzdZ1u8",
    coverImage: process.env.NODE_ENV === 'production'
      ? "/vocal-coaching/images/performances/vocal-workshop.jpg"
      : "/images/performances/vocal-workshop.jpg"
  },
  {
    id: 3,
    title: "Jazz Standards",
    description: "Live Performance Collection",
    youtubeId: "GidIMbCmtyk",
    coverImage: process.env.NODE_ENV === 'production'
      ? "/vocal-coaching/images/performances/jazz-standards.jpg"
      : "/images/performances/jazz-standards.jpg"
  },
  {
    id: 4,
    title: "Vocal Jazz",
    description: "Studio Session",
    youtubeId: "QgZKO_f5FlM",
    coverImage: process.env.NODE_ENV === 'production'
      ? "/vocal-coaching/images/performances/vocal-jazz.jpg"
      : "/images/performances/vocal-jazz.jpg"
  }
];

export default function EnhancedMusicPlayer() {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [rotation, setRotation] = useState(0);
  const playerRef = useRef<any>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Load YouTube API
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        initializePlayer();
      };
    } else {
      initializePlayer();
    }

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, []);

  const initializePlayer = () => {
    playerRef.current = new window.YT.Player("youtube-player", {
      height: "0",
      width: "0",
      videoId: defaultTracks[currentTrack].youtubeId,
      playerVars: {
        autoplay: 0,
        controls: 0,
        disablekb: 1,
        fs: 0,
        rel: 0
      },
      events: {
        onStateChange: (event: any) => {
          if (event.data === window.YT.PlayerState.PLAYING) {
            setIsPlaying(true);
            startProgressTracking();
          } else {
            setIsPlaying(false);
            if (progressInterval.current) {
              clearInterval(progressInterval.current);
            }
          }
        }
      }
    });
  };

  const startProgressTracking = () => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }
    progressInterval.current = setInterval(() => {
      if (playerRef.current) {
        const currentTime = playerRef.current.getCurrentTime();
        const duration = playerRef.current.getDuration();
        setProgress(currentTime / duration);
        setRotation(currentTime / duration * 360);
      }
    }, 100);
  };

  const handlePlayPause = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
    }
  };

  const handleTrackSelect = (index: number) => {
    setCurrentTrack(index);
    if (playerRef.current) {
      playerRef.current.loadVideoById(defaultTracks[index].youtubeId);
    }
  };

  const toggleMute = () => {
    if (playerRef.current) {
      if (isMuted) {
        playerRef.current.unMute();
      } else {
        playerRef.current.mute();
      }
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-serif text-white mb-4">Meine Musik</h2>
          <div className="w-24 h-0.5 bg-[#C8A97E] mx-auto opacity-80"></div>
        </motion.div>

        <div id="youtube-player" className="hidden"></div>

        {/* Main Player */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="relative aspect-square w-full max-w-md mx-auto">
            <div className="absolute inset-0">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="48"
                  fill="none"
                  stroke="#2A2A2A"
                  strokeWidth="2"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="48"
                  fill="none"
                  stroke="#C8A97E"
                  strokeWidth="2"
                  strokeDasharray={`${progress * 301.59} 301.59`}
                  transform="rotate(-90 50 50)"
                  style={{
                    transition: "stroke-dasharray 0.1s linear"
                  }}
                />
              </svg>
            </div>

            <div className="absolute inset-4 rounded-full bg-[#1A1A1A] flex items-center justify-center">
              <div className="text-center">
                <motion.h3
                  key={defaultTracks[currentTrack].title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-white text-xl mb-2"
                >
                  {defaultTracks[currentTrack].title}
                </motion.h3>
                <p className="text-gray-400 text-sm mb-6">
                  {defaultTracks[currentTrack].description}
                </p>
                <div className="flex justify-center gap-6">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePlayPause}
                    className="w-16 h-16 rounded-full bg-[#C8A97E] flex items-center justify-center"
                  >
                    {isPlaying ? (
                      <Pause className="w-8 h-8 text-black" />
                    ) : (
                      <Play className="w-8 h-8 text-black ml-1" />
                    )}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleMute}
                    className="w-16 h-16 rounded-full bg-[#2A2A2A] flex items-center justify-center"
                  >
                    {isMuted ? (
                      <VolumeX className="w-6 h-6 text-white" />
                    ) : (
                      <Volume2 className="w-6 h-6 text-white" />
                    )}
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Track Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {defaultTracks.map((track, index) => (
            <motion.button
              key={track.id}
              onClick={() => handleTrackSelect(index)}
              className={`relative aspect-video w-full overflow-hidden rounded-lg ${
                currentTrack === index ? 'ring-2 ring-[#C8A97E]' : ''
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Image
                src={track.coverImage}
                alt={track.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-4">
                <h3 className="text-white text-lg font-medium mb-2">{track.title}</h3>
                <p className="text-gray-300 text-sm">{track.description}</p>
                {currentTrack === index && isPlaying && (
                  <div className="absolute bottom-4 flex gap-1">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-1 h-4 bg-[#C8A97E]"
                        animate={{
                          height: [16, 24, 16],
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
    </section>
  );
} 
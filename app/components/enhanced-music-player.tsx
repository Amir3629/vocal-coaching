"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

const tracks = [
  {
    id: 1,
    title: "Jazz Performance",
    description: "Live at B-Flat Jazz Club Berlin",
    youtubeId: "hFdMHvB6-Jk"
  },
  {
    id: 2,
    title: "Jazz Ensemble",
    description: "Live Performance",
    youtubeId: "ZvWZr6TNh9Y"
  },
  {
    id: 3,
    title: "Jazz Collection",
    description: "Selected Performances",
    youtubeId: "r58-5DBfMpY"
  },
  {
    id: 4,
    title: "Jazz Highlights",
    description: "Best Moments",
    youtubeId: "0zARqh3xwnw"
  },
  {
    id: 5,
    title: "Vocal Workshop",
    description: "Complete Vocal Technique",
    youtubeId: "AWsarzdZ1u8"
  },
  {
    id: 6,
    title: "Jazz Standards",
    description: "Live Performance Collection",
    youtubeId: "GidIMbCmtyk"
  },
  {
    id: 7,
    title: "Special Performance",
    description: "Live Jazz Session",
    youtubeId: "QgZKO_f5FlM"
  }
];

export default function EnhancedMusicPlayer() {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [apiReady, setApiReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const playerRef = useRef<any>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Define the callback in the window object
    (window as any).onYouTubeIframeAPIReady = () => {
      setApiReady(true);
      initializePlayer();
    };

    // Load the YouTube IFrame API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
      // Cleanup
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, []);

  const initializePlayer = () => {
    try {
      if (!(window as any).YT || !(window as any).YT.Player) {
        setError("YouTube API not loaded yet");
        return;
      }

      playerRef.current = new (window as any).YT.Player("youtube-player", {
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
          onReady: () => {
            setError(null);
          },
          onError: () => {
            setError("Error loading video");
          },
          onStateChange: (event: any) => {
            if (event.data === (window as any).YT.PlayerState.PLAYING) {
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
    } catch (err) {
      setError("Failed to initialize player");
      console.error("Player initialization error:", err);
    }
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
      playerRef.current.loadVideoById(tracks[index].youtubeId);
      if (!isPlaying) {
        handlePlayPause();
      }
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
    <section className="py-20 bg-black min-h-screen">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-serif text-white text-center mb-16"
        >
          Meine Musik
          <div className="w-24 h-0.5 bg-[#C8A97E] mx-auto mt-4"></div>
        </motion.h2>

        <div id="youtube-player" style={{ display: 'none' }}></div>

        {error && (
          <div className="text-red-500 text-center mb-4">
            {error}
          </div>
        )}

        {/* Main Player Section */}
        <div className="max-w-6xl mx-auto">
          {/* Current Track Display */}
          <motion.div 
            className="relative aspect-[16/9] mb-8 rounded-2xl overflow-hidden bg-[#0A0A0A] border border-white/5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.h3
                key={tracks[currentTrack].title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl text-white mb-2"
              >
                {tracks[currentTrack].title}
              </motion.h3>
              <motion.p
                key={tracks[currentTrack].description}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-gray-400 mb-8"
              >
                {tracks[currentTrack].description}
              </motion.p>

              {/* Progress Circle */}
              <div className="relative w-32 h-32">
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="60"
                    fill="none"
                    stroke="#1A1A1A"
                    strokeWidth="4"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="60"
                    fill="none"
                    stroke="#C8A97E"
                    strokeWidth="4"
                    strokeDasharray={`${progress * 377} 377`}
                    className="transition-all duration-100"
                  />
                </svg>

                {/* Control Buttons */}
                <div className="absolute inset-0 flex items-center justify-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleMute}
                    className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    {isMuted ? (
                      <VolumeX className="w-5 h-5 text-white/60" />
                    ) : (
                      <Volume2 className="w-5 h-5 text-white" />
                    )}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePlayPause}
                    className="p-4 rounded-full bg-[#C8A97E] hover:bg-[#B69A6E] transition-colors"
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6 text-black" />
                    ) : (
                      <Play className="w-6 h-6 text-black ml-1" />
                    )}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Track Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tracks.map((track, index) => (
              <motion.button
                key={track.id}
                onClick={() => handleTrackSelect(index)}
                className={`group relative aspect-video w-full overflow-hidden rounded-lg ${
                  currentTrack === index ? 'ring-2 ring-[#C8A97E]' : ''
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 group-hover:from-black/90 group-hover:to-black/30 transition-all duration-300" />
                
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                  <h3 className="text-white text-lg font-medium mb-1 group-hover:text-[#C8A97E] transition-colors">
                    {track.title}
                  </h3>
                  <p className="text-gray-400 text-sm text-center">
                    {track.description}
                  </p>
                  
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
      </div>
    </section>
  );
} 
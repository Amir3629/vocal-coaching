"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Volume2, VolumeX } from "lucide-react";

const defaultTracks = [
  {
    id: 1,
    title: "Jazz Performance",
    description: "Live at B-Flat Jazz Club Berlin",
    youtubeId: "hFdMHvB6-Jk",
    coverImage: process.env.NODE_ENV === 'production' 
      ? "/vocal-coaching/images/performances/jazz-live.jpg"
      : "/images/performances/jazz-live.jpg"
  },
  {
    id: 2,
    title: "Vocal Workshop",
    description: "Complete Vocal Tech Demonstration",
    youtubeId: "AWsarzdZ1u8",
    coverImage: process.env.NODE_ENV === 'production'
      ? "/vocal-coaching/images/performances/workshop.jpg"
      : "/images/performances/workshop.jpg"
  },
  {
    id: 3,
    title: "Jazz Standards",
    description: "Live Performance Collection",
    youtubeId: "GidIMbCmtyk",
    coverImage: process.env.NODE_ENV === 'production'
      ? "/vocal-coaching/images/performances/standards.jpg"
      : "/images/performances/standards.jpg"
  },
  {
    id: 4,
    title: "Vocal Jazz",
    description: "Studio Session",
    youtubeId: "QgZKO_f5FlM",
    coverImage: process.env.NODE_ENV === 'production'
      ? "/vocal-coaching/images/performances/studio.jpg"
      : "/images/performances/studio.jpg"
  }
];

export default function EnhancedMusicPlayer() {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
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
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif text-white">Meine Musik</h2>
          <div className="w-16 h-[1px] bg-white/20 mx-auto mt-4"></div>
        </div>

        <div id="youtube-player" className="hidden"></div>

        {/* Main Player */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="aspect-video relative w-full bg-zinc-900/50 rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h3 className="text-white text-xl mb-1">
                {defaultTracks[currentTrack].title}
              </h3>
              <p className="text-gray-400 text-sm mb-8">
                {defaultTracks[currentTrack].description}
              </p>
              
              <div className="flex gap-6">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePlayPause}
                  className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <div className={`${isPlaying ? 'w-3 h-3 bg-white' : 'w-0 h-0 border-t-[6px] border-b-[6px] border-l-[10px] ml-0.5 border-transparent border-l-white'}`} />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleMute}
                  className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5 text-white" />
                  ) : (
                    <Volume2 className="w-5 h-5 text-white" />
                  )}
                </motion.button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
              <motion.div
                className="h-full bg-white"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Track Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {defaultTracks.map((track, index) => (
            <motion.button
              key={track.id}
              onClick={() => handleTrackSelect(index)}
              className={`group relative aspect-video w-full overflow-hidden rounded-lg ${
                currentTrack === index ? 'ring-1 ring-white/20' : ''
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
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors flex flex-col items-center justify-center p-4">
                <h3 className="text-white text-lg font-medium mb-1">{track.title}</h3>
                <p className="text-gray-300 text-sm">{track.description}</p>
                {currentTrack === index && isPlaying && (
                  <div className="absolute bottom-3 flex gap-0.5">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-0.5 h-3 bg-white"
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
    </section>
  );
} 
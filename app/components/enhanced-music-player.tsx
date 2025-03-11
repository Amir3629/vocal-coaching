"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const defaultTracks = [
  {
    id: 1,
    title: "Jazz Performance",
    description: "Live at B-Flat Jazz Club Berlin",
    youtubeId: "hFdMHvB6-Jk"
  },
  {
    id: 2,
    title: "Vocal Workshop",
    description: "Complete Vocal Tech Demonstration",
    youtubeId: "AWsarzdZ1u8"
  },
  {
    id: 3,
    title: "Jazz Standards",
    description: "Live Performance Highlights",
    youtubeId: "GidIMbCmtyk"
  },
  {
    id: 4,
    title: "Vocal Jazz",
    description: "Studio Session",
    youtubeId: "QgZKO_f5FlM"
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
        setRotation((currentTime / duration) * 360);
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
          <div className="aspect-video relative w-full bg-[#0A0A0A] rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h3 className="text-white text-xl mb-1">
                {defaultTracks[currentTrack].title}
              </h3>
              <p className="text-gray-400 text-sm mb-8">
                {defaultTracks[currentTrack].description}
              </p>
              
              <div className="relative w-32 h-32">
                {/* Progress Circle */}
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="60"
                    fill="none"
                    stroke="#1A1A1A"
                    strokeWidth="2"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="60"
                    fill="none"
                    stroke="#C8A97E"
                    strokeWidth="2"
                    strokeDasharray={`${progress * 377} 377`}
                    className="transition-all duration-100"
                  />
                </svg>

                {/* Play/Pause Dot */}
                <motion.div
                  className="absolute"
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: "#C8A97E",
                    top: "50%",
                    left: "50%",
                    x: "32px",
                    y: "-4px",
                    rotate: `${rotation}deg`,
                    transformOrigin: "-32px 4px"
                  }}
                />

                {/* Control Buttons */}
                <div className="absolute inset-0 flex items-center justify-center gap-4">
                  <button
                    onClick={toggleMute}
                    className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center"
                  >
                    <div className={`w-4 h-4 ${isMuted ? 'bg-white/40' : 'bg-[#C8A97E]'} rounded-full transition-colors`} />
                  </button>
                  <button
                    onClick={handlePlayPause}
                    className="w-10 h-10 rounded-full bg-[#C8A97E] flex items-center justify-center"
                  >
                    <div className={`${isPlaying ? 'w-3 h-3 bg-black' : 'w-0 h-0 border-t-[5px] border-b-[5px] border-l-[8px] ml-0.5 border-transparent border-l-black'}`} />
                  </button>
                </div>
              </div>
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
                currentTrack === index ? 'ring-1 ring-[#C8A97E]' : ''
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-[#0A0A0A] flex flex-col items-center justify-center p-4">
                <h3 className="text-white text-lg font-medium mb-1">{track.title}</h3>
                <p className="text-gray-400 text-sm">{track.description}</p>
                {currentTrack === index && isPlaying && (
                  <div className="absolute bottom-3 flex gap-0.5">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-0.5 h-3 bg-[#C8A97E]"
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
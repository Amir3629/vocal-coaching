"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Slider } from "@/app/components/ui/slider";

type YouTubePlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  loadVideoById: (videoId: string) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  mute: () => void;
  unMute: () => void;
};

declare global {
  interface Window {
    YT: {
      Player: new (elementId: string, config: any) => YouTubePlayer;
      PlayerState: {
        PLAYING: number;
        PAUSED: number;
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

interface YouTubeEvent {
  data: number;
}

const defaultTracks: Track[] = [
  {
    id: 1,
    title: "Jazz Performance",
    artist: "Melanie Wainwright",
    description: "Live at B-Flat Jazz Club Berlin",
    youtubeId: "K6x0zEA06uk",
    thumbnail: process.env.NODE_ENV === 'production' 
      ? "/vocal-coaching/images/gallery/performance1.jpg"
      : "/images/gallery/performance1.jpg"
  },
  {
    id: 2,
    title: "Vocal Workshop",
    artist: "Melanie Wainwright",
    description: "Complete Vocal Technique Demonstration",
    youtubeId: "AWsarzdZ1u8",
    thumbnail: process.env.NODE_ENV === 'production'
      ? "/vocal-coaching/images/gallery/performance2.jpg"
      : "/images/gallery/performance2.jpg"
  },
  {
    id: 3,
    title: "Jazz Standards",
    artist: "Melanie Wainwright",
    description: "Live Performance Highlights",
    youtubeId: "GidIMbCmtyk",
    thumbnail: process.env.NODE_ENV === 'production'
      ? "/vocal-coaching/images/gallery/performance3.jpg"
      : "/images/gallery/performance3.jpg"
  },
  {
    id: 4,
    title: "Vocal Jazz",
    artist: "Melanie Wainwright",
    description: "Studio Session",
    youtubeId: "hFdMHvB6-Jk",
    thumbnail: process.env.NODE_ENV === 'production'
      ? "/vocal-coaching/images/gallery/performance4.jpg"
      : "/images/gallery/performance4.jpg"
  }
];

// Add event system for media coordination
const MEDIA_STOP_EVENT = 'stopAllMedia'

export default function EnhancedMusicPlayer() {
  const [tracks] = useState(defaultTracks);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isAPIReady, setIsAPIReady] = useState(false);
  const [hasError, setHasError] = useState(false);
  const playerRef = useRef<YouTubePlayer | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const loadYouTubeAPI = () => {
      if (!window.YT) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
        window.onYouTubeIframeAPIReady = () => setIsAPIReady(true);
      } else {
        setIsAPIReady(true);
      }
    };
    loadYouTubeAPI();
  }, []);

  useEffect(() => {
    if (isAPIReady && !playerRef.current) {
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
          onStateChange: (event: YouTubeEvent) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true);
            } else if (event.data === window.YT.PlayerState.PAUSED) {
              setIsPlaying(false);
            }
          }
        }
      });
    }
  }, [isAPIReady, currentTrack, tracks]);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        if (playerRef.current) {
          const currentTime = playerRef.current.getCurrentTime() || 0;
          const duration = playerRef.current.getDuration() || 0;
          setProgress((currentTime / duration) * 100);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const handlePlay = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        window.dispatchEvent(new Event(MEDIA_STOP_EVENT));
        playerRef.current.playVideo();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTrackChange = (index: number) => {
    setCurrentTrack(index);
    if (playerRef.current) {
      playerRef.current.loadVideoById(tracks[index].youtubeId);
      if (!isPlaying) setIsPlaying(true);
    }
  };

  const handlePrevTrack = () => {
    const newIndex = (currentTrack - 1 + tracks.length) % tracks.length;
    handleTrackChange(newIndex);
  };

  const handleNextTrack = () => {
    const newIndex = (currentTrack + 1) % tracks.length;
    handleTrackChange(newIndex);
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
    <div className="max-w-5xl mx-auto px-4">
      <div id="youtube-player" className="hidden"></div>
      
      <Card className="bg-black/40 backdrop-blur-md border-[#C8A97E]/20 overflow-hidden">
        {/* Current Track Display */}
        <div className="p-6 pb-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={tracks[currentTrack].id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col md:flex-row gap-6 items-center"
            >
              {/* Thumbnail */}
              <div className="relative w-full md:w-48 aspect-video md:aspect-square rounded-lg overflow-hidden">
                <Image
                  src={tracks[currentTrack].thumbnail}
                  alt={tracks[currentTrack].title}
                  fill
                  className="object-cover"
                />
                <div className={`absolute inset-0 bg-black/30 transition-opacity ${isPlaying ? 'opacity-100' : 'opacity-0'}`} />
              </div>

              {/* Track Info */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-light text-white mb-2">{tracks[currentTrack].title}</h3>
                <p className="text-[#C8A97E] mb-1">{tracks[currentTrack].artist}</p>
                <p className="text-gray-400 text-sm">{tracks[currentTrack].description}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4">
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#C8A97E]"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="px-6 pb-6">
          <div className="flex items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrevTrack}
              className="p-2 rounded-full bg-[#C8A97E]/10 hover:bg-[#C8A97E]/20 text-[#C8A97E]"
            >
              <SkipBack className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePlay}
              className="p-4 rounded-full bg-[#C8A97E] text-black hover:bg-[#B89A6F] transition-colors"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNextTrack}
              className="p-2 rounded-full bg-[#C8A97E]/10 hover:bg-[#C8A97E]/20 text-[#C8A97E]"
            >
              <SkipForward className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleMute}
              className="p-2 rounded-full bg-[#C8A97E]/10 hover:bg-[#C8A97E]/20 text-[#C8A97E]"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>

        {/* Playlist */}
        <div className="border-t border-white/10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
            {tracks.map((track, index) => (
              <motion.button
                key={track.id}
                onClick={() => handleTrackChange(index)}
                className={`relative aspect-video group ${
                  index === currentTrack ? 'bg-[#C8A97E]/20' : 'bg-black hover:bg-[#C8A97E]/10'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0">
                  <Image
                    src={track.thumbnail}
                    alt={track.title}
                    fill
                    className="object-cover opacity-50 group-hover:opacity-70 transition-opacity"
                  />
                </div>
                <div className="relative z-10 p-4 h-full flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                  <h4 className="text-white text-sm font-medium mb-1">{track.title}</h4>
                  <p className="text-[#C8A97E] text-xs">{track.description}</p>
                </div>
                {index === currentTrack && isPlaying && (
                  <div className="absolute top-2 right-2 w-2 h-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C8A97E] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C8A97E]"></span>
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
} 
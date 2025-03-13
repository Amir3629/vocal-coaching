"use client"

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// Add TypeScript interface for window with YouTube API
declare global {
  interface Window {
    onYouTubeIframeAPIReady: (() => void) | undefined;
    YT: any;
  }
}

interface Song {
  title: string;
  artist: string;
  youtubeId: string;
  description: string;
}

const songs: Song[] = [
  {
    title: "Jazz Performance",
    artist: "Melvo Coaching",
    youtubeId: "hFdMHvB6-Jk",
    description: "Live at the Jazz Studio"
  },
  {
    title: "Vocal Workshop",
    artist: "Melvo Coaching",
    youtubeId: "ZvWZr6TNh9Y",
    description: "Advanced vocal techniques demonstration"
  },
  {
    title: "Jazz Session",
    artist: "Melvo Coaching",
    youtubeId: "r58-5DBfMpY",
    description: "Piano and vocal improvisation"
  },
  {
    title: "Vocal Jazz",
    artist: "Melvo Coaching",
    youtubeId: "0zARqh3xwnw",
    description: "Original compositions"
  },
  {
    title: "Jazz Ensemble",
    artist: "Melvo Coaching",
    youtubeId: "AWsarzdZ1u8",
    description: "Jazz ensemble performance"
  },
  {
    title: "Vocal Techniques",
    artist: "Melvo Coaching",
    youtubeId: "GidIMbCmtyk",
    description: "Advanced vocal techniques"
  },
  {
    title: "Jazz Improvisation",
    artist: "Melvo Coaching",
    youtubeId: "QgZKO_f5FlM",
    description: "Jazz improvisation session"
  }
];

export default function MusicPlayer() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const videoRef = useRef<HTMLIFrameElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const currentSong = songs[currentSongIndex];

  // Simplified YouTube API integration
  useEffect(() => {
    // Set player ready after a short delay
    const timer = setTimeout(() => {
      setPlayerReady(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle YouTube player messages
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        if (data.event === "onStateChange") {
          // YouTube states: -1 (unstarted), 0 (ended), 1 (playing), 2 (paused), 3 (buffering)
          if (data.info === 1) {
            setIsPlaying(true);
          } else if (data.info === 2) {
            setIsPlaying(false);
          } else if (data.info === 0) {
            // Video ended, play next
            playNextSong();
          }
        } else if (data.event === "onReady") {
          // Player is ready
          setPlayerReady(true);
        }
      } catch (e) {
        // Not a JSON message or not from YouTube
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  // Spinning animation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => (prev + 0.1) % 100);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => {
    if (!playerReady) return;
    
    setIsPlaying(!isPlaying);
    if (videoRef.current) {
      const message = !isPlaying 
        ? '{"event":"command","func":"playVideo","args":""}' 
        : '{"event":"command","func":"pauseVideo","args":""}';
      videoRef.current.contentWindow?.postMessage(message, '*');
    }
  };

  const playNextSong = () => {
    if (!playerReady) return;
    
    setIsTransitioning(true);
    setIsPlaying(false);
    
    // Wait for transition animation
    setTimeout(() => {
      setCurrentSongIndex((prevIndex) => 
        prevIndex === songs.length - 1 ? 0 : prevIndex + 1
      );
      setProgress(0);
      
      // Wait a bit more before starting the new song
      setTimeout(() => {
        setIsTransitioning(false);
        if (videoRef.current) {
          // Load and play the new video
          const message = '{"event":"command","func":"loadVideoById","args":"' + songs[currentSongIndex === songs.length - 1 ? 0 : currentSongIndex + 1].youtubeId + '"}';
          videoRef.current.contentWindow?.postMessage(message, '*');
        }
      }, 500);
    }, 500);
  };

  const playPreviousSong = () => {
    if (!playerReady) return;
    
    setIsTransitioning(true);
    setIsPlaying(false);
    
    // Wait for transition animation
    setTimeout(() => {
      setCurrentSongIndex((prevIndex) => 
        prevIndex === 0 ? songs.length - 1 : prevIndex - 1
      );
      setProgress(0);
      
      // Wait a bit more before starting the new song
      setTimeout(() => {
        setIsTransitioning(false);
        if (videoRef.current) {
          // Load and play the new video
          const message = '{"event":"command","func":"loadVideoById","args":"' + songs[currentSongIndex === 0 ? songs.length - 1 : currentSongIndex - 1].youtubeId + '"}';
          videoRef.current.contentWindow?.postMessage(message, '*');
        }
      }, 500);
    }, 500);
  };

  return (
    <div className="max-w-5xl mx-auto relative">
      <div className="flex items-center justify-center">
        <AnimatePresence>
          <motion.div
            key={currentSongIndex}
            initial={{ opacity: isTransitioning ? 0 : 1, scale: isTransitioning ? 0.9 : 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Vinyl disc background */}
            <motion.div 
              className="w-[400px] h-[400px] rounded-full bg-black border-8 border-[#C8A97E]/20 relative"
              animate={{ 
                rotate: isPlaying ? 360 : 0 
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {/* Vinyl grooves */}
              <div className="absolute inset-0 rounded-full border-4 border-[#C8A97E]/10" style={{ margin: '10%' }} />
              <div className="absolute inset-0 rounded-full border-4 border-[#C8A97E]/10" style={{ margin: '20%' }} />
              <div className="absolute inset-0 rounded-full border-4 border-[#C8A97E]/10" style={{ margin: '30%' }} />
              <div className="absolute inset-0 rounded-full border-4 border-[#C8A97E]/10" style={{ margin: '40%' }} />
              
              {/* Center label */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] rounded-full bg-[#C8A97E] flex items-center justify-center z-10">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={togglePlay}
                  className="w-16 h-16 flex items-center justify-center rounded-full bg-black"
                >
                  {isPlaying ? <Pause size={32} className="text-[#C8A97E]" /> : <Play size={32} className="text-[#C8A97E] ml-1" />}
                </motion.button>
              </div>

              {/* Video thumbnail as background */}
              <div className="absolute inset-0 rounded-full overflow-hidden opacity-70">
                <div className="absolute inset-0 bg-black/30 z-[1]" /> {/* Darkening overlay */}
                <Image
                  src={`https://img.youtube.com/vi/${currentSong.youtubeId}/maxresdefault.jpg`}
                  alt={currentSong.title}
                  fill
                  className="object-cover grayscale" /* Black and white filter */
                />
              </div>
            </motion.div>

            {/* Navigation arrows - smaller and more subtle */}
            <motion.button
              whileHover={{ scale: 1.1, opacity: 1 }}
              whileTap={{ scale: 0.95 }}
              onClick={playPreviousSong}
              className="absolute left-[-30px] top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full border border-[#C8A97E] text-[#C8A97E] bg-black/70 opacity-70"
            >
              <ChevronLeft size={16} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1, opacity: 1 }}
              whileTap={{ scale: 0.95 }}
              onClick={playNextSong}
              className="absolute right-[-30px] top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full border border-[#C8A97E] text-[#C8A97E] bg-black/70 opacity-70"
            >
              <ChevronRight size={16} />
            </motion.button>

            {/* Song info */}
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center">
              <h3 className="text-[#C8A97E] font-medium text-xl mb-1">{currentSong.title}</h3>
              <p className="text-gray-400 text-sm">{currentSong.artist}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* YouTube iframe for audio */}
      <iframe
        ref={videoRef}
        src={`https://www.youtube.com/embed/${currentSong.youtubeId}?enablejsapi=1&controls=0&showinfo=0&modestbranding=1&rel=0&autoplay=0&origin=${typeof window !== 'undefined' ? window.location.origin : ''}`}
        className="w-0 h-0 absolute"
        allow="autoplay"
      />
    </div>
  );
} 
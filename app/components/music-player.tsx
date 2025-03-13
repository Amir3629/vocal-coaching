"use client"

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

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
  const videoRef = useRef<HTMLIFrameElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const currentSong = songs[currentSongIndex];

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
    setIsPlaying(!isPlaying);
    if (videoRef.current) {
      const message = !isPlaying ? '{"event":"command","func":"playVideo","args":""}' : '{"event":"command","func":"pauseVideo","args":""}';
      videoRef.current.contentWindow?.postMessage(message, '*');
    }
  };

  const playNextSong = () => {
    setIsPlaying(false);
    setCurrentSongIndex((prevIndex) => 
      prevIndex === songs.length - 1 ? 0 : prevIndex + 1
    );
    setProgress(0);
  };

  const playPreviousSong = () => {
    setIsPlaying(false);
    setCurrentSongIndex((prevIndex) => 
      prevIndex === 0 ? songs.length - 1 : prevIndex - 1
    );
    setProgress(0);
  };

  return (
    <div className="max-w-5xl mx-auto relative">
      <div className="flex items-center justify-center gap-8">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={playPreviousSong}
          className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-[#C8A97E] text-[#C8A97E] bg-black/50 backdrop-blur-sm"
        >
          <ChevronLeft size={24} />
        </motion.button>

        <div className="relative">
          {/* Vinyl disc background */}
          <motion.div 
            className="w-[400px] h-[400px] rounded-full bg-black border-8 border-[#C8A97E]/20"
            animate={{ 
              rotate: isPlaying ? 360 : 0 
            }}
            transition={{ 
              duration: 3,
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
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] rounded-full bg-[#C8A97E] flex items-center justify-center">
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
            <div className="absolute inset-0 rounded-full overflow-hidden opacity-60">
              <Image
                src={`https://img.youtube.com/vi/${currentSong.youtubeId}/maxresdefault.jpg`}
                alt={currentSong.title}
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Song info */}
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center">
            <h3 className="text-[#C8A97E] font-medium text-xl mb-1">{currentSong.title}</h3>
            <p className="text-gray-400 text-sm">{currentSong.artist}</p>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={playNextSong}
          className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-[#C8A97E] text-[#C8A97E] bg-black/50 backdrop-blur-sm"
        >
          <ChevronRight size={24} />
        </motion.button>
      </div>

      {/* Hidden YouTube iframe for audio */}
      <iframe
        ref={videoRef}
        src={`https://www.youtube.com/embed/${currentSong.youtubeId}?enablejsapi=1&controls=0&showinfo=0&modestbranding=1&rel=0&autoplay=0`}
        className="hidden"
        allow="autoplay"
      />
    </div>
  );
} 
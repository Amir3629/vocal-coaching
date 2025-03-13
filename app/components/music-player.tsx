"use client"

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface Song {
  title: string;
  artist: string;
  cover: string;
  audio: string;
  description: string;
  youtubeUrl: string;
}

const songs: Song[] = [
  {
    title: "Vocal Warmup Exercise",
    artist: "Melvo Coaching",
    cover: "/images/thumbnails/warmup-1.jpg",
    audio: "/audio/warmup-1.mp3",
    description: "Essential vocal warmup exercises for singers",
    youtubeUrl: "https://www.youtube.com/watch?v=hFdMHvB6-Jk"
  },
  {
    title: "Advanced Vocal Techniques",
    artist: "Melvo Coaching",
    cover: "/images/thumbnails/warmup-2.jpg",
    audio: "/audio/warmup-2.mp3",
    description: "Advanced vocal techniques and exercises",
    youtubeUrl: "https://www.youtube.com/watch?v=ZvWZr6TNh9Y"
  },
  {
    title: "Vocal Range Extension",
    artist: "Melvo Coaching",
    cover: "/images/thumbnails/range.jpg",
    audio: "/audio/range.mp3",
    description: "Exercises to extend your vocal range",
    youtubeUrl: "https://www.youtube.com/watch?v=r58-5DBfMpY"
  },
  {
    title: "Breathing Mastery",
    artist: "Melvo Coaching",
    cover: "/images/thumbnails/breathing.jpg",
    audio: "/audio/breathing.mp3",
    description: "Master breathing techniques for singing",
    youtubeUrl: "https://www.youtube.com/watch?v=0zARqh3xwnw"
  },
  {
    title: "Voice Control",
    artist: "Melvo Coaching",
    cover: "/images/thumbnails/control.jpg",
    audio: "/audio/control.mp3",
    description: "Advanced voice control exercises",
    youtubeUrl: "https://www.youtube.com/watch?v=AWsarzdZ1u8"
  },
  {
    title: "Pitch Perfect",
    artist: "Melvo Coaching",
    cover: "/images/thumbnails/pitch.jpg",
    audio: "/audio/pitch.mp3",
    description: "Perfect pitch training exercises",
    youtubeUrl: "https://www.youtube.com/watch?v=GidIMbCmtyk"
  },
  {
    title: "Professional Techniques",
    artist: "Melvo Coaching",
    cover: "/images/thumbnails/pro.jpg",
    audio: "/audio/pro.mp3",
    description: "Professional vocal coaching techniques",
    youtubeUrl: "https://www.youtube.com/watch?v=QgZKO_f5FlM"
  }
];

export default function MusicPlayer() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const currentSong = songs[currentSongIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSongIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const playNextSong = () => {
    setIsPlaying(false);
    setCurrentSongIndex((prevIndex) => 
      prevIndex === songs.length - 1 ? 0 : prevIndex + 1
    );
    setTimeout(() => setIsPlaying(true), 100);
  };

  const playPreviousSong = () => {
    setIsPlaying(false);
    setCurrentSongIndex((prevIndex) => 
      prevIndex === 0 ? songs.length - 1 : prevIndex - 1
    );
    setTimeout(() => setIsPlaying(true), 100);
  };

  const updateProgress = () => {
    if (audioRef.current) {
      const value = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(value);
    }
  };

  const seekTo = (event: React.MouseEvent<HTMLDivElement>) => {
    if (progressBarRef.current && audioRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const percent = (event.clientX - rect.left) / rect.width;
      audioRef.current.currentTime = percent * audioRef.current.duration;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-5xl mx-auto p-8 bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] rounded-2xl shadow-2xl border border-[#C8A97E]/20"
    >
      <div className="flex flex-col md:flex-row items-center gap-10">
        {/* Album Art with Hover Effect and YouTube Link */}
        <motion.div 
          className="relative w-72 h-72 rounded-xl overflow-hidden shadow-2xl group cursor-pointer"
          whileHover={{ scale: 1.02 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          onClick={() => window.open(currentSong.youtubeUrl, '_blank')}
        >
          <AnimatePresence>
            <motion.div
              key={currentSong.cover}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <Image
                src={currentSong.cover}
                alt={currentSong.title}
                fill
                className="object-cover"
                priority
              />
              {/* Overlay on hover with YouTube icon */}
              <motion.div 
                className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                animate={{ opacity: isHovered ? 1 : 0 }}
              >
                <svg className="w-12 h-12 text-red-600 mb-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <motion.p className="text-white text-center px-4">
                  {currentSong.description}<br/>
                  <span className="text-sm text-red-400 mt-2">Click to watch on YouTube</span>
                </motion.p>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Controls Section */}
        <div className="flex-1 space-y-8">
          {/* Song Info */}
          <motion.div 
            className="text-center md:text-left"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.h2 
              className="text-3xl font-bold text-[#C8A97E] mb-2"
              key={currentSong.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {currentSong.title}
            </motion.h2>
            <motion.p 
              className="text-gray-300 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {currentSong.artist}
            </motion.p>
          </motion.div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div 
              ref={progressBarRef}
              className="w-full h-2 bg-gray-700 rounded-full cursor-pointer overflow-hidden"
              onClick={seekTo}
            >
              <motion.div 
                className="h-full bg-[#C8A97E]"
                style={{ width: `${progress}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            {audioRef.current && (
              <div className="flex justify-between text-sm text-gray-400">
                <span>{formatTime(audioRef.current.currentTime)}</span>
                <span>{formatTime(audioRef.current.duration || 0)}</span>
              </div>
            )}
          </div>

          {/* Playback Controls */}
          <div className="flex justify-center md:justify-start items-center gap-8">
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={playPreviousSong}
              className="text-gray-300 hover:text-[#C8A97E] transition-colors"
            >
              <SkipBack size={28} />
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={togglePlay}
              className="w-16 h-16 flex items-center justify-center bg-[#C8A97E] hover:bg-[#D4B68C] rounded-full transition-colors shadow-lg"
            >
              {isPlaying ? <Pause size={32} /> : <Play size={32} />}
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={playNextSong}
              className="text-gray-300 hover:text-[#C8A97E] transition-colors"
            >
              <SkipForward size={28} />
            </motion.button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-4">
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleMute}
              className="text-gray-300 hover:text-[#C8A97E] transition-colors"
            >
              {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
            </motion.button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-24 h-2 bg-gray-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#C8A97E]"
            />
          </div>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={currentSong.audio}
        onTimeUpdate={updateProgress}
        onEnded={playNextSong}
      />
    </motion.div>
  );
} 
"use client"

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface Song {
  title: string;
  artist: string;
  cover: string;
  audio: string;
  description: string;
}

const songs: Song[] = [
  {
    title: "Jazz Performance",
    artist: "Melvo Coaching",
    cover: process.env.NODE_ENV === 'production' ? "/vocal-coaching/images/thumbnails/jazz-performance.jpg" : "/images/thumbnails/jazz-performance.jpg",
    audio: process.env.NODE_ENV === 'production' ? "/vocal-coaching/audio/jazz-performance.mp3" : "/audio/jazz-performance.mp3",
    description: "Live at the Jazz Studio"
  },
  {
    title: "Vocal Workshop",
    artist: "Melvo Coaching",
    cover: process.env.NODE_ENV === 'production' ? "/vocal-coaching/images/thumbnails/vocal-workshop.jpg" : "/images/thumbnails/vocal-workshop.jpg",
    audio: process.env.NODE_ENV === 'production' ? "/vocal-coaching/audio/vocal-workshop.mp3" : "/audio/vocal-workshop.mp3",
    description: "Advanced vocal techniques demonstration"
  },
  {
    title: "Jazz Session",
    artist: "Melvo Coaching",
    cover: process.env.NODE_ENV === 'production' ? "/vocal-coaching/images/thumbnails/jazz-session.jpg" : "/images/thumbnails/jazz-session.jpg",
    audio: process.env.NODE_ENV === 'production' ? "/vocal-coaching/audio/jazz-session.mp3" : "/audio/jazz-session.mp3",
    description: "Piano and vocal improvisation"
  },
  {
    title: "Vocal Jazz",
    artist: "Melvo Coaching",
    cover: process.env.NODE_ENV === 'production' ? "/vocal-coaching/images/thumbnails/vocal-jazz.jpg" : "/images/thumbnails/vocal-jazz.jpg",
    audio: process.env.NODE_ENV === 'production' ? "/vocal-coaching/audio/vocal-jazz.mp3" : "/audio/vocal-jazz.mp3",
    description: "Original compositions"
  }
];

export default function MusicPlayer() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
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

  // Main player for current song
  const MainPlayer = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-[#0A0A0A] border border-[#C8A97E]/20 rounded-lg p-6 mb-12"
    >
      <div className="flex items-center gap-6">
        <div className="w-20 h-20 relative rounded-full overflow-hidden border-2 border-[#C8A97E]">
          <Image
            src={currentSong.cover}
            alt={currentSong.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-[#C8A97E] font-medium text-lg">{currentSong.title}</h3>
          <p className="text-gray-400 text-sm">{currentSong.artist}</p>
        </div>
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={togglePlay}
            className="w-12 h-12 flex items-center justify-center bg-[#C8A97E] rounded-full"
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </motion.button>
        </div>
      </div>
      <div className="mt-6 space-y-2">
        <div 
          ref={progressBarRef}
          className="h-1 bg-gray-700 rounded-full cursor-pointer"
          onClick={seekTo}
        >
          <motion.div 
            className="h-full bg-[#C8A97E] rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        {audioRef.current && (
          <div className="flex justify-between text-xs text-gray-400">
            <span>{formatTime(audioRef.current.currentTime)}</span>
            <span>{formatTime(audioRef.current.duration || 0)}</span>
          </div>
        )}
      </div>
    </motion.div>
  );

  // Carousel for other songs
  const SongCarousel = () => (
    <div className="relative">
      <div className="flex justify-center items-center gap-8 mb-8">
        {songs.map((song, index) => {
          const isActive = index === currentSongIndex;
          const position = index - currentSongIndex;
          
          return (
            <motion.div
              key={song.title}
              className={`relative cursor-pointer transition-all duration-300`}
              style={{
                transform: `translateX(${position * 120}px) scale(${isActive ? 1 : 0.8})`,
                zIndex: isActive ? 10 : 0,
                opacity: Math.abs(position) > 2 ? 0 : 1
              }}
              onClick={() => {
                setCurrentSongIndex(index);
                setIsPlaying(true);
              }}
            >
              <div className={`w-24 h-24 relative rounded-full overflow-hidden border-2 ${
                isActive ? 'border-[#C8A97E]' : 'border-gray-700'
              }`}>
                <Image
                  src={song.cover}
                  alt={song.title}
                  fill
                  className="object-cover"
                />
                {isActive && isPlaying && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <Pause className="text-white" size={24} />
                    </motion.div>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
      <div className="flex justify-center gap-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={playPreviousSong}
          className="w-10 h-10 flex items-center justify-center rounded-full border border-[#C8A97E] text-[#C8A97E]"
        >
          <ChevronLeft size={20} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={playNextSong}
          className="w-10 h-10 flex items-center justify-center rounded-full border border-[#C8A97E] text-[#C8A97E]"
        >
          <ChevronRight size={20} />
        </motion.button>
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto">
      <MainPlayer />
      <SongCarousel />
      <audio
        ref={audioRef}
        src={currentSong.audio}
        onTimeUpdate={updateProgress}
        onEnded={playNextSong}
      />
    </div>
  );
} 
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
}

const songs: Song[] = [
  {
    title: "Jazz Performance",
    artist: "Melvo Coaching",
    cover: "/images/thumbnails/jazz-performance.jpg",
    audio: "/audio/jazz-performance.mp3",
    description: "Live at the Jazz Studio"
  },
  {
    title: "Vocal Workshop",
    artist: "Melvo Coaching",
    cover: "/images/thumbnails/vocal-workshop.jpg",
    audio: "/audio/vocal-workshop.mp3",
    description: "Advanced vocal techniques demonstration"
  },
  {
    title: "Jazz Session",
    artist: "Melvo Coaching",
    cover: "/images/thumbnails/jazz-session.jpg",
    audio: "/audio/jazz-session.mp3",
    description: "Piano and vocal improvisation"
  },
  {
    title: "Vocal Jazz",
    artist: "Melvo Coaching",
    cover: "/images/thumbnails/vocal-jazz.jpg",
    audio: "/audio/vocal-jazz.mp3",
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
      className="bg-[#0A0A0A] border border-[#C8A97E]/20 rounded-lg p-4 mb-8"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 relative rounded-md overflow-hidden">
          <Image
            src={currentSong.cover}
            alt={currentSong.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-[#C8A97E] font-medium">{currentSong.title}</h3>
          <p className="text-gray-400 text-sm">{currentSong.artist}</p>
        </div>
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={togglePlay}
            className="w-10 h-10 flex items-center justify-center bg-[#C8A97E] rounded-full"
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </motion.button>
        </div>
      </div>
      <div className="mt-4 space-y-2">
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

  // Thumbnail grid for other songs
  const ThumbnailGrid = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {songs.map((song, index) => (
        <motion.div
          key={song.title}
          className={`relative rounded-lg overflow-hidden cursor-pointer ${
            index === currentSongIndex ? 'ring-2 ring-[#C8A97E]' : ''
          }`}
          whileHover={{ scale: 1.05 }}
          onClick={() => {
            setCurrentSongIndex(index);
            setIsPlaying(true);
          }}
        >
          <div className="relative aspect-video">
            <Image
              src={song.cover}
              alt={song.title}
              fill
              className="object-cover"
            />
            {index === currentSongIndex && isPlaying && (
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
          <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2">
            <p className="text-sm text-white truncate">{song.title}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto">
      <MainPlayer />
      <ThumbnailGrid />
      <audio
        ref={audioRef}
        src={currentSong.audio}
        onTimeUpdate={updateProgress}
        onEnded={playNextSong}
      />
    </div>
  );
} 
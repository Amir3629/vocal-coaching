"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";

interface Track {
  id: number;
  title: string;
  artist: string;
  description: string;
  youtubeId: string;
  coverImage: string;
}

interface ModernVinylPlayerProps {
  tracks: Track[];
  currentTrackIndex: number;
  isPlaying: boolean;
  isMuted: boolean;
  progress: number;
  onPlayPause: () => void;
  onPrevTrack: () => void;
  onNextTrack: () => void;
  onToggleMute: () => void;
}

export default function ModernVinylPlayer({
  tracks,
  currentTrackIndex,
  isPlaying,
  isMuted,
  progress,
  onPlayPause,
  onPrevTrack,
  onNextTrack,
  onToggleMute
}: ModernVinylPlayerProps) {
  const currentTrack = tracks[currentTrackIndex];

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row items-center gap-8 p-8 bg-black/60 backdrop-blur-lg rounded-xl border border-[#C8A97E]/20">
        {/* Album Artwork */}
        <div className="relative w-64 h-64 flex-shrink-0">
          <motion.div
            className="relative w-full h-full"
            animate={{
              rotate: isPlaying ? 360 : 0
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <Image
              src={currentTrack.coverImage}
              alt={currentTrack.title}
              width={256}
              height={256}
              className="rounded-full"
            />
            <div className="absolute inset-0 rounded-full border-4 border-[#C8A97E]/20" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#C8A97E]" />
          </motion.div>
        </div>

        {/* Controls and Info */}
        <div className="flex-1 w-full">
          <div className="text-center md:text-left mb-6">
            <motion.h3
              key={currentTrack.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-medium text-white mb-2"
            >
              {currentTrack.title}
            </motion.h3>
            <motion.p
              key={currentTrack.description}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[#C8A97E]"
            >
              {currentTrack.description}
            </motion.p>
          </div>

          {/* Progress Bar */}
          <div className="relative h-1 bg-white/10 rounded-full overflow-hidden mb-6">
            <motion.div
              className="absolute h-full bg-[#C8A97E] rounded-full"
              style={{ width: `${progress * 100}%` }}
            />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center md:justify-start gap-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onPrevTrack}
              className="p-3 rounded-full bg-[#C8A97E]/10 hover:bg-[#C8A97E]/20 text-[#C8A97E] transition-colors"
            >
              <SkipBack className="w-6 h-6" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onPlayPause}
              className="p-6 rounded-full bg-[#C8A97E] hover:bg-[#B69A6E] text-black transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8" />
              ) : (
                <Play className="w-8 h-8 ml-1" />
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onNextTrack}
              className="p-3 rounded-full bg-[#C8A97E]/10 hover:bg-[#C8A97E]/20 text-[#C8A97E] transition-colors"
            >
              <SkipForward className="w-6 h-6" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onToggleMute}
              className="p-3 rounded-full bg-[#C8A97E]/10 hover:bg-[#C8A97E]/20 text-[#C8A97E] transition-colors"
            >
              {isMuted ? (
                <VolumeX className="w-6 h-6" />
              ) : (
                <Volume2 className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
} 
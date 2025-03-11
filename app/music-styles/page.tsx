"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
import Image from "next/image";

interface Track {
  id: number;
  title: string;
  artist: string;
  description: string;
  youtubeId: string;
  coverImage: string;
}

interface PlayerProps {
  tracks: Track[];
  currentTrack: number;
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  onMute: () => void;
  isMuted: boolean;
  progress: number;
}

// Modern Vinyl Player Component
function ModernVinylPlayer({ tracks, currentTrack, isPlaying, onPlay, onPause, onNext, onPrev, onMute, isMuted, progress }: PlayerProps) {
  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="bg-black/60 backdrop-blur-lg rounded-xl p-8 border border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Album Art Side */}
          <div className="relative aspect-square">
            <div className="absolute inset-0 rounded-lg overflow-hidden">
              <Image
                src={tracks[currentTrack].coverImage}
                alt={tracks[currentTrack].title}
                width={400}
                height={400}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-transparent" />
            </div>
            
            {/* Vinyl Record Animation */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop"
              }}
            >
              <div className="w-[80%] h-[80%] rounded-full bg-[#1a1a1a] shadow-2xl">
                <div className="absolute inset-[10%] rounded-full border-[1px] border-[#C8A97E]/10" style={{
                  background: "repeating-radial-gradient(circle at center, transparent 0, transparent 2px, rgba(200,169,126,0.1) 3px, transparent 4px)"
                }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[20%] h-[20%] rounded-full bg-[#C8A97E]" />
              </div>
            </motion.div>
          </div>

          {/* Controls Side */}
          <div className="flex flex-col justify-between">
            <div className="space-y-4">
              <h2 className="text-2xl font-medium text-white">{tracks[currentTrack].title}</h2>
              <p className="text-[#C8A97E]">{tracks[currentTrack].artist}</p>
              <p className="text-gray-400">{tracks[currentTrack].description}</p>
            </div>

            {/* Progress Bar */}
            <div className="mt-8">
              <div className="relative h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="absolute h-full bg-[#C8A97E] rounded-full"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between mt-8">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onPrev}
                className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
              >
                <SkipBack className="w-6 h-6" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={isPlaying ? onPause : onPlay}
                className="p-4 rounded-full bg-[#C8A97E] hover:bg-[#B69A6E] text-black transition-colors"
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
                onClick={onNext}
                className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
              >
                <SkipForward className="w-6 h-6" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onMute}
                className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
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
    </div>
  );
}

// Neon Wave Player Component
function NeonWavePlayer({ tracks, currentTrack, isPlaying, onPlay, onPause, onNext, onPrev, onMute, isMuted, progress }: PlayerProps) {
  const [wavePoints] = useState(Array.from({ length: 40 }, () => Math.random() * 100));

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-8 border border-[#0ff]/20 shadow-[0_0_20px_rgba(0,255,255,0.2)]">
        {/* Track Info */}
        <div className="text-center mb-8">
          <motion.h2
            key={tracks[currentTrack].title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-3xl font-light text-white mb-2 tracking-wider"
          >
            {tracks[currentTrack].title}
          </motion.h2>
          <motion.p
            key={tracks[currentTrack].artist}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-[#0ff] text-lg"
          >
            {tracks[currentTrack].artist}
          </motion.p>
        </div>

        {/* Wave Visualization */}
        <div className="relative h-32 mb-8">
          <div className="absolute inset-0 flex items-center justify-between gap-1">
            {wavePoints.map((height, index) => (
              <motion.div
                key={index}
                className="flex-1 bg-[#0ff] rounded-full opacity-50"
                initial={{ height: "20%" }}
                animate={{
                  height: isPlaying ? `${height}%` : "20%",
                  opacity: isPlaying ? 0.5 : 0.2
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
                style={{
                  boxShadow: "0 0 10px rgba(0,255,255,0.5)"
                }}
              />
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="relative h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="absolute h-full bg-[#0ff] rounded-full"
              style={{
                width: `${progress * 100}%`,
                boxShadow: "0 0 10px rgba(0,255,255,0.5)"
              }}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-8">
          <motion.button
            whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(0,255,255,0.8)" }}
            whileTap={{ scale: 0.95 }}
            onClick={onPrev}
            className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-[#0ff] transition-all border border-[#0ff]/20"
          >
            <SkipBack className="w-6 h-6" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(0,255,255,0.8)" }}
            whileTap={{ scale: 0.95 }}
            onClick={isPlaying ? onPause : onPlay}
            className="p-6 rounded-full bg-[#0ff]/10 hover:bg-[#0ff]/20 text-[#0ff] transition-all border border-[#0ff]/30"
          >
            {isPlaying ? (
              <Pause className="w-8 h-8" />
            ) : (
              <Play className="w-8 h-8 ml-1" />
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(0,255,255,0.8)" }}
            whileTap={{ scale: 0.95 }}
            onClick={onNext}
            className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-[#0ff] transition-all border border-[#0ff]/20"
          >
            <SkipForward className="w-6 h-6" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(0,255,255,0.8)" }}
            whileTap={{ scale: 0.95 }}
            onClick={onMute}
            className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-[#0ff] transition-all border border-[#0ff]/20"
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
  );
}

// Minimal Dark Player Component
function MinimalDarkPlayer({ tracks, currentTrack, isPlaying, onPlay, onPause, onNext, onPrev, onMute, isMuted, progress }: PlayerProps) {
  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div className="bg-[#111]/90 backdrop-blur-sm rounded-lg p-6">
        {/* Track Info */}
        <div className="mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={tracks[currentTrack].id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-2"
            >
              <h2 className="text-white text-lg font-medium tracking-wide">
                {tracks[currentTrack].title}
              </h2>
              <p className="text-gray-400 text-sm">
                {tracks[currentTrack].artist}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="relative h-[2px] bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="absolute h-full bg-white rounded-full"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onPrev}
              className="text-white/60 hover:text-white transition-colors"
            >
              <SkipBack className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={isPlaying ? onPause : onPlay}
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black transition-transform"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5 ml-0.5" />
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onNext}
              className="text-white/60 hover:text-white transition-colors"
            >
              <SkipForward className="w-5 h-5" />
            </motion.button>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onMute}
            className="text-white/60 hover:text-white transition-colors"
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </motion.button>
        </div>

        {/* Track List */}
        <div className="mt-8 space-y-2">
          {tracks.map((track, index) => (
            <motion.button
              key={track.id}
              onClick={() => {
                if (index !== currentTrack) {
                  onPlay();
                }
              }}
              className={`w-full p-3 rounded text-left transition-all ${
                index === currentTrack
                  ? "bg-white/10 text-white"
                  : "hover:bg-white/5 text-white/60"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{track.title}</p>
                  <p className="text-xs opacity-60">{track.description}</p>
                </div>
                {index === currentTrack && isPlaying && (
                  <div className="flex gap-1">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-0.5 h-3 bg-white rounded-full"
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
    </div>
  );
}

const defaultTracks = [
  {
    id: 1,
    title: "Somewhere Over The Rainbow",
    artist: "Melanie Marod",
    description: "Jazz Cover",
    youtubeId: "v=YOUR_YOUTUBE_ID",
    coverImage: "/images/covers/somewhere-over-the-rainbow.jpg"
  },
  {
    id: 2,
    title: "All Of Me",
    artist: "Melanie Marod",
    description: "Jazz Standard",
    youtubeId: "v=YOUR_YOUTUBE_ID",
    coverImage: "/images/covers/all-of-me.jpg"
  }
];

const playerStyles = [
  {
    id: "modern-vinyl",
    name: "Modern Vinyl",
    description: "A sleek vinyl record player with album artwork display"
  },
  {
    id: "neon-wave",
    name: "Neon Wave",
    description: "Modern neon-themed player with wave visualization"
  },
  {
    id: "minimal-dark",
    name: "Minimal Dark",
    description: "Clean and minimal dark theme with animated equalizer"
  }
];

export default function MusicPlayerShowcase() {
  const [selectedStyle, setSelectedStyle] = useState(playerStyles[0].id);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);
  const handleNext = () => setCurrentTrack((prev) => (prev + 1) % defaultTracks.length);
  const handlePrev = () => setCurrentTrack((prev) => (prev - 1 + defaultTracks.length) % defaultTracks.length);
  const handleMute = () => setIsMuted((prev) => !prev);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-12 px-4">
      {/* Style Selector */}
      <div className="max-w-3xl mx-auto mb-12">
        <h2 className="text-white text-2xl font-semibold mb-6">Choose Your Style</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {playerStyles.map((style) => (
            <motion.button
              key={style.id}
              onClick={() => setSelectedStyle(style.id)}
              className={`p-4 rounded-lg text-left transition-all ${
                selectedStyle === style.id
                  ? "bg-white/20 ring-2 ring-white"
                  : "bg-white/5 hover:bg-white/10"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <h3 className="text-white font-medium mb-1">{style.name}</h3>
              <p className="text-white/60 text-sm">{style.description}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Player Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedStyle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {selectedStyle === "modern-vinyl" && (
            <ModernVinylPlayer
              tracks={defaultTracks}
              currentTrack={currentTrack}
              isPlaying={isPlaying}
              onPlay={handlePlay}
              onPause={handlePause}
              onNext={handleNext}
              onPrev={handlePrev}
              onMute={handleMute}
              isMuted={isMuted}
              progress={progress}
            />
          )}
          {selectedStyle === "neon-wave" && (
            <NeonWavePlayer
              tracks={defaultTracks}
              currentTrack={currentTrack}
              isPlaying={isPlaying}
              onPlay={handlePlay}
              onPause={handlePause}
              onNext={handleNext}
              onPrev={handlePrev}
              onMute={handleMute}
              isMuted={isMuted}
              progress={progress}
            />
          )}
          {selectedStyle === "minimal-dark" && (
            <MinimalDarkPlayer
              tracks={defaultTracks}
              currentTrack={currentTrack}
              isPlaying={isPlaying}
              onPlay={handlePlay}
              onPause={handlePause}
              onNext={handleNext}
              onPrev={handlePrev}
              onMute={handleMute}
              isMuted={isMuted}
              progress={progress}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
} 
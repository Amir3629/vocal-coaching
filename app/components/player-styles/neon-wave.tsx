import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";

interface Track {
  id: number;
  title: string;
  artist: string;
  description: string;
  youtubeId: string;
  coverImage: string;
}

interface NeonWavePlayerProps {
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

export default function NeonWavePlayer({
  tracks,
  currentTrack,
  isPlaying,
  onPlay,
  onPause,
  onNext,
  onPrev,
  onMute,
  isMuted,
  progress
}: NeonWavePlayerProps) {
  const [wavePoints, setWavePoints] = useState<number[]>([]);

  // Generate wave animation points
  useEffect(() => {
    const points = Array.from({ length: 40 }, () => Math.random() * 100);
    setWavePoints(points);

    if (isPlaying) {
      const interval = setInterval(() => {
        setWavePoints(points.map(p => {
          const newValue = p + (Math.random() * 20 - 10);
          return Math.max(0, Math.min(100, newValue));
        }));
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isPlaying]);

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

        {/* Track Description */}
        <motion.div
          key={tracks[currentTrack].description}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="mt-8 text-center text-[#0ff]/60"
        >
          {tracks[currentTrack].description}
        </motion.div>
      </div>
    </div>
  );
} 
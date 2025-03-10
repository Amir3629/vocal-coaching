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

interface MinimalDarkPlayerProps {
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

export default function MinimalDarkPlayer({
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
}: MinimalDarkPlayerProps) {
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
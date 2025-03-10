import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ModernVinylPlayer from "@/app/components/player-styles/modern-vinyl";
import NeonWavePlayer from "@/app/components/player-styles/neon-wave";
import MinimalDarkPlayer from "@/app/components/player-styles/minimal-dark";

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
  },
  // Add more tracks here
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
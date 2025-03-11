"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const ModernVinylPlayer = dynamic(() => import("./player-styles/modern-vinyl"), {
  ssr: false
});

const defaultTracks = [
  {
    id: 1,
    title: "Vocal Workshop",
    artist: "Melanie Wainwright",
    description: "Complete Vocal Technique Demonstration",
    youtubeId: "AWsarzdZ1u8",
    coverImage: "/images/covers/vocal-workshop.jpg"
  },
  {
    id: 2,
    title: "Jazz Standards",
    artist: "Melanie Wainwright",
    description: "Live Performance Collection",
    youtubeId: "GidIMbCmtyk",
    coverImage: "/images/covers/jazz-standards.jpg"
  },
  {
    id: 3,
    title: "Special Performance",
    artist: "Melanie Wainwright",
    description: "Live Jazz Session",
    youtubeId: "QgZKO_f5FlM",
    coverImage: "/images/covers/special-performance.jpg"
  },
  {
    id: 4,
    title: "Vocal Jazz",
    artist: "Melanie Wainwright",
    description: "Studio Session",
    youtubeId: "hFdMHvB6-Jk",
    coverImage: "/images/covers/vocal-jazz.jpg"
  },
  {
    id: 5,
    title: "Jazz Ensemble",
    artist: "Melanie Wainwright",
    description: "Live Performance",
    youtubeId: "ZvWZr6TNh9Y",
    coverImage: "/images/covers/jazz-ensemble.jpg"
  },
  {
    id: 6,
    title: "Jazz Collection",
    artist: "Melanie Wainwright",
    description: "Selected Performances",
    youtubeId: "r58-5DBfMpY",
    coverImage: "/images/covers/jazz-collection.jpg"
  },
  {
    id: 7,
    title: "Jazz Highlights",
    artist: "Melanie Wainwright",
    description: "Best Moments",
    youtubeId: "0zARqh3xwnw",
    coverImage: "/images/covers/jazz-highlights.jpg"
  }
];

export default function MusicPlayerShowcase() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePrevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + defaultTracks.length) % defaultTracks.length);
  };

  const handleNextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % defaultTracks.length);
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <section id="music" className="py-20 bg-[#040202]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-heading mb-4">Meine Musik</h2>
          <div className="w-24 h-0.5 bg-[#C8A97E] mx-auto opacity-80"></div>
        </div>

        <ModernVinylPlayer
          tracks={defaultTracks}
          currentTrackIndex={currentTrackIndex}
          isPlaying={isPlaying}
          isMuted={isMuted}
          progress={progress}
          onPlayPause={handlePlayPause}
          onPrevTrack={handlePrevTrack}
          onNextTrack={handleNextTrack}
          onToggleMute={handleToggleMute}
        />
      </div>
    </section>
  );
}

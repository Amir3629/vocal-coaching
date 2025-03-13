"use client"

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';

interface Song {
  title: string;
  artist: string;
  youtubeId: string;
  description: string;
}

const songs: Song[] = [
  {
    title: "Vocal Workshop",
    artist: "Melvo Coaching",
    youtubeId: "GidIMbCmtyk",
    description: "Advanced vocal techniques"
  },
  {
    title: "Jazz Piano Performance",
    artist: "Melvo Coaching",
    youtubeId: "hFdMHvB6-Jk",
    description: "Live at the Jazz Studio"
  },
  {
    title: "Vocal Techniques",
    artist: "Melvo Coaching",
    youtubeId: "ZvWZr6TNh9Y",
    description: "Advanced vocal techniques demonstration"
  },
  {
    title: "Jazz Improvisation",
    artist: "Melvo Coaching",
    youtubeId: "r58-5DBfMpY",
    description: "Piano and vocal improvisation"
  },
  {
    title: "Vocal Jazz Session",
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
    title: "Piano Jazz",
    artist: "Melvo Coaching",
    youtubeId: "QgZKO_f5FlM",
    description: "Jazz improvisation session"
  }
];

export default function MusicPlayer() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [showTutorial, setShowTutorial] = useState(false);
  const videoRef = useRef<HTMLIFrameElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const discControls = useAnimation();
  const tutorialControls = useAnimation();

  const currentSong = songs[currentSongIndex];

  // Set player ready after a short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setPlayerReady(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Show tutorial animation on first load
  useEffect(() => {
    // Check if this is the first visit
    const hasSeenTutorial = localStorage.getItem('music-tutorial-seen');
    
    if (!hasSeenTutorial && playerReady) {
      setShowTutorial(true);
      
      // Animate the tutorial hand
      tutorialControls.start({
        x: [-20, 20, -20],
        transition: {
          duration: 2,
          repeat: 1,
          ease: "easeInOut"
        }
      }).then(() => {
        setShowTutorial(false);
        localStorage.setItem('music-tutorial-seen', 'true');
      });
    }
  }, [playerReady, tutorialControls]);

  // Handle YouTube player messages
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        if (data.event === "onStateChange") {
          // YouTube states: -1 (unstarted), 0 (ended), 1 (playing), 2 (paused), 3 (buffering)
          if (data.info === 1) {
            setIsPlaying(true);
          } else if (data.info === 2) {
            setIsPlaying(false);
          } else if (data.info === 0) {
            // Video ended, play next
            playNextSong();
          }
        } else if (data.event === "onReady") {
          // Player is ready
          setPlayerReady(true);
        }
      } catch (e) {
        // Not a JSON message or not from YouTube
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  // Spinning animation with slow start
  useEffect(() => {
    if (isPlaying) {
      discControls.start({
        rotate: 360,
        transition: {
          duration: 20, // Much slower rotation (20 seconds per rotation)
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop"
        }
      });
    } else {
      discControls.stop();
    }
  }, [isPlaying, discControls]);

  const togglePlay = () => {
    if (!playerReady) return;
    
    setIsPlaying(!isPlaying);
    if (videoRef.current) {
      const message = !isPlaying 
        ? '{"event":"command","func":"playVideo","args":""}' 
        : '{"event":"command","func":"pauseVideo","args":""}';
      videoRef.current.contentWindow?.postMessage(message, '*');
    }
  };

  const playNextSong = () => {
    if (!playerReady || isTransitioning) return;
    
    setIsTransitioning(true);
    setIsPlaying(false);
    
    // Wait for transition animation
    setTimeout(() => {
      setCurrentSongIndex((prevIndex) => 
        prevIndex === songs.length - 1 ? 0 : prevIndex + 1
      );
      setProgress(0);
      
      // Wait a bit more before starting the new song
      setTimeout(() => {
        setIsTransitioning(false);
        if (videoRef.current) {
          // Load and play the new video
          const nextIndex = currentSongIndex === songs.length - 1 ? 0 : currentSongIndex + 1;
          const message = `{"event":"command","func":"loadVideoById","args":"${songs[nextIndex].youtubeId}"}`;
          videoRef.current.contentWindow?.postMessage(message, '*');
        }
      }, 800);
    }, 500);
  };

  const playPreviousSong = () => {
    if (!playerReady || isTransitioning) return;
    
    setIsTransitioning(true);
    setIsPlaying(false);
    
    // Wait for transition animation
    setTimeout(() => {
      setCurrentSongIndex((prevIndex) => 
        prevIndex === 0 ? songs.length - 1 : prevIndex - 1
      );
      setProgress(0);
      
      // Wait a bit more before starting the new song
      setTimeout(() => {
        setIsTransitioning(false);
        if (videoRef.current) {
          // Load and play the new video
          const prevIndex = currentSongIndex === 0 ? songs.length - 1 : currentSongIndex - 1;
          const message = `{"event":"command","func":"loadVideoById","args":"${songs[prevIndex].youtubeId}"}`;
          videoRef.current.contentWindow?.postMessage(message, '*');
        }
      }, 800);
    }, 500);
  };

  // Drag handlers for disc navigation
  const handleDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
  };

  const handleDragMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    
    const dragDistance = e.clientX - dragStartX;
    
    // If dragged far enough, change song immediately
    if (dragDistance > 80) {
      setIsDragging(false);
      playPreviousSong();
    } else if (dragDistance < -80) {
      setIsDragging(false);
      playNextSong();
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className="max-w-5xl mx-auto relative py-10">
      <div className="relative mx-auto" style={{ maxWidth: "500px" }}>
        <div className="flex items-center justify-center">
          <AnimatePresence mode="wait">
            <div className="relative flex items-center justify-center">
              {/* Previous song button (only visible during transitions) */}
              <button 
                className="absolute left-[-60px] z-10 text-gray-400 hover:text-[#C8A97E] transition-colors"
                onClick={playPreviousSong}
                aria-label="Previous song"
              >
                <ChevronLeft size={32} />
              </button>

              {/* Next song button (only visible during transitions) */}
              <button 
                className="absolute right-[-60px] z-10 text-gray-400 hover:text-[#C8A97E] transition-colors"
                onClick={playNextSong}
                aria-label="Next song"
              >
                <ChevronRight size={32} />
              </button>

              {/* Current song disc */}
              <motion.div
                key={currentSongIndex}
                initial={{ opacity: 0, scale: 0.8, x: isTransitioning ? (dragStartX > 0 ? 100 : -100) : 0 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: dragStartX > 0 ? -100 : 100 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 100, 
                  damping: 15,
                  duration: 0.8
                }}
                className="relative z-10"
                onMouseDown={handleDragStart}
                onMouseMove={handleDragMove}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
              >
                {/* Vinyl disc background */}
                <motion.div 
                  className="w-[400px] h-[400px] rounded-full bg-black relative cursor-grab active:cursor-grabbing"
                  animate={discControls}
                  initial={{ rotate: 0 }}
                  style={{
                    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.6)'
                  }}
                >
                  {/* Vinyl grooves */}
                  <div className="absolute inset-0 rounded-full border-4 border-gray-800" style={{ margin: '10%' }} />
                  <div className="absolute inset-0 rounded-full border-4 border-gray-800" style={{ margin: '20%' }} />
                  <div className="absolute inset-0 rounded-full border-4 border-gray-800" style={{ margin: '30%' }} />
                  <div className="absolute inset-0 rounded-full border-4 border-gray-800" style={{ margin: '40%' }} />
                  
                  {/* Center label */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] rounded-full bg-black flex items-center justify-center z-10 shadow-inner border-2 border-gray-800">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={togglePlay}
                      className="w-16 h-16 flex items-center justify-center rounded-full bg-black"
                    >
                      {isPlaying ? <Pause size={32} className="text-white" /> : <Play size={32} className="text-white ml-1" />}
                    </motion.button>
                  </div>

                  {/* Video thumbnail as background */}
                  <div className="absolute inset-0 rounded-full overflow-hidden opacity-70 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-black/40 z-[1]" /> {/* Darkening overlay */}
                    <Image
                      src={`https://img.youtube.com/vi/${currentSong.youtubeId}/maxresdefault.jpg`}
                      alt={currentSong.title}
                      fill
                      className="object-cover grayscale" /* Black and white filter */
                      unoptimized={true} /* Ensure image loads properly */
                    />
                  </div>
                </motion.div>

                {/* Song info */}
                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center">
                  <h3 className="text-[#C8A97E] font-medium text-xl mb-1">{currentSong.title}</h3>
                  <p className="text-gray-400 text-sm">{currentSong.artist}</p>
                </div>
              </motion.div>

              {/* Tutorial animation */}
              {showTutorial && (
                <motion.div 
                  className="absolute z-20 pointer-events-none"
                  animate={tutorialControls}
                  style={{ bottom: "50%", left: "50%" }}
                >
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-white/20 absolute" 
                      style={{ 
                        filter: "blur(8px)",
                        transform: "translate(-50%, -50%)"
                      }} 
                    />
                    <div className="w-8 h-8 border-2 border-white rounded-full absolute"
                      style={{ 
                        transform: "translate(-50%, -50%)"
                      }} 
                    />
                    <div className="absolute" style={{ transform: "translate(-50%, -50%)" }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 11.5C9 12.8807 7.88071 14 6.5 14C5.11929 14 4 12.8807 4 11.5C4 10.1193 5.11929 9 6.5 9C7.88071 9 9 10.1193 9 11.5Z" fill="white"/>
                        <path d="M19 11.5C19 12.8807 17.8807 14 16.5 14C15.1193 14 14 12.8807 14 11.5C14 10.1193 15.1193 9 16.5 9C17.8807 9 19 10.1193 19 11.5Z" fill="white"/>
                        <path d="M14 5.5C14 6.88071 12.8807 8 11.5 8C10.1193 8 9 6.88071 9 5.5C9 4.11929 10.1193 3 11.5 3C12.8807 3 14 4.11929 14 5.5Z" fill="white"/>
                        <path d="M14 17.5C14 18.8807 12.8807 20 11.5 20C10.1193 20 9 18.8807 9 17.5C9 16.1193 10.1193 15 11.5 15C12.8807 15 14 16.1193 14 17.5Z" fill="white"/>
                      </svg>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </AnimatePresence>
        </div>

        {/* Swipe instruction */}
        <div className="text-center mt-20 text-gray-400 text-sm">
          <p>Drag the disc left or right to change songs</p>
        </div>
      </div>

      {/* YouTube iframe for audio */}
      <iframe
        ref={videoRef}
        src={`https://www.youtube.com/embed/${currentSong.youtubeId}?enablejsapi=1&controls=0&showinfo=0&modestbranding=1&rel=0&autoplay=0&origin=${typeof window !== 'undefined' ? window.location.origin : ''}`}
        className="w-0 h-0 absolute"
        allow="autoplay"
      />
    </div>
  );
} 
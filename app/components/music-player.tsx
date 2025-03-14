"use client"

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Music } from 'lucide-react';
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
  const [dragOffset, setDragOffset] = useState(0);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showMiniPlayer, setShowMiniPlayer] = useState(false);
  const [miniPlayerTimeout, setMiniPlayerTimeout] = useState<NodeJS.Timeout | null>(null);
  const videoRef = useRef<HTMLIFrameElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const discControls = useAnimation();
  const tutorialControls = useAnimation();
  const notificationControls = useAnimation();

  const currentSong = songs[currentSongIndex];
  
  // Calculate multiple indices with circular navigation
  const prevSongIndex = currentSongIndex === 0 ? songs.length - 1 : currentSongIndex - 1;
  const nextSongIndex = currentSongIndex === songs.length - 1 ? 0 : currentSongIndex + 1;
  const prevSongIndex2 = prevSongIndex === 0 ? songs.length - 1 : prevSongIndex - 1;
  const nextSongIndex2 = nextSongIndex === songs.length - 1 ? 0 : nextSongIndex + 1;

  // Set player ready after a short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setPlayerReady(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Show/hide mini player based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (!playerRef.current) return;
      
      const playerRect = playerRef.current.getBoundingClientRect();
      const isPlayerVisible = 
        playerRect.top < window.innerHeight && 
        playerRect.bottom > 0;
      
      if (!isPlayerVisible && isPlaying) {
        // Player is not visible and music is playing, show mini player
        setShowMiniPlayer(true);
      } else {
        // Player is visible or music is not playing, hide mini player
        setShowMiniPlayer(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isPlaying]);

  // Auto-hide mini player when music is paused
  useEffect(() => {
    if (!isPlaying && showMiniPlayer) {
      // Clear any existing timeout
      if (miniPlayerTimeout) {
        clearTimeout(miniPlayerTimeout);
      }
      
      // Set a new timeout to hide the mini player after 3 seconds
      const timeout = setTimeout(() => {
        setShowMiniPlayer(false);
      }, 3000);
      
      setMiniPlayerTimeout(timeout);
    }
    
    return () => {
      if (miniPlayerTimeout) {
        clearTimeout(miniPlayerTimeout);
      }
    };
  }, [isPlaying, showMiniPlayer]);

  // Show tutorial animation on first load
  useEffect(() => {
    // Check if this is the first visit
    const hasSeenTutorial = localStorage.getItem('music-tutorial-seen');
    
    if (!hasSeenTutorial && playerReady) {
      setShowTutorial(true);
      setShowNotification(true);
      
      // Animate the tutorial hand
      tutorialControls.start({
        x: [-40, 40, -40],
        transition: {
          duration: 2.5,
          repeat: 1,
          ease: "easeInOut"
        }
      }).then(() => {
        setShowTutorial(false);
        localStorage.setItem('music-tutorial-seen', 'true');
      });

      // Animate the notification
      notificationControls.start({
        opacity: [0, 1, 1, 0],
        y: [20, 0, 0, -20],
        transition: {
          duration: 4,
          times: [0, 0.1, 0.9, 1],
          ease: "easeInOut"
        }
      }).then(() => {
        setShowNotification(false);
      });
    }
  }, [playerReady, tutorialControls, notificationControls]);

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

  // Optimize drag handlers for smoother performance
  const handleDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragOffset(0);
    setIsTransitioning(false); // Reset transitioning state on new drag
  };

  // Make drag more sensitive but smoother
  const handleDragMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    
    // Use a more moderate sensitivity multiplier to reduce jumpiness
    const dragDistance = (e.clientX - dragStartX) * 1.2;
    setDragOffset(dragDistance);
    
    // Only set transitioning if we're past the threshold
    if (Math.abs(dragDistance) > 40) {
      setIsTransitioning(true);
    }
  };

  // Mouse hover handlers for notification
  const handleDiscHover = () => {
    setShowNotification(true);
    notificationControls.start({
      opacity: [0, 1, 1, 0],
      y: [20, 0, 0, -20],
      transition: {
        duration: 4,
        times: [0, 0.1, 0.9, 1],
        ease: "easeInOut"
      }
    }).then(() => {
      setShowNotification(false);
    });
  };

  // Calculate which disc to show based on drag position with smoother transitions
  const getVisibleDiscIndex = () => {
    if (!isDragging) return currentSongIndex;
    
    // Reduced threshold for easier navigation but not too sensitive
    const dragThreshold = 40;
    
    // Calculate normalized drag offset (how many discs to shift)
    const dragRatio = dragOffset / dragThreshold;
    
    if (dragRatio > 0) {
      // Dragging right (show previous songs)
      const shift = Math.floor(dragRatio);
      let newIndex = currentSongIndex - shift;
      // Handle circular navigation
      while (newIndex < 0) newIndex += songs.length;
      return newIndex;
    } else if (dragRatio < 0) {
      // Dragging left (show next songs)
      const shift = Math.floor(Math.abs(dragRatio));
      let newIndex = currentSongIndex + shift;
      // Handle circular navigation
      while (newIndex >= songs.length) newIndex -= songs.length;
      return newIndex;
    }
    
    return currentSongIndex;
  };

  // Handle drag end with smoother transitions
  const handleDragEnd = () => {
    if (isDragging) {
      if (Math.abs(dragOffset) > 40) {
        // Get the new index based on drag
        const newIndex = getVisibleDiscIndex();
        setCurrentSongIndex(newIndex);
        
        // Load the new song
        if (videoRef.current) {
          const message = `{"event":"command","func":"loadVideoById","args":"${songs[newIndex].youtubeId}"}`;
          videoRef.current.contentWindow?.postMessage(message, '*');
        }
      }
      
      // Reset drag state
      setDragOffset(0);
    }
    setIsDragging(false);
    // Allow a short delay before resetting transitioning state
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <div className="max-w-5xl mx-auto relative py-10" ref={playerRef}>
      <div className="relative mx-auto" style={{ maxWidth: "500px" }}>
        <div className="flex items-center justify-center">
          <div className="relative flex items-center justify-center overflow-visible">
            {/* Previous song disc 2 (furthest left) */}
            {isDragging && dragOffset > 0 && (
              <motion.div
                className="absolute z-0 left-0"
                initial={{ x: "-92%" }}
                animate={{ 
                  x: `-${92 - Math.min(dragOffset / 4, 15)}%`,
                  opacity: Math.min(dragOffset / 200, 0.5),
                  scale: 0.75
                }}
                transition={{ 
                  type: "tween", 
                  duration: 0.05,
                  ease: "easeOut"
                }}
              >
                <div className="w-[400px] h-[400px] rounded-full bg-black relative opacity-60 blur-[3px]">
                  <div className="absolute inset-0 rounded-full overflow-hidden">
                    <div className="absolute inset-0 bg-black/70 z-[1]" />
                    <Image
                      src={`https://img.youtube.com/vi/${songs[prevSongIndex2].youtubeId}/maxresdefault.jpg`}
                      alt={songs[prevSongIndex2].title}
                      fill
                      className="object-cover grayscale"
                      unoptimized={true}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Previous song disc (partially visible) */}
            {isDragging && dragOffset > 0 && (
              <motion.div
                className="absolute z-1 left-0"
                initial={{ x: "-80%" }}
                animate={{ 
                  x: `-${80 - Math.min(dragOffset / 3, 25)}%`,
                  opacity: Math.min(dragOffset / 150, 0.7),
                  scale: 0.85
                }}
                transition={{ 
                  type: "tween", 
                  duration: 0.05,
                  ease: "easeOut"
                }}
              >
                <div className="w-[400px] h-[400px] rounded-full bg-black relative opacity-70 blur-[2px]">
                  <div className="absolute inset-0 rounded-full overflow-hidden">
                    <div className="absolute inset-0 bg-black/60 z-[1]" />
                    <Image
                      src={`https://img.youtube.com/vi/${songs[prevSongIndex].youtubeId}/maxresdefault.jpg`}
                      alt={songs[prevSongIndex].title}
                      fill
                      className="object-cover grayscale"
                      unoptimized={true}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Next song disc (partially visible) */}
            {isDragging && dragOffset < 0 && (
              <motion.div
                className="absolute z-1 right-0"
                initial={{ x: "80%" }}
                animate={{ 
                  x: `${80 - Math.min(Math.abs(dragOffset) / 3, 25)}%`,
                  opacity: Math.min(Math.abs(dragOffset) / 150, 0.7),
                  scale: 0.85
                }}
                transition={{ 
                  type: "tween", 
                  duration: 0.05,
                  ease: "easeOut"
                }}
              >
                <div className="w-[400px] h-[400px] rounded-full bg-black relative opacity-70 blur-[2px]">
                  <div className="absolute inset-0 rounded-full overflow-hidden">
                    <div className="absolute inset-0 bg-black/60 z-[1]" />
                    <Image
                      src={`https://img.youtube.com/vi/${songs[nextSongIndex].youtubeId}/maxresdefault.jpg`}
                      alt={songs[nextSongIndex].title}
                      fill
                      className="object-cover grayscale"
                      unoptimized={true}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Next song disc 2 (furthest right) */}
            {isDragging && dragOffset < 0 && (
              <motion.div
                className="absolute z-0 right-0"
                initial={{ x: "92%" }}
                animate={{ 
                  x: `${92 - Math.min(Math.abs(dragOffset) / 4, 15)}%`,
                  opacity: Math.min(Math.abs(dragOffset) / 200, 0.5),
                  scale: 0.75
                }}
                transition={{ 
                  type: "tween", 
                  duration: 0.05,
                  ease: "easeOut"
                }}
              >
                <div className="w-[400px] h-[400px] rounded-full bg-black relative opacity-60 blur-[3px]">
                  <div className="absolute inset-0 rounded-full overflow-hidden">
                    <div className="absolute inset-0 bg-black/70 z-[1]" />
                    <Image
                      src={`https://img.youtube.com/vi/${songs[nextSongIndex2].youtubeId}/maxresdefault.jpg`}
                      alt={songs[nextSongIndex2].title}
                      fill
                      className="object-cover grayscale"
                      unoptimized={true}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Current song disc */}
            <motion.div
              key={`disc-${currentSongIndex}`}
              animate={{ 
                x: isDragging ? dragOffset : 0,
                zIndex: 10
              }}
              transition={{ 
                type: "tween", 
                duration: isDragging ? 0.05 : 0.3,
                ease: isDragging ? "linear" : "easeOut"
              }}
              className="relative z-10"
              onMouseDown={handleDragStart}
              onMouseMove={handleDragMove}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
              onMouseEnter={handleDiscHover}
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

            {/* Temporary notification */}
            {showNotification && (
              <motion.div 
                className="absolute z-30 pointer-events-none bg-black/80 text-white px-4 py-2 rounded-full"
                animate={notificationControls}
                style={{ bottom: "-60px", left: "50%", transform: "translateX(-50%)" }}
              >
                Drag disc left or right to change songs
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* YouTube iframe for audio */}
      <iframe
        ref={videoRef}
        src={`https://www.youtube.com/embed/${currentSong.youtubeId}?enablejsapi=1&controls=0&showinfo=0&modestbranding=1&rel=0&autoplay=0&origin=${typeof window !== 'undefined' ? window.location.origin : ''}`}
        className="w-0 h-0 absolute"
        allow="autoplay"
      />

      {/* Floating Mini Player */}
      <AnimatePresence>
        {showMiniPlayer && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <motion.div 
              className="bg-black/80 backdrop-blur-md rounded-full p-3 flex items-center gap-3 border border-[#C8A97E]/30 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Mini disc */}
              <motion.div 
                className="w-12 h-12 rounded-full overflow-hidden relative"
                animate={{ rotate: isPlaying ? 360 : 0 }}
                transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "loop" }}
              >
                <Image
                  src={`https://img.youtube.com/vi/${currentSong.youtubeId}/maxresdefault.jpg`}
                  alt={currentSong.title}
                  fill
                  className="object-cover"
                  unoptimized={true}
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute inset-0 rounded-full border-2 border-[#C8A97E]/40" />
              </motion.div>
              
              {/* Song info */}
              <div className="text-white max-w-[120px]">
                <p className="text-sm font-medium truncate text-[#C8A97E]">{currentSong.title}</p>
                <p className="text-xs text-white/70 truncate">{currentSong.artist}</p>
              </div>
              
              {/* Play/Pause button */}
              <motion.button
                onClick={togglePlay}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-[#C8A97E]/20 text-[#C8A97E]"
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-1" />}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 
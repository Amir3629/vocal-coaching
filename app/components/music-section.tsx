"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Youtube } from "lucide-react"
import Image from "next/image"

interface Track {
  id: number
  title: string
  subtitle: string
  duration: string
  youtubeId: string
  thumbnail: string
}

const tracks: Track[] = [
  {
    id: 1,
    title: "Jazz Performance",
    subtitle: "Live at Jazz Club",
    duration: "4:32",
    youtubeId: "hFdMHvB6-Jk",
    thumbnail: `https://img.youtube.com/vi/hFdMHvB6-Jk/maxresdefault.jpg`
  },
  {
    id: 2,
    title: "Vocal Session",
    subtitle: "Studio Recording",
    duration: "5:15",
    youtubeId: "ZvWZr6TNh9Y",
    thumbnail: `https://img.youtube.com/vi/ZvWZr6TNh9Y/maxresdefault.jpg`
  },
  {
    id: 3,
    title: "Jazz Standards",
    subtitle: "Live Performance",
    duration: "6:20",
    youtubeId: "r58-5DBfMpY",
    thumbnail: `https://img.youtube.com/vi/r58-5DBfMpY/maxresdefault.jpg`
  },
  {
    id: 4,
    title: "Vocal Jazz",
    subtitle: "Concert Highlights",
    duration: "4:45",
    youtubeId: "0zARqh3xwnw",
    thumbnail: `https://img.youtube.com/vi/0zARqh3xwnw/maxresdefault.jpg`
  },
  {
    id: 5,
    title: "Jazz Ensemble",
    subtitle: "Live at Festival",
    duration: "5:30",
    youtubeId: "AWsarzdZ1u8",
    thumbnail: `https://img.youtube.com/vi/AWsarzdZ1u8/maxresdefault.jpg`
  },
  {
    id: 6,
    title: "Vocal Performance",
    subtitle: "Jazz Club Session",
    duration: "4:15",
    youtubeId: "GidIMbCmtyk",
    thumbnail: `https://img.youtube.com/vi/GidIMbCmtyk/maxresdefault.jpg`
  },
  {
    id: 7,
    title: "Jazz Vocals",
    subtitle: "Live Recording",
    duration: "5:00",
    youtubeId: "QgZKO_f5FlM",
    thumbnail: `https://img.youtube.com/vi/QgZKO_f5FlM/maxresdefault.jpg`
  }
]

export default function MusicSection() {
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openYoutubeModal = (track: Track) => {
    setSelectedTrack(track)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setSelectedTrack(null)
    setIsModalOpen(false)
  }

  return (
    <section id="music" className="py-20 bg-[#040202]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-heading mb-4">Meine Musik</h2>
          <div className="w-12 h-0.5 bg-[#C8A97E] mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {tracks.map((track, index) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative aspect-video rounded-xl overflow-hidden cursor-pointer"
              onClick={() => openYoutubeModal(track)}
            >
              <Image
                src={track.thumbnail}
                alt={track.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h3 className="text-white font-medium mb-1">{track.title}</h3>
                  <p className="text-gray-300 text-sm">{track.subtitle}</p>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 rounded-full bg-[#C8A97E] flex items-center justify-center"
                  >
                    <Youtube className="w-6 h-6 text-black" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* YouTube Modal */}
        <AnimatePresence>
          {isModalOpen && selectedTrack && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/90 backdrop-blur-sm"
                onClick={closeModal}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-4xl aspect-video z-[101] rounded-xl overflow-hidden"
              >
                <iframe
                  src={`https://www.youtube.com/embed/${selectedTrack.youtubeId}?autoplay=1`}
                  title={selectedTrack.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
} 
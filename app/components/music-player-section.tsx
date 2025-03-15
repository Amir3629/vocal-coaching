"use client"

import React from 'react'
import { motion } from 'framer-motion'
import EnhancedMusicPlayer from './enhanced-music-player'
import { getImagePath } from '../../lib/utils'

const tracks = [
  {
    title: "Jazz Performance",
    artist: "Melanie Wainwright",
    audioSrc: "/audio/jazz-sample.mp3",
    coverArt: "/images/music-cover-1.jpg"
  },
  {
    title: "Vocal Workshop",
    artist: "Melanie Wainwright",
    audioSrc: "/audio/vocal-sample.mp3",
    coverArt: "/images/music-cover-2.jpg"
  },
  {
    title: "Jazz Standards",
    artist: "Melanie Wainwright",
    audioSrc: "/audio/standards-sample.mp3",
    coverArt: "/images/music-cover-3.jpg"
  }
]

export default function MusicPlayerSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-black to-[#0A0908]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Listen to My Music</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Experience my vocal performances and get a taste of my teaching style through these audio samples.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto"
        >
          <EnhancedMusicPlayer tracks={tracks} className="bg-black/50 p-8 rounded-xl backdrop-blur-sm" />
        </motion.div>
      </div>
    </section>
  )
} 
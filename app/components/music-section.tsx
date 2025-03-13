"use client"

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';

interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  thumbnail: string;
  youtubeUrl: string;
}

const tracks: MusicTrack[] = [
  {
    id: '1',
    title: 'Jazz Performance',
    artist: 'Live at B-Flat Jazz Club Berlin',
    thumbnail: `https://img.youtube.com/vi/hFdMHvB6-Jk/maxresdefault.jpg`,
    youtubeUrl: 'https://www.youtube.com/watch?v=hFdMHvB6-Jk'
  },
  {
    id: '2',
    title: 'Vocal Workshop',
    artist: 'Complete Vocal Technique Demonstration',
    thumbnail: `https://img.youtube.com/vi/ZvWZr6TNh9Y/maxresdefault.jpg`,
    youtubeUrl: 'https://www.youtube.com/watch?v=ZvWZr6TNh9Y'
  },
  {
    id: '3',
    title: 'Jazz Standards',
    artist: 'Live Performance Highlights',
    thumbnail: `https://img.youtube.com/vi/r58-5DBfMpY/maxresdefault.jpg`,
    youtubeUrl: 'https://www.youtube.com/watch?v=r58-5DBfMpY'
  },
  {
    id: '4',
    title: 'Vocal Jazz',
    artist: 'Studio Session',
    thumbnail: `https://img.youtube.com/vi/0zARqh3xwnw/maxresdefault.jpg`,
    youtubeUrl: 'https://www.youtube.com/watch?v=0zARqh3xwnw'
  },
  {
    id: '5',
    title: 'Jazz Ensemble',
    artist: 'Live at Jazz Club',
    thumbnail: `https://img.youtube.com/vi/AWsarzdZ1u8/maxresdefault.jpg`,
    youtubeUrl: 'https://www.youtube.com/watch?v=AWsarzdZ1u8'
  },
  {
    id: '6',
    title: 'Vocal Performance',
    artist: 'Special Concert',
    thumbnail: `https://img.youtube.com/vi/GidIMbCmtyk/maxresdefault.jpg`,
    youtubeUrl: 'https://www.youtube.com/watch?v=GidIMbCmtyk'
  },
  {
    id: '7',
    title: 'Jazz Collaboration',
    artist: 'Featured Performance',
    thumbnail: `https://img.youtube.com/vi/QgZKO_f5FlM/maxresdefault.jpg`,
    youtubeUrl: 'https://www.youtube.com/watch?v=QgZKO_f5FlM'
  }
];

export default function MusicSection() {
  const { t } = useTranslation();
  const [currentTrack, setCurrentTrack] = useState<MusicTrack>(tracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleTrackSelect = (track: MusicTrack) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  return (
    <section className="w-full bg-black py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-playfair text-center text-gold mb-12">
          {t('music.title')}
        </h2>
        
        {/* Main Player */}
        <div className="bg-zinc-900 rounded-xl p-6 mb-8 shadow-2xl">
          <div className="aspect-video w-full relative mb-4">
            {currentTrack && (
              <iframe
                width="100%"
                height="100%"
                src={`${currentTrack.youtubeUrl.replace('watch?v=', 'embed/')}?autoplay=${isPlaying ? 1 : 0}`}
                title={currentTrack.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              />
            )}
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-white">{currentTrack.title}</h3>
              <p className="text-gold">{currentTrack.artist}</p>
            </div>
          </div>
        </div>

        {/* Playlist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {tracks.map((track) => (
            <div
              key={track.id}
              onClick={() => handleTrackSelect(track)}
              className={`bg-zinc-900 rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105 ${
                currentTrack.id === track.id ? 'ring-2 ring-gold' : ''
              }`}
            >
              <div className="aspect-video relative">
                <Image
                  src={track.thumbnail}
                  alt={track.title}
                  width={640}
                  height={360}
                  unoptimized
                  className="rounded-t-lg object-cover w-full h-full"
                />
                {currentTrack.id === track.id && (
                  <div className="absolute inset-0 bg-gold bg-opacity-20 flex items-center justify-center">
                    <span className="text-white text-lg">Now Playing</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h4 className="text-white font-medium truncate">{track.title}</h4>
                <p className="text-gold text-sm truncate">{track.artist}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 
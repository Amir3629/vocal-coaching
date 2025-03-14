"use client"

import React from 'react';
import { motion } from 'framer-motion';

interface ExpertiseCardProps {
  title: string;
  year: string;
  description: string;
  icon: React.ReactNode;
}

const ExpertiseCard: React.FC<ExpertiseCardProps> = ({ title, year, description, icon }) => {
  return (
    <div className="perspective-1000 w-full h-full">
      <motion.div 
        className="relative w-full aspect-square bg-[#0A0A0A] rounded-lg border border-[#1A1A1A] overflow-hidden transform-style-3d transition-transform duration-700 cursor-pointer"
        whileHover={{ rotateY: 180 }}
        initial={{ rotateY: 0 }}
      >
        {/* Front side */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 backface-hidden">
          <div className="text-[#C8A97E] mb-6">
            {icon}
          </div>
          <h3 className="text-white text-xl font-medium text-center mb-2">{title}</h3>
          <p className="text-[#C8A97E] text-sm text-center">{year}</p>
        </div>
        
        {/* Back side */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 backface-hidden transform rotate-y-180 bg-[#0A0A0A]">
          <p className="text-gray-300 text-center text-sm">{description}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default function ExpertiseCards() {
  return (
    <div className="w-full py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ExpertiseCard
            title="Jazz Improvisation"
            year="Since 2010"
            description="Master the art of spontaneous musical creation. Our improvisation techniques help you express yourself freely while maintaining harmonic integrity and rhythmic precision."
            icon={
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M32 8C18.7452 8 8 18.7452 8 32C8 45.2548 18.7452 56 32 56C45.2548 56 56 45.2548 56 32C56 18.7452 45.2548 8 32 8Z" stroke="#C8A97E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M32 20V32L40 40" stroke="#C8A97E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M20 12L44 12" stroke="#C8A97E" strokeWidth="2" strokeLinecap="round"/>
                <path d="M16 16L48 16" stroke="#C8A97E" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            }
          />
          
          <ExpertiseCard
            title="Vocal Technique"
            year="Since 2015"
            description="Develop your unique voice with our comprehensive vocal training. From breath control to extended techniques, we'll help you find your authentic sound and expand your range."
            icon={
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M32 16V48" stroke="#C8A97E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M40 24V40" stroke="#C8A97E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M48 28V36" stroke="#C8A97E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M24 24V40" stroke="#C8A97E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 28V36" stroke="#C8A97E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M32 16C34.2091 16 36 14.2091 36 12C36 9.79086 34.2091 8 32 8C29.7909 8 28 9.79086 28 12C28 14.2091 29.7909 16 32 16Z" stroke="#C8A97E" strokeWidth="2"/>
              </svg>
            }
          />
          
          <ExpertiseCard
            title="Performance Mastery"
            year="Since 2012"
            description="Transform your stage presence and captivate audiences. Learn to channel nervous energy into powerful performances, connect with listeners, and create unforgettable musical moments."
            icon={
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 40L16 24" stroke="#C8A97E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M24 44L24 20" stroke="#C8A97E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M32 48L32 16" stroke="#C8A97E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M40 44L40 20" stroke="#C8A97E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M48 40L48 24" stroke="#C8A97E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 32H52" stroke="#C8A97E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
          />
          
          <ExpertiseCard
            title="Jazz Composition"
            year="Since 2017"
            description="Craft your own musical stories through composition. Explore jazz harmony, melodic development, and arrangement techniques to create pieces that reflect your unique artistic vision."
            icon={
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 44V20L44 20V44H20Z" stroke="#C8A97E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M20 28H44" stroke="#C8A97E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M20 36H44" stroke="#C8A97E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M28 20V44" stroke="#C8A97E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M36 20V44" stroke="#C8A97E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
          />
        </div>
      </div>
    </div>
  );
} 
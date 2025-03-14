"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Music, Users, Mic2 } from 'lucide-react';

interface StatItemProps {
  value: string;
  label: string;
  icon: React.ReactNode;
  delay: number;
}

const StatItem = ({ value, label, icon, delay }: StatItemProps) => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center p-6 md:p-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
    >
      <div className="mb-4 text-[#C8A97E]">
        {icon}
      </div>
      <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">{value}</h3>
      <p className="text-sm md:text-base text-gray-400 uppercase tracking-wider text-center">{label}</p>
    </motion.div>
  );
};

export default function StatsSection() {
  return (
    <div className="w-full bg-black py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StatItem 
            value="15+" 
            label="Jahre Erfahrung" 
            icon={<Music size={40} strokeWidth={1.5} />} 
            delay={0.1} 
          />
          <StatItem 
            value="500+" 
            label="Studenten unterrichtet" 
            icon={<Users size={40} strokeWidth={1.5} />} 
            delay={0.2} 
          />
          <StatItem 
            value="100+" 
            label="Live Auftritte" 
            icon={<Mic2 size={40} strokeWidth={1.5} />} 
            delay={0.3} 
          />
        </div>
      </div>
    </div>
  );
} 
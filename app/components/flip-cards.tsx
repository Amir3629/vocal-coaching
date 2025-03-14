"use client";

import React from 'react';
import { motion } from 'framer-motion';

type FlipCardProps = {
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  symbol: string;
};

const FlipCard: React.FC<FlipCardProps> = ({ title, subtitle, description, icon, symbol }) => {
  return (
    <div className="perspective-1000 w-full h-full">
      <motion.div 
        className="relative w-full aspect-square bg-[#0A0A0A] rounded-lg border border-[#1A1A1A] overflow-hidden transform-style-3d transition-transform duration-700 cursor-pointer"
        whileHover={{ rotateY: 180 }}
        initial={{ rotateY: 0 }}
      >
        {/* Front side */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 backface-hidden">
          <div className="text-[#C8A97E] mb-6 text-4xl">
            {icon}
          </div>
          <h3 className="text-white text-xl font-medium text-center mb-2">{title}</h3>
          <p className="text-[#C8A97E] text-sm text-center">{subtitle}</p>
        </div>
        
        {/* Back side */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 backface-hidden transform rotate-y-180 bg-[#0A0A0A]">
          <p className="text-gray-400 text-center text-xs italic mb-4">{description}</p>
          <div className="text-[#C8A97E] text-2xl mt-4">
            {symbol}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const FlipCards: React.FC = () => {
  return (
    <div className="w-full py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <FlipCard
            title="Der Angst-Buster"
            subtitle="Deine Stimme ist nicht kaputt"
            description="(Umdrehen, um deine stimmlichen Dämonen zu entwaffnen)"
            icon="🎭"
            symbol="🛡️"
          />
          
          <FlipCard
            title="Der Anfänger-Kompass"
            subtitle="Spoiler: Nicht mit Tonleitern"
            description="(Umdrehen für dein stimmliches GPS)"
            icon="🧭"
            symbol="🗺️"
          />
          
          <FlipCard
            title="Das Fortschritts-Paradox"
            subtitle="Deine Stimme ist klüger als Methoden"
            description="(Umdrehen, um dein nächstes Level zu hacken)"
            icon="🌀"
            symbol="⚖️"
          />
          
          <FlipCard
            title="Die unausgesprochenen Regeln"
            subtitle="Die 4-Uhr-Wahrheiten des stimmlichen Erfolgs"
            description="(Umdrehen für Insider-Flüstern)"
            icon="🤫"
            symbol="📜"
          />
        </div>
      </div>
    </div>
  );
};

export default FlipCards; 
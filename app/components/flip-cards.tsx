"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

type FlipCardProps = {
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  icon: string;
  symbol: string;
};

const FlipCard: React.FC<FlipCardProps> = ({ title, subtitle, description, details, icon, symbol }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="perspective-1000 w-full h-full"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div 
        className="relative w-full aspect-square bg-[#0A0A0A] rounded-lg border border-[#1A1A1A] overflow-hidden transform-style-3d transition-transform duration-500 cursor-pointer"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        initial={{ rotateY: 0 }}
        transition={{ type: "tween", duration: 0.4 }}
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
          <ul className="text-gray-300 text-sm space-y-2 w-full">
            {details.map((detail, index) => (
              <li key={index} className="flex items-start">
                <span className="text-[#C8A97E] mr-2">{index === 0 ? '✦' : index === 1 ? '✅' : index === 2 ? '⚡' : '💡'}</span>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
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
            details={[
              "Geheimnis #1: Dieser seltsame Ton? Das ist deine Goldmine (frag Janis Joplin)",
              "Geheimnis #2: 93% der Profis bekommen immer noch Lampenfieber vor dem Unterricht",
              "Geheimnis #3: Dein schwaches Register ist nur ein Stil, der darauf wartet zu entstehen",
              "Berlin Bonus: Meine No-Judgment Studio Garantie"
            ]}
            icon="🎭"
            symbol="🛡️"
          />
          
          <FlipCard
            title="Der Anfänger-Kompass"
            subtitle="Spoiler: Nicht mit Tonleitern"
            description="(Umdrehen für dein stimmliches GPS)"
            details={[
              "Schritt 0: Finde deinen tatsächlichen Stimmumfang (Hinweis: er ist größer als du denkst)",
              "Schritt 1: Baue dein stimmliches Bankkonto mit sicheren Techniken auf",
              "Schritt 2: Stehle wie ein Künstler (ethisches Plagiatsframework)",
              "Schritt 3: Scheitere glorreich in meinem schallisolierten Studio"
            ]}
            icon="🧭"
            symbol="🗺️"
          />
          
          <FlipCard
            title="Das Fortschritts-Paradox"
            subtitle="Deine Stimme ist klüger als Methoden"
            description="(Umdrehen, um dein nächstes Level zu hacken)"
            details={[
              "Falle 1: Idole nachahmen ≠ deinen eigenen Sound finden",
              "Falle 2: Überkorrekturen an dem, was bereits funktioniert",
              "Falle 3: Üben ≠ gedankenloses Wiederholen",
              "CVT-Lösung: Meine 3D-Stimmanalyse-Diagnostik (Berlin-exklusiv)"
            ]}
            icon="🌀"
            symbol="⚖️"
          />
          
          <FlipCard
            title="Die unausgesprochenen Regeln"
            subtitle="Die 4-Uhr-Wahrheiten des stimmlichen Erfolgs"
            description="(Umdrehen für Insider-Flüstern)"
            details={[
              "Regel 1: Dein Kehlkopf-Chakra ≠ dein Wert",
              "Regel 2: Die meisten Übernacht-Erfolge brauchten 7+ Jahre",
              "Regel 3: Networking > Perfektes hohes C",
              "Regel 4: Berlins Szene läuft auf dieser versteckten Fähigkeit..."
            ]}
            icon="🤫"
            symbol="📜"
          />
        </div>
      </div>
    </div>
  );
};

export default FlipCards; 
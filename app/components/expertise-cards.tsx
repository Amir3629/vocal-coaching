"use client"

import React from 'react';
import { motion } from 'framer-motion';

interface ExpertiseCardProps {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  symbol: string;
}

const ExpertiseCard: React.FC<ExpertiseCardProps> = ({ title, subtitle, description, icon, symbol }) => {
  // Extract list items from description based on their markers
  const getListItems = () => {
    const items = [];
    
    // Process items with ✅ marker
    const checkItems = description.split('✅').slice(1);
    for (let i = 0; i < checkItems.length; i++) {
      items.push({
        marker: '✅',
        text: checkItems[i].trim()
      });
    }
    
    // Process items with ✦ marker
    const starItems = description.split('✦').slice(1);
    for (let i = 0; i < starItems.length; i++) {
      items.push({
        marker: '✦',
        text: starItems[i].trim()
      });
    }
    
    // Process items with ⚡ marker
    const boltItems = description.split('⚡').slice(1);
    for (let i = 0; i < boltItems.length; i++) {
      items.push({
        marker: '⚡',
        text: boltItems[i].trim()
      });
    }
    
    // Process items with 💡 marker
    const bulbItems = description.split('💡').slice(1);
    for (let i = 0; i < bulbItems.length; i++) {
      items.push({
        marker: '💡',
        text: bulbItems[i].trim()
      });
    }
    
    return items;
  };
  
  // Get the description intro (text before any marker)
  const getDescriptionIntro = () => {
    const firstMarkerIndex = Math.min(
      description.indexOf('✅') !== -1 ? description.indexOf('✅') : Infinity,
      description.indexOf('✦') !== -1 ? description.indexOf('✦') : Infinity,
      description.indexOf('⚡') !== -1 ? description.indexOf('⚡') : Infinity,
      description.indexOf('💡') !== -1 ? description.indexOf('💡') : Infinity
    );
    
    return firstMarkerIndex !== Infinity 
      ? description.substring(0, firstMarkerIndex).trim() 
      : description;
  };

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
          <p className="text-gray-400 text-center text-xs italic mb-4">{getDescriptionIntro()}</p>
          <ul className="text-gray-300 text-sm space-y-2 w-full">
            {getListItems().map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-[#C8A97E] mr-2">{item.marker}</span>
                <span>{item.text}</span>
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

export default function ExpertiseCards() {
  return (
    <div className="w-full py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ExpertiseCard
            title="Der Angst-Buster"
            subtitle="Deine Stimme ist nicht kaputt"
            description="(Umdrehen, um deine stimmlichen Dämonen zu entwaffnen)
            ✦ Geheimnis #1: Dieser „seltsame" Ton? Das ist deine Goldmine (frag Janis Joplin)
            ✦ Geheimnis #2: 93% der Profis bekommen immer noch Lampenfieber vor dem Unterricht
            ✦ Geheimnis #3: Dein „schwaches" Register ist nur ein Stil, der darauf wartet zu entstehen
            ✦ Berlin Bonus: Meine No-Judgment Studio Garantie™"
            icon="🎭"
            symbol="🛡️"
          />
          
          <ExpertiseCard
            title="Der Anfänger-Kompass"
            subtitle="Spoiler: Nicht mit Tonleitern"
            description="(Umdrehen für dein stimmliches GPS)
            ✅ Schritt 0: Finde deinen tatsächlichen Stimmumfang (Hinweis: er ist größer als du denkst)
            ✅ Schritt 1: Baue dein „stimmliches Bankkonto" mit sicheren Techniken auf
            ✅ Schritt 2: Stehle wie ein Künstler (ethisches Plagiatsframework)
            ✅ Schritt 3: Scheitere glorreich in meinem schallisolierten Studio"
            icon="🧭"
            symbol="🗺️"
          />
          
          <ExpertiseCard
            title="Das Fortschritts-Paradox"
            subtitle="Deine Stimme ist klüger als Methoden"
            description="(Umdrehen, um dein nächstes Level zu hacken)
            ⚡ Falle 1: Idole nachahmen ≠ deinen eigenen Sound finden
            ⚡ Falle 2: Überkorrekturen an dem, was bereits funktioniert
            ⚡ Falle 3: Üben ≠ gedankenloses Wiederholen
            ⚡ CVT-Lösung: Meine 3D-Stimmanalyse-Diagnostik (Berlin-exklusiv)"
            icon="🌀"
            symbol="⚖️"
          />
          
          <ExpertiseCard
            title="Die unausgesprochenen Regeln"
            subtitle="Die 4-Uhr-Wahrheiten des stimmlichen Erfolgs"
            description="(Umdrehen für Insider-Flüstern)
            💡 Regel 1: Dein Kehlkopf-Chakra ≠ dein Wert
            💡 Regel 2: Die meisten „Übernacht-Erfolge" brauchten 7+ Jahre
            💡 Regel 3: Networking > Perfektes hohes C
            💡 Regel 4: Berlins Szene läuft auf dieser versteckten Fähigkeit..."
            icon="🤫"
            symbol="📜"
          />
        </div>
      </div>
    </div>
  );
} 
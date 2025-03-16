"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaMusic, FaMicrophone, FaStar, FaMagic } from 'react-icons/fa';

interface FlipCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  backContent: string;
  funFact?: string;
}

const FlipCard: React.FC<FlipCardProps> = ({ 
  title, 
  description, 
  icon,
  backContent,
  funFact
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div 
      className="w-full h-full"
      style={{ perspective: "1000px" }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div 
        className="relative w-full aspect-square bg-[#0A0A0A] rounded-lg border border-[#1A1A1A] overflow-hidden cursor-pointer"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        initial={{ rotateY: 0 }}
        transition={{ type: "tween", duration: 0.8 }}
      >
        {/* Front side */}
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center p-6"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="text-[#C8A97E] mb-6 text-4xl">
            {icon}
          </div>
          <h3 className="text-white text-xl font-medium text-center mb-2">{title}</h3>
          <p className="text-[#C8A97E] text-sm text-center">{description}</p>
        </div>

        {/* Back side */}
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-[#0A0A0A]"
          style={{ 
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg) rotateZ(180deg)"
          }}
        >
          <p className="text-gray-300 text-center text-sm mb-4">{backContent}</p>
          
          {funFact && (
            <div className="mt-4 w-full">
              <p className="text-[#C8A97E] text-xs font-bold">Wusstest du schon?</p>
              <p className="text-gray-300 text-xs">{funFact}</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const FlipCards: React.FC = () => {
  return (
    <div className="w-full py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl text-center text-white mb-10">Faszinierend & Musikalisch</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <FlipCard 
            title="Deine Stimme, Verstärkt"
            description="Entdecke dein volles Potenzial"
            icon={<FaMicrophone />}
            backContent="Die menschliche Stimme kann über 100 Instrumente imitieren. Lerne, deine für Konzerte, Studioaufnahmen oder intime Jazz-Auftritte zu nutzen."
          />
          
          <FlipCard 
            title="Das Geheimnis des Jazz-Flüsterers"
            description="Spoiler: Nicht mit Tonleitern"
            icon={<FaMusic />}
            backContent="Ella Fitzgerald sagte einmal, Jazz sei 'die einzige ungeplante Magie der Welt.' Beherrsche die Kunst der Improvisation und verwandle 'Fehler' in Soli."
          />
          
          <FlipCard 
            title="Bühnenphysik 101"
            description="Deine Stimme ist klüger als Methoden"
            icon={<FaStar />}
            backContent="90% der Bühnenpräsenz ist nicht deine Stimme—es ist Atemkontrolle, Augenkontakt und die Pause zwischen den Noten. Beherrsche Räume wie ein Profi."
            funFact="Nein, du brauchst kein 'natürliches Talent'—nur intelligentes Üben."
          />
          
          <FlipCard 
            title="Stimmliche Alchemie"
            description="Die 4-Uhr-Wahrheiten des stimmlichen Erfolgs"
            icon={<FaMagic />}
            backContent="Verwandle Flüstern in Kraft, Brüche in Charakter. Deine einzigartigen Makel? Sie sind deine Signatur. Lass uns sie verfeinern."
            funFact="Rockstars wie Freddie Mercury nutzten stimmliche 'Unvollkommenheiten' als Markenzeichen!"
          />
        </div>
      </div>
    </div>
  );
};

export default FlipCards; 
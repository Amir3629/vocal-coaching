"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    id: 1,
    name: "Sarah M.",
    role: "Jazz-Sängerin",
    content:
      "Melanies Unterricht hat meine Herangehensweise an den Jazzgesang komplett verändert. Ihre Techniken für Improvisation und Stimmkontrolle waren unglaublich wertvoll für meine Auftritte.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah&backgroundColor=b69a6e&accessories=kurt,prescription02&top=shortHair,longHair&clothingColor=b69a6e"
  },
  {
    id: 2,
    name: "Michael K.",
    role: "Musikstudent",
    content:
      "Als Anfänger war ich nervös, Gesangsunterricht zu nehmen, aber Melanie schaffte eine so unterstützende Atmosphäre. Ihre Geduld und Expertise halfen mir, schnell Selbstvertrauen aufzubauen.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael&backgroundColor=b69a6e&accessories=round&top=shortHair&clothingColor=b69a6e"
  },
  {
    id: 3,
    name: "Elena R.",
    role: "Professionelle Sängerin",
    content:
      "Melanies Coaching geht über die Technik hinaus. Sie half mir, meine eigene Stimme und meinen Stil zu finden, was für meine Karriereentwicklung in der Berliner Jazzszene entscheidend war.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=elena&backgroundColor=b69a6e&accessories=prescription02&top=longHair&clothingColor=b69a6e"
  },
  {
    id: 4,
    name: "Emily W.",
    role: "Jazz Vocalist",
    content: "Coming from London, I was thrilled to find such an exceptional vocal coach in Berlin. Melanie's approach to jazz vocals is both technical and intuitive, helping me develop my own unique style.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily&backgroundColor=b69a6e&accessories=round&top=longHair&clothingColor=b69a6e"
  },
  {
    id: 5,
    name: "Thomas H.",
    role: "Hobby-Sänger",
    content: "Der Unterricht bei Melanie hat mir nicht nur gesanglich, sondern auch musikalisch völlig neue Perspektiven eröffnet. Ihre Methodik ist präzise und gleichzeitig sehr inspirierend.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=thomas&backgroundColor=b69a6e&accessories=prescription01&top=shortHair&clothingColor=b69a6e"
  },
  {
    id: 6,
    name: "Julia B.",
    role: "Musikstudentin",
    content: "Durch Melanies Coaching habe ich gelernt, meine Stimme richtig einzusetzen. Ihre Expertise in der Jazztechnik ist beeindruckend und ihre Lehrmethoden sind sehr effektiv.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=julia&backgroundColor=b69a6e&accessories=kurt&top=longHair&clothingColor=b69a6e"
  },
  {
    id: 7,
    name: "David S.",
    text: "Als Anfänger war ich zunächst skeptisch, aber Melanie hat es geschafft, meine Begeisterung für Jazz zu wecken. Ihre geduldige Art und ihr strukturierter Unterricht sind goldwert.",
    image: process.env.NODE_ENV === 'production'
      ? '/vocal-coaching/images/testimonials/david.jpg'
      : '/images/testimonials/david.jpg'
  },
  {
    id: 8,
    name: "James R.",
    text: "Melanie's teaching style is truly transformative. Her deep understanding of jazz and vocal techniques, combined with her ability to communicate effectively, makes her an outstanding coach.",
    image: process.env.NODE_ENV === 'production'
      ? '/vocal-coaching/images/testimonials/james.jpg'
      : '/images/testimonials/james.jpg'
  },
  {
    id: 9,
    name: "Anna L.",
    text: "Die Atmosphäre in Melanies Unterricht ist einzigartig. Sie schafft es, eine perfekte Balance zwischen technischer Präzision und künstlerischer Freiheit zu finden.",
    image: process.env.NODE_ENV === 'production'
      ? '/vocal-coaching/images/testimonials/anna.jpg'
      : '/images/testimonials/anna.jpg'
  }
]

export default function TestimonialSlider() {
  const [page, setPage] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        paginate(1);
      }, 5000); // Changed to 5000ms (5 seconds)
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9
    })
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setPage((prevPage) => {
      let nextPage = prevPage + newDirection;
      if (nextPage < 0) nextPage = testimonials.length - 1;
      if (nextPage >= testimonials.length) nextPage = 0;
      return nextPage;
    });
  };

  // Get the current testimonial safely
  const currentTestimonial = testimonials[Math.abs(page % testimonials.length)];

  return (
    <div 
      className="relative w-full max-w-4xl mx-auto overflow-hidden px-4 md:px-8"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="container mx-auto">
        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence initial={false} custom={page} mode="wait">
            <motion.div
              key={page}
              custom={page}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 200, damping: 25 },
                opacity: { duration: 0.5 },
                scale: { duration: 0.5 }
              }}
              className="relative"
            >
              <div className="bg-black rounded-2xl p-4 sm:p-8 md:p-12 transition-all duration-300 border border-[#C8A97E]/10">
                <div className="flex flex-col items-center text-center">
                  <div className="aspect-square w-16 sm:w-20 h-16 sm:h-20 rounded-full overflow-hidden bg-gradient-to-br from-[#C8A97E] to-[#B69A6E] p-0.5 mb-4 sm:mb-6">
                    <div className="w-full h-full rounded-full overflow-hidden bg-black">
                      <img
                        src={currentTestimonial.image}
                        alt={currentTestimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="max-w-2xl mx-auto">
                    <p className="text-gray-300 text-base sm:text-lg md:text-xl italic mb-4 sm:mb-6">
                      "{currentTestimonial.content}"
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
                      <span className="hidden sm:block w-8 h-[1px] bg-[#C8A97E]/50"></span>
                      <div className="text-center">
                        <p className="text-[#C8A97E] font-medium">{currentTestimonial.name}</p>
                        <p className="text-sm text-gray-400">{currentTestimonial.role}</p>
                      </div>
                      <span className="hidden sm:block w-8 h-[1px] bg-[#C8A97E]/50"></span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Container */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Desktop Navigation */}
            <div className="hidden md:block h-full">
              <div className="absolute top-1/2 -translate-y-1/2 -left-4 sm:-left-16">
                <button
                  onClick={() => paginate(-1)}
                  className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-[#0A0A0A]/80 border border-[#C8A97E]/20 flex items-center justify-center text-white/80 pointer-events-auto hover:bg-[#0A0A0A] hover:border-[#C8A97E]/40 transition-all"
                >
                  <ChevronLeft className="w-5 sm:w-6 h-5 sm:h-6" />
                </button>
              </div>

              <div className="absolute top-1/2 -translate-y-1/2 -right-4 sm:-right-16">
                <button
                  onClick={() => paginate(1)}
                  className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-[#0A0A0A]/80 border border-[#C8A97E]/20 flex items-center justify-center text-white/80 pointer-events-auto hover:bg-[#0A0A0A] hover:border-[#C8A97E]/40 transition-all"
                >
                  <ChevronRight className="w-5 sm:w-6 h-5 sm:h-6" />
                </button>
              </div>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden absolute inset-x-0 bottom-0 flex justify-center gap-2 mt-4">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setPage(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 pointer-events-auto ${
                    index === page ? "bg-[#C8A97E]" : "bg-gray-600"
                  }`}
                >
                  <span className="sr-only">Go to slide {index + 1}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
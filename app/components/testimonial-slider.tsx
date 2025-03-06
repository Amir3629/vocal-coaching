"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    id: 1,
    name: "Sarah M.",
    text: "Melanies Unterricht hat meine Stimme komplett transformiert. Ihre technischen Einblicke und ihre Fähigkeit, komplexe Konzepte einfach zu erklären, sind unübertroffen.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=388&h=388&fit=crop"
  },
  {
    id: 2,
    name: "Michael K.",
    text: "Als Jazz-Enthusiast suchte ich lange nach der richtigen Lehrerin. Melanie versteht es perfekt, die Essenz des Jazz-Gesangs zu vermitteln und dabei individuell auf jeden Schüler einzugehen.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=388&h=388&fit=crop"
  },
  {
    id: 3,
    name: "Lisa R.",
    text: "Die Stunden bei Melanie sind der Höhepunkt meiner Woche. Ihre positive Energie und ihr umfangreiches Wissen machen jeden Unterricht zu einem inspirierenden Erlebnis.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=388&h=388&fit=crop"
  },
  {
    id: 4,
    name: "Emily W.",
    text: "Coming from London, I was thrilled to find such an exceptional vocal coach in Berlin. Melanie's approach to jazz vocals is both technical and intuitive, helping me develop my own unique style.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=388&h=388&fit=crop"
  },
  {
    id: 5,
    name: "Thomas H.",
    text: "Der Unterricht bei Melanie hat mir nicht nur gesanglich, sondern auch musikalisch völlig neue Perspektiven eröffnet. Ihre Methodik ist präzise und gleichzeitig sehr inspirierend.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=388&h=388&fit=crop"
  },
  {
    id: 6,
    name: "Julia B.",
    text: "Durch Melanies Coaching habe ich gelernt, meine Stimme richtig einzusetzen. Ihre Expertise in der Jazztechnik ist beeindruckend und ihre Lehrmethoden sind sehr effektiv.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=388&h=388&fit=crop"
  },
  {
    id: 7,
    name: "David S.",
    text: "Als Anfänger war ich zunächst skeptisch, aber Melanie hat es geschafft, meine Begeisterung für Jazz zu wecken. Ihre geduldige Art und ihr strukturierter Unterricht sind goldwert.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=388&h=388&fit=crop"
  },
  {
    id: 8,
    name: "James R.",
    text: "Melanie's teaching style is truly transformative. Her deep understanding of jazz and vocal techniques, combined with her ability to communicate effectively, makes her an outstanding coach.",
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=388&h=388&fit=crop"
  },
  {
    id: 9,
    name: "Anna L.",
    text: "Die Atmosphäre in Melanies Unterricht ist einzigartig. Sie schafft es, eine perfekte Balance zwischen technischer Präzision und künstlerischer Freiheit zu finden.",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=388&h=388&fit=crop"
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
      className="relative w-full max-w-4xl mx-auto overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="container mx-auto px-4">
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
              <div className="bg-black rounded-2xl p-8 md:p-12 transition-all duration-300 border border-[#C8A97E]/10">
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-32 h-32 mb-8">
                    <div className="absolute inset-0 bg-gradient-radial from-[#C8A97E]/20 to-transparent rounded-full blur-2xl"></div>
                    <Image
                      src={currentTestimonial.image}
                      alt={currentTestimonial.name}
                      fill
                      className="object-cover rounded-full ring-2 ring-[#C8A97E]/20"
                    />
                  </div>
                  <div className="max-w-2xl mx-auto">
                    <p className="text-gray-300 text-lg md:text-xl italic mb-6">
                      "{currentTestimonial.text}"
                    </p>
                    <div className="flex items-center justify-center gap-3">
                      <span className="w-8 h-[1px] bg-[#C8A97E]/50"></span>
                      <p className="text-[#C8A97E] font-medium">
                        {currentTestimonial.name}
                      </p>
                      <span className="w-8 h-[1px] bg-[#C8A97E]/50"></span>
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
              <div className="absolute top-1/2 -translate-y-1/2 -left-16">
                <button
                  onClick={() => paginate(-1)}
                  className="w-12 h-12 rounded-full bg-[#0A0A0A]/80 border border-[#C8A97E]/20 flex items-center justify-center text-white/80 pointer-events-auto"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              </div>

              <div className="absolute top-1/2 -translate-y-1/2 -right-16">
                <button
                  onClick={() => paginate(1)}
                  className="w-12 h-12 rounded-full bg-[#0A0A0A]/80 border border-[#C8A97E]/20 flex items-center justify-center text-white/80 pointer-events-auto"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4">
              <button
                onClick={() => paginate(-1)}
                className="w-10 h-10 rounded-full bg-[#0A0A0A]/80 border border-[#C8A97E]/20 flex items-center justify-center text-white/80 pointer-events-auto"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => paginate(1)}
                className="w-10 h-10 rounded-full bg-[#0A0A0A]/80 border border-[#C8A97E]/20 flex items-center justify-center text-white/80 pointer-events-auto"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
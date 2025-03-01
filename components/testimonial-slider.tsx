"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    id: 1,
    name: "Sarah M.",
    role: "Jazz-Sängerin",
    content:
      "Melanies Unterricht hat meine Herangehensweise an den Jazzgesang komplett verändert. Ihre Techniken für Improvisation und Stimmkontrolle waren unglaublich wertvoll für meine Auftritte.",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Michael K.",
    role: "Musikstudent",
    content:
      "Als Anfänger war ich nervös, Gesangsunterricht zu nehmen, aber Melanie schaffte eine so unterstützende Atmosphäre. Ihre Geduld und Expertise halfen mir, schnell Selbstvertrauen aufzubauen.",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Elena R.",
    role: "Professionelle Sängerin",
    content:
      "Melanies Coaching geht über die Technik hinaus. Sie half mir, meine eigene Stimme und meinen Stil zu finden, was für meine Karriereentwicklung in der Berliner Jazzszene entscheidend war.",
    image: "/placeholder.svg?height=100&width=100",
  },
]

export default function TestimonialSlider() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  const paginate = useCallback(
    (newDirection: number) => {
      setDirection(newDirection)
      setCurrent((current + newDirection + testimonials.length) % testimonials.length)
    },
    [current],
  )

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1)
    }, 8000)
    return () => clearInterval(timer)
  }, [paginate])

  return (
    <div className="relative max-w-4xl mx-auto px-4">
      <div className="relative h-[400px] overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x)

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1)
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1)
              }
            }}
            className="absolute w-full"
          >
            <div className="bg-[#1a1a1a] rounded-xl p-8 md:p-12 shadow-xl border border-gray-800">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full overflow-hidden mb-6 border-2 border-amber-600">
                  <img
                    src={testimonials[current].image || "/placeholder.svg"}
                    alt={testimonials[current].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-lg md:text-xl text-gray-300 mb-6 italic">"{testimonials[current].content}"</p>
                <div>
                  <h4 className="text-xl font-semibold">{testimonials[current].name}</h4>
                  <p className="text-amber-600">{testimonials[current].role}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center mt-8 gap-4">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full border-gray-700 text-white hover:bg-gray-800"
          onClick={() => paginate(-1)}
        >
          <ChevronLeft className="h-6 w-6" />
          <span className="sr-only">Previous testimonial</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full border-gray-700 text-white hover:bg-gray-800"
          onClick={() => paginate(1)}
        >
          <ChevronRight className="h-6 w-6" />
          <span className="sr-only">Next testimonial</span>
        </Button>
      </div>

      <div className="flex justify-center mt-4 gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > current ? 1 : -1)
              setCurrent(index)
            }}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              index === current ? "bg-amber-600" : "bg-gray-600"
            }`}
          >
            <span className="sr-only">Go to slide {index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  )
}


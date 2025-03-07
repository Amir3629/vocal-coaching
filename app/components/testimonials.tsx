"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

const testimonials = [
  {
    id: 1,
    name: "Sarah M.",
    role: "Musikstudentin",
    image: "/images/testimonials/sarah.jpg",
    text: "Melanie ist eine außergewöhnliche Gesangslehrerin. Ihre Methodik hat mir geholfen, meine Stimme auf ein neues Level zu bringen. Besonders die Atemtechnik und Stimmkontrolle haben sich stark verbessert."
  },
  {
    id: 2,
    name: "Thomas K.",
    role: "Hobby-Sänger",
    image: "/images/testimonials/thomas.jpg",
    text: "Die Jazz-Improvisationskurse sind fantastisch. Ich habe nicht nur technisch dazugelernt, sondern auch meine kreative Seite entdeckt. Melanies Begeisterung für Musik ist ansteckend!"
  },
  {
    id: 3,
    name: "Lisa B.",
    role: "Professionelle Sängerin",
    image: "/images/testimonials/lisa.jpg",
    text: "Das Aufführungscoaching hat mir sehr geholfen, meine Bühnenangst zu überwinden. Melanie versteht es, individuell auf jeden Schüler einzugehen und die richtigen Techniken zu vermitteln."
  },
  {
    id: 4,
    name: "Michael R.",
    role: "Band-Mitglied",
    image: "/images/testimonials/michael.jpg",
    text: "Die Kombination aus Piano und Gesang ist genau das, was ich gesucht habe. Melanie's ganzheitlicher Ansatz hat mir geholfen, beide Bereiche besser zu koordinieren."
  },
  {
    id: 5,
    name: "Julia W.",
    role: "Anfängerin",
    image: "/images/testimonials/julia.jpg",
    text: "Als absolute Anfängerin war ich erst unsicher, aber Melanie hat mir die Angst genommen. Ihre geduldige Art und strukturierte Herangehensweise sind perfekt für Einsteiger."
  }
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  return (
    <section className="py-20 bg-[#080505]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
            Was meine Schüler sagen
          </h2>
          <div className="w-20 h-0.5 bg-[#C8A97E] mx-auto"></div>
        </motion.div>

        <div className="relative w-full max-w-4xl mx-auto px-4">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0 px-4 sm:px-6"
                >
                  <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 sm:p-8">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-start gap-4">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden">
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium">{testimonial.name}</h3>
                          <p className="text-sm text-gray-400">{testimonial.role}</p>
                        </div>
                      </div>
                      <p className="text-base leading-relaxed">{testimonial.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            <button
              onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-50"
              disabled={currentIndex === 0}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentIndex(Math.min(testimonials.length - 1, currentIndex + 1))}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-50"
              disabled={currentIndex === testimonials.length - 1}
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
} 
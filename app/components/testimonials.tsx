"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Star } from "lucide-react"
import TranslatedText from "./translated-text"

const testimonials = [
  {
    id: 1,
    name: "Anna Schmidt",
    role: <TranslatedText text="Sängerin" />,
    image: process.env.NODE_ENV === 'production' ? "/vocal-coaching/images/testimonials/anna.jpg" : "/images/testimonials/anna.jpg",
    content: <TranslatedText text="Mel ist eine außergewöhnliche Gesangslehrerin. Ihre Methodik und ihr Verständnis für die individuelle Stimme haben mir geholfen, meine stimmlichen Fähigkeiten auf ein neues Level zu bringen." />,
    rating: 5
  },
  {
    id: 2,
    name: "Lisa Weber",
    role: <TranslatedText text="Hobby-Sängerin" />,
    image: process.env.NODE_ENV === 'production' ? "/vocal-coaching/images/testimonials/lisa.jpg" : "/images/testimonials/lisa.jpg",
    content: <TranslatedText text="Der Unterricht bei Mel macht nicht nur Spaß, sondern ist auch sehr effektiv. Ihre positive Art und ihr professionelles Feedback haben mir geholfen, meine Ängste zu überwinden." />,
    rating: 5
  },
  {
    id: 3,
    name: "Thomas Müller",
    role: <TranslatedText text="Band-Sänger" />,
    image: process.env.NODE_ENV === 'production' ? "/vocal-coaching/images/testimonials/thomas.jpg" : "/images/testimonials/thomas.jpg",
    content: <TranslatedText text="Als Frontmann einer Band war es wichtig für mich, meine Stimme zu schonen und gleichzeitig kraftvoll zu sein. Mel hat mir genau dabei geholfen." />,
    rating: 5
  }
]

export default function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)

  return (
    <div className="relative py-16">
      <div className="text-center mb-16">
        <h2 className="section-heading mb-4">
          <TranslatedText text="Was andere sagen" />
        </h2>
        <div className="w-24 h-0.5 bg-[#C8A97E] mx-auto opacity-80"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/5"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-white font-medium">{testimonial.name}</h3>
                  <p className="text-[#C8A97E] text-sm">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-[#C8A97E] fill-[#C8A97E]"
                  />
                ))}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                {testimonial.content}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
} 
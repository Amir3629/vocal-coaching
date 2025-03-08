"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Playfair_Display } from "next/font/google"

const playfair = Playfair_Display({ subsets: ["latin"] })

export default function AboutSection() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [imageError, setImageError] = useState(false)

  const imagePath = process.env.NODE_ENV === 'production'
    ? "/vocal-coaching/images/about/melanie.jpg"
    : "/images/about/melanie.jpg"

  const placeholderPath = process.env.NODE_ENV === 'production'
    ? "/vocal-coaching/images/about/placeholder.svg"
    : "/images/about/placeholder.svg"

  return (
    <section className="py-20 bg-[#040202]">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative aspect-[3/4] w-full max-w-md mx-auto lg:max-w-none">
            <Image
              src={imageError ? placeholderPath : imagePath}
              alt="Melanie Wainwright"
              fill
              className="object-cover rounded-xl"
              sizes="(max-width: 768px) 90vw, 45vw"
              priority
              onError={() => {
                console.error('Error loading about image:', imagePath);
                setImageError(true);
              }}
            />
            {imageError && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#040202]/80 text-[#C8A97E]">
                <p className="text-center px-4">Bild konnte nicht geladen werden</p>
              </div>
            )}
          </div>

          <div className="max-w-xl mx-auto lg:mx-0">
            <h2 className={`${playfair.className} text-3xl md:text-4xl font-light text-white mb-4`}>
              Über Mich
            </h2>

            <div className="space-y-4">
              <p className="text-base sm:text-lg text-gray-300">
                Halb Britin, halb Deutsche - und 100%ige Rheinländerin lebe ich freiwillig in Berlin. Meine musikalische Reise begann früh: vom Kinderchor über den Gospelchor "Crescendo" bis hin zu "Die Männer", einer der ersten Girl Bands in Deutschland. Die Entdeckung von Ella Fitzgerald's "Airmail Special" öffnete mir die Tür zur Welt des Jazz - eine Liebe auf den ersten Blick.
              </p>
              <p className="text-base sm:text-lg text-gray-300">
                Meine Ausbildung führte mich über die Hochschule für Musik und Tanz Köln bis hin zum renommierten Berklee College of Music in Boston. Dort studierte ich unter anderem bei Maggie Scott, der Mentorin von Diana Krall.
              </p>
            </div>

            <div className="mt-8">
              <Button variant="outline" size="lg" className="text-[#C8A97E] border-[#C8A97E] hover:bg-[#C8A97E] hover:text-black">
                Mehr erfahren
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 
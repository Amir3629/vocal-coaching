"use client"

import Image from "next/image"
import { Music, Mic2, BookOpen, Trophy } from "lucide-react"

const journeyData = [
  {
    title: "Singen",
    subtitle: "Gesangsunterricht",
    icon: Music,
    image: "singing.jpg",
    items: [
      "Stimmbildung und Atemtechnik",
      "Repertoire-Aufbau",
      "Interpretation und Ausdruck",
      "Mikrofontechnik",
      "Bühnenpräsenz"
    ]
  },
  {
    title: "Sprechen",
    subtitle: "Sprechtraining",
    icon: Mic2,
    image: "speaking.jpg",
    items: [
      "Artikulation",
      "Resonanz",
      "Sprachmelodie",
      "Atmung",
      "Textarbeit"
    ]
  },
  {
    title: "Lernen",
    subtitle: "Musiktheorie",
    icon: BookOpen,
    image: "learning.jpg",
    items: [
      "Grundlagen der Musiktheorie",
      "Rhythmus und Timing",
      "Gehörbildung",
      "Harmonielehre",
      "Notenlesen"
    ]
  },
  {
    title: "Erfolg",
    subtitle: "Zertifizierung",
    icon: Trophy,
    image: "success.jpg",
    items: [
      "Prüfungsvorbereitung",
      "Auftrittstraining",
      "Feedback und Evaluation",
      "Zertifikatsabschluss",
      "Weiterbildung"
    ]
  }
]

export default function JourneyShowcase() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {journeyData.map((journey, idx) => {
        const Icon = journey.icon
        return (
          <div
            key={idx}
            className="
              relative w-full rounded-xl overflow-hidden
              h-[320px] hover:h-[420px]
              transition-all duration-300 ease-out
              group
            "
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={process.env.NODE_ENV === 'production' ? `/vocal-coaching/images/cards/${journey.image}` : `/images/cards/${journey.image}`}
                alt={journey.title}
                fill
                className="
                  object-cover 
                  scale-100 blur-[8px]
                  group-hover:scale-110 group-hover:blur-none
                  transition-all duration-500
                "
              />
              
              {/* Overlay */}
              <div 
                className="
                  absolute inset-0 
                  bg-gradient-to-b from-black/90 via-black/70 to-black/90
                  opacity-90 group-hover:opacity-50
                  transition-opacity duration-300
                "
              />
            </div>

            {/* Content */}
            <div className="relative h-full p-6 flex flex-col">
              {/* Icon */}
              <div className="
                absolute top-4 left-4
                transform group-hover:scale-110 group-hover:translate-y-1
                transition-transform duration-300
              ">
                <Icon className="w-8 h-8 text-white" />
              </div>

              {/* Text Content */}
              <div className="mt-auto">
                <h3 className="
                  text-2xl font-medium text-white mb-2
                  transform group-hover:scale-110 group-hover:-translate-y-1
                  transition-transform duration-300
                ">
                  {journey.title}
                </h3>
                
                <p className="
                  text-[#C8A97E] text-base mb-3
                  transform group-hover:-translate-y-1
                  transition-transform duration-300
                ">
                  {journey.subtitle}
                </p>

                {/* Expandable Content */}
                <div className="
                  overflow-hidden
                  opacity-0 group-hover:opacity-100
                  translate-y-4 group-hover:translate-y-0
                  transition-all duration-300
                ">
                  <ul className="space-y-2">
                    {journey.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="
                          flex items-center gap-2
                          opacity-0 group-hover:opacity-100
                          -translate-x-4 group-hover:translate-x-0
                          transition-all duration-300
                          group-hover:delay-[var(--delay)]
                        "
                        style={{ '--delay': `${idx * 100}ms` } as any}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-[#C8A97E]" />
                        <span className="text-gray-200 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
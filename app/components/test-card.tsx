import Image from "next/image"
import { Music } from "lucide-react"

export default function TestCard() {
  return (
    <div className="min-h-screen bg-black p-20">
      <div className="max-w-sm mx-auto">
        <div 
          className="
            relative w-full rounded-xl overflow-hidden
            h-[320px] hover:h-[420px]
            transition-all duration-300 ease-out
          "
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={process.env.NODE_ENV === 'production' ? "/vocal-coaching/images/cards/singing.jpg" : "/images/cards/singing.jpg"}
              alt="Test Card"
              fill
              className="
                object-cover 
                scale-100 blur-[8px]
                hover:scale-110 hover:blur-none
                transition-all duration-500
              "
            />
            
            {/* Overlay */}
            <div 
              className="
                absolute inset-0 
                bg-gradient-to-b from-black/90 via-black/70 to-black/90
                opacity-90 hover:opacity-50
                transition-opacity duration-300
              "
            />
          </div>

          {/* Content */}
          <div className="relative h-full p-6 flex flex-col">
            {/* Icon */}
            <div className="
              absolute top-4 left-4
              transform hover:scale-110 hover:translate-y-1
              transition-transform duration-300
            ">
              <Music className="w-8 h-8 text-white" />
            </div>

            {/* Text Content */}
            <div className="mt-auto">
              <h3 className="
                text-2xl font-medium text-white mb-2
                transform hover:scale-110 hover:-translate-y-1
                transition-transform duration-300
              ">
                Test Card
              </h3>
              
              <p className="
                text-[#C8A97E] text-base mb-3
                transform hover:-translate-y-1
                transition-transform duration-300
              ">
                Hover Test
              </p>

              {/* Expandable Content */}
              <div className="
                overflow-hidden
                opacity-0 hover:opacity-100
                translate-y-4 hover:translate-y-0
                transition-all duration-300
              ">
                <p className="text-gray-200 text-sm mb-4">
                  This is a test card to verify hover animations are working correctly.
                </p>
                <ul className="space-y-2">
                  {["Test 1", "Test 2", "Test 3"].map((item, idx) => (
                    <li
                      key={idx}
                      className="
                        flex items-center gap-2
                        opacity-0 hover:opacity-100
                        -translate-x-4 hover:translate-x-0
                        transition-all duration-300
                        hover:delay-[var(--delay)]
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
      </div>
    </div>
  )
} 
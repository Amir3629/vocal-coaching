"use client"

import React from 'react'
import Image from "next/image"

interface Partner {
  name: string
  logo: string
  url?: string
}

const partners: Partner[] = [
  {
    name: "CVT Authorised Teacher",
    logo: process.env.NODE_ENV === 'production' 
      ? "/vocal-coaching/images/collaborations/cvt-teacher.svg"
      : "/images/collaborations/cvt-teacher.svg",
    url: "https://completevocal.institute"
  },
  {
    name: "CVT Deutschland",
    logo: process.env.NODE_ENV === 'production'
      ? "/vocal-coaching/images/collaborations/cvt-deutschland.svg"
      : "/images/collaborations/cvt-deutschland.svg",
    url: "https://cvtdeutschland.de"
  },
  {
    name: "B-Flat Jazz Club",
    logo: process.env.NODE_ENV === 'production'
      ? "/vocal-coaching/images/collaborations/bflat.svg"
      : "/images/collaborations/bflat.svg",
    url: "https://b-flat-berlin.de"
  },
  {
    name: "Jazz Institut Berlin",
    logo: process.env.NODE_ENV === 'production'
      ? "/vocal-coaching/images/collaborations/jib.svg"
      : "/images/collaborations/jib.svg",
    url: "https://www.jazz-institut-berlin.de"
  },
  {
    name: "Berliner Philharmonie",
    logo: process.env.NODE_ENV === 'production'
      ? "/vocal-coaching/images/collaborations/philharmonie.svg"
      : "/images/collaborations/philharmonie.svg",
    url: "https://www.berliner-philharmoniker.de"
  }
]

const PartnerLogos: React.FC = () => {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="relative aspect-[3/2] bg-black/20 rounded-lg p-4 flex items-center justify-center group hover:bg-black/30 transition-colors"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                className="w-full h-auto max-h-16 object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                width={160}
                height={80}
              />
              {partner.url && (
                <a
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0"
                  aria-label={`Visit ${partner.name}`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PartnerLogos 
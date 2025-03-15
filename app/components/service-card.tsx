"use client"

import React, { ReactNode } from "react"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import Image from "next/image"

interface ServiceDetails {
  includes: string[]
  suitable: string[]
  duration: string
  location: string
  price?: string
  link?: string
}

interface ServiceCardProps {
  title: string
  description: string
  icon: ReactNode
  features: string[]
  details: ServiceDetails
  image: string
  delay?: number
}

export default function ServiceCard({
  title,
  description,
  icon,
  features,
  details,
  image,
  delay = 0
}: ServiceCardProps) {
  return (
    <Dialog>
      <motion.div
        className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-[#C8A97E]/30 group"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: delay }}
      >
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className="mr-3 bg-black/30 p-2 rounded-lg">{icon}</div>
            <h3 className="text-xl font-semibold text-white">{title}</h3>
          </div>
          
          <p className="text-gray-300 mb-5 text-sm">{description}</p>
          
          <ul className="space-y-2 mb-6">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <ChevronRight className="w-4 h-4 text-[#C8A97E] mt-1 mr-2 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{feature}</span>
              </li>
            ))}
          </ul>
          
          <DialogTrigger asChild>
            <button className="w-full py-2 px-4 bg-transparent border border-[#C8A97E] text-[#C8A97E] rounded-lg hover:bg-[#C8A97E]/10 transition-all duration-300 text-sm font-medium group-hover:border-[#C8A97E] flex items-center justify-center">
              Mehr Erfahren
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </DialogTrigger>
        </div>
      </motion.div>
      
      <DialogContent className="sm:max-w-[600px] bg-black/95 border-[#C8A97E]/20">
        <div className="relative w-full h-48 mb-6 overflow-hidden rounded-lg">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-4 left-4">
            <h3 className="text-2xl font-bold text-white">{title}</h3>
            <p className="text-[#C8A97E]">{description}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-[#C8A97E] font-medium mb-2">Inklusiv</h4>
            <ul className="space-y-2">
              {details.includes.map((item, index) => (
                <li key={index} className="flex items-start">
                  <ChevronRight className="w-4 h-4 text-[#C8A97E] mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-[#C8A97E] font-medium mb-2">Geeignet für</h4>
            <ul className="space-y-2">
              {details.suitable.map((item, index) => (
                <li key={index} className="flex items-start">
                  <ChevronRight className="w-4 h-4 text-[#C8A97E] mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-white/10">
          <div className="flex flex-wrap gap-4">
            <div>
              <span className="text-xs text-gray-400">Dauer</span>
              <p className="text-white">{details.duration}</p>
            </div>
            
            <div>
              <span className="text-xs text-gray-400">Ort</span>
              <p className="text-white">{details.location}</p>
            </div>
            
            {details.price && (
              <div>
                <span className="text-xs text-gray-400">Preis</span>
                <p className="text-white">{details.price}</p>
              </div>
            )}
          </div>
          
          {details.link && (
            <a 
              href={details.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-[#C8A97E] hover:underline"
            >
              Mehr Informationen →
            </a>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
} 
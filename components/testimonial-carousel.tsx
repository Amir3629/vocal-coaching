"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Jazz Singer",
    content:
      "Working with Melanie transformed my approach to jazz singing. Her techniques for improvisation and vocal control have been invaluable for my performances.",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Music Student",
    content:
      "As a beginner, I was nervous about taking vocal lessons, but Melanie created such a supportive environment. Her patience and expertise helped me build confidence quickly.",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Elena Müller",
    role: "Professional Vocalist",
    content:
      "Melanie's coaching goes beyond technique. She helped me find my unique voice and style, which has been crucial for my career development in Berlin's competitive jazz scene.",
    avatar: "/placeholder.svg?height=100&width=100",
  },
]

export default function TestimonialCarousel() {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => {
    setCurrent((current + 1) % testimonials.length)
  }, [current, testimonials.length])

  const previous = useCallback(() => {
    setCurrent((current - 1 + testimonials.length) % testimonials.length)
  }, [current, testimonials.length])

  useEffect(() => {
    const interval = setInterval(() => {
      next()
    }, 8000)
    return () => clearInterval(interval)
  }, [next])

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="w-full flex-shrink-0 bg-gray-800/50 border-gray-700">
              <CardContent className="p-6 md:p-10 flex flex-col items-center text-center">
                <Quote className="h-12 w-12 text-purple-400 mb-6" />
                <p className="text-lg md:text-xl mb-6">{testimonial.content}</p>
                <Avatar className="h-16 w-16 mb-4">
                  <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-bold text-lg">{testimonial.name}</h4>
                  <p className="text-gray-400">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-6 gap-2">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full border-gray-700 text-white hover:bg-gray-800"
          onClick={previous}
        >
          <ChevronLeft className="h-6 w-6" />
          <span className="sr-only">Previous testimonial</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full border-gray-700 text-white hover:bg-gray-800"
          onClick={next}
        >
          <ChevronRight className="h-6 w-6" />
          <span className="sr-only">Next testimonial</span>
        </Button>
      </div>
    </div>
  )
}


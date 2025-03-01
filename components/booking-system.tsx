"use client"

import { useState, useEffect } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

// Note: You'll need to set up Google Calendar API credentials and add them to your environment variables
const LESSON_TYPES = [
  {
    id: "private",
    name: "Private Lesson",
    duration: 60,
    price: "€60",
  },
  {
    id: "jazz-improv",
    name: "Jazz Improvisation",
    duration: 90,
    price: "€85",
  },
  {
    id: "performance",
    name: "Performance Coaching",
    duration: 90,
    price: "€85",
  },
  {
    id: "piano-vocal",
    name: "Piano/Vocal Coordination",
    duration: 60,
    price: "€70",
  },
]

const TIME_SLOTS = ["10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00"]

export default function BookingSystem() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [lessonType, setLessonType] = useState("")
  const [timeSlot, setTimeSlot] = useState("")
  const [availableSlots, setAvailableSlots] = useState(TIME_SLOTS)

  // This would be replaced with actual Google Calendar API integration
  useEffect(() => {
    if (date) {
      // Simulate checking availability
      const randomAvailable = TIME_SLOTS.filter(() => Math.random() > 0.3)
      setAvailableSlots(randomAvailable)
    }
  }, [date])

  return (
    <Card className="bg-[#1a1a1a] border-gray-800 p-6 md:p-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4">Select Lesson Type</h3>
          <Select onValueChange={setLessonType}>
            <SelectTrigger className="w-full bg-[#252525] border-gray-700">
              <SelectValue placeholder="Choose your lesson" />
            </SelectTrigger>
            <SelectContent>
              {LESSON_TYPES.map((lesson) => (
                <SelectItem key={lesson.id} value={lesson.id}>
                  <div className="flex justify-between items-center w-full">
                    <span>{lesson.name}</span>
                    <span className="text-sm text-gray-400">
                      {lesson.duration}min - {lesson.price}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {lessonType && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
              <h3 className="text-xl font-semibold mb-4">Select Date</h3>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="bg-[#252525] border-gray-700 rounded-lg p-4"
                disabled={(date) => {
                  const now = new Date()
                  return (
                    date < now ||
                    date.getDay() === 0 || // Sunday
                    date.getDay() === 6 // Saturday
                  )
                }}
              />
            </motion.div>
          )}
        </div>

        <div>
          {date && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h3 className="text-xl font-semibold mb-4">Available Time Slots</h3>
              <div className="grid grid-cols-2 gap-3">
                {availableSlots.map((slot) => (
                  <Button
                    key={slot}
                    variant={timeSlot === slot ? "default" : "outline"}
                    className={`w-full ${
                      timeSlot === slot ? "bg-purple-600 hover:bg-purple-700" : "border-gray-700 hover:bg-purple-600/20"
                    }`}
                    onClick={() => setTimeSlot(slot)}
                  >
                    {slot}
                  </Button>
                ))}
              </div>

              {timeSlot && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
                  <Button
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6 text-lg"
                    onClick={() => {
                      // Here you would integrate with Google Calendar API
                      alert("Booking system would be integrated with Google Calendar")
                    }}
                  >
                    Book Lesson
                  </Button>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </Card>
  )
}


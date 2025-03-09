"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Calendar, Clock, ChevronLeft, ChevronRight, Check } from "lucide-react"
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday } from "date-fns"
import { de } from "date-fns/locale"
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import { createBooking } from '@/lib/google-calendar'

interface TimeSlot {
  time: string
  available: boolean
}

interface PaymentStep {
  isLoading: boolean
  error: string | null
  orderID: string | null
}

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
}

const timeSlots: TimeSlot[] = [
  { time: "09:00 - 10:00", available: true },
  { time: "10:00 - 11:00", available: true },
  { time: "11:00 - 12:00", available: false },
  { time: "12:00 - 13:00", available: true },
  { time: "14:00 - 15:00", available: true },
  { time: "15:00 - 16:00", available: true },
  { time: "16:00 - 17:00", available: false },
  { time: "17:00 - 18:00", available: true },
  { time: "18:00 - 19:00", available: true },
  { time: "19:00 - 20:00", available: true }
]

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState(1)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [availableSlots, setAvailableSlots] = useState<string[]>([])
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    level: "",
    message: "",
    acceptTerms: false
  })
  const [payment, setPayment] = useState<PaymentStep>({
    isLoading: false,
    error: null,
    orderID: null,
  })

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(1)
        setSelectedDate(null)
        setSelectedTime(null)
        setFormData({
          name: "",
          email: "",
          phone: "",
          level: "",
          message: "",
          acceptTerms: false
        })
      }, 300)
    }
  }, [isOpen])

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1))
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1))

  const days = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate)
  })

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setStep(2)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
    setStep(3)
  }

  const handleNext = () => {
    if (step === 1 && selectedDate) {
      setStep(2)
    } else if (step === 2 && selectedTime) {
      setStep(3)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here we'll integrate with Google Calendar API
    console.log("Booking submitted:", {
      date: selectedDate,
      time: selectedTime,
      ...formData
    })
    // Show success message and close
    setStep(4)
  }

  const handlePayment = async () => {
    try {
      setPayment({ ...payment, isLoading: true, error: null })
      const response = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 50, // Deposit amount in EUR
          currency: 'EUR',
          description: `Booking deposit for ${formData.name} on ${selectedDate?.toLocaleDateString()} at ${selectedTime}`,
        }),
      })

      const data = await response.json()
      if (data.id) {
        setPayment({ ...payment, orderID: data.id, isLoading: false })
      } else {
        throw new Error('Failed to create PayPal order')
      }
    } catch (error) {
      console.error('Payment error:', error)
      setPayment({
        ...payment,
        isLoading: false,
        error: 'Failed to process payment. Please try again.',
      })
    }
  }

  const handlePaymentSuccess = async (orderID: string) => {
    try {
      const response = await fetch('/api/payments/capture-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderID }),
      })

      const data = await response.json()
      if (data.status === 'COMPLETED') {
        // Create the booking
        await createBooking({
          date: selectedDate!,
          time: selectedTime!,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          paymentId: orderID,
        })
        setStep(4) // Move to confirmation step
      }
    } catch (error) {
      console.error('Error capturing payment:', error)
      setPayment({
        ...payment,
        error: 'Failed to complete payment. Please contact support.',
      })
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            {/* Calendar Navigation */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setCurrentDate(subMonths(currentDate, 1))}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-[#C8A97E]" />
              </button>
              <h3 className="text-lg font-medium text-white">
                {format(currentDate, 'MMMM yyyy', { locale: de })}
              </h3>
              <button
                onClick={() => setCurrentDate(addMonths(currentDate, 1))}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-[#C8A97E]" />
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2 text-center">
              {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map((day) => (
                <div key={day} className="text-sm text-gray-400 py-2">
                  {day}
                </div>
              ))}
              {Array.from({ length: 31 }).map((_, index) => {
                const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), index + 1)
                const isSelected = selectedDate && date.getTime() === selectedDate.getTime()
                const isToday = new Date().toDateString() === date.toDateString()
                const isPast = date < new Date()

                return (
                  <button
                    key={index}
                    onClick={() => !isPast && handleDateSelect(date)}
                    disabled={isPast}
                    className={`
                      p-2 rounded-lg text-sm font-medium transition-all
                      ${isSelected
                        ? 'bg-[#C8A97E] text-black'
                        : isToday
                          ? 'bg-white/10 text-white'
                          : isPast
                            ? 'bg-white/5 text-gray-500 cursor-not-allowed'
                            : 'bg-white/5 text-white hover:bg-white/10 hover:scale-105'
                      }
                    `}
                  >
                    {index + 1}
                  </button>
                )
              })}
            </div>
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg text-white mb-4">
              Verfügbare Zeiten am {selectedDate && format(selectedDate, 'd. MMMM yyyy', { locale: de })}:
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {/* Time slots */}
              {Array.from({ length: 8 }).map((_, index) => {
                const time = `${9 + index * 1.5}:00 - ${10.5 + index * 1.5}:00`
                return (
                  <button
                    key={time}
                    onClick={() => handleTimeSelect(time)}
                    className={`p-3 rounded-lg text-sm font-medium transition-all
                      ${selectedTime === time
                        ? 'bg-[#C8A97E] text-black'
                        : 'bg-white/5 text-white hover:bg-white/10'
                      } ${index % 2 === 0 ? 'transform hover:scale-105' : ''}`}
                  >
                    {time}
                  </button>
                )
              })}
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Payment</h3>
            <p className="text-gray-600 mb-4">
              Please pay a deposit of €50 to secure your booking.
            </p>
            {payment.error && (
              <div className="text-red-500 mb-4">{payment.error}</div>
            )}
            <PayPalScriptProvider
              options={{
                clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
                currency: 'EUR',
              }}
            >
              <PayPalButtons
                style={{ layout: 'vertical' }}
                createOrder={async () => {
                  await handlePayment()
                  return payment.orderID!
                }}
                onApprove={async (data) => {
                  await handlePaymentSuccess(data.orderID)
                }}
              />
            </PayPalScriptProvider>
          </div>
        )
      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Booking Confirmed!</h3>
            <p className="text-gray-600">
              Thank you for your booking. You will receive a confirmation email shortly.
            </p>
            <button
              onClick={onClose}
              className="w-full bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition-colors"
            >
              Close
            </button>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-lg bg-[#0A0A0A] rounded-xl shadow-xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#C8A97E]/20">
              <h2 className="text-xl font-medium text-white">
                {step === 1 ? "Terminanfrage" : 
                 step === 2 ? "Uhrzeit wählen" : 
                 "Persönliche Daten"}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4">
              {renderStep()}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-4 border-t border-[#C8A97E]/20">
              {step > 1 ? (
                <button
                  onClick={handleBack}
                  className="px-4 py-2 text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  Zurück
                </button>
              ) : (
                <div></div>
              )}
              {step < 3 ? (
                <button
                  onClick={handleNext}
                  disabled={step === 1 ? !selectedDate : !selectedTime}
                  className={`px-6 py-2 rounded-lg transition-colors ${
                    (step === 1 ? !selectedDate : !selectedTime)
                      ? "bg-[#C8A97E]/50 cursor-not-allowed"
                      : "bg-[#C8A97E] hover:bg-[#B69A6E]"
                  }`}
                >
                  Weiter
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!formData.acceptTerms}
                  className={`px-6 py-2 rounded-lg transition-colors ${
                    !formData.acceptTerms
                      ? "bg-[#C8A97E]/50 cursor-not-allowed"
                      : "bg-[#C8A97E] hover:bg-[#B69A6E]"
                  }`}
                >
                  Jetzt Buchen
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 
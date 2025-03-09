import { NextResponse } from 'next/server'
import { getAvailableSlots, createBooking } from '@/app/lib/google-calendar'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const dateStr = searchParams.get('date')

  if (!dateStr) {
    return NextResponse.json(
      { error: 'Date parameter is required' },
      { status: 400 }
    )
  }

  const date = new Date(dateStr)
  const slots = await getAvailableSlots(date)

  return NextResponse.json({ slots })
}

export async function POST(request: Request) {
  try {
    const bookingData = await request.json()
    
    // Validate required fields
    if (!bookingData.date || !bookingData.time || !bookingData.name || !bookingData.email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Convert date string to Date object
    bookingData.date = new Date(bookingData.date)

    const event = await createBooking(bookingData)

    return NextResponse.json({ success: true, event })
  } catch (error) {
    console.error('Error processing booking:', error)
    return NextResponse.json(
      { error: 'Failed to process booking' },
      { status: 500 }
    )
  }
} 
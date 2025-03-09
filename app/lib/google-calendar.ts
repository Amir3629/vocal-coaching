import { google } from 'googleapis'
import { format } from 'date-fns'

const SCOPES = ['https://www.googleapis.com/auth/calendar']
const CALENDAR_ID = process.env.CALENDAR_ID

const auth = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
)

auth.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
})

const calendar = google.calendar({ version: 'v3', auth })

interface BookingDetails {
  date: Date
  time: string
  name: string
  email: string
  phone: string
  message: string
  paymentId: string
}

export async function getAvailableSlots(date: Date): Promise<string[]> {
  try {
    const startTime = new Date(date)
    startTime.setHours(0, 0, 0, 0)
    const endTime = new Date(date)
    endTime.setHours(23, 59, 59, 999)

    const response = await calendar.events.list({
      calendarId: CALENDAR_ID,
      timeMin: startTime.toISOString(),
      timeMax: endTime.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    })

    const events = response.data.items || []
    const bookedTimes = events.map(event => {
      const start = new Date(event.start?.dateTime || '')
      return format(start, 'HH:mm')
    })

    // Generate all possible time slots (e.g., every hour from 9 AM to 6 PM)
    const allTimeSlots = Array.from({ length: 10 }, (_, i) => 
      format(new Date().setHours(9 + i, 0, 0, 0), 'HH:mm')
    )

    // Return available time slots (those not in bookedTimes)
    return allTimeSlots.filter(time => !bookedTimes.includes(time))
  } catch (error) {
    console.error('Error fetching available slots:', error)
    throw error
  }
}

export async function createBooking(details: BookingDetails): Promise<void> {
  try {
    const [hours, minutes] = details.time.split(':')
    const startTime = new Date(details.date)
    startTime.setHours(parseInt(hours), parseInt(minutes), 0, 0)
    
    const endTime = new Date(startTime)
    endTime.setHours(startTime.getHours() + 1) // 1-hour sessions

    const event = {
      summary: `Vocal Coaching - ${details.name}`,
      description: `
        Name: ${details.name}
        Email: ${details.email}
        Phone: ${details.phone}
        Message: ${details.message}
        Payment ID: ${details.paymentId}
      `,
      start: {
        dateTime: startTime.toISOString(),
        timeZone: 'Europe/Berlin',
      },
      end: {
        dateTime: endTime.toISOString(),
        timeZone: 'Europe/Berlin',
      },
      attendees: [{ email: details.email }],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 }, // 24 hours before
          { method: 'popup', minutes: 60 }, // 1 hour before
        ],
      },
    }

    await calendar.events.insert({
      calendarId: CALENDAR_ID,
      requestBody: event,
      sendUpdates: 'all', // Send email notifications to attendees
    })
  } catch (error) {
    console.error('Error creating booking:', error)
    throw error
  }
}
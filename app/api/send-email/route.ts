import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Create a transporter using your business email
const transporter = nodemailer.createTransport({
  host: "mail.melanie-wainwright.de", // Your email host
  port: 587, // Standard secure SMTP port
  secure: false, // true for 465, false for other ports
  auth: {
    user: "info@melanie-wainwright.de",
    pass: process.env.EMAIL_PASSWORD
  }
});

// Helper function to create Google Calendar link
function createGoogleCalendarLink(title: string, date: string, time: string) {
  const eventDateTime = new Date(`${date} ${time}`);
  const endDateTime = new Date(eventDateTime.getTime() + 60 * 60 * 1000); // 1 hour duration

  const formatDateTime = (date: Date) => {
    return date.toISOString().replace(/-|:|\.\d\d\d/g, '');
  };

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${formatDateTime(eventDateTime)}/${formatDateTime(endDateTime)}&details=${encodeURIComponent('Vocal Coaching Session')}`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, data } = body;

    let emailContent = '';
    let subject = '';
    let html = '';

    if (type === 'contact') {
      subject = `🎵 Neue Kontaktanfrage von ${data.name}`;
      html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #C8A97E;">Neue Kontaktanfrage</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
          <p><strong>Nachricht:</strong></p>
          <p style="background: #f5f5f5; padding: 15px; border-radius: 5px;">${data.message}</p>
          
          <div style="margin-top: 20px;">
            <p style="color: #666;">Schnellantworten:</p>
            <ul>
              <li>"Vielen Dank für Ihre Anfrage. Ich melde mich in Kürze bei Ihnen."</li>
              <li>"Danke für Ihr Interesse. Können wir einen Termin für ein kurzes Gespräch vereinbaren?"</li>
            </ul>
          </div>
        </div>
      `;
    } else if (type === 'booking') {
      const calendarLink = createGoogleCalendarLink(
        `Vocal Coaching mit ${data.name}`,
        data.selectedDays[0],
        data.selectedTime
      );

      subject = `📅 Neue Buchungsanfrage von ${data.name}`;
      html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #C8A97E;">Neue Buchungsanfrage</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
          <p><strong>Telefon:</strong> ${data.phone || 'Nicht angegeben'}</p>
          <p><strong>Service:</strong> ${data.service}</p>
          <p><strong>Gewünschte Tage:</strong> ${data.selectedDays.join(', ')}</p>
          <p><strong>Gewünschte Zeit:</strong> <a href="${calendarLink}" style="color: #C8A97E;">${data.selectedTime} (Zum Kalender hinzufügen)</a></p>
          ${data.message ? `<p><strong>Nachricht:</strong></p><p style="background: #f5f5f5; padding: 15px; border-radius: 5px;">${data.message}</p>` : ''}
          
          <div style="margin-top: 20px;">
            <p style="color: #666;">Schnellantworten:</p>
            <ul>
              <li>"Danke für Ihre Buchung. Der gewünschte Termin ist verfügbar, ich bestätige hiermit."</li>
              <li>"Vielen Dank für Ihre Anfrage. Leider ist der gewünschte Termin bereits vergeben. Können wir einen alternativen Termin finden?"</li>
            </ul>
          </div>
        </div>
      `;
    }

    await transporter.sendMail({
      from: 'info@melanie-wainwright.de',
      to: 'info@melanie-wainwright.de',
      subject: subject,
      html: html,
      replyTo: data.email
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
} 
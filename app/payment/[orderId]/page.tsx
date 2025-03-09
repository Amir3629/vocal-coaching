import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { capturePayPalOrder } from '@/app/lib/payment-service';
import { sendPaymentConfirmationEmail } from '@/app/lib/email-service';

export default function PaymentPage({ params }: { params: { orderId: string } }) {
  const handlePaymentSuccess = async (data: any) => {
    try {
      const payment = await capturePayPalOrder(data.orderID);
      
      if (payment.status === 'COMPLETED') {
        // Send payment confirmation email
        // Note: You'll need to store and retrieve booking details
        // This is a simplified version
        await sendPaymentConfirmationEmail(
          payment.payerEmail,
          'Customer', // You should store and retrieve the customer name
          new Date(), // You should store and retrieve the booking date
          '10:00 - 11:00' // You should store and retrieve the booking time
        );
      }
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-card p-6 rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Zahlung bestätigen
          </h1>
          <p className="text-muted-foreground mb-6">
            Bitte zahlen Sie die Anzahlung von 30€, um Ihre Buchung zu bestätigen
          </p>
        </div>

        <PayPalScriptProvider
          options={{
            clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
            currency: 'EUR',
          }}
        >
          <PayPalButtons
            style={{ layout: 'vertical' }}
            createOrder={() => Promise.resolve(params.orderId)}
            onApprove={async (data) => {
              await handlePaymentSuccess(data);
            }}
          />
        </PayPalScriptProvider>

        <div className="mt-6 text-sm text-muted-foreground text-center">
          <p>
            Nach erfolgreicher Zahlung erhalten Sie eine Bestätigungs-E-Mail mit
            allen Details zu Ihrem Termin.
          </p>
        </div>
      </div>
    </div>
  );
} 
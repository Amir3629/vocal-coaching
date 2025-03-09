// This generates the static paths at build time
export function generateStaticParams() {
  return [{ orderId: "DEMO" }]
}

import PaymentForm from "./payment-form"

export default function PaymentPage({ params }: { params: { orderId: string } }) {
  return <PaymentForm orderId={params.orderId} />
} 
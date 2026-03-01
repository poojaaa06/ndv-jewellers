import Header from '@/components/header'
import Footer from '@/components/footer'
import CheckoutContent from '@/components/checkout-content'

export const metadata = {
  title: 'Checkout - NDV Jewellers',
  description: 'Complete your order with NDV Jewellers'
}

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <CheckoutContent />
      <Footer />
    </main>
  )
}

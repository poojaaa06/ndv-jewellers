import Header from '@/components/header'
import Footer from '@/components/footer'
import CartContent from '@/components/cart-content'

export const metadata = {
  title: 'Shopping Cart - NDV Jewellers',
  description: 'Review your shopping cart and proceed to checkout'
}

export default function CartPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <CartContent />
      <Footer />
    </main>
  )
}

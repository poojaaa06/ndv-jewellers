import Header from '@/components/header'
import Footer from '@/components/footer'
import WishlistContent from '@/components/wishlist-content'

export const metadata = {
  title: 'My Wishlist - NDV Jewellers',
  description: 'View and manage your saved jewelry items'
}

export default function WishlistPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <WishlistContent />
      <Footer />
    </main>
  )
}
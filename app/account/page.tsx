import Header from '@/components/header'
import Footer from '@/components/footer'
import AccountDashboard from '@/components/account-dashboard'

export const metadata = {
  title: 'My Account - NDV Jewellers',
  description: 'Manage your orders, wishlist, and account settings'
}

export default function AccountPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <AccountDashboard />
      <Footer />
    </main>
  )
}

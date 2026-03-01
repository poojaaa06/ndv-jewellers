import Header from '@/components/header'
import Hero from '@/components/hero'
import InfoBar from '@/components/info-bar'
import TrustBar from '@/components/trust-bar'
import Categories from '@/components/categories'
import FeaturedProducts from '@/components/featured-products'
import CustomJewellery from '@/components/custom-jewellery'
import Testimonials from '@/components/testimonials'
import Newsletter from '@/components/newsletter'
import Footer from '@/components/footer'
import Blog from '@/components/blog'
import Insta from '@/components/insta'
import Faq from '@/components/faq'

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <InfoBar />
      <Header />
      <Hero />
    
      <Categories />
          <FeaturedProducts/>
      <CustomJewellery />
      <Insta/>
      <Blog/>
      
      <Testimonials/>

   <TrustBar/>
      <Faq/>
     
      <Footer />
    </main>
  )
}

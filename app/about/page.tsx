import Link from 'next/link'
import { Award, Leaf, Gem, Heart, Star, MapPin, Clock, Phone } from 'lucide-react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import InfoBar from '@/components/info-bar'

const values = [
  { icon: Leaf, title: 'Ethically Sourced', body: 'Lab-grown diamonds with zero environmental cost.' },
  { icon: Award, title: 'IGI Certified', body: 'Every diamond ships with a grading report.' },
  { icon: Gem, title: 'Master Crafted', body: 'Hand-finished by artisans with 20+ years experience.' },
  { icon: Heart, title: 'Made with Intention', body: 'Small batches, never mass-produced.' },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <InfoBar />
      <Header />

      {/* Hero - compact for mobile */}
      <section className="relative h-[60vh] min-h-[400px] w-full">
        <img 
          src="/aboutusbanner.png" 
          alt="Jewelry crafting"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-16 text-white max-w-4xl">
          <p className="text-xs tracking-[0.3em] mb-2 opacity-90">EST. 2009 · MUMBAI</p>
          <h1 className="font-serif text-3xl md:text-7xl mb-3 leading-tight">Diamonds born<br />from light, not earth</h1>
          <p className="text-sm md:text-lg max-w-2xl mb-4 opacity-90">Master craftsmanship meets ethical luxury. Lab-grown diamonds, hand-finished in Mumbai since 2009.</p>
          <div className="flex gap-3">
            <Link href="/shop" className="bg-white text-black px-6 py-2.5 rounded-full text-xs font-medium hover:bg-stone-100 transition">
              Shop Collection
            </Link>
            <Link href="/custom" className="border border-white text-white px-6 py-2.5 rounded-full text-xs font-medium hover:bg-white/10 transition">
              Bespoke Orders
            </Link>
          </div>
        </div>
      </section>

      {/* Stats - compact grid */}
      <div className="grid grid-cols-4 gap-2 py-8 px-4 max-w-6xl mx-auto border-b border-stone-200">
        {[
          { val: '12k+', label: 'Customers', icon: Heart },
          { val: '15yrs', label: 'Craft', icon: Award },
          { val: '40+', label: 'Countries', icon: MapPin },
          { val: '4.9★', label: 'Rating', icon: Star },
        ].map((s, i) => {
          const Icon = s.icon
          return (
            <div key={i} className="text-center">
              <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-1">
                <Icon className="w-4 h-4 text-stone-700" />
              </div>
              <p className="font-serif text-sm font-bold">{s.val}</p>
              <p className="text-[8px] uppercase text-stone-500 mt-0.5 tracking-wide">{s.label}</p>
            </div>
          )
        })}
      </div>

      {/* Our Story - stacked on mobile */}
      <section className="py-10 px-4 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center">
          <div className="relative h-[300px] md:h-[500px] rounded-xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&q=80" 
              alt="Zaveri Bazaar"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-3 left-3 text-white">
              <p className="text-xs font-medium">Zaveri Bazaar, 2009</p>
            </div>
          </div>
          <div>
            <p className="text-xs text-stone-500 mb-2 tracking-wider">OUR STORY</p>
            <h2 className="font-serif text-2xl md:text-4xl mb-4">From a single display case to the world</h2>
            <p className="text-sm text-stone-600 mb-3 leading-relaxed">
              It started in a small corner of Mumbai's Zaveri Bazaar. Two master craftsmen, a handful of designs, 
              and one belief: that fine jewellery should be honest, beautiful, and accessible.
            </p>
            <p className="text-sm text-stone-600 mb-4 leading-relaxed">
              For years we worked quietly, building a reputation among locals who appreciated the quality. 
              Word spread. Soon we were shipping to Delhi, then Bengaluru, then beyond.
            </p>
            <div className="border-l-4 border-stone-300 pl-3 italic text-sm text-stone-500">
              "We never set out to build a big brand. We just wanted to make jewellery we were proud of."
            </div>
          </div>
        </div>
      </section>

      {/* The Pivot - stacked on mobile */}
      <section className="py-10 px-4 bg-stone-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center">
            <div className="order-2 md:order-1">
              <p className="text-xs text-stone-500 mb-2 tracking-wider">2014 · THE TURNING POINT</p>
              <h2 className="font-serif text-2xl md:text-4xl mb-4">Why we chose lab-grown</h2>
              <p className="text-sm text-stone-600 mb-3 leading-relaxed">
                Long before it was fashionable, we made a decision that would define us: we switched entirely to 
                lab-grown CVD diamonds. Same sparkle, same hardness, same IGI certification — but zero mining.
              </p>
              <p className="text-sm text-stone-600 mb-4 leading-relaxed">
                People thought we were crazy. "Customers want real diamonds," they said. But we believed then — 
                and we know now — that real doesn't have to mean mined.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-stone-200 rounded-full text-[10px]">100% Real Diamonds</span>
                <span className="px-2 py-1 bg-stone-200 rounded-full text-[10px]">IGI Certified</span>
                <span className="px-2 py-1 bg-stone-200 rounded-full text-[10px]">Conflict Free</span>
              </div>
            </div>
            <div className="relative h-[250px] md:h-[500px] rounded-xl overflow-hidden order-1 md:order-2">
              <img 
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80" 
                alt="Lab diamond"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Founder - stacked on mobile */}
      <section className="py-10 px-4 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center">
          <div className="relative h-[300px] md:h-[500px] rounded-xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80" 
              alt="Founder"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-xs text-stone-500 mb-2 tracking-wider">THE FOUNDER</p>
            <h2 className="font-serif text-2xl md:text-4xl mb-4">Meet Priya Mehta</h2>
            <p className="text-sm text-stone-600 mb-3 leading-relaxed">
              "I grew up watching my grandmother pass down jewellery that had been in our family for generations. 
              I wanted to create pieces that would mean as much to future generations — but without the ethical baggage."
            </p>
            <p className="text-sm text-stone-600 mb-4 leading-relaxed">
              Priya started with nothing but a vision and two craftsmen who believed in her. Fifteen years later, 
              she's built a brand that ships to 40+ countries while staying true to those original values: 
              transparency, quality, and intention.
            </p>
            <p className="font-serif text-base">— Priya Mehta, Founder & Creative Director</p>
          </div>
        </div>
      </section>

      {/* Values - 2x2 grid on mobile */}
      <section className="py-10 px-4 bg-stone-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <p className="text-xs text-stone-500 mb-2 tracking-wider">WHY WE'RE DIFFERENT</p>
            <h2 className="font-serif text-2xl md:text-4xl">What we stand for</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {values.map((v, i) => {
              const Icon = v.icon
              return (
                <div key={i} className="bg-white p-4 rounded-xl shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-stone-700" />
                  </div>
                  <h3 className="font-serif text-base mb-1">{v.title}</h3>
                  <p className="text-xs text-stone-500 leading-relaxed">{v.body}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Studio - stacked on mobile */}
      <section className="py-10 px-4 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center">
          <div className="order-2 md:order-1">
            <p className="text-xs text-stone-500 mb-2 tracking-wider">VISIT US</p>
            <h2 className="font-serif text-2xl md:text-4xl mb-4">Our Mumbai atelier</h2>
            <p className="text-sm text-stone-600 mb-4 leading-relaxed">
              We're still in the same neighbourhood where we started. Come see our collection in person, 
              meet the craftsmen, or just chat about your dream piece over chai.
            </p>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-stone-400" />
                <span className="text-xs">42, Zaveri Bazaar, Mumbai - 400002</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-stone-400" />
                <span className="text-xs">Mon–Sat, 11am – 7pm</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-stone-400" />
                <span className="text-xs">+91 22 1234 5678</span>
              </div>
            </div>
            <Link href="/contact" className="text-xs border-b border-black pb-0.5">
              Plan your visit →
            </Link>
          </div>
          <div className="relative h-[200px] md:h-[400px] rounded-xl overflow-hidden order-1 md:order-2">
            <img 
              src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=800&q=80" 
              alt="Studio"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Testimonial - compact */}
      <section className="relative h-[300px] w-full">
        <img 
          src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1400&q=90" 
          alt="Customer"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center text-center text-white p-6">
          <div className="max-w-2xl">
            <div className="flex justify-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-white text-white" />
              ))}
            </div>
            <p className="text-base md:text-2xl italic mb-3">"The experience was flawless. The ring is absolutely stunning."</p>
            <p className="text-sm font-medium">— Anjali R., Bengaluru</p>
            <p className="text-xs opacity-80 mt-3">Join 12,000+ happy customers</p>
          </div>
        </div>
      </section>

      {/* Final CTA - compact */}
      <section className="py-10 px-4 text-center bg-stone-50">
        <div className="max-w-xl mx-auto">
          <h2 className="font-serif text-xl md:text-4xl mb-3">Ready to find your perfect piece?</h2>
          <p className="text-sm text-stone-600 mb-5">Browse our collection or start your custom design journey.</p>
          <div className="flex gap-3 justify-center">
            <Link href="/shop" className="px-5 py-2 bg-black text-white rounded-full text-xs font-medium hover:bg-stone-800 transition">
              Shop now
            </Link>
            <Link href="/custom" className="px-5 py-2 border border-black rounded-full text-xs font-medium hover:bg-black hover:text-white transition">
              Custom order
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
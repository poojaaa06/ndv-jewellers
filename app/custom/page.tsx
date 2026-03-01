'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Heart, ShoppingBag, Phone, MessageCircle, ArrowRight, 
  Sparkles, Star, Check, ChevronDown, Gem, Shield, Truck, Clock 
} from 'lucide-react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import InfoBar from '@/components/info-bar'

// ─── Personalised products ───────────────────
const personalisedProducts = [
  {
    id: 1,
    name: 'Initial Letter Pendant',
    subtitle: 'Choose your letter & metal',
    price: 18500,
    originalPrice: 22000,
    tag: 'Personalised',
    img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80',
    colors: ['#E8C547', '#F5F0EB', '#E8A598'],
    isNew: true,
  },
  {
    id: 2,
    name: 'Name Ring',
    subtitle: 'Up to 8 characters',
    price: 24000,
    originalPrice: 28500,
    tag: 'Name Jewellery',
    img: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80',
    colors: ['#E8C547', '#C9A96E'],
    isNew: false,
  },
  {
    id: 3,
    name: 'Birthstone Necklace',
    subtitle: 'Diamond-set letter',
    price: 32000,
    originalPrice: null,
    tag: 'Birthstone',
    img: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80',
    colors: ['#E8A598', '#F5F0EB', '#C5C5D0'],
    isNew: true,
  },
  {
    id: 4,
    name: 'Couple Bands',
    subtitle: 'Engraved message inside',
    price: 42000,
    originalPrice: 50000,
    tag: 'Couples',
    img: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&q=80',
    colors: ['#E8C547', '#E8A598'],
    isNew: false,
  },
  {
    id: 5,
    name: 'Monogram Ring',
    subtitle: 'Three-letter signet',
    price: 38000,
    originalPrice: 44000,
    tag: 'Signet',
    img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80',
    colors: ['#C9A96E', '#E8C547'],
    isNew: false,
  },
  {
    id: 6,
    name: 'Nameplate Bracelet',
    subtitle: 'Bold custom name',
    price: 28000,
    originalPrice: null,
    tag: 'Name Jewellery',
    img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80',
    colors: ['#E8C547', '#C5C5D0', '#E8A598'],
    isNew: true,
  },
  {
    id: 7,
    name: 'Birth Chart Necklace',
    subtitle: 'Your constellation',
    price: 55000,
    originalPrice: 62000,
    tag: 'Astrology',
    img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80',
    colors: ['#F5F0EB', '#C5C5D0'],
    isNew: false,
  },
  {
    id: 8,
    name: 'Roman Numeral Ring',
    subtitle: 'Your special date',
    price: 21000,
    originalPrice: 25000,
    tag: 'Date Jewellery',
    img: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80',
    colors: ['#E8A598', '#E8C547', '#F5F0EB'],
    isNew: false,
  },
]

const galleryImages = [
  { img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80', label: 'Name Ring' },
  { img: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80', label: 'Engraved Pendant' },
  { img: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80', label: 'Nameplate Bracelet' },
  { img: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&q=80', label: 'Couple Bands' },
]

const whyItems = [
  { num: '01', title: 'You Choose Every Detail', body: 'Metal, stone, font, size — all yours to decide.' },
  { num: '02', title: 'Crafted by Master Artisans', body: 'Hand-finished with 20+ years experience.' },
  { num: '03', title: 'Delivered in 7–14 Days', body: 'Fast turnaround without compromising quality.' },
  { num: '04', title: 'Certified & Hallmarked', body: 'BIS hallmarked and IGI certified.' },
]

const faqs = [
  { q: 'How do I customise a piece?', a: 'Add to cart and fill the personalisation form at checkout.' },
  { q: 'How long for bespoke orders?', a: 'Typically 3–6 weeks from CAD approval.' },
  { q: 'Can I supply my own gemstone?', a: 'Yes. WhatsApp us to start the process.' },
]

const fmt = (p: number) => `₹${p.toLocaleString('en-IN')}`

export default function CustomPage() {
  const [wishlisted, setWishlisted] = useState<number[]>([])
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [activeFilter, setActiveFilter] = useState('All')

  const filters = ['All', 'Name Jewellery', 'Signet', 'Couples', 'Birthstone']

  const filtered = activeFilter === 'All'
    ? personalisedProducts
    : personalisedProducts.filter(p => p.tag === activeFilter)

  const toggleWish = (id: number) =>
    setWishlisted(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])

  return (
    <main className="min-h-screen bg-white">
      <InfoBar />
      <Header />

      {/* Hero - Clean split layout */}
      <section className="relative">
        <div className="grid lg:grid-cols-2 min-h-[500px]">
          {/* Left content */}
          <div className="flex flex-col justify-center px-6 py-12 lg:px-12 bg-[#FAF6F1] order-2 lg:order-1">
            <p className="text-xs tracking-wider text-stone-500 mb-3">SHOP / CUSTOM JEWELS</p>
            <h1 className="font-serif text-3xl lg:text-4xl mb-4">Customer Jewels</h1>
            <p className="text-sm text-stone-600 mb-8 max-w-md">
              Discover custom pieces our customers created — from personalised name jewellery to fully bespoke designs.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#personalised" className="px-6 py-2.5 bg-black text-white text-sm rounded-full">
                Shop Personalised
              </a>
              <a href="#bespoke" className="px-6 py-2.5 border border-black text-sm rounded-full">
                Start Custom Design
              </a>
            </div>
          </div>

          {/* Right collage */}
          <div className="relative h-64 lg:h-auto order-1 lg:order-2 bg-stone-100">
            <div className="grid grid-cols-2 gap-1 p-1 h-full">
              <div className="row-span-2 relative overflow-hidden rounded-l-2xl">
                <img src={galleryImages[0].img} alt={galleryImages[0].label} className="w-full h-full object-cover" />
                <span className="absolute bottom-2 left-2 bg-white/80 text-xs px-2 py-1 rounded">{galleryImages[0].label}</span>
              </div>
              <div className="relative overflow-hidden rounded-tr-2xl">
                <img src={galleryImages[1].img} alt={galleryImages[1].label} className="w-full h-full object-cover" />
              </div>
              <div className="relative overflow-hidden rounded-br-2xl">
                <img src={galleryImages[2].img} alt={galleryImages[2].label} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <div className="border-y border-stone-200 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: <Gem className="w-4 h-4" />, text: 'Certified Diamonds' },
            { icon: <Truck className="w-4 h-4" />, text: 'Free Shipping' },
            { icon: <Clock className="w-4 h-4" />, text: '7-14 Day Delivery' },
            { icon: <Shield className="w-4 h-4" />, text: 'Lifetime Warranty' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-center gap-2 text-xs">
              <span className="text-stone-600">{item.icon}</span>
              <span className="text-stone-600">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Personalised Products */}
      <section id="personalised" className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <p className="text-xs text-stone-500 mb-2 tracking-wider">MADE FOR YOU</p>
            <h2 className="font-serif text-2xl md:text-3xl">Personalised Jewellery</h2>
          </div>

          {/* Filter pills - scrollable on mobile */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-4 no-scrollbar">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-1.5 text-xs whitespace-nowrap rounded-full border ${
                  activeFilter === f
                    ? 'bg-black text-white border-black'
                    : 'border-stone-200 text-stone-600'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map(product => (
              <div key={product.id} className="group">
                <div className="relative aspect-square bg-stone-100 rounded-lg overflow-hidden mb-2">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  
                  {/* Tags */}
                  <div className="absolute top-2 left-2 bg-white/90 text-[10px] px-2 py-0.5 rounded">
                    {product.tag}
                  </div>
                  
                  {product.isNew && (
                    <div className="absolute top-2 right-2 bg-black text-white text-[10px] px-2 py-0.5 rounded">
                      NEW
                    </div>
                  )}
                  
                  <button
                    onClick={() => toggleWish(product.id)}
                    className="absolute bottom-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm"
                  >
                    <Heart className={`w-4 h-4 ${wishlisted.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-stone-400'}`} />
                  </button>
                </div>

                <div>
                  <h3 className="text-xs font-medium line-clamp-1">{product.name}</h3>
                  <p className="text-[10px] text-stone-500 mt-0.5 line-clamp-1">{product.subtitle}</p>
                  
                  <div className="flex items-center gap-1 mt-1">
                    {product.colors.slice(0, 3).map((c, i) => (
                      <span key={i} className="w-2.5 h-2.5 rounded-full border border-stone-200" style={{ backgroundColor: c }} />
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-medium">{fmt(product.price)}</span>
                    {product.originalPrice && (
                      <span className="text-[10px] text-stone-400 line-through">{fmt(product.originalPrice)}</span>
                    )}
                  </div>
                  
                  <button className="w-full mt-2 py-2 bg-black text-white text-xs rounded-full">
                    Personalise
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-10 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-serif text-xl text-center mb-6">How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { step: '1', title: 'Choose', desc: 'Pick your piece' },
              { step: '2', title: 'Customise', desc: 'Add your details' },
              { step: '3', title: 'Receive', desc: 'Delivered in 7-14 days' },
            ].map(s => (
              <div key={s.step} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs">
                  {s.step}
                </div>
                <div>
                  <p className="text-sm font-medium">{s.title}</p>
                  <p className="text-xs text-stone-500">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bespoke */}
      <section id="bespoke" className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-black text-white rounded-2xl overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12">
                <p className="text-xs text-stone-400 mb-3 tracking-wider">FULLY BESPOKE</p>
                <h2 className="font-serif text-2xl md:text-3xl mb-4">Something entirely yours</h2>
                <p className="text-sm text-stone-300 mb-6">
                  From sketch to masterpiece — bring us your vision, and our master artisans will craft it exactly as you imagine.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                  <a href="tel:+919876543210" className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-black text-sm rounded-full">
                    <Phone className="w-4 h-4" /> Call us
                  </a>
                  <a href="https://wa.me/919876543210" className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#25D366] text-white text-sm rounded-full">
                    <MessageCircle className="w-4 h-4" /> WhatsApp
                  </a>
                </div>

                <div className="space-y-4">
                  {whyItems.slice(0, 2).map((item, i) => (
                    <div key={i} className="flex gap-3">
                      <span className="text-xs text-stone-500">{item.num}</span>
                      <div>
                        <p className="text-sm">{item.title}</p>
                        <p className="text-xs text-stone-400">{item.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative h-64 md:h-auto">
                <img 
                  src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=800&q=80" 
                  alt="Crafting"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Reference images */}
          <div className="mt-8">
            <p className="text-xs text-center text-stone-500 mb-4">Share a reference photo →</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="aspect-square bg-stone-100 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 bg-stone-50">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { val: '2.4k+', label: 'Custom Orders' },
            { val: '15+', label: 'Years' },
            { val: '40+', label: 'Countries' },
            { val: '4.9★', label: 'Rating' },
          ].map(stat => (
            <div key={stat.val}>
              <p className="font-serif text-xl">{stat.val}</p>
              <p className="text-[10px] uppercase text-stone-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-xl text-center mb-6">FAQs</h2>
          <div className="divide-y">
            {faqs.map((faq, i) => (
              <div key={i}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between py-3 text-left"
                >
                  <span className="text-sm">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 transition ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <p className="pb-3 text-xs text-stone-500">{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-stone-50">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="font-serif text-xl mb-3">Start your journey</h2>
          <p className="text-sm text-stone-600 mb-5">Your story, your design, our craft.</p>
          <div className="flex gap-3 justify-center">
            <a href="#personalised" className="px-6 py-2.5 bg-black text-white text-sm rounded-full">
              Shop Personalised
            </a>
            <a href="https://wa.me/919876543210" className="px-6 py-2.5 border border-black text-sm rounded-full">
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
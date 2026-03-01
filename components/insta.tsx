'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Instagram } from 'lucide-react'

const instaPosts = [
  {
    id: 1,
    type: 'image',
    media: 'https://plus.unsplash.com/premium_photo-1661645433820-24c8604e4db5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8amV3ZWxsZXJ5fGVufDB8fDB8fHww',
    product: {
      name: 'Tied in Love - Pure Gold Lab Diamond Solitaire Pendant',
      price: '₹25,216',
      originalPrice: '₹34,115',
      thumb: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&q=80',
      href: '/products/tied-in-love-pendant',
    },
  },
  {
    id: 2,
    type: 'image',
    media: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    product: {
      name: 'Groove Promise - Lab Diamond Couple Band Rings',
      price: '₹37,749',
      originalPrice: '₹47,186',
      thumb: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&q=80',
      href: '/products/groove-promise-bands',
    },
  },
  {
    id: 3,
    type: 'video',
    media: 'https://www.w3schools.com/html/mov_bbb.mp4',
    product: {
      name: 'Everlasting Journey - Lab Diamond Heart Ring',
      price: '₹11,999',
      originalPrice: '₹14,999',
      thumb: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&q=80',
      href: '/products/everlasting-journey-ring',
    },
  },
  {
    id: 4,
    type: 'image',
    media: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    product: {
      name: 'Princess Pathway - Pure Gold Lab Diamond Ring',
      price: '₹20,902',
      originalPrice: '₹27,298',
      thumb: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&q=80',
      href: '/products/princess-pathway-ring',
    },
  },
  {
    id: 5,
    type: 'video',
    media: 'https://www.w3schools.com/html/mov_bbb.mp4',
    product: {
      name: 'Glam Chic - Lab Diamond Necklace',
      price: '₹23,499',
      originalPrice: '₹29,374',
      thumb: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&q=80',
      href: '/products/glam-chic-necklace',
    },
    
  },
  {
    id: 6,
    type: 'video',
    media: 'https://www.w3schools.com/html/mov_bbb.mp4',
    product: {
      name: 'Glam Chic - Lab Diamond Necklace',
      price: '₹23,499',
      originalPrice: '₹29,374',
      thumb: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&q=80',
      href: '/products/glam-chic-necklace',
    },
    
  },
]

export default function JoinTheJourney() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if window is defined (client-side only)
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 768)
      
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768)
      }
      
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  const checkScroll = () => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 0)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1)
  }

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.addEventListener('scroll', checkScroll)
    checkScroll()
    return () => el.removeEventListener('scroll', checkScroll)
  }, [])

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return
    const scrollAmount = isMobile ? 220 : 260
    el.scrollBy({ left: dir === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' })
  }

  return (
    <section className="w-full py-12 px-0 md:px-8 bg-white">
      {/* Header - Only the title */}
      <div className="px-4 md:px-0 max-w-7xl mx-auto mb-6">
        <h2
          className="text-xl md:text-2xl font-semibold italic text-gray-800 text-center md:text-left"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          Join the Journey on Instagram
        </h2>
      </div>

      {/* Carousel */}
      <div className="relative max-w-7xl mx-auto">
        {/* Left Arrow - Minimal style */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-1 md:left-0 top-[35%] -translate-y-1/2 z-10 text-gray-400 hover:text-gray-600 transition-colors p-1"
            aria-label="Scroll left"
          >
            <ChevronLeft size={isMobile ? 28 : 32} strokeWidth={1.5} />
          </button>
        )}

        {/* Scrollable Container - Images touching mobile edges */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {instaPosts.map((post) => (
            <div key={post.id} className="flex-none w-[65vw] md:w-[220px] first:ml-4 last:mr-4 md:first:ml-0 md:last:mr-0">
              {/* Media - Portrait (3:4 aspect ratio) */}
              <div className="relative w-full aspect-[3/4] overflow-hidden rounded-md bg-gray-50">
                {post.type === 'video' ? (
                  <video
                    src={post.media}
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                ) : (
                  <Image
                    src={post.media}
                    alt={post.product.name}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 65vw, 220px"
                  />
                )}
                {/* Instagram icon overlay - Minimal */}
                <div className="absolute top-2 right-2 bg-white/70 backdrop-blur-none rounded p-1">
                  <Instagram size={14} className="text-gray-700" />
                </div>
              </div>

              {/* Product info below - Cleaner layout */}
              <Link href={post.product.href} className="flex items-start gap-2.5 mt-3 group">
                {/* Thumb */}
                <div className="relative w-10 h-10 flex-none rounded overflow-hidden border border-gray-100">
                  <Image
                    src={post.product.thumb}
                    alt={post.product.name}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                {/* Text */}
                <div className="flex-1 min-w-0">
                  <p
                    className="text-xs text-gray-700 leading-snug line-clamp-2 group-hover:text-gray-900 transition-colors"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    {post.product.name}
                  </p>
                  <div className="flex items-baseline gap-2 mt-1">
                    <p className="text-xs font-medium text-gray-900">
                      {post.product.price}
                    </p>
                    <p className="text-[10px] text-gray-400 line-through">
                      {post.product.originalPrice}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Right Arrow - Minimal style */}
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-1 md:right-0 top-[35%] -translate-y-1/2 z-10 text-gray-400 hover:text-gray-600 transition-colors p-1"
            aria-label="Scroll right"
          >
            <ChevronRight size={isMobile ? 28 : 32} strokeWidth={1.5} />
          </button>
        )}
      </div>

      {/* Instagram Button - Centered below carousel */}
      <div className="flex justify-center mt-8 px-4">
        <Link
          href="https://instagram.com/yourbrand.official"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#fafafa] hover:bg-gray-100 text-gray-700 text-sm font-normal px-5 py-2.5 rounded-md border border-gray-200 transition shadow-sm"
        >
          <Instagram size={16} className="text-gray-600" />
          <span>Follow us @yourbrand.official</span>
        </Link>
      </div>
    </section>
  )
}
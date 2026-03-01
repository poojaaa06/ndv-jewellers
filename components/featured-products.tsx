'use client'

import Link from 'next/link'
import { ShoppingCart, Heart, Star } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

const bestsellers = [
  // ... (your existing product data remains the same)
  {
    id: 1,
    name: 'Eternal Solitaire Ring',
    category: 'Engagement',
    price: '₹2,50,000',
    originalPrice: '₹2,75,000',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 2,
    name: 'Majestic Diamond Pendant',
    category: 'Pendant',
    price: '₹1,80,000',
    originalPrice: '₹2,00,000',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    name: 'Classic Diamond Studs',
    category: 'Earrings',
    price: '₹1,20,000',
    originalPrice: '₹1,40,000',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    name: 'Tennis Elegance Bracelet',
    category: 'Bracelet',
    price: '₹3,50,000',
    originalPrice: '₹3,90,000',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 5,
    name: 'Pearl Elegance Necklace',
    category: 'Necklace',
    price: '₹1,95,000',
    originalPrice: '₹2,25,000',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 6,
    name: 'Eternity Wedding Band',
    category: 'Wedding',
    price: '₹85,000',
    originalPrice: '₹95,000',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  }
]

export default function BestsellersSection() {
  const [wishlisted, setWishlisted] = useState<number[]>([])
  const [isMobile, setIsMobile] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
 const animationRef = useRef<number | null>(null)
  const [isPaused, setIsPaused] = useState(false)

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Infinite scroll animation for mobile
  useEffect(() => {
    if (!isMobile || !scrollRef.current || isPaused) return

    const scrollContainer = scrollRef.current
    const scrollSpeed = 0.9 // pixels per frame - adjust for speed
    
    const scroll = () => {
      if (!scrollContainer || isPaused) {
        animationRef.current = requestAnimationFrame(scroll)
        return
      }

      // Check if we need to reset scroll position (infinite effect)
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0
      } else {
        scrollContainer.scrollLeft += scrollSpeed
      }

      animationRef.current = requestAnimationFrame(scroll)
    }

    animationRef.current = requestAnimationFrame(scroll)

   return () => {
  if (animationRef.current) {
    cancelAnimationFrame(animationRef.current)
  }
}
  }, [isMobile, isPaused])

  const toggleWishlist = (id: number) => {
    setWishlisted(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const getDiscount = (original: string, current: string) => {
    const orig = parseInt(original.replace(/[^0-9]/g, ''))
    const curr = parseInt(current.replace(/[^0-9]/g, ''))
    return Math.round(((orig - curr) / orig) * 100)
  }

  // Duplicate products for infinite scroll effect
  const duplicatedProducts = [...bestsellers, ...bestsellers]

  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-base text-xs tracking-[0.2em] uppercase">
            Curated Selection
          </span>
          <h2 className="font-serif text-2xl md:text-4xl text-primary mt-2">
            Bestsellers
          </h2>
          <div className="w-16 h-px bg-[#B76E79]/30 mx-auto mt-3"></div>
        </div>

        {/* Mobile Auto-scrolling Carousel */}
        {isMobile ? (
          <div 
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            <div
              ref={scrollRef}
              className="flex overflow-x-hidden gap-4 pb-4"
            >
              {duplicatedProducts.map((product, index) => {
                const discount = getDiscount(product.originalPrice, product.price)
                
                return (
                  <div 
                    key={`${product.id}-${index}`} 
                    className="flex-none w-[280px] group"
                  >
                    <div className="relative bg-white">
                      {/* Image container */}
                      <Link href={`/product/${product.id}`}>
                        <div className="relative aspect-[4/5] overflow-hidden bg-[#f5f5f5]">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                            sizes="280px"
                          />
                          <div className="absolute inset-0 bg-[#60182d] mix-blend-overlay opacity-50 group-hover:opacity-0 transition-opacity duration-700"></div>
                          {/* Discount tag */}
                          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-0.5 text-xs text-[#2C2A2A]">
                            {discount}% off
                          </span>

                          {/* Wishlist */}
                          <button
                            onClick={(e) => {
                              e.preventDefault()
                              toggleWishlist(product.id)
                            }}
                            className="absolute top-3 right-3 p-1.5 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition"
                          >
                            <Heart
                              className={`w-3.5 h-3.5 ${
                                wishlisted.includes(product.id) 
                                  ? 'fill-[#B76E79] text-[#B76E79]' 
                                  : 'text-[#2C2A2A]'
                              }`}
                            />
                          </button>
                        </div>
                      </Link>

                      {/* Product info */}
                      <div className="pt-4 text-center">
                        <p className="text-[#B76E79] text-xs mb-1">
                          {product.category}
                        </p>
                        
                        <Link href={`/product/${product.id}`}>
                          <h3 className="font-serif text-base text-[#2C2A2A] hover:text-[#B76E79] transition mb-2">
                            {product.name}
                          </h3>
                        </Link>
                        
                        {/* Rating */}
                        <div className="flex items-center justify-center gap-1 mb-2">
                          <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-2.5 h-2.5 ${
                                  i < Math.floor(product.rating) 
                                    ? 'fill-[#2C2A2A] text-[#2C2A2A]' 
                                    : 'text-gray-200'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-[10px] text-gray-400">{product.rating}</span>
                        </div>
                        
                        {/* Price */}
                        <div>
                          <div className="flex items-center justify-center gap-2">
                            <span className="font-serif text-base text-[#2C2A2A]">
                              {product.price}
                            </span>
                            <span className="text-xs text-gray-300 line-through">
                              {product.originalPrice}
                            </span>
                          </div>
                          
                          {/* Add to cart */}
                          <button className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="text-xs text-[#B76E79] hover:text-[#2C2A2A] inline-flex items-center gap-1 border-b border-[#B76E79] pb-0.5">
                              Add to Cart <ShoppingCart className="w-2.5 h-2.5" />
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Gradient overlays for visual effect */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
          </div>
        ) : (
          /* Desktop Grid - unchanged */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bestsellers.map((product) => {
              const discount = getDiscount(product.originalPrice, product.price)
              
              return (
                <div key={product.id} className="group">
                  {/* ... (desktop product card remains exactly the same as your original) */}
                  <div className="relative bg-white">
                    {/* Image container */}
                    <Link href={`/product/${product.id}`}>
                      <div className="relative aspect-[4/5] overflow-hidden bg-[#f5f5f5]">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-[#60182d] mix-blend-overlay opacity-50 group-hover:opacity-0 transition-opacity duration-700"></div>
                        {/* Discount tag */}
                        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-0.5 text-xs text-[#2C2A2A]">
                          {discount}% off
                        </span>

                        {/* Wishlist */}
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            toggleWishlist(product.id)
                          }}
                          className="absolute top-3 right-3 p-1.5 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition"
                        >
                          <Heart
                            className={`w-3.5 h-3.5 ${
                              wishlisted.includes(product.id) 
                                ? 'fill-[#B76E79] text-[#B76E79]' 
                                : 'text-[#2C2A2A]'
                            }`}
                          />
                        </button>
                      </div>
                    </Link>

                    {/* Product info */}
                    <div className="pt-4 text-center">
                      <p className="text-[#B76E79] text-xs mb-1">
                        {product.category}
                      </p>
                      
                      <Link href={`/product/${product.id}`}>
                        <h3 className="font-serif text-base text-[#2C2A2A] hover:text-[#B76E79] transition mb-2">
                          {product.name}
                        </h3>
                      </Link>
                      
                      {/* Rating */}
                      <div className="flex items-center justify-center gap-1 mb-2">
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-2.5 h-2.5 ${
                                i < Math.floor(product.rating) 
                                  ? 'fill-[#2C2A2A] text-[#2C2A2A]' 
                                  : 'text-gray-200'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-[10px] text-gray-400">{product.rating}</span>
                      </div>
                      
                      {/* Price */}
                      <div>
                        <div className="flex items-center justify-center gap-2">
                          <span className="font-serif text-base text-[#2C2A2A]">
                            {product.price}
                          </span>
                          <span className="text-xs text-gray-300 line-through">
                            {product.originalPrice}
                          </span>
                        </div>
                        
                        {/* Add to cart */}
                        <button className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="text-xs text-[#B76E79] hover:text-[#2C2A2A] inline-flex items-center gap-1 border-b border-[#B76E79] pb-0.5">
                            Add to Cart <ShoppingCart className="w-2.5 h-2.5" />
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* View all link */}
        <div className="text-center mt-2">
          <Link 
            href="/bestsellers" 
            className="inline-flex items-center gap-1 text-[#2C2A2A] hover:text-[#B76E79] transition-colors group text-sm"
          >
            <span>View Collection</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
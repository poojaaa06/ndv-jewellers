'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

// Base categories
const baseCategories = [
  { 
    name: 'Rings', 
    slug: 'rings', 
    image: '/ring.png' 
  },
  { 
    name: 'Earrings', 
    slug: 'earrings', 
    image: '/earring.png' 
  },
  { 
    name: 'Necklaces', 
    slug: 'necklaces', 
    image: '/necklace.png' 
  },
  { 
    name: 'Bracelets', 
    slug: 'bracelets', 
    image: '/bracelet.png' 
  },
  { 
    name: 'Pendants', 
    slug: 'pendants', 
    image: '/pendant.png'
  },
  { 
    name: 'Bangles', 
    slug: 'bangles', 
    image: '/bangle.png' 
  },
  { 
    name: 'Mens Ring', 
    slug: 'men', 
    image: '/men.png' 
  }
]

export default function Categories() {
  const [categories, setCategories] = useState(baseCategories)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Duplicate categories for infinite scroll effect
  useEffect(() => {
    // Triple the categories for smoother infinite scroll
    setCategories([...baseCategories, ...baseCategories, ...baseCategories])
  }, [])

  // Handle scroll for infinite effect
  const handleScroll = () => {
    const container = scrollContainerRef.current
    if (!container) return

    const { scrollLeft, scrollWidth, clientWidth } = container
    const midPoint = scrollWidth / 3

    // Reset scroll position to create infinite effect
    if (scrollLeft <= 0) {
      container.scrollLeft = midPoint
    } else if (scrollLeft + clientWidth >= scrollWidth) {
      container.scrollLeft = midPoint - clientWidth
    }
  }

  return (
    <section className="py-8 bg-background">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-serif text-2xl md:text-4xl text-primary mb-3">
            Shop by Category
          </h2>
          <p className="text-muted-foreground text-md text-base max-w-2xl mx-auto">
            Explore our curated collections of exquisite jewelry
          </p>
        </div>

        {/* Mobile: Infinite Horizontal Scroll */}
        <div className="md:hidden relative">
          {/* Gradient Fading Effect on Right */}
          <div className="absolute right-0 top-0 bottom-6 w-16 bg-gradient-to-l from-background via-background/80 to-transparent pointer-events-none z-10"></div>
          
          {/* Scrollable Container */}
          <div 
            ref={scrollContainerRef}
            className="overflow-x-auto pb-6 -mx-4 px-4 scrollbar-hide"
            onScroll={handleScroll}
          >
            <div className="flex gap-4 min-w-max">
              {categories.map((category, index) => (
                <Link 
                  key={`${category.slug}-${index}`} 
                  href={`/shop?category=${category.slug}`} 
                  className="w-28"
                >
                  <div className="group">
                    {/* Square Image */}
                    <div className="relative w-28 h-28 overflow-hidden mb-2 shadow-md">
                      <Image
                        src={category.image}
                        alt={category.name}
                        width={112}
                        height={112}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    {/* Category Name Below */}
                    <p className="text-center text-sm font-medium text-foreground">
                      {category.name}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Optional: Left Fade (shows when scrolled) */}
          <div className="absolute left-0 top-0 bottom-6 w-16 bg-gradient-to-r from-background via-background/80 to-transparent pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>

        {/* Desktop: Grid */}
        <div className="hidden md:grid grid-cols-3 lg:grid-cols-7 gap-6">
          {baseCategories.map((category) => (
            <Link key={category.slug} href={`/shop?category=${category.slug}`}>
              <div className="group cursor-pointer">
                {/* Square Image */}
                <div className="relative aspect-square overflow-hidden mb-3 shadow-md hover:shadow-xl transition-shadow duration-300">
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                {/* Category Name Below */}
                <p className="text-center text-sm font-serif font-medium text-primary">
                  {category.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
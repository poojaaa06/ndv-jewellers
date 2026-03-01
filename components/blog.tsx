'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const blogPosts = [
  {
    id: 1,
    title: 'Top 10 Lab Grown Diamond Jewellery Gifts for Women\'s Day...',
    excerpt: "Women's Day 2026 is on Sunday, March 8th....",
    href: '/blog/womens-day-lab-grown-diamond-gifts',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 2,
    title: 'Lab Grown Diamond Jewellery for Holi 2026: From Gulal to Glam',
    excerpt: 'Holi 2026 is almost here. On March 4,....',
    href: '/blog/holi-lab-grown-diamond-jewellery',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 3,
    title: '0.5 Carat Lab Grown Diamond Price in India: Latest Guide 2026',
    excerpt: "If you're searching for 0.5 carat lab grown...",
    href: '/blog/05-carat-lab-grown-diamond-price-india',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 4,
    title: 'Top Reasons to Buy Man Made Diamond Stud Earrings in 2026',
    excerpt: "If you're thinking about buying man made diamond...",
    href: '/blog/man-made-diamond-stud-earrings',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 5,
    title: 'How to Choose the Perfect Diamond Jewellery Online',
    excerpt: 'Finding your perfect piece online can be...',
    href: '/blog/how-to-choose-diamond-jewellery-online',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
  },
]

export default function OurBlog() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

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
    el.scrollBy({ left: dir === 'left' ? -320 : 320, behavior: 'smooth' })
  }

  return (
    <section className="w-full py-10 px-4 md:px-8 bg-base relative">
      {/* Header */}
      <h2
        className="text-center font-serif text-3xl md:text-4xl text-primary mb-8 text-italic"
      
      >
        Our Blog
      </h2>

      {/* Carousel Wrapper */}
      <div className="relative max-w-7xl mx-auto">
        {/* Left Arrow */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/3 -translate-y-1/2 -translate-x-4 z-10 bg-white border border-gray-200 rounded-full shadow p-2 hover:bg-gray-50 transition"
            aria-label="Scroll left"
          >
            <ChevronLeft size={18} className="text-gray-600" />
          </button>
        )}

        {/* Scrollable Row */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth pb-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="flex-none w-[280px] md:w-[320px] bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group"
            >
              {/* Image */}
              <div className="relative w-full h-[170px] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="320px"
                />
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col gap-2">
                <h3
                  className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  {post.title}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-2">{post.excerpt}</p>
                <Link
                  href={post.href}
                  className="mt-1 inline-block border border-gray-300 rounded-full text-xs text-gray-700 px-4 py-1.5 w-fit hover:bg-gray-50 transition"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  Read more
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/3 -translate-y-1/2 translate-x-4 z-10 bg-white border border-gray-200 rounded-full shadow p-2 hover:bg-gray-50 transition"
            aria-label="Scroll right"
          >
            <ChevronRight size={18} className="text-gray-600" />
          </button>
        )}
      </div>
    </section>
  )
}
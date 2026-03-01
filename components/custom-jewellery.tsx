'use client'

import Link from 'next/link'
import Image from 'next/image'

const occasions = [
  {
    id: 1,
    label: 'OFFICE WEAR',
    href: '/collections/office-wear',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 2,
    label: 'FESTIVE WEAR',
    href: '/collections/festive-wear',
    image: 'https://media.istockphoto.com/id/2225019337/photo/portrait-of-very-beautiful-young-indian-bride-in-luxurious-bridal-costume-with-makeup-and.webp?a=1&b=1&s=612x612&w=0&k=20&c=kOO7Nwn4bdKs5QMzFhZnujG5vx1V3iHJCHW6T3mvBBw=',
  },
  {
    id: 3,
    label: 'BIRTHDAY',
    href: '/collections/birthday',
    image: 'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 4,
    label: 'DATE NIGHT',
    href: '/collections/date-night',
    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
  },
]

export default function ShopByOccasion() {
  return (
    <section className="w-full py-10 px-4 md:px-8 bg-base">
      {/* Header */}
      <h2 className="text-center font-serif text-2xl md:text-4xl text-primary mt-2 mb-6 md:mb-10">
        Shop By Occasion
      </h2>

      {/* Grid - 4 columns on mobile, 4 columns on desktop */}
      <div className="grid grid-cols-4 md:grid-cols-4 gap-1 md:gap-3 max-w-7xl mx-auto">
        {occasions.map((occasion) => (
          <Link
            key={occasion.id}
            href={occasion.href}
            className="relative overflow-hidden rounded-sm group block aspect-[3/4]"
          >
            {/* Image */}
            <Image
              src={occasion.image}
              alt={occasion.label}
              fill
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 25vw, 25vw"
            />

            {/* Subtle dark gradient at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

            {/* Label */}
            <div className="absolute bottom-2 left-2 right-2 md:bottom-4 md:left-4 md:right-4">
              <span
                className="text-white text-[10px] md:text-sm font-semibold tracking-widest uppercase border-b border-white pb-0.5 inline-block"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                {occasion.label}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { ArrowRight, Sparkles, Heart, Gift } from 'lucide-react'

const occasions = [
  {
    id: 1,
    name: 'Wedding',
    description: 'Celebrate your special day',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    color: '#F5E6E8',
    icon: Heart,
    size: 'large'
  },
  {
    id: 2,
    name: 'Anniversary',
    description: 'Timeless love stories',
    image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    color: '#E8D9D1',
    icon: Sparkles,
    size: 'medium'
  },
  {
    id: 3,
    name: 'Birthday',
    description: 'Celebrate another year',
    image: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    color: '#D9C5C0',
    icon: Gift,
    size: 'medium'
  },
  {
    id: 4,
    name: 'Engagement',
    description: 'Begin your journey together',
    image: 'https://images.unsplash.com/photo-1531931477281-5e3c5ade536b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    color: '#E6D5D8',
    icon: Heart,
    size: 'small'
  },
  {
    id: 5,
    name: 'Graduation',
    description: 'Mark your achievement',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    color: '#DCC9C2',
    icon: Sparkles,
    size: 'small'
  },
  {
    id: 6,
    name: 'Valentine\'s Day',
    description: 'Express your love',
    image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    color: '#F3D9DC',
    icon: Heart,
    size: 'small'
  },
  {
    id: 7,
    name: 'Mother\'s Day',
    description: 'For the one who loves endlessly',
    image: 'https://images.unsplash.com/photo-1544717291-7f30e8a7b1b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    color: '#E1CFC7',
    icon: Gift,
    size: 'small'
  }
]

export default function ShopByOccasion() {
  const [isMobile, setIsMobile] = useState(false)
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Function to get grid classes based on index and size
  const getGridClasses = (index: number, size: string) => {
    if (isMobile) return 'col-span-12'
    
    switch(size) {
      case 'large':
        return 'md:col-span-8 lg:col-span-6 md:row-span-2'
      case 'medium':
        return 'md:col-span-4 lg:col-span-3'
      case 'small':
        return 'md:col-span-4 lg:col-span-3'
      default:
        return 'md:col-span-4 lg:col-span-3'
    }
  }

  // Get aspect ratio based on size
  const getAspectRatio = (size: string) => {
    switch(size) {
      case 'large':
        return 'aspect-[4/5] md:aspect-[3/4]'
      case 'medium':
        return 'aspect-[4/5]'
      case 'small':
        return 'aspect-[4/5]'
      default:
        return 'aspect-[4/5]'
    }
  }

  return (
    <section className="py-16 bg-[#F9F6F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with UK-inspired design */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-8 h-px bg-[#B76E79]/40"></div>
            <span className="text-xs tracking-[0.3em] uppercase text-[#2C2A2A]/60">
              Celebrate Life's Moments
            </span>
            <div className="w-8 h-px bg-[#B76E79]/40"></div>
          </div>
          
          <h2 className="font-serif text-3xl md:text-5xl text-[#2C2A2A] mb-4">
            Shop by <span className="text-[#B76E79]">Occasion</span>
          </h2>
          
          <p className="text-sm text-[#2C2A2A]/60 max-w-2xl mx-auto">
            From timeless weddings to cherished birthdays, find the perfect piece for every special moment
          </p>
          
          {/* Decorative element */}
          <div className="flex justify-center gap-2 mt-6">
            <div className="w-12 h-0.5 bg-[#B76E79]/30"></div>
            <div className="w-2 h-2 rounded-full bg-[#B76E79]/40"></div>
            <div className="w-12 h-0.5 bg-[#B76E79]/30"></div>
          </div>
        </div>

        {/* Gallery Grid - UK Layout Style */}
        <div className="grid grid-cols-12 gap-4 md:gap-6 auto-rows-auto">
          {occasions.map((occasion, index) => {
            const Icon = occasion.icon
            const isHovered = hoveredId === occasion.id
            
            return (
              <Link
                key={occasion.id}
                href={`/occasion/${occasion.name.toLowerCase().replace(/'/g, '').replace(/\s+/g, '-')}`}
                className={`${getGridClasses(index, occasion.size)} group relative overflow-hidden bg-[${occasion.color}] rounded-sm`}
                onMouseEnter={() => setHoveredId(occasion.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className={`relative w-full ${getAspectRatio(occasion.size)}`}>
                  {/* Background Image */}
                  <Image
                    src={occasion.image}
                    alt={occasion.name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  
                  {/* Overlay with gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2C2A2A]/80 via-[#2C2A2A]/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500"></div>
                  
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                    {/* Icon */}
                    <div className="mb-3 transform transition-transform duration-500 group-hover:translate-y-[-4px]">
                      <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    
                    {/* Text Content */}
                    <h3 className="font-serif text-2xl md:text-3xl text-white mb-2 transform transition-transform duration-500 group-hover:translate-y-[-4px]">
                      {occasion.name}
                    </h3>
                    
                    <p className="text-white/80 text-sm mb-4 transform transition-transform duration-500 group-hover:translate-y-[-4px] max-w-[250px]">
                      {occasion.description}
                    </p>
                    
                    {/* Shop Now Button - Appears on hover */}
                    <div className={`transform transition-all duration-500 ${
                      isHovered || isMobile 
                        ? 'translate-y-0 opacity-100' 
                        : 'translate-y-4 opacity-0'
                    }`}>
                      <span className="inline-flex items-center gap-2 text-xs text-white border-b border-white/50 pb-1 group/link">
                        Shop Collection 
                        <ArrowRight className="w-3 h-3 transition-transform group-hover/link:translate-x-1" />
                      </span>
                    </div>
                  </div>

                  {/* Corner Accent */}
                  <div className="absolute top-4 right-4 w-12 h-12 border-t border-r border-white/30"></div>
                  
                  {/* Number Accent (UK style) */}
                  <div className="absolute bottom-4 right-4 text-white/20 font-serif text-4xl">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Link 
            href="/occasions" 
            className="inline-flex items-center gap-3 px-8 py-3 bg-[#2C2A2A] text-white hover:bg-[#B76E79] transition-colors duration-300 group"
          >
            <span className="text-sm tracking-wider">VIEW ALL OCCASIONS</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          
          <p className="text-xs text-[#2C2A2A]/40 mt-4">
            Free shipping on all occasion gifts • Premium packaging
          </p>
        </div>

        {/* UK-inspired Decorative Footer */}
        <div className="flex justify-center gap-4 mt-8">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i} 
              className="w-1 h-1 rounded-full bg-[#B76E79]/30"
              style={{ opacity: 0.3 + (i * 0.1) }}
            ></div>
          ))}
        </div>
      </div>
    </section>
  )
}
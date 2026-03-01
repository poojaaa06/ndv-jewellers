'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Hero() {
  // Desktop/Laptop carousel images
  const desktopImages = [
    { id: 1, src: '/final3.jpg', alt: 'Luxury jewelry 1' },
    { id: 2, src: '/desktop2.png', alt: 'Luxury jewelry 2' },
    { id: 3, src: '/desktop3.png', alt: 'Luxury jewelry 3' },
  ]

  // Mobile carousel images
  const mobileImages = [
    { id: 1, src: '/phone11.png', alt: 'Jewelry image 1' },
    { id: 2, src: '/mobile3.png', alt: 'Jewelry image 2' },
    { id: 3, src: '/mobile4.png', alt: 'Jewelry image 3' },
  ]

  const [currentDesktopSlide, setCurrentDesktopSlide] = useState(0)
  const [currentMobileSlide, setCurrentMobileSlide] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  // Autoplay for desktop
  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      setCurrentDesktopSlide((prev) => (prev + 1) % desktopImages.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [autoplay, desktopImages.length])

  // Autoplay for mobile
  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      setCurrentMobileSlide((prev) => (prev + 1) % mobileImages.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [autoplay, mobileImages.length])

  const nextDesktopSlide = () => {
    setCurrentDesktopSlide((prev) => (prev + 1) % desktopImages.length)
    setAutoplay(false)
  }

  const prevDesktopSlide = () => {
    setCurrentDesktopSlide((prev) => (prev - 1 + desktopImages.length) % desktopImages.length)
    setAutoplay(false)
  }

  const nextMobileSlide = () => {
    setCurrentMobileSlide((prev) => (prev + 1) % mobileImages.length)
    setAutoplay(false)
  }

  const prevMobileSlide = () => {
    setCurrentMobileSlide((prev) => (prev - 1 + mobileImages.length) % mobileImages.length)
    setAutoplay(false)
  }

  const goToDesktopSlide = (index: number) => {
    setCurrentDesktopSlide(index)
    setAutoplay(false)
  }

  const goToMobileSlide = (index: number) => {
    setCurrentMobileSlide(index)
    setAutoplay(false)
  }

  return (
    <section className="relative w-full bg-background overflow-hidden">
      {/* Desktop/Laptop Carousel - visible on md and above */}
      <div className="hidden md:block relative w-full">
        {/* Desktop Carousel Images */}
        <div className="relative w-full">
          {desktopImages.map((image, index) => (
            <div
              key={image.id}
              className={`${index === currentDesktopSlide ? 'block' : 'hidden'}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={1920}
                height={1080}
                className="w-full h-auto"
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        {/* Desktop Navigation Arrows */}
        <button
          onClick={prevDesktopSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/30 hover:bg-black/50 rounded-full text-white backdrop-blur-sm transition"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <button
          onClick={nextDesktopSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/30 hover:bg-black/50 rounded-full text-white backdrop-blur-sm transition"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Desktop Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {desktopImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToDesktopSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentDesktopSlide 
                  ? 'bg-white w-8' 
                  : 'bg-white/50 w-2 hover:bg-white/75'
              }`}
            />
          ))}
        </div>

        {/* Fancy Desktop Element - Progress Ring */}
       

        {/* Alternative Fancy Element - Floating Badge */}
        
      </div>

      {/* Mobile/Tablet Carousel - visible below md */}
      <div className="block md:hidden relative w-full">
        {/* Mobile Carousel Images */}
        <div className="relative w-full">
          {mobileImages.map((image, index) => (
            <div
              key={image.id}
              className={`${index === currentMobileSlide ? 'block' : 'hidden'}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={800}
                height={1200}
                className="w-full h-auto"
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        {/* Mobile Navigation Arrows */}
        <button
          onClick={prevMobileSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/30 hover:bg-black/50 rounded-full text-white backdrop-blur-sm transition"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <button
          onClick={nextMobileSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/30 hover:bg-black/50 rounded-full text-white backdrop-blur-sm transition"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Mobile Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {mobileImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToMobileSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentMobileSlide 
                  ? 'bg-white w-6' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>

        {/* Fancy Mobile Element - Crystal Badge */}
      

        {/* Alternative Mobile Element - Minimal Dot */}
      
      
      </div>
    </section>
  )
}
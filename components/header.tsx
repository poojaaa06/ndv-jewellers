'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { Menu, X, Search, ShoppingCart, User, ChevronDown } from 'lucide-react'
import Image from 'next/image'
import { useCart } from '@/context/cart-context'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
   const { itemCount } = useCart()
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Desktop menu items
  const menuItems = [
    { name: 'EARRINGS', href: '/shop?category=earrings', hasMegaMenu: true },
    { name: 'RINGS', href: '/shop?category=rings', hasMegaMenu: true },
    { name: 'NECKLACES', href: '/shop?category=necklaces', hasMegaMenu: true },
    { name: 'BRACELETS', href: '/shop?category=bracelets', hasMegaMenu: true },
    { name: 'COLLECTIONS', href: '/shop?category=collections', hasMegaMenu: true },
    { name: 'CUSTOM', href: '/custom', hasMegaMenu: false },
    { name: 'ABOUT', href: '/about', hasMegaMenu: false }
  ]

  // Mobile grid categories - ONLY the 7 main categories with images
  const mobileCategories = [
    { name: 'EARRINGS', slug: 'earrings', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
    { name: 'RINGS', slug: 'rings', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
    { name: 'NECKLACES', slug: 'necklaces', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
    { name: 'BRACELETS', slug: 'bracelets', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
    { name: 'COLLECTIONS', slug: 'collections', image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
    { name: 'CUSTOM', slug: 'customize', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
    { name: 'ABOUT', slug: 'about', image: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  ]

  // Mega menu content
  const megaMenuContent = {
    EARRINGS: {
      price: ['Under ₹50k', '₹50k - ₹1L', 'Above ₹1L'],
      styles: ['Stud', 'Drop', 'Hoop', 'Chandelier', 'Jhumka', 'Bali'],
      materials: ['14K Gold', '18K Gold', 'Platinum', 'White Gold', 'Rose Gold']
    },
    RINGS: {
      price: ['Under ₹50k', '₹50k - ₹1L', 'Above ₹1L'],
      styles: ['Solitaire', 'Stackable', 'Vintage', 'Eternity', 'Promise', 'Cocktail'],
      materials: ['14K Gold', '18K Gold', 'Platinum', 'White Gold', 'Rose Gold']
    },
    NECKLACES: {
      price: ['Under ₹50k', '₹50k - ₹1L', 'Above ₹1L'],
      styles: ['Pendant', 'Choker', 'Lariat', 'Tennis', 'Station'],
      materials: ['14K Gold', '18K Gold', 'Platinum', 'White Gold', 'Rose Gold']
    },
    BRACELETS: {
      price: ['Under ₹50k', '₹50k - ₹1L', 'Above ₹1L'],
      styles: ['Tennis', 'Bangle', 'Cuff', 'Chain', 'Charm'],
      materials: ['14K Gold', '18K Gold', 'Platinum', 'White Gold', 'Rose Gold']
    },
    COLLECTIONS: {
      price: ['Under ₹50k', '₹50k - ₹1L', 'Above ₹1L'],
      styles: ['Classic', 'Modern', 'Heritage', 'Bridal', 'Everyday'],
      materials: ['14K Gold', '18K Gold', 'Platinum', 'White Gold', 'Rose Gold']
    }
  }

  // Mega menu product previews
  const productPreviews = {
    EARRINGS: [
      { 
        src: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 
        alt: 'Diamond Drop Earrings',
        price: '₹38,000'
      }
    ],
    RINGS: [
      { 
        src: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 
        alt: 'Diamond Solitaire Ring',
        price: '₹45,000'
      }
    ],
    NECKLACES: [
      { 
        src: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 
        alt: 'Gold Pendant Necklace',
        price: '₹28,500'
      }
    ],
    BRACELETS: [
      { 
        src: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 
        alt: 'Diamond Tennis Bracelet',
        price: '₹52,000'
      }
    ],
    COLLECTIONS: [
      { 
        src: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 
        alt: 'Vaani\'s Favourite Collection',
        price: 'Starting ₹15,000'
      }
    ]
  }

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  // Handle mouse enter on nav item
  const handleMouseEnter = (itemName: string, hasMegaMenu: boolean) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    
    if (hasMegaMenu) {
      setActiveMegaMenu(itemName)
    }
  }

  // Handle mouse leave from nav item or mega menu
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null)
    }, 200)
  }

  // Handle mouse enter on mega menu
  const handleMegaMenuEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }

  // Get current products based on active menu
  const getCurrentProducts = () => {
    return productPreviews[activeMegaMenu as keyof typeof productPreviews] || productPreviews.RINGS
  }

  // Get current mega menu content
  const getCurrentContent = () => {
    return megaMenuContent[activeMegaMenu as keyof typeof megaMenuContent] || megaMenuContent.RINGS
  }

  // Helper function to create filter URLs
  const createFilterUrl = (category: string, filterType: string, filterValue: string) => {
    const baseCategory = category.toLowerCase()
    
    if (filterType === 'price') {
      const priceMap: Record<string, string> = {
        'Under ₹50k': '0-50000',
        '₹50k - ₹1L': '50000-100000',
        'Above ₹1L': '100000-200000'
      }
      return `/shop?category=${baseCategory}&${filterType}=${priceMap[filterValue] || filterValue}`
    }
    
    if (filterType === 'style') {
      return `/shop?category=${baseCategory}&${filterType}=${encodeURIComponent(filterValue)}`
    }
    
    return `/shop?category=${baseCategory}&${filterType}=${filterValue}`
  }

  return (
    <>
      <header className="w-full bg-[#faf7f2] border-b border-[#e8e0d5] shadow-sm relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <div className="relative w-14 h-14 lg:w-24 lg:h-24">
                <Image
                  src="/final-logo.png"
                  alt="NDV Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8 xl:gap-12">
              {menuItems.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.name, item.hasMegaMenu)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={item.href}
                    className="text-[#1a1a1a] hover:text-[#b89b7b] transition-colors text-sm tracking-wide font-serif relative group whitespace-nowrap flex items-center"
                    onClick={() => {
                      setActiveMegaMenu(null)
                      setMobileMenuOpen(false)
                    }}
                  >
                    {item.name}
                    {item.hasMegaMenu && (
                      <ChevronDown className={`w-3.5 h-3.5 ml-1 transition-transform duration-300 ${activeMegaMenu === item.name ? 'rotate-180' : ''}`} />
                    )}
                    <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-[#b89b7b] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </Link>
                </div>
              ))}
            </nav>

            {/* Right Icons */}
            <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
              <button className="p-1.5 sm:p-2 hover:bg-[#e8e0d5] rounded-full transition">
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-[#1a1a1a]" />
              </button>
              <Link href="/account" className="p-1.5 sm:p-2 hover:bg-[#e8e0d5] rounded-full transition">
                <User className="w-4 h-4 sm:w-5 sm:h-5 text-[#1a1a1a]" />
              </Link>
            <Link href="/cart" className="p-1.5 sm:p-2 hover:bg-[#e8e0d5] rounded-full transition relative group">
  <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-[#1a1a1a]" />
  {itemCount > 0 && (
    <>
      <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-primary rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold text-primary-foreground animate-in zoom-in">
        {itemCount > 9 ? '9+' : itemCount}
      </span>
      <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        View Cart
      </span>
    </>
  )}
</Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-1.5 sm:p-2 hover:bg-[#e8e0d5] rounded-full transition"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 sm:w-6 sm:h-6 text-[#1a1a1a]" />
                ) : (
                  <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-[#1a1a1a]" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mega Menu - Full Width */}
        {activeMegaMenu && menuItems.find(item => item.name === activeMegaMenu)?.hasMegaMenu && (
          <div 
            className="absolute left-0 right-0 top-full w-full bg-[#faf7f2] shadow-xl border-t border-[#e8e0d5] z-40"
            onMouseEnter={handleMegaMenuEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="flex gap-8">
                {/* Text Columns */}
                <div className="flex-1 grid grid-cols-3 gap-8">
                  {/* SHOP BY PRICE */}
                  <div>
                    <h3 className="font-serif text-[#b89b7b] text-sm mb-4 tracking-wider font-semibold">SHOP BY PRICE</h3>
                    <ul className="space-y-2">
                      {getCurrentContent().price.map((price, index) => (
                        <li key={index}>
                          <Link 
                            href={createFilterUrl(activeMegaMenu, 'price', price)}
                            className="text-[#1a1a1a] hover:text-[#b89b7b] text-sm"
                            onClick={() => setActiveMegaMenu(null)}
                          >
                            {price}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* SHOP BY STYLE */}
                  <div>
                    <h3 className="font-serif text-[#b89b7b] text-sm mb-4 tracking-wider font-semibold">SHOP BY STYLE</h3>
                    <ul className="space-y-2">
                      {getCurrentContent().styles.map((style, index) => (
                        <li key={index}>
                          <Link 
                            href={createFilterUrl(activeMegaMenu, 'style', style)}
                            className="text-[#1a1a1a] hover:text-[#b89b7b] text-sm"
                            onClick={() => setActiveMegaMenu(null)}
                          >
                            {style}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* SHOP BY MATERIAL */}
                  <div>
                    <h3 className="font-serif text-[#b89b7b] text-sm mb-4 tracking-wider font-semibold">SHOP BY MATERIAL</h3>
                    <ul className="space-y-2">
                      {getCurrentContent().materials.map((material, index) => (
                        <li key={index}>
                          <Link 
                            href={createFilterUrl(activeMegaMenu, 'metal', material)}
                            className="text-[#1a1a1a] hover:text-[#b89b7b] text-sm"
                            onClick={() => setActiveMegaMenu(null)}
                          >
                            {material}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Product Previews */}
                <div className="w-56">
                  {getCurrentProducts().map((product, index) => (
                    <Link 
                      key={index} 
                      href={`/product/${product.alt.toLowerCase().replace(/\s+/g, '-')}`}
                      className="group cursor-pointer block"
                      onClick={() => setActiveMegaMenu(null)}
                    >
                      <div className="relative w-full h-64 bg-[#f5f0e8] rounded-lg overflow-hidden shadow-md">
                        <Image
                          src={product.src}
                          alt={product.alt}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="224px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                      <div className="mt-3 text-center">
                        <p className="text-sm text-[#1a1a1a] font-serif">{product.alt}</p>
                        <p className="text-xs text-[#b89b7b] mt-1">{product.price}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Full-Screen Menu - PRESERVED ORIGINAL STYLE with images, but only 7 categories */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 lg:hidden bg-[#faf7f2] z-40 overflow-y-auto">
          <div className="pt-6 px-4 sm:px-6 pb-8">
            {/* Account Icons at top of mobile menu */}
          
            
            {/* Grid Category Cards - ONLY 7 categories, with original styling preserved */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-5">
              {mobileCategories.map((category) => (
                <Link
                  key={category.name}
                  href={category.slug === 'customize' ? '/custom' : category.slug === 'about' ? '/about' : `/shop?category=${category.slug}`}
                  className="relative group overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-shadow"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="relative w-full aspect-video">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <span className="text-white font-serif text-sm sm:text-base font-medium drop-shadow-lg">
                        {category.name}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
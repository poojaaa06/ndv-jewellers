'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShoppingBag, Heart } from 'lucide-react'
import { useState, useEffect } from 'react'
import { products, Product } from '@/lib/data'
import { useWishlist } from '@/context/wishlist-context'
import { useCart } from '@/context/cart-context'

interface ProductGridProps {
  category?: string
  filters?: any
  searchQuery?: string
}

const colorSwatches: Record<string, string> = {
  White: '#F5F0EB', Yellow: '#E8C547', Rose: '#E8A598', Champagne: '#C9A96E',
}

export default function ProductGrid({ category, filters = {}, searchQuery }: ProductGridProps) {
  const [sortBy, setSortBy] = useState('newest')
  const { toggleItem, isWishlisted } = useWishlist()
  const { addItem } = useCart()

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [visibleCount, setVisibleCount] = useState(8)
  const [activeTab, setActiveTab] = useState<'all' | 'bestselling' | 'new'>('all')
  const handleAddToBag = (e: React.MouseEvent, product: Product) => {
  e.preventDefault()
  e.stopPropagation()
  
  addItem({
    id: product.id,
    name: product.name,
    slug: product.slug,
    price: product.price,
    originalPrice: product.originalPrice,
    image: product.images[0],
    category: product.category,
    metal: product.metal,
    color: product.color
  })
  
  // Optional: Show a toast or feedback
}

  useEffect(() => {
    let filtered = [...products]

    if (category) {
      const categoryMap: Record<string, string> = {
        rings: 'Rings', earrings: 'Earrings', necklaces: 'Necklaces',
        bracelets: 'Bracelets', pendants: 'Pendants', bangles: 'Bangles',
        men: 'Mens', mens: 'Mens', collections: 'Collections',
      }
      const mapped = categoryMap[category.toLowerCase()]
      if (mapped) filtered = filtered.filter(p => p.category === mapped)
    }

    if (activeTab === 'bestselling') filtered = filtered.filter(p => p.isBestSeller)
    if (activeTab === 'new') filtered = filtered.filter(p => p.isNew)

    if (Object.keys(filters).length > 0) {
      Object.entries(filters).forEach(([key, values]) => {
        if (!values || !Array.isArray(values) || values.length === 0) return
        if (key === 'price') {
          filtered = filtered.filter(p => (values as string[]).some(r => {
            if (r === '0-50000') return p.price < 50000
            if (r === '50000-100000') return p.price >= 50000 && p.price < 100000
            if (r === '100000-200000') return p.price >= 100000 && p.price < 200000
            if (r === '200000-300000') return p.price >= 200000 && p.price < 300000
            if (r === '300000-above') return p.price >= 300000
            return false
          }))
        } else if (key === 'style') filtered = filtered.filter(p => (values as string[]).some(s => p.style.includes(s)))
        else if (key === 'metal') filtered = filtered.filter(p => (values as string[]).includes(p.metal))
        else if (key === 'color') filtered = filtered.filter(p => (values as string[]).includes(p.color))
        else if (key === 'occasion') filtered = filtered.filter(p => (values as string[]).includes(p.occasion))
      })
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) ||
        p.style.some(s => s.toLowerCase().includes(q))
      )
    }

    switch (sortBy) {
      case 'price-asc': filtered.sort((a, b) => a.price - b.price); break
      case 'price-desc': filtered.sort((a, b) => b.price - a.price); break
      case 'newest': filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break
      case 'popular': filtered.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0)); break
    }

    setFilteredProducts(filtered)
    setVisibleCount(8)
  }, [category, filters, searchQuery, sortBy, activeTab])

  const handleWishlistToggle = (e: React.MouseEvent, product: Product) => {
  e.preventDefault()
  e.stopPropagation()
  
  toggleItem({
    id: product.id,
    name: product.name,
    slug: product.slug,
    price: product.price,
    originalPrice: product.originalPrice,
    image: product.images[0],
    category: product.category
  })
}

  const fmt = (p: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(p)

  const visible = filteredProducts.slice(0, visibleCount)

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="space-y-3">
        {/* Tabs - scrollable on mobile */}
        <div className="flex items-center gap-1 bg-muted/50 rounded-full p-1 w-fit max-w-full overflow-x-auto scrollbar-none">
          {(['all', 'bestselling', 'new'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all flex-shrink-0 ${
                activeTab === tab ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab === 'all' ? 'All Jewellery' : tab === 'bestselling' ? 'Bestselling' : 'New Arrivals'}
            </button>
          ))}
        </div>

        {/* Count + Sort row */}
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">{filteredProducts.length}</span> products
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-foreground/50 hidden sm:block">Sort by</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="text-xs px-2.5 py-1.5 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="newest">Featured</option>
              <option value="price-asc">Price ↑</option>
              <option value="price-desc">Price ↓</option>
              <option value="popular">Popular</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid — 2 cols on mobile, 3 on lg */}
      {visible.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-sm text-muted-foreground">No products match your filters.</p>
          <button onClick={() => window.location.href = '/shop'} className="mt-3 text-xs text-primary underline">
            View all products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {visible.map(product => (
            <div key={product.id} className="group relative">
              <Link href={`/product/${product.slug}`}>
                {/* Image - REMOVED rounded-xl, now it's square */}
                <div className="relative aspect-square bg-muted/40 overflow-hidden mb-2.5 cursor-pointer">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-700 ease-out"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />

                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
                    {product.originalPrice && (
                      <div className="bg-primary text-primary-foreground text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </div>
                    )}
                    {product.isNew && !product.originalPrice && (
                      <div className="bg-foreground text-background text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                        NEW
                      </div>
                    )}
                  </div>

                  {/* Wishlist button - always visible on mobile, hover on desktop */}
               <button
  onClick={(e) => handleWishlistToggle(e, product)}
  className="absolute top-2 right-2 w-7 h-7 sm:w-8 sm:h-8 bg-white/90 rounded-full flex items-center justify-center shadow-sm sm:opacity-0 sm:group-hover:opacity-100 transition-opacity z-10 hover:bg-white"
>
  <Heart className={`w-3.5 h-3.5 transition-all ${isWishlisted(product.id) ? 'fill-primary text-primary scale-110' : 'text-foreground/70'}`} />
</button>

                  {/* Add to bag - DESKTOP ONLY (hidden on mobile) */}
                  <div className="hidden sm:block absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
                  <button
  onClick={(e) => handleAddToBag(e, product)}
  className="w-full bg-primary/95 text-primary-foreground py-2.5 flex items-center justify-center gap-1.5 text-xs font-semibold hover:bg-primary transition"
>
  <ShoppingBag className="w-3.5 h-3.5" />
  <span>Add to Bag</span>
</button>
                  </div>
                </div>
              </Link>

              {/* Info */}
              <div className="px-0.5 space-y-1.5">
                <Link href={`/product/${product.slug}`}>
                  <h3 className="text-[12px] sm:text-[13px] font-medium text-foreground hover:text-primary transition line-clamp-2 leading-snug">
                    {product.name}
                  </h3>
                </Link>

                {/* Color swatches */}
                <div className="flex items-center gap-1">
                  {(['White', 'Yellow', 'Rose'] as const).map(c => (
                    <span
                      key={c}
                      className={`w-3.5 h-3.5 rounded-full border transition ${product.color === c ? 'border-primary ring-1 ring-primary ring-offset-1' : 'border-black/10 opacity-50'}`}
                      style={{ backgroundColor: colorSwatches[c] }}
                      title={c}
                    />
                  ))}
                </div>

                {/* Price */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-xs sm:text-sm font-bold text-foreground">{fmt(product.price)}</span>
                  {product.originalPrice && (
                    <span className="text-[10px] sm:text-xs text-muted-foreground line-through">{fmt(product.originalPrice)}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Load More */}
      {visibleCount < filteredProducts.length && (
        <div className="text-center pt-4">
          <button
            onClick={() => setVisibleCount(p => Math.min(p + 8, filteredProducts.length))}
            className="px-6 py-2.5 border border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full text-sm font-semibold transition"
          >
            Load More ({filteredProducts.length - visibleCount} remaining)
          </button>
        </div>
      )}
    </div>
  )
}
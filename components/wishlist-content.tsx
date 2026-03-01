'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Heart, ShoppingBag, Trash2, X } from 'lucide-react'
import { useWishlist } from '@/context/wishlist-context'
import { useCart } from '@/context/cart-context'
import { useState } from 'react'

export default function WishlistContent() {
  const { items, removeItem, itemCount } = useWishlist()
  const { addItem } = useCart()
  const [addedToCart, setAddedToCart] = useState<number | null>(null)

  const fmt = (p: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(p)

  const handleAddToCart = (item: any) => {
    addItem({
      id: item.id,
      name: item.name,
      slug: item.slug,
      price: item.price,
      originalPrice: item.originalPrice,
      image: item.image,
      category: item.category,
      metal: item.metal,
      color: item.color
    })
    
    setAddedToCart(item.id)
    setTimeout(() => setAddedToCart(null), 2000)
  }

  if (items.length === 0) {
    return (
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-md mx-auto">
            <div className="w-24 h-24 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-muted-foreground/40" />
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-3">
              Your Wishlist is Empty
            </h2>
            <p className="text-muted-foreground mb-8 text-sm">
              Save your favorite pieces and come back to them anytime.
              Start exploring our collection!
            </p>
            <Link 
              href="/shop" 
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-accent transition text-sm sm:text-base"
            >
              Explore Jewelry
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
              My Wishlist
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {itemCount} {itemCount === 1 ? 'item' : 'items'} saved
            </p>
          </div>
          <Link 
            href="/shop" 
            className="text-sm text-primary hover:text-accent transition font-medium"
          >
            Continue Shopping →
          </Link>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {items.map(item => (
            <div key={item.id} className="group relative bg-card rounded-xl border border-border/60 overflow-hidden hover:shadow-lg transition-shadow">
              
              {/* Remove Button */}
              <button
                onClick={() => removeItem(item.id)}
                className="absolute top-2 right-2 z-10 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
              >
                <X className="w-4 h-4 text-foreground/70" />
              </button>

              {/* Image */}
              <Link href={`/product/${item.slug}`} className="block">
                <div className="relative aspect-square bg-muted/20 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  
                  {/* Badge */}
                  {item.originalPrice && (
                    <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-1 rounded-full">
                      {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                    </div>
                  )}
                </div>
              </Link>

              {/* Content */}
              <div className="p-4 space-y-3">
                <Link href={`/product/${item.slug}`}>
                  <h3 className="font-serif text-base font-semibold text-foreground hover:text-primary transition line-clamp-2">
                    {item.name}
                  </h3>
                </Link>

                {/* Metal/Color tags */}
                {(item.metal || item.color) && (
                  <div className="flex flex-wrap gap-1">
                    {item.metal && (
                      <span className="text-[10px] bg-muted/50 px-2 py-0.5 rounded text-muted-foreground">
                        {item.metal}
                      </span>
                    )}
                    {item.color && (
                      <span className="text-[10px] bg-muted/50 px-2 py-0.5 rounded text-muted-foreground">
                        {item.color}
                      </span>
                    )}
                  </div>
                )}

                {/* Price */}
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-bold text-foreground">{fmt(item.price)}</span>
                  {item.originalPrice && (
                    <span className="text-xs text-muted-foreground line-through">
                      {fmt(item.originalPrice)}
                    </span>
                  )}
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => handleAddToCart(item)}
                  className={`w-full py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
                    addedToCart === item.id
                      ? 'bg-green-600 text-white'
                      : 'bg-primary text-primary-foreground hover:bg-accent'
                  }`}
                >
                  {addedToCart === item.id ? (
                    <>✓ Added to Cart</>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      Add to Cart
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
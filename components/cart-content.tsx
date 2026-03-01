'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Trash2, Plus, Minus, Heart, ShoppingBag, ChevronRight } from 'lucide-react'
import { useCart } from '@/context/cart-context'
import { useWishlist } from '@/context/wishlist-context'
import { useState } from 'react'

export default function CartContent() {
  const { items, removeItem, updateQuantity, subtotal, savings, tax, total, itemCount } = useCart()
  const { toggleItem, isWishlisted } = useWishlist()
  const [showWishlistPrompt, setShowWishlistPrompt] = useState<number | null>(null)

  const fmt = (p: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(p)

  const handleMoveToWishlist = (item: any) => {
    toggleItem({
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
    removeItem(item.id, { metal: item.metal, size: item.size })
    setShowWishlistPrompt(item.id)
    setTimeout(() => setShowWishlistPrompt(null), 2000)
  }

  if (items.length === 0) {
    return (
      <section className="py-8 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="w-16 h-16 sm:w-24 sm:h-24 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-8 h-8 sm:w-12 sm:h-12 text-muted-foreground/40" />
            </div>
            <h2 className="font-serif text-xl sm:text-3xl font-bold text-foreground mb-2">
              Your Cart is Empty
            </h2>
            <p className="text-muted-foreground text-xs sm:text-sm mb-6 max-w-xs mx-auto">
              Looks like you haven't added anything yet.
            </p>
            <Link 
              href="/shop" 
              className="inline-flex items-center justify-center px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-accent transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-4 sm:py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="font-serif text-lg sm:text-2xl font-bold text-foreground">
              Shopping Cart <span className="text-sm font-normal text-muted-foreground ml-1">({itemCount})</span>
            </h1>
          </div>
          <Link href="/shop" className="text-xs text-primary hover:text-accent transition font-medium flex items-center">
            Continue Shopping <ChevronRight className="w-3 h-3 ml-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-3">
            {items.map(item => {
              const itemKey = `${item.id}-${item.metal || ''}-${item.size || ''}`
              const showPrompt = showWishlistPrompt === item.id
              
              return (
                <div key={itemKey} className="bg-card rounded-lg border border-border/60 p-3 relative">
                  
                  {/* Success Message */}
                  {showPrompt && (
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-green-600 text-white text-[10px] py-1 px-3 rounded-full shadow-lg z-10 whitespace-nowrap">
                      ✨ Moved to wishlist
                    </div>
                  )}

                  {/* Compact Layout */}
                  <div className="flex gap-3">
                    
                    {/* Image */}
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-muted/30 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      {/* Top Row */}
                      <div className="flex justify-between items-start gap-1 mb-1">
                        <Link 
                          href={`/product/${item.slug}`}
                          className="font-serif text-sm font-semibold text-foreground hover:text-primary transition line-clamp-2 flex-1"
                        >
                          {item.name}
                        </Link>
                        <div className="text-right flex-shrink-0">
                          <p className="font-bold text-sm text-foreground whitespace-nowrap">
                            {fmt(item.price * item.quantity)}
                          </p>
                          {item.originalPrice && item.originalPrice > item.price && (
                            <p className="text-[10px] text-muted-foreground line-through">
                              {fmt(item.originalPrice * item.quantity)}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Variants */}
                      <div className="flex flex-wrap gap-1 mb-2">
                        {item.metal && (
                          <span className="text-[9px] bg-muted/50 px-1.5 py-0.5 rounded text-muted-foreground">
                            {item.metal}
                          </span>
                        )}
                        {item.color && (
                          <span className="text-[9px] bg-muted/50 px-1.5 py-0.5 rounded text-muted-foreground">
                            {item.color}
                          </span>
                        )}
                        {item.size && (
                          <span className="text-[9px] bg-muted/50 px-1.5 py-0.5 rounded text-muted-foreground">
                            Size: {item.size}
                          </span>
                        )}
                      </div>

                      {/* Actions Row */}
                      <div className="flex items-center justify-between mt-1">
                        {/* Quantity */}
                        <div className="flex items-center border border-border rounded-md">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1, { metal: item.metal, size: item.size })}
                            className="w-7 h-7 flex items-center justify-center hover:bg-muted transition text-foreground"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-2.5 h-2.5" />
                          </button>
                          <span className="w-6 text-center text-xs font-semibold text-foreground">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1, { metal: item.metal, size: item.size })}
                            className="w-7 h-7 flex items-center justify-center hover:bg-muted transition text-foreground"
                          >
                            <Plus className="w-2.5 h-2.5" />
                          </button>
                        </div>

                        {/* Action Icons */}
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleMoveToWishlist(item)}
                            className={`p-1.5 rounded-md transition ${
                              isWishlisted(item.id)
                                ? 'text-primary bg-primary/5'
                                : 'text-muted-foreground hover:text-primary hover:bg-muted/50'
                            }`}
                          >
                            <Heart className={`w-3.5 h-3.5 ${isWishlisted(item.id) ? 'fill-primary' : ''}`} />
                          </button>
                          
                          <button
                            onClick={() => removeItem(item.id, { metal: item.metal, size: item.size })}
                            className="p-1.5 text-destructive hover:bg-destructive/10 rounded-md transition"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Save Badge */}
                      {item.originalPrice && item.originalPrice > item.price && (
                        <div className="mt-2">
                          <span className="inline-block bg-primary/10 text-primary text-[8px] font-semibold px-1.5 py-0.5 rounded-full">
                            Save {fmt(item.originalPrice - item.price)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}

            {/* Free Shipping Progress */}
            {subtotal < 50000 && (
              <div className="bg-primary/5 rounded-lg p-3">
                <p className="text-xs text-foreground/70">
                  Add <span className="font-semibold text-primary">{fmt(50000 - subtotal)}</span> more for{' '}
                  <span className="font-semibold text-primary">FREE SHIPPING</span>
                </p>
                <div className="w-full bg-muted/50 h-1 rounded-full mt-2 overflow-hidden">
                  <div 
                    className="bg-primary h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((subtotal / 50000) * 100, 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Order Summary - Normal Flow on Mobile */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg border border-border/60 p-4">
              <h3 className="font-serif text-base font-bold text-foreground mb-3">Order Summary</h3>

              {/* Summary Items */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold text-foreground">{fmt(subtotal)}</span>
                </div>
                
                {savings > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Savings</span>
                    <span className="font-semibold">-{fmt(savings)}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax (18% GST)</span>
                  <span className="font-semibold text-foreground">{fmt(tax)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-primary font-semibold">
                    {subtotal >= 50000 ? 'FREE' : '₹500'}
                  </span>
                </div>

                <div className="border-t border-border/60 pt-2 mt-2">
                  <div className="flex justify-between text-base font-bold">
                    <span>Total</span>
                    <span className="text-primary">
                      {fmt(subtotal >= 50000 ? total : total + 500)}
                    </span>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-0.5 text-right">
                    Inclusive of taxes
                  </p>
                </div>
              </div>

              {/* Checkout Button */}
              <Link 
                href="/checkout" 
                className="block w-full bg-primary text-primary-foreground py-3.5 rounded-lg font-semibold hover:bg-accent transition text-center text-sm mt-4"
              >
                Proceed to Checkout
              </Link>

              {/* Trust Badges - Mobile Friendly Compact */}
              <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-border/40">
                <div className="text-center">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-1">
                    <ShoppingBag className="w-3 h-3 text-primary" />
                  </div>
                  <p className="text-[9px] text-muted-foreground leading-tight">Secure Payment</p>
                </div>
                <div className="text-center">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-1">
                    <Heart className="w-3 h-3 text-primary" />
                  </div>
                  <p className="text-[9px] text-muted-foreground leading-tight">30-Day Returns</p>
                </div>
                <div className="text-center">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-1">
                    <ShoppingBag className="w-3 h-3 text-primary" />
                  </div>
                  <p className="text-[9px] text-muted-foreground leading-tight">Lifetime Warranty</p>
                </div>
              </div>
            </div>

            {/* Continue Shopping Link - Mobile Only */}
            <div className="mt-4 text-center lg:hidden">
              <Link href="/shop" className="text-xs text-muted-foreground hover:text-primary transition">
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
'use client'

import { ReactNode } from 'react'
import { CartProvider } from './cart-context'
import { WishlistProvider } from './wishlist-context'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <WishlistProvider>
        {children}
      </WishlistProvider>
    </CartProvider>
  )
}
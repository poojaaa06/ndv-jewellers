'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { WishlistItem, WishlistContextType } from '@/lib/types'

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([])

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist')
    if (savedWishlist) {
      try {
        setItems(JSON.parse(savedWishlist))
      } catch (e) {
        console.error('Failed to parse wishlist from localStorage')
      }
    }
  }, [])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(items))
  }, [items])

  const addItem = (item: WishlistItem) => {
    setItems(currentItems => {
      if (currentItems.some(i => i.id === item.id)) {
        return currentItems
      }
      return [...currentItems, item]
    })
  }

  const removeItem = (id: number) => {
    setItems(currentItems => currentItems.filter(item => item.id !== id))
  }

  const toggleItem = (item: WishlistItem) => {
    setItems(currentItems => {
      const exists = currentItems.some(i => i.id === item.id)
      if (exists) {
        return currentItems.filter(i => i.id !== item.id)
      } else {
        return [...currentItems, item]
      }
    })
  }

  const isWishlisted = (id: number) => {
    return items.some(item => item.id === id)
  }

  const itemCount = items.length

  return (
    <WishlistContext.Provider value={{
      items,
      addItem,
      removeItem,
      toggleItem,
      isWishlisted,
      itemCount
    }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}
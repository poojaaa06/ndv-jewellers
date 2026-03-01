'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { CartItem, CartContextType } from '@/lib/types'

const CartContext = createContext<CartContextType | undefined>(undefined)

// Helper to generate unique key for cart items with options
const getItemKey = (id: number, metal?: string, size?: string | number) => {
  return `${id}-${metal || ''}-${size || ''}`
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (e) {
        console.error('Failed to parse cart from localStorage')
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items))
  }, [items])

  const addItem = (newItem: Omit<CartItem, 'quantity'>) => {
    setItems(currentItems => {
      const existingItemIndex = currentItems.findIndex(item => 
        item.id === newItem.id && 
        item.metal === newItem.metal && 
        item.size === newItem.size &&
        item.color === newItem.color
      )

      if (existingItemIndex > -1) {
        // Update quantity if item exists with same options
        const updatedItems = [...currentItems]
        updatedItems[existingItemIndex].quantity += 1
        return updatedItems
      } else {
        // Add new item with quantity 1
        return [...currentItems, { ...newItem, quantity: 1 }]
      }
    })
  }

  const removeItem = (id: number, options?: { metal?: string; size?: string | number }) => {
    setItems(currentItems => 
      currentItems.filter(item => 
        !(item.id === id && 
          item.metal === options?.metal && 
          item.size === options?.size)
      )
    )
  }

  const updateQuantity = (id: number, quantity: number, options?: { metal?: string; size?: string | number }) => {
    if (quantity < 1) return
    
    setItems(currentItems =>
      currentItems.map(item =>
        item.id === id && item.metal === options?.metal && item.size === options?.size
          ? { ...item, quantity }
          : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
  }

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const savings = items.reduce((sum, item) => 
    sum + ((item.originalPrice || item.price) - item.price) * item.quantity, 0
  )
  const tax = Math.round(subtotal * 0.18) // 18% GST
  const total = subtotal + tax
  const itemCount = items.reduce((count, item) => count + item.quantity, 0)

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      itemCount,
      subtotal,
      savings,
      tax,
      total
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
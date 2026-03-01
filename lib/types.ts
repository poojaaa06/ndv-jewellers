export interface CartItem {
  id: number
  name: string
  slug: string
  price: number
  originalPrice?: number
  quantity: number
  image: string
  metal?: string
  color?: string
  size?: string | number
  carats?: string
  category: string
}

export interface WishlistItem {
  id: number
  name: string
  slug: string
  price: number
  originalPrice?: number
  image: string
  category: string
  metal?: string
  color?: string
}

export interface CartContextType {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: number, options?: { metal?: string; size?: string | number }) => void
  updateQuantity: (id: number, quantity: number, options?: { metal?: string; size?: string | number }) => void
  clearCart: () => void
  itemCount: number
  subtotal: number
  savings: number
  tax: number
  total: number
}

export interface WishlistContextType {
  items: WishlistItem[]
  addItem: (item: WishlistItem) => void
  removeItem: (id: number) => void
  toggleItem: (item: WishlistItem) => void
  isWishlisted: (id: number) => boolean
  itemCount: number
}
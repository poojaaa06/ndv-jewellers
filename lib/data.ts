export interface Product {
  id: number
  name: string
  slug: string
  category: string
  subCategory?: string
  price: number
  originalPrice?: number
  images: string[]
  metal: '14K Gold' | '18K Gold' | 'Platinum' | 'White Gold' | 'Rose Gold'
  color: 'White' | 'Yellow' | 'Rose' | 'Champagne'
  style: string[]
  occasion: 'Engagement' | 'Wedding' | 'Anniversary' | 'Everyday' | 'Party' | 'Gift'
  inStock: boolean
  isNew?: boolean
  isBestSeller?: boolean
}

// User-friendly categories
export const categories = [
  { name: 'Rings', slug: 'rings', count: 24, image: '/ring.png' },
  { name: 'Earrings', slug: 'earrings', count: 32, image: '/earring.png' },
  { name: 'Necklaces', slug: 'necklaces', count: 28, image: '/necklace.png' },
  { name: 'Bracelets', slug: 'bracelets', count: 18, image: '/bracelet.png' },
  { name: 'Pendants', slug: 'pendants', count: 22, image: '/pendant.png' },
  { name: 'Bangles', slug: 'bangles', count: 15, image: '/bangle.png' },
  { name: 'Mens', slug: 'men', count: 12, image: '/men.png' }
]

// Filter options that users actually care about - MAKE SURE THIS IS EXPORTED
export const filterOptions = {
  price: [
    { label: 'Under ₹50,000', value: '0-50000' },
    { label: '₹50,000 - ₹1,00,000', value: '50000-100000' },
    { label: '₹1,00,000 - ₹2,00,000', value: '100000-200000' },
    { label: '₹2,00,000 - ₹3,00,000', value: '200000-300000' },
    { label: 'Above ₹3,00,000', value: '300000-above' }
  ],
  
  metal: [
    { label: '14K Gold', value: '14K Gold' },
    { label: '18K Gold', value: '18K Gold' },
    { label: 'Platinum', value: 'Platinum' },
    { label: 'White Gold', value: 'White Gold' },
    { label: 'Rose Gold', value: 'Rose Gold' }
  ],
  
  color: [
    { label: 'White', value: 'White' },
    { label: 'Yellow', value: 'Yellow' },
    { label: 'Rose', value: 'Rose' },
    { label: 'Champagne', value: 'Champagne' }
  ],
  
  occasion: [
    { label: 'Engagement', value: 'Engagement' },
    { label: 'Wedding', value: 'Wedding' },
    { label: 'Anniversary', value: 'Anniversary' },
    { label: 'Everyday Wear', value: 'Everyday' },
    { label: 'Party', value: 'Party' },
    { label: 'Gift', value: 'Gift' }
  ],
  
  style: [
    { label: 'Solitaire', value: 'Solitaire' },
    { label: 'Halo', value: 'Halo' },
    { label: 'Vintage', value: 'Vintage' },
    { label: 'Modern', value: 'Modern' },
    { label: 'Classic', value: 'Classic' },
    { label: 'Statement', value: 'Statement' },
    { label: 'Minimalist', value: 'Minimalist' },
    { label: 'Stud', value: 'Stud' },
    { label: 'Drop', value: 'Drop' },
    { label: 'Hoop', value: 'Hoop' },
    { label: 'Chandelier', value: 'Chandelier' },
    { label: 'Jhumka', value: 'Jhumka' },
    { label: 'Tennis', value: 'Tennis' },
    { label: 'Bangle', value: 'Bangle' },
    { label: 'Cuff', value: 'Cuff' },
    { label: 'Pendant', value: 'Pendant' },
    { label: 'Choker', value: 'Choker' },
    { label: 'Lariat', value: 'Lariat' },
    { label: 'Stackable', value: 'Stackable' },
    { label: 'Eternity', value: 'Eternity' },
    { label: 'Promise', value: 'Promise' },
    { label: 'Cocktail', value: 'Cocktail' },
    { label: 'Signet', value: 'Signet' },
    { label: 'Chain', value: 'Chain' }
  ]
}


// Make sure style is properly populated in all products
export const products: Product[] = [
  // Rings
  {
    id: 1,
    name: 'Classic Solitaire Engagement Ring',
    slug: 'classic-solitaire-engagement-ring',
    category: 'Rings',
    subCategory: 'Engagement',
    price: 245000,
    originalPrice: 275000,
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop',
    ],
    metal: 'Platinum',
    color: 'White',
    style: ['Solitaire', 'Classic', 'Engagement'], // Added more styles
    occasion: 'Engagement',
    inStock: true,
    isBestSeller: true
  },
  {
    id: 2,
    name: 'Vintage Halo Diamond Ring',
    slug: 'vintage-halo-diamond-ring',
    category: 'Rings',
    subCategory: 'Engagement',
    price: 325000,
    originalPrice: 350000,
    images: [
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&auto=format&fit=crop',
    ],
    metal: '18K Gold',
    color: 'Yellow',
    style: ['Halo', 'Vintage', 'Engagement'],
    occasion: 'Engagement',
    inStock: true
  },
  {
    id: 3,
    name: 'Modern Eternity Band',
    slug: 'modern-eternity-band',
    category: 'Rings',
    subCategory: 'Wedding',
    price: 185000,
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop',
    ],
    metal: '14K Gold',
    color: 'White',
    style: ['Modern', 'Minimalist', 'Wedding'],
    occasion: 'Wedding',
    inStock: true,
    isNew: true
  },
  {
    id: 15,
    name: 'Stackable Diamond Ring Set',
    slug: 'stackable-diamond-ring-set',
    category: 'Rings',
    price: 145000,
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop',
    ],
    metal: 'Rose Gold',
    color: 'Rose',
    style: ['Stackable', 'Modern', 'Everyday'],
    occasion: 'Everyday',
    inStock: true
  },
  {
    id: 16,
    name: 'Cocktail Statement Ring',
    slug: 'cocktail-statement-ring',
    category: 'Rings',
    price: 285000,
    images: [
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&auto=format&fit=crop',
    ],
    metal: 'White Gold',
    color: 'White',
    style: ['Cocktail', 'Statement', 'Party'],
    occasion: 'Party',
    inStock: true,
    isNew: true
  },
  
  // Earrings
  {
    id: 4,
    name: 'Diamond Stud Earrings',
    slug: 'diamond-stud-earrings',
    category: 'Earrings',
    price: 145000,
    originalPrice: 165000,
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop',
    ],
    metal: 'Platinum',
    color: 'White',
    style: ['Stud', 'Classic', 'Everyday'],
    occasion: 'Everyday',
    inStock: true,
    isBestSeller: true
  },
  {
    id: 5,
    name: 'Chandelier Diamond Earrings',
    slug: 'chandelier-diamond-earrings',
    category: 'Earrings',
    price: 285000,
    originalPrice: 320000,
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&auto=format&fit=crop',
    ],
    metal: '18K Gold',
    color: 'Yellow',
    style: ['Chandelier', 'Statement', 'Party'],
    occasion: 'Party',
    inStock: true
  },
  {
    id: 6,
    name: 'Hoop Diamond Earrings',
    slug: 'hoop-diamond-earrings',
    category: 'Earrings',
    price: 195000,
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&auto=format&fit=crop',
    ],
    metal: 'White Gold',
    color: 'White',
    style: ['Hoop', 'Modern', 'Everyday'],
    occasion: 'Everyday',
    inStock: true
  },
  {
    id: 17,
    name: 'Jhumka Diamond Earrings',
    slug: 'jhumka-diamond-earrings',
    category: 'Earrings',
    price: 225000,
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop',
    ],
    metal: '18K Gold',
    color: 'Yellow',
    style: ['Jhumka', 'Traditional', 'Wedding'],
    occasion: 'Wedding',
    inStock: true
  },
  {
    id: 18,
    name: 'Drop Diamond Earrings',
    slug: 'drop-diamond-earrings',
    category: 'Earrings',
    price: 165000,
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&auto=format&fit=crop',
    ],
    metal: 'Platinum',
    color: 'White',
    style: ['Drop', 'Elegant', 'Anniversary'],
    occasion: 'Anniversary',
    inStock: true
  },
  
  // Necklaces
  {
    id: 7,
    name: 'Solitaire Diamond Pendant',
    slug: 'solitaire-diamond-pendant',
    category: 'Necklaces',
    subCategory: 'Pendants',
    price: 165000,
    originalPrice: 180000,
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop',
    ],
    metal: '14K Gold',
    color: 'Rose',
    style: ['Solitaire', 'Pendant', 'Classic'],
    occasion: 'Anniversary',
    inStock: true,
    isBestSeller: true
  },
  {
    id: 8,
    name: 'Diamond Tennis Necklace',
    slug: 'diamond-tennis-necklace',
    category: 'Necklaces',
    price: 425000,
    originalPrice: 475000,
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&auto=format&fit=crop',
    ],
    metal: 'Platinum',
    color: 'White',
    style: ['Tennis', 'Classic', 'Statement'],
    occasion: 'Party',
    inStock: true
  },
  {
    id: 19,
    name: 'Choker Diamond Necklace',
    slug: 'choker-diamond-necklace',
    category: 'Necklaces',
    price: 195000,
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop',
    ],
    metal: 'White Gold',
    color: 'White',
    style: ['Choker', 'Modern', 'Party'],
    occasion: 'Party',
    inStock: true,
    isNew: true
  },
  {
    id: 20,
    name: 'Lariat Diamond Necklace',
    slug: 'lariat-diamond-necklace',
    category: 'Necklaces',
    price: 235000,
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&auto=format&fit=crop',
    ],
    metal: '18K Gold',
    color: 'Yellow',
    style: ['Lariat', 'Elegant', 'Anniversary'],
    occasion: 'Anniversary',
    inStock: true
  },
  
  // Bracelets
  {
    id: 9,
    name: 'Diamond Tennis Bracelet',
    slug: 'diamond-tennis-bracelet',
    category: 'Bracelets',
    price: 350000,
    originalPrice: 390000,
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&auto=format&fit=crop',
    ],
    metal: 'Platinum',
    color: 'White',
    style: ['Tennis', 'Classic', 'Elegant'],
    occasion: 'Anniversary',
    inStock: true,
    isBestSeller: true
  },
  {
    id: 10,
    name: 'Diamond Bangle Bracelet',
    slug: 'diamond-bangle-bracelet',
    category: 'Bracelets',
    subCategory: 'Bangles',
    price: 225000,
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop',
    ],
    metal: '18K Gold',
    color: 'Yellow',
    style: ['Bangle', 'Traditional', 'Wedding'],
    occasion: 'Wedding',
    inStock: true,
    isNew: true
  },
  {
    id: 21,
    name: 'Cuff Diamond Bracelet',
    slug: 'cuff-diamond-bracelet',
    category: 'Bracelets',
    price: 275000,
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&auto=format&fit=crop',
    ],
    metal: 'Rose Gold',
    color: 'Rose',
    style: ['Cuff', 'Modern', 'Statement'],
    occasion: 'Party',
    inStock: true
  },
  
  // Pendants
  {
    id: 11,
    name: 'Heart Diamond Pendant',
    slug: 'heart-diamond-pendant',
    category: 'Pendants',
    price: 125000,
    originalPrice: 140000,
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&auto=format&fit=crop',
    ],
    metal: '14K Gold',
    color: 'Rose',
    style: ['Heart', 'Pendant', 'Romantic'],
    occasion: 'Gift',
    inStock: true
  },
  {
    id: 22,
    name: 'Initial Diamond Pendant',
    slug: 'initial-diamond-pendant',
    category: 'Pendants',
    price: 95000,
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop',
    ],
    metal: 'White Gold',
    color: 'White',
    style: ['Initial', 'Personalized', 'Gift'],
    occasion: 'Gift',
    inStock: true,
    isNew: true
  },
  
  // Bangles
  {
    id: 12,
    name: 'Gold Diamond Bangles',
    slug: 'gold-diamond-bangles',
    category: 'Bangles',
    price: 275000,
    images: [
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&auto=format&fit=crop',
    ],
    metal: '18K Gold',
    color: 'Yellow',
    style: ['Bangle', 'Traditional', 'Wedding'],
    occasion: 'Wedding',
    inStock: true
  },
  {
    id: 23,
    name: 'Stackable Diamond Bangles',
    slug: 'stackable-diamond-bangles',
    category: 'Bangles',
    price: 195000,
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop',
    ],
    metal: 'Rose Gold',
    color: 'Rose',
    style: ['Stackable', 'Modern', 'Everyday'],
    occasion: 'Everyday',
    inStock: true
  },
  
  // Mens
  {
    id: 13,
    name: 'Men\'s Diamond Ring',
    slug: 'mens-diamond-ring',
    category: 'Mens',
    price: 185000,
    originalPrice: 210000,
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop',
    ],
    metal: 'Platinum',
    color: 'White',
    style: ['Signet', 'Bold', 'Everyday'],
    occasion: 'Everyday',
    inStock: true
  },
  {
    id: 14,
    name: 'Men\'s Diamond Bracelet',
    slug: 'mens-diamond-bracelet',
    category: 'Mens',
    price: 245000,
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&auto=format&fit=crop',
    ],
    metal: '14K Gold',
    color: 'Yellow',
    style: ['Chain', 'Bold', 'Statement'],
    occasion: 'Party',
    inStock: true,
    isNew: true
  },
  {
    id: 24,
    name: 'Men\'s Diamond Pendant',
    slug: 'mens-diamond-pendant',
    category: 'Mens',
    price: 165000,
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&auto=format&fit=crop',
    ],
    metal: 'White Gold',
    color: 'White',
    style: ['Pendant', 'Modern', 'Gift'],
    occasion: 'Gift',
    inStock: true
  }
]

// Helper function to filter products
export const filterProducts = (
  products: Product[],
  filters: {
    category?: string[]
    price?: string[]
    metal?: string[]
    color?: string[]
    occasion?: string[]
    style?: string[]
    search?: string
  }
) => {
  return products.filter(product => {
    // Category filter
    if (filters.category && filters.category.length > 0) {
      if (!filters.category.includes(product.category)) return false
    }

    // Price filter
    if (filters.price && filters.price.length > 0) {
      const priceMatch = filters.price.some(range => {
        const [min, max] = range.split('-').map(Number)
        if (range.includes('above')) {
          return product.price >= 300000
        }
        return product.price >= min && product.price <= max
      })
      if (!priceMatch) return false
    }

    // Metal filter
    if (filters.metal && filters.metal.length > 0) {
      if (!filters.metal.includes(product.metal)) return false
    }

    // Color filter
    if (filters.color && filters.color.length > 0) {
      if (!filters.color.includes(product.color)) return false
    }

    // Occasion filter
    if (filters.occasion && filters.occasion.length > 0) {
      if (!filters.occasion.includes(product.occasion)) return false
    }

    // Style filter (partial match - if any style matches)
    if (filters.style && filters.style.length > 0) {
      const hasMatchingStyle = product.style.some(s => 
        filters.style!.includes(s)
      )
      if (!hasMatchingStyle) return false
    }

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      return (
        product.name.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower) ||
        product.style.some(s => s.toLowerCase().includes(searchLower))
      )
    }

    return true
  })
}
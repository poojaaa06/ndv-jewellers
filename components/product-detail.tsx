'use client'

import { useState } from 'react'
import { Heart, ShoppingCart, Share2, Check, ChevronDown } from 'lucide-react'
import RelatedProducts from './related-products'
import ReviewsSection from './reviews-section'

export default function ProductDetail({ productId }: { productId: string }) {
  const [quantity, setQuantity] = useState(1)
  const [wishlisted, setWishlisted] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)
  const [expandedSpecs, setExpandedSpecs] = useState<string | null>(null)

  // Mock product data - in real app, fetch from API based on productId
  const product = {
    id: 1,
    name: 'Solitaire Diamond Ring',
    category: 'Engagement Ring',
    price: '₹2,50,000',
    originalPrice: '₹2,75,000',
    rating: 4.9,
    reviews: 128,
    description: 'An exquisite solitaire diamond ring featuring a certified lab-grown diamond set in platinum. This timeless piece represents elegance and commitment with uncompromising quality.',
    specifications: {
      'Diamond Details': {
        'Carat Weight': '1.5 Carat',
        'Shape': 'Round Brilliant',
        'Color': 'G (Near Colorless)',
        'Clarity': 'VS1 (Very Slightly Included)',
        'Cut': 'Excellent',
        'Certification': 'GIA Certified'
      },
      'Metal Details': {
        'Metal Type': 'Platinum',
        'Metal Purity': '95%',
        'Weight': '4.5 grams',
        'Setting': 'Solitaire'
      },
      'Sizing': {
        'Ring Size': 'US Size 7 (Customizable)',
        'Can Be Resized': 'Yes',
        'Width at Shank': '2.2mm'
      }
    },
    images: [
      'Product Image 1',
      'Product Image 2',
      'Product Image 3',
      'Product Image 4'
    ],
    inStock: true,
    freeShipping: true,
    warranty: 'Lifetime Warranty'
  }

  const specs = Object.entries(product.specifications)

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left: Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-muted rounded-lg overflow-hidden flex items-center justify-center">
              <div className="text-muted-foreground text-center">
                {product.images[selectedImage]}
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`aspect-square rounded-lg border-2 transition ${
                    selectedImage === i
                      ? 'border-primary'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="w-full h-full bg-muted flex items-center justify-center text-xs text-muted-foreground">
                    {i + 1}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wide font-semibold mb-2">
                {product.category}
              </p>
              <h1 className="font-serif text-4xl font-bold text-foreground mb-3">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-muted'}>
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-sm font-semibold text-foreground">{product.rating}</span>
                <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
              </div>

              <p className="text-foreground text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-primary">{product.price}</span>
                <span className="text-lg text-muted-foreground line-through">{product.originalPrice}</span>
                <span className="text-sm font-semibold bg-primary/10 text-primary px-3 py-1 rounded">
                  Save 10%
                </span>
              </div>
            </div>

            {/* Stock & Shipping */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-semibold">In Stock</p>
                  <p className="text-sm font-semibold text-foreground">Ready to Ship</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-semibold">Free Shipping</p>
                  <p className="text-sm font-semibold text-foreground">Worldwide</p>
                </div>
              </div>
            </div>

            {/* Options */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Ring Size
                </label>
                <select className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition bg-background text-foreground">
                  <option>Select Size</option>
                  {Array.from({ length: 13 }, (_, i) => (
                    <option key={i} value={i}>
                      US Size {i}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Quantity
                </label>
                <div className="flex items-center border border-border rounded-lg w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-muted transition"
                  >
                    −
                  </button>
                  <span className="px-6 py-2 font-semibold text-foreground">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-muted transition"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button className="flex-1 bg-primary text-primary-foreground py-4 rounded-lg font-semibold hover:bg-accent transition flex items-center justify-center gap-2 text-lg">
                <ShoppingCart className="w-6 h-6" />
                Add to Cart
              </button>
              <button
                onClick={() => setWishlisted(!wishlisted)}
                className={`px-6 py-4 border-2 rounded-lg font-semibold transition ${
                  wishlisted
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border hover:border-primary'
                }`}
              >
                <Heart className={`w-6 h-6 ${wishlisted ? 'fill-current' : ''}`} />
              </button>
              <button className="px-6 py-4 border-2 border-border hover:border-primary rounded-lg font-semibold transition">
                <Share2 className="w-6 h-6 text-foreground" />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="space-y-2 text-sm">
              <p className="flex items-center gap-2 text-foreground">
                <Check className="w-5 h-5 text-primary" />
                {product.warranty}
              </p>
              <p className="flex items-center gap-2 text-foreground">
                <Check className="w-5 h-5 text-primary" />
                100% Authentic & Certified
              </p>
              <p className="flex items-center gap-2 text-foreground">
                <Check className="w-5 h-5 text-primary" />
                Secure Payment & Easy Returns
              </p>
            </div>
          </div>
        </div>

        {/* Specifications Section */}
        <div className="mb-16 border-t border-border pt-12">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-8">
            Diamond & Metal Specifications
          </h2>

          <div className="space-y-2">
            {specs.map(([category, details]) => (
              <div key={category} className="border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedSpecs(expandedSpecs === category ? null : category)}
                  className="w-full px-6 py-4 bg-card hover:bg-muted transition flex items-center justify-between"
                >
                  <h3 className="font-semibold text-foreground text-lg">{category}</h3>
                  <ChevronDown
                    className={`w-5 h-5 text-primary transition ${
                      expandedSpecs === category ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {expandedSpecs === category && (
                  <div className="px-6 py-4 bg-background space-y-3 border-t border-border">
                    {Object.entries(details).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-start">
                        <span className="text-foreground font-medium">{key}:</span>
                        <span className="text-muted-foreground text-right">{value as string}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Section */}
        <ReviewsSection productId={productId} />

        {/* Related Products */}
        <RelatedProducts />
      </div>
    </section>
  )
}

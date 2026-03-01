'use client'

import { useState } from 'react'
import { useCart } from '@/context/cart-context'
import { useWishlist } from '@/context/wishlist-context'
import Image from 'next/image'
import Link from 'next/link'
import {
  Heart, Share2, ShoppingBag, ChevronRight, ChevronLeft,
  Check, Plus, Minus, RefreshCw, Award, RotateCcw, Calendar,
  Scale, Diamond, ChevronDown
} from 'lucide-react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { products, Product } from '@/lib/data'
import InfoBar from '@/components/info-bar'
import Blog from '@/components/blog'

const colorSwatches: Record<string, string> = {
  White: '#F5F0EB',
  Yellow: '#E8C547',
  Rose: '#E8A598',
  Champagne: '#C9A96E',
}

const ringSizes = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]

const accordionSections = [
  { key: 'details', label: 'Product Details' },
  { key: 'price', label: 'Price Breakup' },
  { key: 'description', label: 'Description' },
  { key: 'cert', label: 'Certification of Authenticity' },
  { key: 'shipping', label: 'Shipping & Handling' },
  { key: 'resizing', label: 'Resizing & Repairs' },
  { key: 'appointment', label: 'Book your Appointment' },
]

export default function ProductClient({ product }: { product: Product }) {
     const { addItem } = useCart()
  const { toggleItem, isWishlisted } = useWishlist()
  const [selectedColor, setSelectedColor] = useState(product?.color || 'Yellow')
  const [selectedMetal, setSelectedMetal] = useState<string>(product?.metal || '18K Gold')
   
  const [wishlistLoading, setWishlistLoading] = useState(false)
  
  const [selectedSize, setSelectedSize] = useState<number | null>(null)
  const [wishlisted, setWishlisted] = useState(false)
  const [activeImage, setActiveImage] = useState(0)
  const [addedToBag, setAddedToBag] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [openSection, setOpenSection] = useState<string | null>('details')

  const productImages = product.images.length > 1 
    ? product.images 
    : [
        product.images[0],
        product.images[0].replace('w=800', 'w=800&rot=90'),
        product.images[0].replace('w=800', 'w=800&rot=180'),
        product.images[0].replace('w=800', 'w=800&rot=270'),
        'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop',
      ]

  const fmt = (p: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(p)

  const related = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

 const handleAddToBag = () => {
  // Add to cart with all selected options
  addItem({
    id: product.id,
    name: product.name,
    slug: product.slug,
    price: product.price,
    originalPrice: product.originalPrice,
    image: product.images[0],
    metal: selectedMetal,
    color: selectedColor,
    size: selectedSize || undefined,
    carats: product.category === 'Rings' ? `${(product.price / 400000).toFixed(2)} Ct` : undefined,
    category: product.category
  })
  
  setAddedToBag(true)
  setTimeout(() => setAddedToBag(false), 2000)
}
const handleWishlistToggle = () => {
  setWishlistLoading(true)
  toggleItem({
    id: product.id,
    name: product.name,
    slug: product.slug,
    price: product.price,
    originalPrice: product.originalPrice,
    image: product.images[0],
    category: product.category,
    metal: selectedMetal,
    color: selectedColor
  })
  setTimeout(() => setWishlistLoading(false), 300)
}
  const metalLabels: Record<string, string> = {
    '14K Gold': '14 KT',
    '18K Gold': '18 KT',
    'Platinum': 'PLAT',
    'White Gold': '14 KT',
    'Rose Gold': '18 KT',
  }

  return (
    <main className="min-h-screen ">
      <InfoBar />
      <Header />

      {/* Breadcrumb */}
      <div className="border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center gap-1 text-[11px] text-muted-foreground overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-primary transition shrink-0">Home</Link>
          <ChevronRight className="w-3 h-3 shrink-0" />
          <Link href={`/shop?category=${product.category.toLowerCase()}`} className="hover:text-primary transition shrink-0">{product.category}</Link>
          <ChevronRight className="w-3 h-3 shrink-0" />
          <span className="text-foreground font-medium truncate">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-14">

          {/* ── LEFT: Image Gallery ── */}
          <div className="lg:sticky lg:top-6 lg:self-start">
            {/* Main image */}
            <div className="relative aspect-square bg-muted/20 rounded-2xl overflow-hidden group">
              <Image
                src={productImages[activeImage]}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />

              {product.originalPrice && (
                <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-[11px] font-bold px-2.5 py-1 rounded-full z-10">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </div>
              )}

              {/* Prev / Next arrows */}
              <button
                onClick={() => setActiveImage(p => (p - 1 + productImages.length) % productImages.length)}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow opacity-0 group-hover:opacity-100 transition-opacity z-10"
              >
                <ChevronLeft className="w-4 h-4 text-foreground" />
              </button>
              <button
                onClick={() => setActiveImage(p => (p + 1) % productImages.length)}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow opacity-0 group-hover:opacity-100 transition-opacity z-10"
              >
                <ChevronRight className="w-4 h-4 text-foreground" />
              </button>

              {/* Counter pill */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/50 text-white text-[10px] px-2.5 py-1 rounded-full">
                {activeImage + 1} / {productImages.length}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
              {productImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                    activeImage === i ? 'border-primary' : 'border-transparent opacity-50 hover:opacity-80'
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Product Info ── */}
          <div className="space-y-5">

            {/* Product name */}
            <h1 className="font-serif text-xl sm:text-2xl md:text-[1.75rem] font-bold text-foreground leading-snug">
              {product.name}
            </h1>

            {/* SKU row */}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>SKU &nbsp; MJ-{String(product.id).padStart(10, '0').toUpperCase()}</span>
              <div className="flex items-center gap-3">
               <button
  onClick={handleWishlistToggle}
  disabled={wishlistLoading}
  className="flex items-center gap-1 hover:text-primary transition relative"
>
  <Heart className={`w-3.5 h-3.5 transition-all ${wishlisted ? 'fill-primary text-primary scale-110' : ''} ${wishlistLoading ? 'animate-pulse' : ''}`} />
  <span className="hidden sm:inline">Wishlist</span>
</button>
                <span className="text-border">|</span>
                <button className="flex items-center gap-1 hover:text-primary transition">
                  <Share2 className="w-3.5 h-3.5" />
                  Share
                </button>
              </div>
            </div>

            {/* Price */}
            <div>
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-bold text-foreground">{fmt(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">{fmt(product.originalPrice)}</span>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">( Inclusive of all taxes )</p>
              {/* brief description line */}
              <p className="text-sm text-foreground/70 mt-2">
                Diamond {product.category.slice(0, -1)} in {selectedMetal} with lab-grown CVD diamonds.
              </p>
            </div>

            {/* Purity buttons */}
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-2">Purity</p>
              <div className="flex items-center gap-2">
                {['9 KT', '14 KT', '18 KT'].map(kt => {
                  const isActive = selectedMetal.includes(kt.replace(' KT', 'K').replace(' ', '')) ||
                    (kt === '18 KT' && selectedMetal === '18K Gold') ||
                    (kt === '14 KT' && selectedMetal === '14K Gold') ||
                    (kt === '9 KT' && selectedMetal === '9K Gold')
                  return (
                    <button
                      key={kt}
                      onClick={() => {
                        if (kt === '9 KT') setSelectedMetal('9K Gold')
                        else if (kt === '14 KT') setSelectedMetal('14K Gold')
                        else setSelectedMetal('18K Gold')
                      }}
                      className={`px-5 py-2 rounded-md text-sm font-semibold border transition-all ${
                        isActive
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'border-border text-foreground/70 hover:border-primary/50'
                      }`}
                    >
                      {kt}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Color — circles only, no text */}
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-2">Color</p>
              <div className="flex items-center gap-3">
               {Object.entries(colorSwatches).map(([color, bg]) => (
  <button
    key={color}
    onClick={() => setSelectedColor(color as typeof selectedColor)}
    title={color}
    className={`w-8 h-8 rounded-full border-2 transition-all ${
      selectedColor === color
        ? 'border-primary scale-110 shadow-md'
        : 'border-transparent hover:border-primary/40'
    }`}
    style={{ backgroundColor: bg, boxShadow: selectedColor === color ? undefined : 'inset 0 0 0 1px rgba(0,0,0,0.12)' }}
  />
))}
              </div>
            </div>

            {/* Ring size — if rings */}
            {product.category === 'Rings' && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">Size</p>
                  <button className="text-xs text-primary hover:underline">Size Guide</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {ringSizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-10 h-10 rounded-md border text-sm font-medium transition-all ${
                        selectedSize === size
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'border-border text-foreground/70 hover:border-primary/50'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity + Add to Cart */}
            <div className="flex gap-3 items-stretch pt-1">
              {/* Qty stepper */}
              <div className="flex items-center border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-10 h-12 flex items-center justify-center hover:bg-muted transition text-foreground"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center text-sm font-semibold text-foreground">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-10 h-12 flex items-center justify-center hover:bg-muted transition text-foreground"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToBag}
                className={`flex-1 h-12 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all text-sm border-2 ${
                  addedToBag
                    ? 'border-green-600 text-green-600 bg-green-50'
                    : 'border-primary text-primary hover:bg-primary/5'
                }`}
              >
                {addedToBag ? <><Check className="w-4 h-4" /> Added!</> : 'Add To Cart'}
              </button>
            </div>

            {/* Buy Now */}
            <button
              onClick={handleAddToBag}
              className="w-full h-12 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-accent transition flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              Buy Now
            </button>

            {/* Trust badges */}
            <div className="grid grid-cols-4 gap-2 py-3 border-t border-b border-border/40">
              {[
                { icon: <RefreshCw className="w-5 h-5" />, line1: '100%', line2: 'Exchange' },
                { icon: <Award className="w-5 h-5" />, line1: '100%', line2: 'Certified' },
                { icon: <RotateCcw className="w-5 h-5" />, line1: '80%', line2: 'Buyback' },
                { icon: <Calendar className="w-5 h-5" />, line1: '15-Day', line2: 'Easy Return' },
              ].map((b, i) => (
                <div key={i} className="flex flex-col items-center text-center gap-1">
                  <div className="text-primary">{b.icon}</div>
                  <p className="text-[10px] font-semibold text-primary leading-tight">{b.line1}</p>
                  <p className="text-[10px] text-muted-foreground leading-tight">{b.line2}</p>
                </div>
              ))}
            </div>

            {/* Accordion sections */}
            <div className="divide-y divide-border/60">
              {accordionSections.map(section => (
                <div key={section.key}>
                  <button
                    onClick={() => setOpenSection(openSection === section.key ? null : section.key)}
                    className="w-full flex items-center justify-between py-3.5 text-left group"
                  >
                    <span className="text-sm font-semibold text-foreground group-hover:text-primary transition">
                      {section.label}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
                        openSection === section.key ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {openSection === section.key && (
                    <div className="pb-4 text-sm text-foreground/70 leading-relaxed">
                      {section.key === 'details' && (
                        <div className="space-y-4">
                          {/* Weight row */}
                          <div className="grid grid-cols-2 gap-4">
                            <div className="text-center p-3 border border-border/60 rounded-xl">
                              <Scale className="w-6 h-6 mx-auto text-primary mb-1.5" />
                              <p className="text-xs font-bold text-foreground">
                                {(product.price / 50000).toFixed(3)} Grams
                              </p>
                              <p className="text-[10px] text-muted-foreground mt-0.5">Approx. Gross Weight</p>
                            </div>
                            <div className="text-center p-3 border border-border/60 rounded-xl">
                              <Scale className="w-6 h-6 mx-auto text-primary mb-1.5" />
                              <p className="text-xs font-bold text-foreground">
                                {selectedMetal}
                              </p>
                              <p className="text-[10px] text-muted-foreground mt-0.5">Metal Purity</p>
                            </div>
                          </div>
                          {/* Diamond info */}
                          <div className="text-center p-3 border border-border/60 rounded-xl">
                            <Diamond className="w-6 h-6 mx-auto text-primary mb-1.5" />
                            <p className="text-xs font-semibold text-foreground">Lab Grown CVD Type IIA Diamonds</p>
                            <p className="text-sm font-bold text-foreground mt-0.5">
                              {(product.price / 400000).toFixed(2)} Ct.
                            </p>
                            <p className="text-[10px] text-muted-foreground">Approx. Diamond Weight</p>
                          </div>
                          {/* Diamond table */}
                          <table className="w-full text-xs border border-border/60 rounded-xl overflow-hidden">
                            <thead>
                              <tr className="bg-primary text-primary-foreground">
                                <th className="p-2 text-left font-semibold">Diamonds</th>
                                <th className="p-2 text-left font-semibold">Shape / Clarity / Color</th>
                                <th className="p-2 text-center font-semibold">Count</th>
                                <th className="p-2 text-right font-semibold">Total Wt.</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-t border-border/40">
                                <td className="p-2">Solitaire</td>
                                <td className="p-2">Round EF – VS</td>
                                <td className="p-2 text-center">2</td>
                                <td className="p-2 text-right">{(product.price / 400000).toFixed(3)}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      )}

                      {section.key === 'price' && (
                        <div className="space-y-2 text-xs">
                          {[
                            ['Metal Value', fmt(Math.round(product.price * 0.45))],
                            ['Diamond Value', fmt(Math.round(product.price * 0.40))],
                            ['Making Charges', fmt(Math.round(product.price * 0.10))],
                            ['GST (3%)', fmt(Math.round(product.price * 0.03))],
                            ['Certificate', fmt(Math.round(product.price * 0.02))],
                          ].map(([label, val]) => (
                            <div key={label} className="flex justify-between border-b border-border/30 pb-1.5">
                              <span className="text-foreground/70">{label}</span>
                              <span className="font-semibold text-foreground">{val}</span>
                            </div>
                          ))}
                          <div className="flex justify-between pt-1 font-bold text-sm">
                            <span>Total</span>
                            <span className="text-primary">{fmt(product.price)}</span>
                          </div>
                        </div>
                      )}

                      {section.key === 'description' && (
                        <p>
                          Indulge in the world of sustainable luxury with this exquisite{' '}
                          <strong className="text-foreground">{product.name}</strong> from our collection.
                          This piece embodies timeless elegance, showcasing the captivating brilliance of
                          lab-grown diamonds while reflecting a commitment to ethical practices.
                          Crafted in {selectedMetal}, this {product.category.toLowerCase().slice(0, -1)} is
                          perfect for {product.occasion.toLowerCase()} occasions.
                        </p>
                      )}

                      {section.key === 'cert' && (
                        <p>Each piece comes with a certificate of authenticity from an independent gemological laboratory, verifying the quality and origin of the lab-grown diamonds.</p>
                      )}

                      {section.key === 'shipping' && (
                        <p>Free insured shipping on all orders. Estimated delivery: 5–7 business days. Express delivery available at checkout.</p>
                      )}

                      {section.key === 'resizing' && (
                        <p>Complimentary resizing available within 30 days of purchase. Contact our support team to initiate the process.</p>
                      )}

                      {section.key === 'appointment' && (
                        <div className="space-y-2">
                          <p>Book a virtual or in-store appointment with our jewelry consultants.</p>
                          <button className="text-xs font-semibold text-primary border border-primary px-4 py-2 rounded-full hover:bg-primary hover:text-primary-foreground transition">
                            Book Appointment →
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Similar Products */}
        {related.length > 0 && (
          <section className="mt-12 sm:mt-16 pt-8 border-t border-border/40" >
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground mb-6">Similar Products</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
              {related.map(p => (
                <Link key={p.id} href={`/product/${p.slug}`} className="group">
                  <div className="relative aspect-square bg-muted/20 rounded-xl overflow-hidden mb-3">
                    <Image
                      src={p.images[0]} alt={p.name} fill
                      className="object-cover group-hover:scale-105 transition duration-500"
                      sizes="(max-width: 640px) 50vw, 25vw"
                    />
                  </div>
                  <h3 className="text-[13px] font-medium text-foreground group-hover:text-primary transition line-clamp-2 mb-1">
                    {p.name}
                  </h3>
                  <p className="text-sm font-bold text-foreground">{
                    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(p.price)
                  }</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
<Blog/>
      <Footer />
    </main>
  )
}
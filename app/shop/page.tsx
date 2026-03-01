'use client'

import { useState, Suspense, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { SlidersHorizontal, X } from 'lucide-react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import ProductFilters from '@/components/product-filters'
import ProductGrid from '@/components/product-grid'
import InfoBar from '@/components/info-bar'

function ShopContent() {
  const searchParams = useSearchParams()
  const category = searchParams.get('category')
  const style = searchParams.get('style')
  const metal = searchParams.get('metal')
  const price = searchParams.get('price')

  const [filters, setFilters] = useState({})
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const init: any = {}
    if (style) init.style = [style]
    if (metal) init.metal = [metal]
    if (price) init.price = [price]
    setFilters(init)
  }, [style, metal, price])

  const getCategoryTitle = () => {
    if (!category) return 'All Jewelry'
    const map: Record<string, string> = {
      rings: 'Rings', earrings: 'Earrings', necklaces: 'Necklaces',
      bracelets: 'Bracelets', pendants: 'Pendants', bangles: 'Bangles',
      men: 'Mens Collection', collections: 'Collections',
    }
    return map[category] || category.charAt(0).toUpperCase() + category.slice(1)
  }

  return (
    <main className="min-h-screen bg-background">
      <InfoBar/>
      <Header />

      {/* Page header */}
      <section className="border-b border-border/60 bg-muted/20">
      <div className="relative bg-[url('/newbanner.png')] bg-cover bg-center bg-no-repeat">
  
  {/* Soft Overlay (for text readability) */}
  <div className="absolute inset-0 bg-white/20"></div>

  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
    <p className="text-[10px] tracking-[0.2em] uppercase text-primary  mb-1 font-medium">
      {category ? `Shop / ${category}` : 'Shop'}
    </p>
    <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
      {getCategoryTitle()}
    </h1>
  </div>

</div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8">
        {/* Mobile: filter button */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setMobileOpen(true)}
            className="flex items-center gap-2 px-4 py-2 border border-border rounded-full text-sm font-medium hover:border-primary transition"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 xl:gap-10">
          {/* Sidebar — desktop only */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-6">
              <ProductFilters onFilterChange={setFilters} initialFilters={filters} />
            </div>
          </div>

          {/* Grid */}
          <div className="lg:col-span-3">
            <ProductGrid category={category || undefined} filters={filters} />
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          {/* Panel */}
          <div className="absolute left-0 top-0 bottom-0 w-[85vw] max-w-sm bg-background overflow-y-auto shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border sticky top-0 bg-background z-10">
              <span className="font-semibold text-sm">Filter Products</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="px-5 py-4 flex-1">
              <ProductFilters
                onFilterChange={f => { setFilters(f) }}
                initialFilters={filters}
              />
            </div>
            <div className="px-5 py-4 border-t border-border sticky bottom-0 bg-background">
              <button
                onClick={() => setMobileOpen(false)}
                className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold text-sm"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="font-serif text-xl text-muted-foreground">Loading...</p>
      </div>
    }>
      <ShopContent />
    </Suspense>
  )
}
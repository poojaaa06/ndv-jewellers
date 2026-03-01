import Link from 'next/link'
import { ShoppingCart, Heart } from 'lucide-react'

const relatedProducts = [
  {
    id: 2,
    name: 'Three Stone Ring',
    price: '₹2,80,000',
    carats: '2.0 Carat',
    rating: 4.8
  },
  {
    id: 3,
    name: 'Halo Diamond Ring',
    price: '₹2,45,000',
    carats: '1.2 Carat',
    rating: 4.9
  },
  {
    id: 4,
    name: 'Cushion Cut Ring',
    price: '₹2,65,000',
    carats: '1.8 Carat',
    rating: 4.7
  },
  {
    id: 5,
    name: 'Oval Diamond Ring',
    price: '₹2,55,000',
    carats: '1.6 Carat',
    rating: 4.8
  }
]

export default function RelatedProducts() {
  return (
    <div className="border-t border-border pt-12">
      <h2 className="font-serif text-3xl font-bold text-foreground mb-8">
        You Might Also Like
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map(product => (
          <div key={product.id} className="group">
            <Link href={`/product/${product.id}`}>
              <div className="relative aspect-square bg-muted rounded-lg overflow-hidden mb-4 cursor-pointer">
                <div className="w-full h-full bg-gradient-to-br from-card to-primary/5 flex items-center justify-center group-hover:scale-105 transition duration-300">
                  <span className="text-muted-foreground text-center px-4 font-semibold">
                    {product.name}
                  </span>
                </div>
                <button className="absolute top-3 left-3 p-2 bg-background/80 hover:bg-background rounded-full transition">
                  <Heart className="w-5 h-5 text-foreground" />
                </button>
              </div>
            </Link>

            <div className="space-y-2">
              <Link href={`/product/${product.id}`}>
                <h3 className="font-semibold text-foreground hover:text-primary transition line-clamp-2">
                  {product.name}
                </h3>
              </Link>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{product.carats}</span>
                <span className="text-xs text-yellow-600">★ {product.rating}</span>
              </div>

              <p className="font-bold text-foreground">{product.price}</p>

              <button className="w-full mt-4 bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-accent transition flex items-center justify-center gap-2">
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

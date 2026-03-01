import { notFound } from 'next/navigation'
import { products } from '@/lib/data'
import ProductClient from './product-client'

// Generate static params for all products (for static generation)
export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }))
}

// In Next.js 15, params is a Promise that needs to be awaited
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  // Await the params
  const { slug } = await params
  
  console.log('Looking for product with slug:', slug)
  console.log('Available slugs:', products.map(p => p.slug))
  
  // Find the product by slug
  const product = products.find(p => p.slug === slug)
  
  // If product not found, return 404
  if (!product) {
    console.log('Product not found!')
    notFound()
  }

  console.log('Product found:', product.name)
  // Pass the found product to the client component
  return <ProductClient product={product} />
}
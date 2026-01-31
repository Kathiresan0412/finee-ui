import { Metadata } from 'next'
import ProductList from '@/components/ProductList'

export const metadata: Metadata = {
  title: 'All Products',
  description: 'Browse and compare products from Amazon, eBay, and other retailers. Find the best deals on electronics, appliances, and more.',
  openGraph: {
    title: 'All Products - Finee',
    description: 'Browse and compare products from multiple retailers.',
  },
}

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">All Products</h1>
      <ProductList />
    </div>
  )
}

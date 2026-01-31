import { Metadata } from 'next'
import CompareProducts from '@/components/CompareProducts'

export const metadata: Metadata = {
  title: 'Compare Products',
  description: 'Compare up to 4 products side by side. Find the best deals and make informed purchasing decisions.',
  openGraph: {
    title: 'Compare Products - Finee',
    description: 'Compare up to 4 products side by side from different retailers.',
  },
}

export default function ComparePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Compare Products</h1>
      <p className="text-center text-gray-600 mb-8">
        Select up to 4 products of the same type to compare
      </p>
      <CompareProducts />
    </div>
  )
}

import { Metadata } from 'next'
import ProductList from '@/components/ProductList'
import { getCountryByCode } from '@/lib/countries'

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }): Promise<Metadata> {
  const { country: countryCode } = await params
  const country = getCountryByCode(countryCode)
  const countryName = country?.name || 'Global'
  
  return {
    title: `All Products - ${countryName}`,
    description: `Browse and compare products in ${countryName}. Find the best deals on electronics, appliances, and more.`,
    openGraph: {
      title: `All Products - Finee ${countryName}`,
      description: `Browse and compare products from multiple retailers in ${countryName}.`,
    },
  }
}

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">All Products</h1>
      <ProductList />
    </div>
  )
}

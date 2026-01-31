import { Metadata } from 'next'
import CompareProducts from '@/components/CompareProducts'
import { getCountryByCode } from '@/lib/countries'

export async function generateMetadata({ params }: { params: { country: string } }): Promise<Metadata> {
  const country = getCountryByCode(params.country)
  const countryName = country?.name || 'Global'
  
  return {
    title: `Compare Products - ${countryName}`,
    description: `Compare up to 2 products side by side in ${countryName}. Find the best deals and make informed purchasing decisions.`,
    openGraph: {
      title: `Compare Products - Finee ${countryName}`,
      description: `Compare up to 2 products side by side from different retailers in ${countryName}.`,
    },
  }
}

export default function ComparePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Compare Products</h1>
      <p className="text-center text-gray-600 mb-8">
        Select up to 2 products of the same type to compare
      </p>
      <CompareProducts />
    </div>
  )
}

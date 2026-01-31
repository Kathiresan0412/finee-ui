import { Metadata } from 'next'
import ProductDetail from '@/components/ProductDetail'
import { getCountryByCode } from '@/lib/countries'

interface PageProps {
  params: {
    country: string
    id: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const country = getCountryByCode(params.country)
  const countryName = country?.name || 'Global'
  const productId = params.id
  
  return {
    title: `Product ${productId} - ${countryName}`,
    description: `View details and compare prices for product ${productId} across multiple retailers in ${countryName}.`,
    openGraph: {
      title: `Product ${productId} - Finee ${countryName}`,
      description: `Compare prices for product ${productId} across multiple retailers in ${countryName}.`,
    },
  }
}

export default async function ProductPage({ params }: PageProps) {
  return <ProductDetail productId={params.id} />
}

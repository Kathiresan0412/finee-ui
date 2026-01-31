import { Metadata } from 'next'
import ProductDetail from '@/components/ProductDetail'
import { getCountryByCode } from '@/lib/countries'

interface PageProps {
  params: Promise<{
    country: string
    id: string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { country: countryCode, id: productId } = await params
  const country = getCountryByCode(countryCode)
  const countryName = country?.name || 'Global'
  
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
  const { id } = await params
  return <ProductDetail productId={id} />
}

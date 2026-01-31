import { Metadata } from 'next'
import ProductDetail from '@/components/ProductDetail'
import { notFound } from 'next/navigation'

interface PageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  // In production, fetch product data here
  const productId = params.id
  
  return {
    title: `Product ${productId}`,
    description: `View details and compare prices for product ${productId} across multiple retailers.`,
    openGraph: {
      title: `Product ${productId} - Finee`,
      description: `Compare prices for product ${productId} across multiple retailers.`,
    },
  }
}

export default async function ProductPage({ params }: PageProps) {
  return <ProductDetail productId={params.id} />
}

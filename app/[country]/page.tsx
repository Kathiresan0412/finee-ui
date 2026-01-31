import Hero from '@/components/Hero'
import Features from '@/components/Features'
import PopularComparisons from '@/components/PopularComparisons'
import ProductCategories from '@/components/ProductCategories'
import CTA from '@/components/CTA'
import { getCountryByCode } from '@/lib/countries'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }): Promise<Metadata> {
  const { country: countryCode } = await params
  const country = getCountryByCode(countryCode)
  const countryName = country?.name || 'Global'
  
  return {
    title: `Home - ${countryName}`,
    description: `Compare everything in ${countryName} - smartphones, TVs, laptops, and much more. Find the best products and make informed purchasing decisions.`,
    openGraph: {
      title: `Finee - Compare Everything in ${countryName}`,
      description: `Compare everything in ${countryName} - smartphones, TVs, laptops, and much more.`,
    },
  }
}

export default async function Home({ params }: { params: Promise<{ country: string }> }) {
  return (
    <div className="flex flex-col">
      <Hero />
      <PopularComparisons />
      <ProductCategories />
      <Features />
      <CTA />
    </div>
  )
}

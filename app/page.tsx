import Hero from '@/components/Hero'
import Features from '@/components/Features'
import HowItWorks from '@/components/HowItWorks'
import ProductCategories from '@/components/ProductCategories'
import CTA from '@/components/CTA'

export const metadata = {
  title: 'Home',
  description: 'Compare products from Amazon, eBay, and other retailers. Find the best deals and make informed purchasing decisions.',
  openGraph: {
    title: 'Finee - Compare Products Across Multiple Stores',
    description: 'Compare products from Amazon, eBay, and other retailers. Find the best deals and make informed purchasing decisions.',
  },
}

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Features />
      <HowItWorks />
      <ProductCategories />
      <CTA />
    </div>
  )
}

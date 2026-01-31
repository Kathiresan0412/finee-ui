import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { isValidCountryCode, defaultCountry, getCountryByCode } from '@/lib/countries'
import { notFound } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata({ params }: { params: { country: string } }): Promise<Metadata> {
  const country = getCountryByCode(params.country)
  const countryName = country?.name || 'Global'
  
  return {
    title: {
      default: `Finee - Compare Everything in ${countryName}`,
      template: `%s | Finee ${countryName}`
    },
    description: `Compare everything in ${countryName} - smartphones, TVs, laptops, and much more. Find the best products and make informed purchasing decisions.`,
    keywords: ['product comparison', 'price comparison', 'shopping', 'deals', countryName],
    authors: [{ name: 'Finee' }],
    creator: 'Finee',
    publisher: 'Finee',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: `/${params.country}`,
      siteName: 'Finee',
      title: `Finee - Compare Everything in ${countryName}`,
      description: `Compare everything in ${countryName} - smartphones, TVs, laptops, and much more.`,
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: `Finee - Product Comparison in ${countryName}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Finee - Compare Everything in ${countryName}`,
      description: `Compare products and find the best deals in ${countryName}.`,
      images: ['/og-image.jpg'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export default function CountryLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { country: string }
}) {
  const countryCode = params.country?.toLowerCase() || defaultCountry
  
  // Validate country code
  if (!isValidCountryCode(countryCode)) {
    notFound()
  }

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/${countryCode}`} />
      </head>
      <body className={inter.className}>
        <Header country={countryCode} />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

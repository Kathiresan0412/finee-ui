import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Finee - Compare Products Across Multiple Stores',
    template: '%s | Finee'
  },
  description: 'Compare products from Amazon, eBay, and other retailers. Find the best deals and make informed purchasing decisions.',
  keywords: ['product comparison', 'price comparison', 'Amazon', 'eBay', 'shopping', 'deals'],
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
    url: '/',
    siteName: 'Finee',
    title: 'Finee - Compare Products Across Multiple Stores',
    description: 'Compare products from Amazon, eBay, and other retailers. Find the best deals and make informed purchasing decisions.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Finee - Product Comparison',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Finee - Compare Products Across Multiple Stores',
    description: 'Compare products from Amazon, eBay, and other retailers.',
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
  verification: {
    google: process.env.GOOGLE_VERIFICATION,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'} />
      </head>
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

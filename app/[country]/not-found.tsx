'use client'

import Link from 'next/link'
import { useCountry } from '@/hooks/useCountry'

export default function CountryNotFound() {
  const country = useCountry()
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-primary-100 px-4">
      <div className="text-center max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary-600 mb-4">404</h1>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href={`/${country}`}
            className="px-8 py-4 bg-primary-600 text-white rounded-lg font-semibold text-lg hover:bg-primary-700 transition transform hover:scale-105 shadow-lg"
          >
            Go to Homepage
          </Link>
          <Link
            href={`/${country}/products`}
            className="px-8 py-4 bg-white text-primary-600 rounded-lg font-semibold text-lg hover:bg-gray-50 transition transform hover:scale-105 shadow-lg border-2 border-primary-600"
          >
            Browse Products
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="font-semibold mb-2">Popular Pages</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href={`/${country}`} className="hover:text-primary-600 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href={`/${country}/products`} className="hover:text-primary-600 transition">
                  All Products
                </Link>
              </li>
              <li>
                <Link href={`/${country}/compare`} className="hover:text-primary-600 transition">
                  Compare Products
                </Link>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="font-semibold mb-2">Categories</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href={`/${country}/products?category=smartphones`} className="hover:text-primary-600 transition">
                  Smartphones
                </Link>
              </li>
              <li>
                <Link href={`/${country}/products?category=tvs`} className="hover:text-primary-600 transition">
                  TVs
                </Link>
              </li>
              <li>
                <Link href={`/${country}/products?category=laptops`} className="hover:text-primary-600 transition">
                  Laptops
                </Link>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="font-semibold mb-2">Need Help?</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href={`/${country}`} className="hover:text-primary-600 transition">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href={`/${country}`} className="hover:text-primary-600 transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href={`/${country}`} className="hover:text-primary-600 transition">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

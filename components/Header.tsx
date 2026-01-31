'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CountrySelector from './CountrySelector'

const categories = [
  { name: 'Smartphones', slug: 'smartphones' },
  { name: 'TVs', slug: 'tvs' },
  { name: 'Laptops', slug: 'laptops' },
  { name: 'Graphics Cards', slug: 'graphics-cards' },
  { name: 'CPUs', slug: 'cpus' },
  { name: 'Headphones', slug: 'headphones' },
]

export default function Header({ country = 'us' }: { country?: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href={`/${country}`} className="text-2xl font-bold text-gray-900">
            Finee
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <div 
              className="relative"
              onMouseEnter={() => setIsCategoriesOpen(true)}
              onMouseLeave={() => setIsCategoriesOpen(false)}
            >
              <button className="text-gray-700 hover:text-gray-900 transition flex items-center">
                Categories
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <AnimatePresence>
                {isCategoriesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2"
                  >
                    {categories.map((category) => (
                      <Link
                        key={category.slug}
                        href={`/${country}/products?category=${category.slug}`}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <Link href={`/${country}/products`} className="text-gray-700 hover:text-gray-900 transition">
              Products
            </Link>
            <Link href={`/${country}/compare`} className="text-gray-700 hover:text-gray-900 transition">
              Compare
            </Link>
            
            <CountrySelector currentCountry={country} />
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 space-y-2"
          >
            <Link href={`/${country}`} className="block py-2 text-gray-700 hover:text-primary-600">
              Home
            </Link>
            <Link href={`/${country}/products`} className="block py-2 text-gray-700 hover:text-primary-600">
              Products
            </Link>
            <Link href={`/${country}/compare`} className="block py-2 text-gray-700 hover:text-primary-600">
              Compare
            </Link>
            <div className="py-2">
              <CountrySelector currentCountry={country} />
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  )
}

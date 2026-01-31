'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary-600">
            Finee
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-primary-600 transition">
              Home
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-primary-600 transition">
              Products
            </Link>
            <Link href="/compare" className="text-gray-700 hover:text-primary-600 transition">
              Compare
            </Link>
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
            <Link href="/" className="block py-2 text-gray-700 hover:text-primary-600">
              Home
            </Link>
            <Link href="/products" className="block py-2 text-gray-700 hover:text-primary-600">
              Products
            </Link>
            <Link href="/compare" className="block py-2 text-gray-700 hover:text-primary-600">
              Compare
            </Link>
          </motion.div>
        )}
      </nav>
    </header>
  )
}

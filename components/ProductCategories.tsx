'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { useCountry } from '@/hooks/useCountry'

const categories = [
  { name: 'Smartphones', icon: '📱', count: 1250, slug: 'smartphones' },
  { name: 'TVs', icon: '📺', count: 850, slug: 'tvs' },
  { name: 'Laptops', icon: '💻', count: 950, slug: 'laptops' },
  { name: 'Graphics Cards', icon: '🎮', count: 450, slug: 'graphics-cards' },
  { name: 'CPUs', icon: '⚙️', count: 320, slug: 'cpus' },
  { name: 'Headphones', icon: '🎧', count: 1200, slug: 'headphones' },
  { name: 'Cameras', icon: '📷', count: 680, slug: 'cameras' },
  { name: 'Smartwatches', icon: '⌚', count: 550, slug: 'smartwatches' },
]

export default function ProductCategories() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const country = useCountry()

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16"
        >
          Categories
        </motion.h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={`/${country}/products?category=${category.slug}`}
                className="bg-white rounded-xl p-6 text-center hover:bg-gray-50 hover:shadow-lg transition cursor-pointer transform hover:scale-105 block border border-gray-100"
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="font-semibold text-sm mb-1">{category.name}</h3>
                <p className="text-xs text-gray-500">{category.count} products</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'

const categories = [
  { name: 'Electronics', icon: '📱', count: 1250 },
  { name: 'Appliances', icon: '🔌', count: 850 },
  { name: 'Fashion', icon: '👕', count: 2100 },
  { name: 'Home & Garden', icon: '🏠', count: 950 },
  { name: 'Sports', icon: '⚽', count: 650 },
  { name: 'Books', icon: '📚', count: 3200 },
]

export default function ProductCategories() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16"
        >
          Browse by Category
        </motion.h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={`/products?category=${category.name.toLowerCase()}`}
                className="bg-gray-50 rounded-xl p-6 text-center hover:bg-primary-50 hover:shadow-lg transition cursor-pointer transform hover:scale-105 block"
              >
                <div className="text-5xl mb-4">{category.icon}</div>
                <h3 className="font-semibold mb-2">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.count} products</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

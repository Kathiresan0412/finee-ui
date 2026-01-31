'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const features = [
  {
    title: 'Compare Up to 4 Products',
    description: 'Select and compare up to 4 products of the same type side by side.',
    icon: '📊',
  },
  {
    title: 'Multiple Retailers',
    description: 'Compare prices from Amazon, eBay, BuyBuy, and more retailers.',
    icon: '🛒',
  },
  {
    title: 'Real-time Prices',
    description: 'Get the latest prices and availability from all retailers.',
    icon: '💰',
  },
  {
    title: 'Detailed Specifications',
    description: 'View detailed product specifications and features.',
    icon: '📋',
  },
  {
    title: 'Save Time',
    description: 'No need to visit multiple websites. Compare everything in one place.',
    icon: '⏱️',
  },
  {
    title: 'Best Deals',
    description: 'Find the best deals and save money on your purchases.',
    icon: '🎯',
  },
]

export default function Features() {
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
          Why Choose Finee?
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-50 rounded-xl p-6 hover:shadow-xl transition cursor-pointer transform hover:scale-105"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

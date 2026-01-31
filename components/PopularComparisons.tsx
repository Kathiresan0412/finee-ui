'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useCountry } from '@/hooks/useCountry'

const popularComparisons = [
  {
    id: '1',
    product1: {
      name: 'iPhone 15 Pro',
      image: 'https://via.placeholder.com/200',
      score: 85,
    },
    product2: {
      name: 'Samsung Galaxy S24',
      image: 'https://via.placeholder.com/200',
      score: 82,
    },
    category: 'Smartphones',
  },
  {
    id: '2',
    product1: {
      name: 'Samsung 55 inch TV',
      image: 'https://via.placeholder.com/200',
      score: 78,
    },
    product2: {
      name: 'LG 55 inch TV',
      image: 'https://via.placeholder.com/200',
      score: 75,
    },
    category: 'TVs',
  },
  {
    id: '3',
    product1: {
      name: 'MacBook Pro M3',
      image: 'https://via.placeholder.com/200',
      score: 90,
    },
    product2: {
      name: 'Dell XPS 15',
      image: 'https://via.placeholder.com/200',
      score: 88,
    },
    category: 'Laptops',
  },
]

export default function PopularComparisons() {
  const country = useCountry()
  
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-center mb-12"
        >
          Popular Comparisons
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {popularComparisons.map((comparison, index) => (
            <motion.div
              key={comparison.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={`/${country}/compare`}>
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition overflow-hidden border border-gray-100">
                  <div className="grid grid-cols-3 gap-4 p-6">
                    {/* Product 1 */}
                    <div className="text-center">
                      <div className="relative h-32 w-full mb-2">
                        <Image
                          src={comparison.product1.image}
                          alt={comparison.product1.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <h4 className="text-sm font-semibold mb-1 line-clamp-2">{comparison.product1.name}</h4>
                      <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 font-bold text-xs flex items-center justify-center mx-auto">
                        {comparison.product1.score}
                      </div>
                    </div>

                    {/* VS */}
                    <div className="flex items-center justify-center">
                      <span className="text-2xl font-bold text-gray-400">VS</span>
                    </div>

                    {/* Product 2 */}
                    <div className="text-center">
                      <div className="relative h-32 w-full mb-2">
                        <Image
                          src={comparison.product2.image}
                          alt={comparison.product2.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <h4 className="text-sm font-semibold mb-1 line-clamp-2">{comparison.product2.name}</h4>
                      <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 font-bold text-xs flex items-center justify-center mx-auto">
                        {comparison.product2.score}
                      </div>
                    </div>
                  </div>
                  <div className="px-6 pb-4">
                    <p className="text-xs text-gray-500 text-center">{comparison.category}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

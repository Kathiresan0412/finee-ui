'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import axios from 'axios'
import { useCountry } from '@/hooks/useCountry'

interface Product {
  id: string
  name: string
  image: string
  category: string
  score?: number
  retailers: {
    name: string
    price: number
    url: string
  }[]
  minPrice: number
  maxPrice: number
}

// Calculate product score
const calculateScore = (product: Product): number => {
  const bestPrice = product.minPrice
  const avgPrice = (product.minPrice + product.maxPrice) / 2
  const priceScore = Math.max(0, 100 - ((bestPrice / avgPrice) * 20))
  return Math.min(100, Math.round(priceScore + 50))
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const country = useCountry()

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/products`)
      const productsWithScores = response.data.map((p: Product) => ({
        ...p,
        score: calculateScore(p)
      }))
      setProducts(productsWithScores)
    } catch (error) {
      console.error('Error fetching products:', error)
      // Fallback mock data
      const mockProducts = [
        {
          id: '1',
          name: '32 inch Panasonic TV',
          image: 'https://via.placeholder.com/300',
          category: 'Electronics',
          retailers: [
            { name: 'Amazon', price: 299.99, url: '#' },
            { name: 'eBay', price: 289.99, url: '#' },
            { name: 'BuyBuy', price: 309.99, url: '#' },
          ],
          minPrice: 289.99,
          maxPrice: 309.99,
        },
      ]
      setProducts(mockProducts.map((p: Product) => ({
        ...p,
        score: calculateScore(p)
      })))
    } finally {
      setLoading(false)
    }
  }

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.category.toLowerCase() === selectedCategory.toLowerCase()
    return matchesSearch && matchesCategory
  })

  if (loading) {
    return <div className="text-center py-12">Loading products...</div>
  }

  return (
    <div>
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
        >
          <option value="all">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="appliances">Appliances</option>
          <option value="fashion">Fashion</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link href={`/${country}/products/${product.id}`}>
              <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition cursor-pointer overflow-hidden border border-gray-100">
                <div className="relative h-48 bg-gray-50">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-4"
                  />
                  {product.score && (
                    <div className="absolute top-3 right-3">
                      <div className="w-12 h-12 rounded-full bg-primary-100 text-primary-700 font-bold text-sm flex items-center justify-center shadow-md">
                        {product.score}
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-base mb-2 line-clamp-2">{product.name}</h3>
                  <p className="text-xs text-gray-500 mb-3">{product.category}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-bold text-gray-900">
                        ${product.minPrice.toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-500">Best price</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">{product.retailers.length} retailers</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No products found. Try adjusting your search or category filter.
        </div>
      )}
    </div>
  )
}

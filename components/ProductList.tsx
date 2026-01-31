'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import axios from 'axios'

interface Product {
  id: string
  name: string
  image: string
  category: string
  retailers: {
    name: string
    price: number
    url: string
  }[]
  minPrice: number
  maxPrice: number
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/products`)
      setProducts(response.data)
    } catch (error) {
      console.error('Error fetching products:', error)
      // Fallback mock data
      setProducts([
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
      ])
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
            <Link href={`/products/${product.id}`}>
              <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition cursor-pointer overflow-hidden">
                <div className="relative h-48 bg-gray-200">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Price Range</p>
                      <p className="text-xl font-bold text-primary-600">
                        ${product.minPrice.toFixed(2)} - ${product.maxPrice.toFixed(2)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">{product.retailers.length} retailers</p>
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

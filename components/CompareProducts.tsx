'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
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
    inStock: boolean
  }[]
  specifications: {
    [key: string]: string
  }
}

const MAX_COMPARE = 4

export default function CompareProducts() {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([])
  const [availableProducts, setAvailableProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/products`)
      setAvailableProducts(response.data)
    } catch (error) {
      console.error('Error fetching products:', error)
      // Fallback mock data
      setAvailableProducts([
        {
          id: '1',
          name: '32 inch Panasonic TV',
          image: 'https://via.placeholder.com/300',
          category: 'Electronics',
          retailers: [
            { name: 'Amazon', price: 299.99, url: '#', inStock: true },
            { name: 'eBay', price: 289.99, url: '#', inStock: true },
            { name: 'BuyBuy', price: 309.99, url: '#', inStock: false },
          ],
          specifications: {
            'Screen Size': '32 inch',
            'Resolution': '1080p',
            'Smart TV': 'Yes',
          },
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const addToCompare = (product: Product) => {
    if (selectedProducts.length >= MAX_COMPARE) {
      alert(`You can only compare up to ${MAX_COMPARE} products at a time.`)
      return
    }

    // Check if product is already selected
    if (selectedProducts.find(p => p.id === product.id)) {
      alert('This product is already in your comparison.')
      return
    }

    // Check if product is same type (same category)
    if (selectedProducts.length > 0) {
      const firstCategory = selectedProducts[0].category
      if (product.category !== firstCategory) {
        alert('You can only compare products of the same type/category.')
        return
      }
    }

    setSelectedProducts([...selectedProducts, product])
  }

  const removeFromCompare = (productId: string) => {
    setSelectedProducts(selectedProducts.filter(p => p.id !== productId))
  }

  const clearCompare = () => {
    setSelectedProducts([])
  }

  const filteredProducts = availableProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || product.category.toLowerCase() === selectedCategory.toLowerCase()
    const notSelected = !selectedProducts.find(p => p.id === product.id)
    return matchesSearch && matchesCategory && notSelected
  })

  // Get all unique specification keys from selected products
  const allSpecKeys = Array.from(
    new Set(selectedProducts.flatMap(p => Object.keys(p.specifications || {})))
  )

  return (
    <div>
      {selectedProducts.length > 0 && (
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">
              Comparing {selectedProducts.length} {selectedProducts.length === 1 ? 'Product' : 'Products'}
            </h2>
            <button
              onClick={clearCompare}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Clear All
            </button>
          </div>

          {/* Comparison Table */}
          <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left">Product</th>
                  {selectedProducts.map((product) => (
                    <th key={product.id} className="px-4 py-3 text-center min-w-[200px]">
                      <div className="relative">
                        <button
                          onClick={() => removeFromCompare(product.id)}
                          className="absolute top-0 right-0 text-red-500 hover:text-red-700"
                          aria-label="Remove from comparison"
                        >
                          ×
                        </button>
                        <div className="relative h-32 w-full mb-2">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <p className="text-sm font-semibold">{product.name}</p>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Price Row */}
                <tr className="border-t">
                  <td className="px-4 py-3 font-semibold">Price</td>
                  {selectedProducts.map((product) => (
                    <td key={product.id} className="px-4 py-3 text-center">
                      <div className="space-y-1">
                        {product.retailers.map((retailer) => (
                          <div key={retailer.name} className="flex items-center justify-between">
                            <span className="text-sm">{retailer.name}:</span>
                            <span className={`font-semibold ${retailer.inStock ? 'text-green-600' : 'text-gray-400'}`}>
                              ${retailer.price.toFixed(2)}
                            </span>
                          </div>
                        ))}
                        <div className="pt-2 border-t">
                          <span className="text-xs text-gray-500">Best Price: </span>
                          <span className="font-bold text-primary-600">
                            ${Math.min(...product.retailers.map(r => r.price)).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Specifications */}
                {allSpecKeys.map((specKey) => (
                  <tr key={specKey} className="border-t">
                    <td className="px-4 py-3 font-semibold">{specKey}</td>
                    {selectedProducts.map((product) => (
                      <td key={product.id} className="px-4 py-3 text-center">
                        {product.specifications?.[specKey] || 'N/A'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Product Selection */}
      <div>
        <h3 className="text-xl font-semibold mb-4">
          {selectedProducts.length > 0 
            ? `Select up to ${MAX_COMPARE - selectedProducts.length} more products to compare`
            : `Select up to ${MAX_COMPARE} products to compare`}
        </h3>

        <div className="mb-6 flex flex-col md:flex-row gap-4">
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
            <option value="">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="appliances">Appliances</option>
            <option value="fashion">Fashion</option>
          </select>
        </div>

        {selectedProducts.length > 0 && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              Note: You can only compare products of the same type/category. Current category: <strong>{selectedProducts[0].category}</strong>
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
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
                    <h4 className="font-semibold mb-2 line-clamp-2">{product.name}</h4>
                    <p className="text-sm text-gray-500 mb-3">{product.category}</p>
                    <div className="mb-3">
                      <p className="text-xs text-gray-500">Price Range</p>
                      <p className="text-lg font-bold text-primary-600">
                        ${Math.min(...product.retailers.map(r => r.price)).toFixed(2)} - ${Math.max(...product.retailers.map(r => r.price)).toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() => addToCompare(product)}
                      disabled={selectedProducts.length >= MAX_COMPARE}
                      className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      {selectedProducts.length >= MAX_COMPARE ? 'Max Reached' : 'Add to Compare'}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredProducts.length === 0 && !loading && (
          <div className="text-center py-12 text-gray-500">
            No products available to compare. Try adjusting your search or category filter.
          </div>
        )}
      </div>
    </div>
  )
}

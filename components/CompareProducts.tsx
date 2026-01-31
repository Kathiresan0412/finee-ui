'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'

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
    inStock: boolean
  }[]
  specifications: {
    [key: string]: string
  }
}

const MAX_COMPARE = 2 // Versus.com style - compare 2 at a time

// Calculate product score based on price and specs
const calculateScore = (product: Product): number => {
  const bestPrice = Math.min(...product.retailers.map(r => r.price))
  const avgPrice = product.retailers.reduce((sum, r) => sum + r.price, 0) / product.retailers.length
  const priceScore = Math.max(0, 100 - ((bestPrice / avgPrice) * 20))
  const specScore = Object.keys(product.specifications || {}).length * 5
  return Math.min(100, Math.round((priceScore + specScore) / 2))
}

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
      const productsWithScores = response.data.map((p: Product) => ({
        ...p,
        score: calculateScore(p)
      }))
      setAvailableProducts(productsWithScores)
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
        {
          id: '2',
          name: 'Samsung 55 inch 4K Smart TV',
          image: 'https://via.placeholder.com/300',
          category: 'Electronics',
          retailers: [
            { name: 'Amazon', price: 599.99, url: '#', inStock: true },
            { name: 'eBay', price: 579.99, url: '#', inStock: true },
          ],
          specifications: {
            'Screen Size': '55 inch',
            'Resolution': '4K UHD',
            'Smart TV': 'Yes',
          },
        },
      ]
      setAvailableProducts(mockProducts.map((p: Product) => ({
        ...p,
        score: calculateScore(p)
      })))
    } finally {
      setLoading(false)
    }
  }

  const addToCompare = (product: Product) => {
    if (selectedProducts.length >= MAX_COMPARE) {
      alert(`You can only compare up to ${MAX_COMPARE} products at a time.`)
      return
    }

    if (selectedProducts.find(p => p.id === product.id)) {
      alert('This product is already in your comparison.')
      return
    }

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

  const getBestPrice = (product: Product) => {
    return Math.min(...product.retailers.filter(r => r.inStock).map(r => r.price))
  }

  return (
    <div>
      {selectedProducts.length > 0 && (
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">Comparison</h2>
            <button
              onClick={clearCompare}
              className="px-4 py-2 text-gray-600 hover:text-gray-900 transition"
            >
              Clear All
            </button>
          </div>

          {/* Versus.com Style Side-by-Side Comparison */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              {/* Product 1 */}
              {selectedProducts[0] && (
                <div className="p-8 border-r border-gray-200">
                  <button
                    onClick={() => removeFromCompare(selectedProducts[0].id)}
                    className="float-right text-gray-400 hover:text-gray-600 text-2xl"
                    aria-label="Remove"
                  >
                    ×
                  </button>
                  <div className="text-center">
                    <div className="relative h-64 w-full mb-4">
                      <Image
                        src={selectedProducts[0].image}
                        alt={selectedProducts[0].name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{selectedProducts[0].name}</h3>
                    <div className="mb-4">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-700 font-bold text-lg">
                        {selectedProducts[0].score || calculateScore(selectedProducts[0])}
                      </div>
                      <p className="text-xs text-gray-500 mt-2">Finee Score</p>
                    </div>
                    <div className="mb-4">
                      <p className="text-2xl font-bold text-primary-600">
                        ${getBestPrice(selectedProducts[0]).toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-500">Best Price</p>
                    </div>
                    <Link
                      href={`/products/${selectedProducts[0].id}`}
                      className="text-primary-600 hover:text-primary-700 text-sm font-semibold"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              )}

              {/* VS Divider */}
              <div className="flex items-center justify-center p-8 bg-gray-50">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-400 mb-2">VS</div>
                  {selectedProducts.length < 2 && (
                    <p className="text-sm text-gray-500">Select another product</p>
                  )}
                </div>
              </div>

              {/* Product 2 */}
              {selectedProducts[1] ? (
                <div className="p-8 border-l border-gray-200">
                  <button
                    onClick={() => removeFromCompare(selectedProducts[1].id)}
                    className="float-right text-gray-400 hover:text-gray-600 text-2xl"
                    aria-label="Remove"
                  >
                    ×
                  </button>
                  <div className="text-center">
                    <div className="relative h-64 w-full mb-4">
                      <Image
                        src={selectedProducts[1].image}
                        alt={selectedProducts[1].name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{selectedProducts[1].name}</h3>
                    <div className="mb-4">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-700 font-bold text-lg">
                        {selectedProducts[1].score || calculateScore(selectedProducts[1])}
                      </div>
                      <p className="text-xs text-gray-500 mt-2">Finee Score</p>
                    </div>
                    <div className="mb-4">
                      <p className="text-2xl font-bold text-primary-600">
                        ${getBestPrice(selectedProducts[1]).toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-500">Best Price</p>
                    </div>
                    <Link
                      href={`/products/${selectedProducts[1].id}`}
                      className="text-primary-600 hover:text-primary-700 text-sm font-semibold"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="p-8 border-l border-gray-200 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-gray-400 mb-4">Select a product to compare</p>
                    <div className="text-6xl text-gray-200">+</div>
                  </div>
                </div>
              )}
            </div>

            {/* Specifications Comparison */}
            {allSpecKeys.length > 0 && (
              <div className="border-t border-gray-200">
                <div className="p-6 bg-gray-50">
                  <h4 className="font-semibold mb-4">Specifications</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {allSpecKeys.map((specKey) => (
                      <div key={specKey} className="bg-white p-4 rounded-lg">
                        <p className="text-sm text-gray-500 mb-2">{specKey}</p>
                        <div className="flex justify-between">
                          <span className="font-semibold">
                            {selectedProducts[0]?.specifications?.[specKey] || 'N/A'}
                          </span>
                          {selectedProducts[1] && (
                            <span className="font-semibold">
                              {selectedProducts[1]?.specifications?.[specKey] || 'N/A'}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Product Selection */}
      <div>
        <h3 className="text-2xl font-bold mb-6">
          {selectedProducts.length === 0 
            ? 'Select products to compare'
            : selectedProducts.length === 1
            ? 'Select another product to compare'
            : 'Comparison complete'}
        </h3>

        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
          >
            <option value="">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="appliances">Appliances</option>
            <option value="fashion">Fashion</option>
          </select>
        </div>

        {selectedProducts.length > 0 && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              Comparing products in: <strong>{selectedProducts[0].category}</strong>
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
                <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition cursor-pointer overflow-hidden border border-gray-100">
                  <div className="relative h-48 bg-gray-50">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-4"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-sm line-clamp-2 flex-1">{product.name}</h4>
                      {product.score && (
                        <div className="ml-2 flex-shrink-0">
                          <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-700 font-bold text-xs flex items-center justify-center">
                            {product.score}
                          </div>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mb-3">{product.category}</p>
                    <div className="mb-3">
                      <p className="text-lg font-bold text-gray-900">
                        ${getBestPrice(product).toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-500">Best price</p>
                    </div>
                    <button
                      onClick={() => addToCompare(product)}
                      disabled={selectedProducts.length >= MAX_COMPARE}
                      className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed text-sm font-semibold"
                    >
                      {selectedProducts.length >= MAX_COMPARE ? 'Max Reached' : 'Compare'}
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

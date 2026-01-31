'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'
import axios from 'axios'
import Link from 'next/link'

interface Product {
  id: string
  name: string
  image: string
  category: string
  description: string
  retailers: {
    name: string
    price: number
    url: string
    inStock: boolean
    rating?: number
  }[]
  specifications: {
    [key: string]: string
  }
}

export default function ProductDetail({ productId }: { productId: string }) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchProduct()
  }, [productId])

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/products/${productId}`)
      setProduct(response.data)
    } catch (error) {
      console.error('Error fetching product:', error)
      // Fallback mock data
      setProduct({
        id: productId,
        name: '32 inch Panasonic TV',
        image: 'https://via.placeholder.com/600',
        category: 'Electronics',
        description: 'High-quality 32 inch Panasonic TV with smart features and excellent picture quality.',
        retailers: [
          { name: 'Amazon', price: 299.99, url: '#', inStock: true, rating: 4.5 },
          { name: 'eBay', price: 289.99, url: '#', inStock: true, rating: 4.3 },
          { name: 'BuyBuy', price: 309.99, url: '#', inStock: false, rating: 4.2 },
        ],
        specifications: {
          'Screen Size': '32 inch',
          'Resolution': '1080p Full HD',
          'Smart TV': 'Yes',
          'HDMI Ports': '3',
          'USB Ports': '2',
          'Wi-Fi': 'Yes',
        },
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center py-12">Loading product details...</div>
  }

  if (!product) {
    return <div className="text-center py-12">Product not found</div>
  }

  const bestPrice = Math.min(...product.retailers.map(r => r.price))
  const bestRetailer = product.retailers.find(r => r.price === bestPrice)

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => router.back()}
        className="mb-6 text-primary-600 hover:text-primary-700 flex items-center"
      >
        ← Back to Products
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Product Image */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative h-96 lg:h-[500px] bg-gray-100 rounded-xl overflow-hidden"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain"
          />
        </motion.div>

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-6">{product.description}</p>
          
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Available Retailers</h2>
            <div className="space-y-3">
              {product.retailers.map((retailer) => (
                <div
                  key={retailer.name}
                  className={`p-4 border-2 rounded-lg ${
                    retailer.price === bestPrice
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{retailer.name}</span>
                        {retailer.price === bestPrice && (
                          <span className="px-2 py-1 bg-green-500 text-white text-xs rounded">
                            Best Price
                          </span>
                        )}
                        {!retailer.inStock && (
                          <span className="px-2 py-1 bg-red-500 text-white text-xs rounded">
                            Out of Stock
                          </span>
                        )}
                      </div>
                      {retailer.rating && (
                        <div className="text-sm text-gray-600 mt-1">
                          Rating: {retailer.rating} ⭐
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary-600">
                        ${retailer.price.toFixed(2)}
                      </p>
                      <a
                        href={retailer.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary-600 hover:underline"
                      >
                        View on {retailer.name} →
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link
            href={`/compare?add=${product.id}`}
            className="block w-full text-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-semibold"
          >
            Add to Comparison
          </Link>
        </motion.div>
      </div>

      {/* Specifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <h2 className="text-2xl font-semibold mb-4">Specifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(product.specifications || {}).map(([key, value]) => (
            <div key={key} className="flex border-b pb-2">
              <span className="font-semibold w-1/2">{key}:</span>
              <span className="text-gray-600">{value}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

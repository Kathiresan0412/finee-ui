const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Mock product data (in production, this would come from a database)
const products = [
  {
    id: '1',
    name: '32 inch Panasonic TV',
    image: 'https://via.placeholder.com/300',
    category: 'Electronics',
    description: 'High-quality 32 inch Panasonic TV with smart features and excellent picture quality.',
    retailers: [
      { name: 'Amazon', price: 299.99, url: 'https://amazon.com/product/1', inStock: true, rating: 4.5 },
      { name: 'eBay', price: 289.99, url: 'https://ebay.com/product/1', inStock: true, rating: 4.3 },
      { name: 'BuyBuy', price: 309.99, url: 'https://buybuy.com/product/1', inStock: false, rating: 4.2 },
    ],
    specifications: {
      'Screen Size': '32 inch',
      'Resolution': '1080p Full HD',
      'Smart TV': 'Yes',
      'HDMI Ports': '3',
      'USB Ports': '2',
      'Wi-Fi': 'Yes',
      'Operating System': 'Panasonic Smart TV',
    },
    minPrice: 289.99,
    maxPrice: 309.99,
  },
  {
    id: '2',
    name: 'Samsung 55 inch 4K Smart TV',
    image: 'https://via.placeholder.com/300',
    category: 'Electronics',
    description: 'Premium 55 inch Samsung 4K Smart TV with HDR and voice control.',
    retailers: [
      { name: 'Amazon', price: 599.99, url: 'https://amazon.com/product/2', inStock: true, rating: 4.7 },
      { name: 'eBay', price: 579.99, url: 'https://ebay.com/product/2', inStock: true, rating: 4.6 },
      { name: 'BuyBuy', price: 619.99, url: 'https://buybuy.com/product/2', inStock: true, rating: 4.5 },
    ],
    specifications: {
      'Screen Size': '55 inch',
      'Resolution': '4K UHD',
      'Smart TV': 'Yes',
      'HDR': 'Yes',
      'HDMI Ports': '4',
      'USB Ports': '3',
      'Wi-Fi': 'Yes',
      'Operating System': 'Tizen',
    },
    minPrice: 579.99,
    maxPrice: 619.99,
  },
  {
    id: '3',
    name: 'LG Refrigerator 20 cu ft',
    image: 'https://via.placeholder.com/300',
    category: 'Appliances',
    description: 'Energy-efficient LG refrigerator with French door design.',
    retailers: [
      { name: 'Amazon', price: 899.99, url: 'https://amazon.com/product/3', inStock: true, rating: 4.4 },
      { name: 'eBay', price: 879.99, url: 'https://ebay.com/product/3', inStock: true, rating: 4.3 },
      { name: 'BuyBuy', price: 929.99, url: 'https://buybuy.com/product/3', inStock: false, rating: 4.2 },
    ],
    specifications: {
      'Capacity': '20 cu ft',
      'Type': 'French Door',
      'Energy Star': 'Yes',
      'Ice Maker': 'Yes',
      'Water Dispenser': 'Yes',
      'Color': 'Stainless Steel',
    },
    minPrice: 879.99,
    maxPrice: 929.99,
  },
  {
    id: '4',
    name: 'iPhone 15 Pro',
    image: 'https://via.placeholder.com/300',
    category: 'Electronics',
    description: 'Latest iPhone 15 Pro with A17 Pro chip and titanium design.',
    retailers: [
      { name: 'Amazon', price: 999.99, url: 'https://amazon.com/product/4', inStock: true, rating: 4.8 },
      { name: 'eBay', price: 949.99, url: 'https://ebay.com/product/4', inStock: true, rating: 4.7 },
      { name: 'BuyBuy', price: 1049.99, url: 'https://buybuy.com/product/4', inStock: true, rating: 4.6 },
    ],
    specifications: {
      'Storage': '128GB',
      'Display': '6.1 inch Super Retina XDR',
      'Camera': '48MP Main',
      'Processor': 'A17 Pro',
      'Battery': 'Up to 23 hours',
      'Color': 'Natural Titanium',
    },
    minPrice: 949.99,
    maxPrice: 1049.99,
  },
]

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Finee API is running' })
})

// Get all products
app.get('/api/products', (req, res) => {
  const { category, search } = req.query
  
  let filteredProducts = products

  if (category) {
    filteredProducts = filteredProducts.filter(
      p => p.category.toLowerCase() === category.toLowerCase()
    )
  }

  if (search) {
    filteredProducts = filteredProducts.filter(
      p => p.name.toLowerCase().includes(search.toLowerCase())
    )
  }

  res.json(filteredProducts)
})

// Get single product by ID
app.get('/api/products/:id', (req, res) => {
  const { id } = req.params
  const product = products.find(p => p.id === id)

  if (!product) {
    return res.status(404).json({ error: 'Product not found' })
  }

  res.json(product)
})

// Get products by category
app.get('/api/products/category/:category', (req, res) => {
  const { category } = req.params
  const filteredProducts = products.filter(
    p => p.category.toLowerCase() === category.toLowerCase()
  )

  res.json(filteredProducts)
})

// Compare products (validate they are same category)
app.post('/api/products/compare', (req, res) => {
  const { productIds } = req.body

  if (!Array.isArray(productIds) || productIds.length === 0) {
    return res.status(400).json({ error: 'Product IDs array is required' })
  }

  if (productIds.length > 4) {
    return res.status(400).json({ error: 'Maximum 4 products can be compared' })
  }

  const compareProducts = productIds
    .map(id => products.find(p => p.id === id))
    .filter(Boolean)

  if (compareProducts.length !== productIds.length) {
    return res.status(404).json({ error: 'One or more products not found' })
  }

  // Check if all products are same category
  const firstCategory = compareProducts[0].category
  const allSameCategory = compareProducts.every(p => p.category === firstCategory)

  if (!allSameCategory) {
    return res.status(400).json({ error: 'All products must be of the same category' })
  }

  res.json(compareProducts)
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`)
  console.log(`📡 API endpoints available at http://localhost:${PORT}/api`)
})

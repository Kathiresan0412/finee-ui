# Finee Project File Structure

```
finee-ui/
│
├── app/                          # Next.js 14 App Router Directory
│   ├── layout.tsx                # Root layout with SEO metadata
│   ├── page.tsx                  # Landing page (Home)
│   ├── globals.css               # Global styles with Tailwind
│   ├── robots.ts                 # Robots.txt for SEO
│   ├── sitemap.ts                # Dynamic sitemap generation
│   │
│   ├── products/                 # Product pages
│   │   ├── page.tsx              # All products listing page
│   │   └── [id]/                 # Dynamic product detail pages
│   │       └── page.tsx          # Individual product page with SEO
│   │
│   └── compare/                  # Comparison page
│       └── page.tsx              # Product comparison interface
│
├── components/                   # React Components
│   ├── Header.tsx                # Navigation header with mobile menu
│   ├── Footer.tsx                # Footer with links
│   ├── Hero.tsx                  # Landing page hero section with animations
│   ├── Features.tsx              # Features section with scroll animations
│   ├── HowItWorks.tsx            # How it works section
│   ├── ProductCategories.tsx     # Product categories grid
│   ├── ProductList.tsx           # Product listing component
│   ├── CompareProducts.tsx       # Main comparison component (max 4 products)
│   ├── ProductDetail.tsx         # Product detail page component
│   └── CTA.tsx                   # Call-to-action section
│
├── server/                       # Express.js Backend
│   └── index.js                  # API server with product endpoints
│
├── public/                       # Static assets (images, favicon, etc.)
│
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
├── next.config.js                # Next.js configuration (SEO headers, images)
├── tailwind.config.js            # Tailwind CSS configuration
├── postcss.config.js             # PostCSS configuration
├── .gitignore                    # Git ignore rules
├── env.example                   # Environment variables template
└── README.md                     # Project documentation

```

## Key Features by File

### SEO Files
- `app/layout.tsx` - Comprehensive metadata, Open Graph, Twitter cards
- `app/robots.ts` - Search engine crawler instructions
- `app/sitemap.ts` - Dynamic sitemap for all pages
- `app/products/[id]/page.tsx` - Dynamic metadata per product

### Animation Files
- `components/Hero.tsx` - Landing page with floating animations
- `components/Features.tsx` - Scroll-triggered animations
- `components/HowItWorks.tsx` - Step-by-step animations
- Uses Framer Motion for all animations

### Comparison Logic
- `components/CompareProducts.tsx` - Main comparison component
  - Maximum 4 products
  - Same category validation
  - Side-by-side comparison table
  - Price comparison across retailers

### Backend API
- `server/index.js` - Express.js server
  - GET /api/products - List all products
  - GET /api/products/:id - Get single product
  - POST /api/products/compare - Validate and compare products

## Next.js 14 App Router Benefits

1. **Server Components by Default** - Better SEO and performance
2. **Metadata API** - Built-in SEO optimization
3. **Dynamic Routes** - `[id]` for product pages
4. **Layout System** - Shared layout with Header/Footer
5. **TypeScript Support** - Full type safety

## SEO Implementation

- ✅ Metadata API in layout.tsx
- ✅ Dynamic metadata in product pages
- ✅ Sitemap generation
- ✅ Robots.txt
- ✅ Open Graph tags
- ✅ Twitter cards
- ✅ Canonical URLs
- ✅ Structured data ready

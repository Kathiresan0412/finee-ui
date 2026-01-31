# Finee - Product Comparison Platform

A modern, SEO-optimized product comparison platform built with Next.js 14 (App Router) and Express.js backend. Compare products from multiple retailers like Amazon, eBay, and BuyBuy.

## Features

- 🎨 **Beautiful Landing Page** with smooth animations using Framer Motion
- 🔍 **SEO Optimized** with metadata, sitemap, and robots.txt
- 📊 **Product Comparison** - Compare up to 4 products of the same type
- 🛒 **Multiple Retailers** - Compare prices from Amazon, eBay, BuyBuy, and more
- 📱 **Responsive Design** - Works perfectly on all devices
- ⚡ **Fast Performance** - Built with Next.js 14 App Router
- 🔌 **Express.js Backend** - RESTful API for product data

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Backend**: Express.js, Node.js
- **SEO**: Next.js Metadata API, Sitemap, Robots.txt

## Project Structure

```
finee-ui/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout with SEO metadata
│   ├── page.tsx            # Landing page
│   ├── products/           # Product pages
│   ├── compare/            # Comparison page
│   ├── sitemap.ts          # Dynamic sitemap
│   └── robots.ts           # Robots.txt
├── components/             # React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx            # Landing page hero with animations
│   ├── Features.tsx
│   ├── HowItWorks.tsx
│   ├── ProductCategories.tsx
│   ├── ProductList.tsx
│   ├── CompareProducts.tsx # Main comparison component
│   ├── ProductDetail.tsx
│   └── CTA.tsx
├── server/                 # Express.js backend
│   └── index.js            # API server
└── public/                 # Static assets
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd finee-ui
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file (copy from `.env.example`):
```bash
cp .env.example .env.local
```

4. Update the environment variables in `.env.local`:
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Running the Application

#### Development Mode

1. Start the Express.js backend server:
```bash
npm run server
```
The backend will run on `http://localhost:5000`

2. In a new terminal, start the Next.js development server:
```bash
npm run dev
```
The frontend will run on `http://localhost:3000`

#### Production Build

1. Build the Next.js application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## API Endpoints

### Backend API (Express.js)

- `GET /api/health` - Health check
- `GET /api/products` - Get all products (supports `?category=` and `?search=` query params)
- `GET /api/products/:id` - Get single product by ID
- `GET /api/products/category/:category` - Get products by category
- `POST /api/products/compare` - Compare products (body: `{ productIds: string[] }`)

## Features Explained

### Product Comparison

- Users can select up to **4 products maximum**
- All products must be of the **same type/category**
- Side-by-side comparison with:
  - Product images
  - Prices from all retailers
  - Detailed specifications
  - Best price highlighting

### SEO Optimization

- **Metadata API**: Dynamic metadata for each page
- **Sitemap**: Auto-generated sitemap.xml
- **Robots.txt**: Search engine crawler instructions
- **Open Graph**: Social media sharing optimization
- **Structured Data**: Ready for schema.org markup

### Landing Page Animations

- Smooth scroll animations
- Fade-in effects
- Floating background elements
- Product card animations
- Interactive hover effects

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_SITE_URL` | Your website URL | `http://localhost:3000` |
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:5000` |
| `GOOGLE_VERIFICATION` | Google Search Console verification code | - |
| `PORT` | Backend server port | `5000` |

## Customization

### Adding New Products

Edit `server/index.js` and add products to the `products` array.

### Styling

- Tailwind CSS configuration: `tailwind.config.js`
- Global styles: `app/globals.css`
- Component styles: Inline Tailwind classes

### SEO Settings

Update metadata in:
- `app/layout.tsx` - Global metadata
- `app/page.tsx` - Homepage metadata
- Individual page files for page-specific metadata

## Deployment

### Vercel (Recommended for Next.js)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Other Platforms

- **Frontend**: Deploy Next.js to Vercel, Netlify, or any Node.js hosting
- **Backend**: Deploy Express.js to Railway, Render, or any Node.js hosting

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License

## Support

For issues and questions, please open an issue on GitHub.

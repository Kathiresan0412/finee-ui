# Quick Start Guide

## 🚀 Getting Started in 3 Steps

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Set Up Environment Variables
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:5000
PORT=5000
```

### Step 3: Run the Application

**Terminal 1 - Start Backend:**
```bash
npm run server
```
Backend will run on `http://localhost:5000`

**Terminal 2 - Start Frontend:**
```bash
npm run dev
```
Frontend will run on `http://localhost:3000`

## 📋 Available Scripts

- `npm run dev` - Start Next.js development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run server` - Start Express.js backend
- `npm run lint` - Run ESLint

## 🎯 Key Features to Test

1. **Landing Page** - Visit `http://localhost:3000`
   - See animated hero section
   - Scroll to see feature animations
   - Browse product categories

2. **Product Listing** - Visit `http://localhost:3000/products`
   - View all products
   - Search and filter products
   - Click to see product details

3. **Product Comparison** - Visit `http://localhost:3000/compare`
   - Select up to 4 products
   - Compare prices and specifications
   - Products must be same category

4. **Product Details** - Click any product
   - See all retailer prices
   - View specifications
   - Add to comparison

## 🔧 Troubleshooting

### Port Already in Use
If port 3000 or 5000 is already in use:
- Change `PORT` in `.env.local` for backend
- Change Next.js port: `npm run dev -- -p 3001`

### API Connection Issues
- Make sure backend is running on port 5000
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Verify CORS is enabled in `server/index.js`

### Build Errors
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`

## 📝 Next Steps

1. **Add Real Product Data**
   - Update `server/index.js` with your product data
   - Connect to a database (MongoDB, PostgreSQL, etc.)

2. **Customize Styling**
   - Edit `tailwind.config.js` for theme colors
   - Modify `app/globals.css` for global styles

3. **SEO Optimization**
   - Add Google Search Console verification code
   - Update metadata in `app/layout.tsx`
   - Add structured data (JSON-LD)

4. **Deploy**
   - Frontend: Deploy to Vercel (recommended)
   - Backend: Deploy to Railway, Render, or similar

## 🎨 Customization

### Change Colors
Edit `tailwind.config.js`:
```js
colors: {
  primary: {
    // Your color palette
  }
}
```

### Add New Products
Edit `server/index.js` and add to the `products` array.

### Modify Animations
Edit components in `components/` folder and adjust Framer Motion animations.

## 📚 Documentation

- [Next.js 14 Docs](https://nextjs.org/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

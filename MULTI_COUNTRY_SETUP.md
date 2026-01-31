# Multi-Country Setup Guide

Your Finee application now supports multi-country routing similar to xerve.in, allowing users to access country-specific versions of your site.

## URL Structure

- **US**: `finee.com/us` or `finee.com/us/products`
- **India**: `finee.com/in` or `finee.com/in/compare`
- **Canada**: `finee.com/ca`
- **UK**: `finee.com/uk`
- And more...

## Supported Countries

The following countries are currently supported:

- 🇺🇸 **US** (United States) - Default
- 🇮🇳 **IN** (India)
- 🇨🇦 **CA** (Canada)
- 🇬🇧 **UK** (United Kingdom)
- 🇦🇺 **AU** (Australia)
- 🇩🇪 **DE** (Germany)
- 🇫🇷 **FR** (France)
- 🇯🇵 **JP** (Japan)

## How It Works

### 1. Automatic Redirects
- Root path (`/`) automatically redirects to default country (`/us`)
- Middleware handles country detection and routing
- Invalid country codes redirect to default country

### 2. Country Selector
- Located in the header navigation
- Click to see all available countries
- Switching countries preserves current page path
- Example: `/us/products` → `/in/products` when switching to India

### 3. Country-Specific Features
- Each country can have different:
  - Retailers (Amazon US vs Amazon India)
  - Currency (USD, INR, CAD, etc.)
  - Product availability
  - Pricing

## File Structure

```
app/
├── [country]/              # Country-based routes
│   ├── layout.tsx          # Country-specific layout
│   ├── page.tsx            # Homepage for country
│   ├── products/
│   │   ├── page.tsx        # Products listing
│   │   └── [id]/
│   │       └── page.tsx    # Product detail
│   └── compare/
│       └── page.tsx        # Comparison page
├── layout.tsx              # Root layout
└── page.tsx                # Root redirect
```

## Adding New Countries

To add a new country, edit `lib/countries.ts`:

```typescript
{
  code: 'mx',              // Country code (ISO 3166-1 alpha-2)
  name: 'Mexico',          // Full country name
  flag: '🇲🇽',            // Flag emoji
  currency: 'MXN',         // Currency code
  retailers: [             // Available retailers for this country
    'Amazon',
    'Mercado Libre',
    // ...
  ],
}
```

## Components

### Country Selector
Located in `components/CountrySelector.tsx` - automatically appears in header.

### useCountry Hook
Use this hook in any client component to get current country:

```typescript
import { useCountry } from '@/hooks/useCountry'

function MyComponent() {
  const country = useCountry() // Returns 'us', 'in', etc.
  // ...
}
```

## SEO Benefits

- Country-specific metadata
- Country-specific sitemaps
- Better local SEO
- Currency-specific pricing
- Local retailer support

## Testing

1. Visit `http://localhost:3000` - should redirect to `/us`
2. Visit `http://localhost:3000/in` - should show India version
3. Click country selector in header - should switch countries
4. Navigate to `/us/products` then switch to India - should go to `/in/products`

## Deployment

When deploying:
1. Ensure middleware runs on all routes
2. Set `NEXT_PUBLIC_SITE_URL` in environment variables
3. Update sitemap generation for production
4. Configure CDN/edge functions if needed for country detection

## Future Enhancements

- [ ] Automatic country detection based on IP
- [ ] Country-specific product catalogs
- [ ] Localized content (translations)
- [ ] Country-specific deals and offers
- [ ] Price history tracking per country (inspired by xerve.in)

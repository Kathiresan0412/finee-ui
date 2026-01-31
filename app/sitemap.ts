import { MetadataRoute } from 'next'
import { countries } from '@/lib/countries'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const routes = ['', '/products', '/compare']
  
  const sitemapEntries: MetadataRoute.Sitemap = []
  
  // Generate sitemap for each country
  countries.forEach((country) => {
    routes.forEach((route) => {
      sitemapEntries.push({
        url: `${baseUrl}/${country.code}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'hourly',
        priority: route === '' ? 1 : route === '/products' ? 0.9 : 0.8,
      })
    })
  })
  
  return sitemapEntries
}

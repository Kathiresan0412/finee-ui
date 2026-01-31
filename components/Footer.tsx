'use client'

import Link from 'next/link'
import { useCountry } from '@/hooks/useCountry'

export default function Footer() {
  const country = useCountry()
  
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Finee</h3>
            <p className="text-gray-400">
              Compare products across multiple retailers to find the best deals.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href={`/${country}`} className="hover:text-white transition">Home</Link>
              </li>
              <li>
                <Link href={`/${country}/products`} className="hover:text-white transition">Products</Link>
              </li>
              <li>
                <Link href={`/${country}/compare`} className="hover:text-white transition">Compare</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">About</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/about" className="hover:text-white transition">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">Contact</Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition">Twitter</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">Facebook</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">Instagram</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Finee. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

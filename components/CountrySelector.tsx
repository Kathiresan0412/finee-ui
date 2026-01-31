'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { countries, type Country, defaultCountry } from '@/lib/countries'

export default function CountrySelector({ currentCountry }: { currentCountry: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const current = countries.find(c => c.code === currentCountry) || countries.find(c => c.code === defaultCountry)!

  const handleCountryChange = (countryCode: string) => {
    setIsOpen(false)
    
    // Extract the path after country code
    const pathWithoutCountry = pathname.replace(`/${currentCountry}`, '').replace(/^\//, '') || ''
    
    // Build new path with selected country
    const newPath = `/${countryCode}${pathWithoutCountry ? `/${pathWithoutCountry}` : ''}`
    
    router.push(newPath)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
      >
        <span className="text-xl">{current.flag}</span>
        <span className="text-sm font-medium hidden md:inline">{current.code.toUpperCase()}</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 max-h-96 overflow-y-auto"
            >
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Select Country
              </div>
              {countries.map((country) => (
                <button
                  key={country.code}
                  onClick={() => handleCountryChange(country.code)}
                  className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition flex items-center space-x-3 ${
                    country.code === currentCountry ? 'bg-primary-50' : ''
                  }`}
                >
                  <span className="text-2xl">{country.flag}</span>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{country.name}</div>
                    <div className="text-xs text-gray-500">{country.currency}</div>
                  </div>
                  {country.code === currentCountry && (
                    <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

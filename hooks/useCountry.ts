'use client'

import { usePathname } from 'next/navigation'
import { defaultCountry, isValidCountryCode } from '@/lib/countries'

export function useCountry() {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)
  const countryCode = segments[0]?.toLowerCase() || defaultCountry
  
  return isValidCountryCode(countryCode) ? countryCode : defaultCountry
}

export interface Country {
  code: string
  name: string
  flag: string
  currency: string
  retailers: string[]
}

export const countries: Country[] = [
  {
    code: 'us',
    name: 'United States',
    flag: '🇺🇸',
    currency: 'USD',
    retailers: ['Amazon', 'eBay', 'Walmart', 'Best Buy', 'Target'],
  },
  {
    code: 'in',
    name: 'India',
    flag: '🇮🇳',
    currency: 'INR',
    retailers: ['Amazon', 'Flipkart', 'Myntra', 'Snapdeal', 'Paytm Mall'],
  },
  {
    code: 'ca',
    name: 'Canada',
    flag: '🇨🇦',
    currency: 'CAD',
    retailers: ['Amazon', 'eBay', 'Best Buy', 'Walmart', 'Costco'],
  },
  {
    code: 'uk',
    name: 'United Kingdom',
    flag: '🇬🇧',
    currency: 'GBP',
    retailers: ['Amazon', 'eBay', 'Argos', 'Currys', 'John Lewis'],
  },
  {
    code: 'au',
    name: 'Australia',
    flag: '🇦🇺',
    currency: 'AUD',
    retailers: ['Amazon', 'eBay', 'JB Hi-Fi', 'Harvey Norman', 'Kogan'],
  },
  {
    code: 'de',
    name: 'Germany',
    flag: '🇩🇪',
    currency: 'EUR',
    retailers: ['Amazon', 'eBay', 'MediaMarkt', 'Saturn', 'Zalando'],
  },
  {
    code: 'fr',
    name: 'France',
    flag: '🇫🇷',
    currency: 'EUR',
    retailers: ['Amazon', 'eBay', 'Fnac', 'Darty', 'Cdiscount'],
  },
  {
    code: 'jp',
    name: 'Japan',
    flag: '🇯🇵',
    currency: 'JPY',
    retailers: ['Amazon', 'Rakuten', 'Yodobashi', 'Bic Camera', 'Yahoo Shopping'],
  },
]

export const defaultCountry = 'us'

export const getCountryByCode = (code: string): Country | undefined => {
  return countries.find(c => c.code.toLowerCase() === code.toLowerCase())
}

export const isValidCountryCode = (code: string): boolean => {
  return countries.some(c => c.code.toLowerCase() === code.toLowerCase())
}

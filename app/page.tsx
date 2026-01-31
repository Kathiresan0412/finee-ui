// Root page - middleware will redirect to /[country]
// This is a fallback in case middleware doesn't catch it
import { redirect } from 'next/navigation'
import { defaultCountry } from '@/lib/countries'

export default function RootPage() {
  redirect(`/${defaultCountry}`)
}

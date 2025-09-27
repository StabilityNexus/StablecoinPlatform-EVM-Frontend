import InteractionClient from './InteractionClient'
import { Suspense } from 'react'

export async function generateStaticParams() {
  return [{ coinId: 'c' }]
}

// Enable dynamic routing for contract addresses not in generateStaticParams
export const dynamicParams = true

// Force dynamic rendering for routes that use searchParams
export const dynamic = 'force-dynamic'

export default function CoinDetailPage({ 
  params, 
  searchParams 
}: { 
  params: { coinId: string }
  searchParams: { coin?: string }
}) {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <InteractionClient params={params} searchParams={searchParams} />
    </Suspense>
  )
}

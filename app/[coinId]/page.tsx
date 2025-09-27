import InteractionClient from './InteractionClient'
import { Suspense } from 'react'
import { demoStablecoins } from '@/lib/demo-data'

export async function generateStaticParams() {
  // For a Web3 app, we only generate static params for demo coins
  // Contract addresses will be handled dynamically
  return demoStablecoins.map((coin) => ({
    coinId: coin.id,
  }))
}

// Enable dynamic routing for contract addresses not in generateStaticParams
export const dynamicParams = true

export default function CoinDetailPage({ params }: { params: { coinId: string } }) {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <InteractionClient />
    </Suspense>
  )
}

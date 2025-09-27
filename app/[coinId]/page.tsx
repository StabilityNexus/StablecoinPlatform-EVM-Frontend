import InteractionClient from './InteractionClient'
import { Suspense } from 'react'
import { demoStablecoins } from '@/lib/demo-data'

export async function generateStaticParams() {
  // Generate static params for all demo stablecoins
  return demoStablecoins.map((coin) => ({
    coinId: coin.id,
  }))
}

export default function CoinDetailPage({ params }: { params: { coinId: string } }) {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <InteractionClient />
    </Suspense>
  )
}

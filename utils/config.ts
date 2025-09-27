// src/utils/config.ts
import {
    arbitrum,
    base,
    baseSepolia,      // ← newly added
    mainnet,
    optimism,
    polygon,
    scrollSepolia,
    sepolia,
  } from 'wagmi/chains'
  import {
    getDefaultConfig,
    RainbowKitProvider,
    darkTheme,
  } from '@rainbow-me/rainbowkit'
  
  // Sanitize the project ID to avoid stray quotes/semicolons that break the WalletConnect API URL
  const walletConnectProjectId = (process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '').replace(/["';]/g, '').trim()
  
  // Fallback project ID if not provided - this prevents Coinbase wallet errors
  const projectId = walletConnectProjectId || 'fallback-project-id-for-development'
  
  export const config = getDefaultConfig({
    appName: 'HackHub',
    projectId: projectId,
    chains: [
      scrollSepolia,
      baseSepolia,      // ← now supported
      polygon,
      mainnet,
      sepolia,
    ],
    ssr: true,
  })
  
import { defineChain } from 'viem'

export const rootstockTestnet = defineChain({
  id: 31,
  name: 'Rootstock Testnet',
  nativeCurrency: { name: 'Test Rootstock Bitcoin', symbol: 'tRBTC', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://public-node.testnet.rsk.co'] },
  },
  blockExplorers: {
    default: { name: 'rootstock', url: 'https://explorer.testnet.rootstock.io/' },
  },
})

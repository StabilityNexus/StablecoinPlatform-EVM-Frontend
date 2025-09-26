import type { Stablecoin } from "./demo-data"

export interface UserCoin extends Stablecoin {
  balance: number
  valueUSD: number
  isOwner: boolean
  deploymentTx: string
  lastActivity: string
}

export const userCoins: UserCoin[] = [
  {
    id: "user-1",
    name: "My Business Token",
    symbol: "MBT",
    price: 1.0,
    marketCap: 5000000,
    volume24h: 125000,
    change24h: 0.15,
    totalSupply: 5000000,
    collateralRatio: 110,
    blockchain: "Ethereum",
    creator: "0x742d35Cc6634C0532925a3b8D4C9db96590fcaAb",
    createdAt: "2024-01-15",
    description: "A stablecoin designed for my e-commerce business to facilitate seamless transactions.",
    balance: 50000,
    valueUSD: 50000,
    isOwner: true,
    deploymentTx: "0x1234567890abcdef1234567890abcdef12345678",
    lastActivity: "2024-01-20",
  },
  {
    id: "user-2",
    name: "Community Stable",
    symbol: "CSTB",
    price: 0.998,
    marketCap: 2500000,
    volume24h: 85000,
    change24h: -0.08,
    totalSupply: 2500000,
    collateralRatio: 105,
    blockchain: "Polygon",
    creator: "0x742d35Cc6634C0532925a3b8D4C9db96590fcaAb",
    createdAt: "2024-02-10",
    description: "A community-governed stablecoin for local transactions and rewards.",
    balance: 25000,
    valueUSD: 24950,
    isOwner: true,
    deploymentTx: "0xabcdef1234567890abcdef1234567890abcdef12",
    lastActivity: "2024-02-15",
  },
  {
    id: "user-3",
    name: "Project Alpha Coin",
    symbol: "PAC",
    price: 1.002,
    marketCap: 1200000,
    volume24h: 45000,
    change24h: 0.25,
    totalSupply: 1200000,
    collateralRatio: 115,
    blockchain: "BSC",
    creator: "0x742d35Cc6634C0532925a3b8D4C9db96590fcaAb",
    createdAt: "2024-03-05",
    description: "Experimental stablecoin for testing new collateral mechanisms.",
    balance: 12000,
    valueUSD: 12024,
    isOwner: true,
    deploymentTx: "0x567890abcdef1234567890abcdef1234567890ab",
    lastActivity: "2024-03-08",
  },
]

export interface Transaction {
  id: string
  type: "mint" | "burn" | "transfer" | "deposit" | "withdraw"
  amount: number
  coinSymbol: string
  timestamp: string
  txHash: string
  status: "completed" | "pending" | "failed"
}

export const recentTransactions: Transaction[] = [
  {
    id: "tx-1",
    type: "mint",
    amount: 10000,
    coinSymbol: "MBT",
    timestamp: "2024-01-20T10:30:00Z",
    txHash: "0x9876543210fedcba9876543210fedcba98765432",
    status: "completed",
  },
  {
    id: "tx-2",
    type: "transfer",
    amount: 5000,
    coinSymbol: "CSTB",
    timestamp: "2024-01-19T15:45:00Z",
    txHash: "0xfedcba9876543210fedcba9876543210fedcba98",
    status: "completed",
  },
  {
    id: "tx-3",
    type: "deposit",
    amount: 2500,
    coinSymbol: "PAC",
    timestamp: "2024-01-18T09:15:00Z",
    txHash: "0x1357924680ace1357924680ace1357924680ace1",
    status: "completed",
  },
  {
    id: "tx-4",
    type: "burn",
    amount: 1000,
    coinSymbol: "MBT",
    timestamp: "2024-01-17T14:20:00Z",
    txHash: "0xace1357924680ace1357924680ace1357924680a",
    status: "pending",
  },
]

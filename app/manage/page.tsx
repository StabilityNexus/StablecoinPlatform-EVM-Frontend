"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Coins, Send, Flame, Pause, TrendingUp, DollarSign, Activity } from "lucide-react"
import { ManagementActionCard } from "@/components/management-action-card"
import { StablecoinSelector } from "@/components/stablecoin-selector"
import { userCoins, recentTransactions } from "@/lib/user-coins-data"
import type { UserCoin } from "@/lib/user-coins-data"

export default function ManagePage() {
  const [selectedCoin, setSelectedCoin] = useState<UserCoin | null>(userCoins[0])
  const [transactions, setTransactions] = useState(recentTransactions)

  const handleAction = async (action: string, data: any) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Add new transaction to the list
    const newTransaction = {
      id: `tx-${Date.now()}`,
      type: action as any,
      amount: data.amount || 0,
      coinSymbol: selectedCoin?.symbol || "",
      timestamp: new Date().toISOString(),
      txHash: `0x${Math.random().toString(16).substr(2, 40)}`,
      status: "completed" as const,
    }

    setTransactions((prev) => [newTransaction, ...prev])

    console.log(`[v0] ${action} action completed:`, data)
  }

  const managementActions = [
    {
      title: "Mint Tokens",
      description: "Create new tokens and add to supply",
      icon: <Coins className="h-5 w-5" />,
      action: "mint" as const,
    },
    {
      title: "Burn Tokens",
      description: "Remove tokens from circulation",
      icon: <Flame className="h-5 w-5" />,
      action: "burn" as const,
    },
    {
      title: "Transfer Tokens",
      description: "Send tokens to another address",
      icon: <Send className="h-5 w-5" />,
      action: "transfer" as const,
    },
    {
      title: "Pause Contract",
      description: "Temporarily halt all operations",
      icon: <Pause className="h-5 w-5" />,
      action: "pause" as const,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Manage Stablecoins</h1>
          <p className="text-muted-foreground text-lg">Control and interact with your deployed stablecoins</p>
        </div>

        {/* Stablecoin Selector */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Select Stablecoin</CardTitle>
              <CardDescription>Choose which stablecoin you want to manage</CardDescription>
            </CardHeader>
            <CardContent>
              <StablecoinSelector coins={userCoins} selectedCoin={selectedCoin} onSelect={setSelectedCoin} />
            </CardContent>
          </Card>
        </div>

        {selectedCoin && (
          <>
            {/* Selected Coin Overview */}
            <div className="mb-8">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl">{selectedCoin.name}</CardTitle>
                      <CardDescription className="text-lg">
                        {selectedCoin.symbol} • {selectedCoin.blockchain}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary" className="text-sm">
                      Owner
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <DollarSign className="h-4 w-4" />
                        <span className="text-sm">Current Price</span>
                      </div>
                      <p className="text-2xl font-bold">${selectedCoin.price.toFixed(3)}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Coins className="h-4 w-4" />
                        <span className="text-sm">Your Balance</span>
                      </div>
                      <p className="text-2xl font-bold">{selectedCoin.balance.toLocaleString()}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <TrendingUp className="h-4 w-4" />
                        <span className="text-sm">Total Supply</span>
                      </div>
                      <p className="text-2xl font-bold">{selectedCoin.totalSupply.toLocaleString()}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Activity className="h-4 w-4" />
                        <span className="text-sm">Collateral Ratio</span>
                      </div>
                      <p className="text-2xl font-bold">{selectedCoin.collateralRatio}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Management Actions */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6">Management Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {managementActions.map((action) => (
                  <ManagementActionCard
                    key={action.action}
                    title={action.title}
                    description={action.description}
                    icon={action.icon}
                    action={action.action}
                    coinSymbol={selectedCoin.symbol}
                    onAction={handleAction}
                  />
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Transaction History</CardTitle>
                  <CardDescription>Latest transactions for {selectedCoin.symbol}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {transactions
                      .filter((tx) => tx.coinSymbol === selectedCoin.symbol)
                      .slice(0, 5)
                      .map((tx, index) => (
                        <div key={tx.id}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div
                                className={`p-2 rounded-lg ${
                                  tx.type === "mint"
                                    ? "bg-green-500/10 text-green-500"
                                    : tx.type === "burn"
                                      ? "bg-red-500/10 text-red-500"
                                      : tx.type === "transfer"
                                        ? "bg-blue-500/10 text-blue-500"
                                        : "bg-gray-500/10 text-gray-500"
                                }`}
                              >
                                {tx.type === "mint" && <Coins className="h-4 w-4" />}
                                {tx.type === "burn" && <Flame className="h-4 w-4" />}
                                {tx.type === "transfer" && <Send className="h-4 w-4" />}
                                {(tx.type === "deposit" || tx.type === "withdraw") && <Activity className="h-4 w-4" />}
                              </div>
                              <div>
                                <p className="font-medium capitalize">{tx.type}</p>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(tx.timestamp).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">
                                {tx.amount.toLocaleString()} {tx.coinSymbol}
                              </p>
                              <Badge variant={tx.status === "completed" ? "default" : "secondary"}>{tx.status}</Badge>
                            </div>
                          </div>
                          {index < 4 && <Separator className="mt-4" />}
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

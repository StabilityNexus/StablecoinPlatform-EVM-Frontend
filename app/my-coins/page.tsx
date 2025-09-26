import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserCoinCard } from "@/components/user-coin-card"
import { TransactionItem } from "@/components/transaction-item"
import { userCoins, recentTransactions } from "@/lib/user-coins-data"
import { formatNumber } from "@/lib/demo-data"
import { Plus, Wallet, TrendingUp, Activity } from "lucide-react"
import Link from "next/link"

export default function MyCoinsPage() {
  const totalValue = userCoins.reduce((sum, coin) => sum + coin.valueUSD, 0)
  const totalBalance = userCoins.reduce((sum, coin) => sum + coin.balance, 0)
  const avgChange = userCoins.reduce((sum, coin) => sum + coin.change24h, 0) / userCoins.length

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">My Stablecoins</h1>
            <p className="text-xl text-muted-foreground">Manage your stablecoin portfolio</p>
          </div>
          <Button asChild>
            <Link href="/create">
              <Plus className="h-4 w-4 mr-2" />
              Create New Coin
            </Link>
          </Button>
        </div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(totalValue)}</div>
              <p className="text-xs text-muted-foreground">Across {userCoins.length} stablecoins</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(totalBalance)}</div>
              <p className="text-xs text-muted-foreground">Total tokens held</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average 24h Change</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {avgChange >= 0 ? "+" : ""}
                {avgChange.toFixed(2)}%
              </div>
              <p className="text-xs text-muted-foreground">Portfolio performance</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Coins</CardTitle>
              <div className="h-4 w-4 bg-green-500 rounded-full"></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userCoins.length}</div>
              <p className="text-xs text-muted-foreground">Deployed stablecoins</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* My Stablecoins */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Your Stablecoins</h2>
            {userCoins.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {userCoins.map((coin) => (
                  <UserCoinCard key={coin.id} coin={coin} />
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wallet className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No Stablecoins Yet</h3>
                <p className="text-muted-foreground mb-4">Create your first stablecoin to get started</p>
                <Button asChild>
                  <Link href="/create">Create Stablecoin</Link>
                </Button>
              </Card>
            )}
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <TransactionItem key={transaction.id} transaction={transaction} />
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 bg-transparent">
              View All Transactions
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

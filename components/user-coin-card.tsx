import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { type UserCoin, formatNumber, formatPrice, formatPercentage } from "@/lib/demo-data"
import { cn } from "@/lib/utils"
import { Settings, TrendingUp, TrendingDown } from "lucide-react"

interface UserCoinCardProps {
  coin: UserCoin
}

export function UserCoinCard({ coin }: UserCoinCardProps) {
  const isPositiveChange = coin.change24h >= 0

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">{coin.symbol.charAt(0)}</span>
            </div>
            <div>
              <h3 className="font-semibold text-lg">{coin.name}</h3>
              <p className="text-muted-foreground text-sm">{coin.symbol}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary">{coin.blockchain}</Badge>
            {coin.isOwner && <Badge variant="default">Owner</Badge>}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Your Balance</p>
            <p className="text-xl font-bold">
              {formatNumber(coin.balance)} {coin.symbol}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">USD Value</p>
            <p className="text-xl font-bold">{formatNumber(coin.valueUSD)}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Current Price</p>
            <p className="font-semibold">{formatPrice(coin.price)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">24h Change</p>
            <div className="flex items-center space-x-1">
              {isPositiveChange ? (
                <TrendingUp className="h-4 w-4 text-green-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600" />
              )}
              <p className={cn("font-semibold", isPositiveChange ? "text-green-600" : "text-red-600")}>
                {formatPercentage(coin.change24h)}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Total Supply</p>
            <p className="font-semibold">{formatNumber(coin.totalSupply)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Collateral Ratio</p>
            <p className="font-semibold">{coin.collateralRatio}%</p>
          </div>
        </div>

        <div className="flex space-x-2 pt-2">
          <Button size="sm" className="flex-1">
            Manage
          </Button>
          <Button size="sm" variant="outline" className="bg-transparent">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

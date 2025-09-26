import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { type Stablecoin, formatNumber, formatPrice, formatPercentage } from "@/lib/demo-data"
import { cn } from "@/lib/utils"

interface StablecoinCardProps {
  stablecoin: Stablecoin
}

export function StablecoinCard({ stablecoin }: StablecoinCardProps) {
  const isPositiveChange = stablecoin.change24h >= 0

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">{stablecoin.symbol.charAt(0)}</span>
            </div>
            <div>
              <h3 className="font-semibold text-lg">{stablecoin.name}</h3>
              <p className="text-muted-foreground text-sm">{stablecoin.symbol}</p>
            </div>
          </div>
          <Badge variant="secondary">{stablecoin.blockchain}</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Price</p>
            <p className="text-xl font-bold">{formatPrice(stablecoin.price)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">24h Change</p>
            <p className={cn("text-xl font-bold", isPositiveChange ? "text-green-600" : "text-red-600")}>
              {formatPercentage(stablecoin.change24h)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Market Cap</p>
            <p className="font-semibold">{formatNumber(stablecoin.marketCap)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">24h Volume</p>
            <p className="font-semibold">{formatNumber(stablecoin.volume24h)}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Total Supply</p>
            <p className="font-semibold">{formatNumber(stablecoin.totalSupply)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Collateral Ratio</p>
            <p className="font-semibold">{stablecoin.collateralRatio}%</p>
          </div>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-2">Description</p>
          <p className="text-sm text-pretty">{stablecoin.description}</p>
        </div>

        <div className="pt-2">
          <Button className="w-full bg-transparent" variant="outline">
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

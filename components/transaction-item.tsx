import { Badge } from "@/components/ui/badge"
import type { Transaction } from "@/lib/user-coins-data"
import { formatNumber } from "@/lib/demo-data"
import { ArrowUpRight, ArrowDownLeft, ArrowRightLeft, Plus, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

interface TransactionItemProps {
  transaction: Transaction
}

export function TransactionItem({ transaction }: TransactionItemProps) {
  const getIcon = () => {
    switch (transaction.type) {
      case "mint":
        return <Plus className="h-4 w-4 text-green-600" />
      case "burn":
        return <Minus className="h-4 w-4 text-red-600" />
      case "transfer":
        return <ArrowRightLeft className="h-4 w-4 text-blue-600" />
      case "deposit":
        return <ArrowDownLeft className="h-4 w-4 text-green-600" />
      case "withdraw":
        return <ArrowUpRight className="h-4 w-4 text-orange-600" />
      default:
        return <ArrowRightLeft className="h-4 w-4" />
    }
  }

  const getStatusColor = () => {
    switch (transaction.status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">{getIcon()}</div>
        <div>
          <p className="font-medium capitalize">{transaction.type}</p>
          <p className="text-sm text-muted-foreground">
            {formatNumber(transaction.amount)} {transaction.coinSymbol}
          </p>
        </div>
      </div>
      <div className="text-right">
        <Badge className={cn("text-xs", getStatusColor())}>{transaction.status}</Badge>
        <p className="text-sm text-muted-foreground mt-1">{new Date(transaction.timestamp).toLocaleDateString()}</p>
      </div>
    </div>
  )
}

"use client"

import { useChainId, useSwitchChain } from "wagmi"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { StableCoinFactories } from "@/utils/addresses"

const supportedChains = {
  534351: { name: "Scroll Sepolia", symbol: "ETH" },
  5115: { name: "Citrea Testnet", symbol: "cBTC" },
  31: { name: "Rootstock Testnet", symbol: "tRBTC" }
}

export function ChainSelector() {
  const chainId = useChainId()
  const { switchChain } = useSwitchChain()

  const currentChain = supportedChains[chainId as keyof typeof supportedChains]
  const isSupported = chainId in StableCoinFactories

  const handleChainSwitch = (value: string) => {
    const targetChainId = parseInt(value)
    switchChain({ chainId: targetChainId })
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Network:</span>
        <Badge variant={isSupported ? "default" : "destructive"}>
          {currentChain?.name || `Chain ${chainId}`}
        </Badge>
      </div>
      
      <Select value={chainId.toString()} onValueChange={handleChainSwitch}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select network" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(supportedChains).map(([id, chain]) => (
            <SelectItem key={id} value={id}>
              <div className="flex items-center gap-2">
                <span>{chain.name}</span>
                <Badge variant="outline" className="text-xs">
                  {chain.symbol}
                </Badge>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

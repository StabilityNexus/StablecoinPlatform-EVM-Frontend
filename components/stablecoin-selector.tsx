"use client"

import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import type { UserCoin } from "@/lib/user-coins-data"

interface StablecoinSelectorProps {
  coins: UserCoin[]
  selectedCoin: UserCoin | null
  onSelect: (coin: UserCoin) => void
}

export function StablecoinSelector({ coins, selectedCoin, onSelect }: StablecoinSelectorProps) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between bg-transparent"
        >
          {selectedCoin ? (
            <div className="flex items-center gap-2">
              <span className="font-medium">{selectedCoin.symbol}</span>
              <span className="text-muted-foreground">- {selectedCoin.name}</span>
            </div>
          ) : (
            "Select a stablecoin..."
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search stablecoins..." />
          <CommandList>
            <CommandEmpty>No stablecoin found.</CommandEmpty>
            <CommandGroup>
              {coins.map((coin) => (
                <CommandItem
                  key={coin.id}
                  value={coin.symbol}
                  onSelect={() => {
                    onSelect(coin)
                    setOpen(false)
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", selectedCoin?.id === coin.id ? "opacity-100" : "opacity-0")} />
                  <div className="flex items-center justify-between w-full">
                    <div>
                      <span className="font-medium">{coin.symbol}</span>
                      <span className="text-muted-foreground ml-2">- {coin.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Balance: {coin.balance.toLocaleString()}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

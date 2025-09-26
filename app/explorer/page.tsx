"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StablecoinCard } from "@/components/stablecoin-card"
import { demoStablecoins } from "@/lib/demo-data"
import { Search, Filter } from "lucide-react"

export default function ExplorerPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("marketCap")
  const [filterBy, setFilterBy] = useState("all")

  const filteredCoins = demoStablecoins
    .filter((coin) => {
      const matchesSearch =
        coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesFilter = filterBy === "all" || coin.blockchain.toLowerCase() === filterBy.toLowerCase()
      return matchesSearch && matchesFilter
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "marketCap":
          return b.marketCap - a.marketCap
        case "volume":
          return b.volume24h - a.volume24h
        case "price":
          return b.price - a.price
        case "name":
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Stablecoin Explorer</h1>
          <p className="text-xl text-muted-foreground">Discover and analyze stablecoins across different blockchains</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search stablecoins..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="marketCap">Market Cap</SelectItem>
                  <SelectItem value="volume">24h Volume</SelectItem>
                  <SelectItem value="price">Price</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="w-[150px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Chains</SelectItem>
                  <SelectItem value="ethereum">Ethereum</SelectItem>
                  <SelectItem value="bsc">BSC</SelectItem>
                  <SelectItem value="polygon">Polygon</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card p-6 rounded-lg border">
            <h3 className="text-sm font-medium text-muted-foreground">Total Stablecoins</h3>
            <p className="text-2xl font-bold">{demoStablecoins.length}</p>
          </div>
          <div className="bg-card p-6 rounded-lg border">
            <h3 className="text-sm font-medium text-muted-foreground">Total Market Cap</h3>
            <p className="text-2xl font-bold">
              ${(demoStablecoins.reduce((sum, coin) => sum + coin.marketCap, 0) / 1e9).toFixed(1)}B
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg border">
            <h3 className="text-sm font-medium text-muted-foreground">24h Volume</h3>
            <p className="text-2xl font-bold">
              ${(demoStablecoins.reduce((sum, coin) => sum + coin.volume24h, 0) / 1e9).toFixed(1)}B
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg border">
            <h3 className="text-sm font-medium text-muted-foreground">Avg Collateral Ratio</h3>
            <p className="text-2xl font-bold">
              {(demoStablecoins.reduce((sum, coin) => sum + coin.collateralRatio, 0) / demoStablecoins.length).toFixed(
                0,
              )}
              %
            </p>
          </div>
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-muted-foreground">
            Showing {filteredCoins.length} of {demoStablecoins.length} stablecoins
          </p>
        </div>

        {/* Stablecoin Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCoins.map((coin) => (
            <StablecoinCard key={coin.id} stablecoin={coin} />
          ))}
        </div>

        {filteredCoins.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No stablecoins found matching your criteria.</p>
            <Button
              variant="outline"
              className="mt-4 bg-transparent"
              onClick={() => {
                setSearchTerm("")
                setFilterBy("all")
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

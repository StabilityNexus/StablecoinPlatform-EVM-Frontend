"use client"

import { useState } from "react"
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Wallet, Rocket, CheckCircle, Zap } from "lucide-react"
import { StableCoinFactoryABI } from "@/utils/abi/StableCoinFactory"
import { StableCoinFactories, PythOracles, PriceFeedCategories } from "@/utils/addresses"
import { toast } from "sonner"
import Shuffle from "@/components/Shuffle"
import TargetCursor from "@/components/TargetCursor"

interface ReactorConfig {
  vaultName: string
  neutronName: string
  neutronSymbol: string
  protonName: string  
  protonSymbol: string
  baseToken: string
  pegAsset: string
  priceId: string
  treasury: string
}

const RISK_LEVELS = [
  { value: 0, label: "Conservative (90%)", description: "Lower risk, higher stability" },
  { value: 1, label: "Moderate (80%)", description: "Balanced risk and yield" },
  { value: 2, label: "Aggressive (70%)", description: "Higher risk, higher potential yield" }
]

export default function CreatePage() {
  const { address, isConnected } = useAccount()
  const [config, setConfig] = useState<ReactorConfig>({
    vaultName: "",
    neutronName: "",
    neutronSymbol: "",
    protonName: "",
    protonSymbol: "",
    baseToken: "",
    pegAsset: "USD",
    priceId: PriceFeedCategories['Fiat Currencies'][0].priceId,
    treasury: address || "",
  })

  // Contract interaction
  const { data: hash, isPending: isDeploying, writeContract } = useWriteContract()

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const updateConfig = (field: keyof ReactorConfig, value: string | number) => {
    setConfig((prev) => ({ ...prev, [field]: value }))
  }

  // Set treasury to user address when they connect
  if (isConnected && address && !config.treasury) {
    setConfig(prev => ({ ...prev, treasury: address }))
  }

  const isFormValid = () => {
    return config.vaultName &&
           config.neutronName && 
           config.neutronSymbol && 
           config.protonName && 
           config.protonSymbol && 
           config.baseToken && 
           config.treasury &&
           config.priceId
  }

  const handleDeploy = () => {
    if (!isConnected) {
      toast.error("Please connect your wallet first")
      return
    }

    if (!writeContract) {
      toast.error("Contract write function not available")
      return
    }

    if (!isFormValid()) {
      toast.error("Please fill in all required fields")
      return
    }

    try {
      writeContract({
        address: StableCoinFactories[534351],
        abi: StableCoinFactoryABI,
        functionName: 'deployReactor',
        args: [
          config.vaultName,
          config.baseToken as `0x${string}`,
          PythOracles[534351],
          config.priceId as `0x${string}`,
          BigInt(3600), // 1 hour max price age
          config.neutronName,
          config.neutronSymbol,
          config.protonName,
          config.protonSymbol,
          config.treasury as `0x${string}`,
          BigInt(5000000000000000), // 0.5% fission fee (0.005e18)
          BigInt(5000000000000000)  // 0.5% fusion fee (0.005e18)
        ]
      })
    } catch (error) {
      console.error("Deployment error:", error)
      toast.error("Failed to deploy reactor")
    }
  }

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Orbitron', 'Space Mono', 'Courier New', monospace", fontWeight: "500" }}>
      {/* Target Cursor Effect */}
      <TargetCursor 
        spinDuration={2}
        hideDefaultCursor={true}
      />
      
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <Shuffle
            text="Deploy Reactor"
            tag="h1"
            className="text-5xl font-bold mb-2"
            shuffleDirection="right"
            duration={0.35}
            animationMode="evenodd"
            shuffleTimes={1}
            ease="power3.out"
            stagger={0.03}
            threshold={0.1}
            triggerOnce={true}
            triggerOnHover={true}
            respectReducedMotion={true}
          />
          <p className="font-light text-foreground text-xl" style={{ letterSpacing: "0.05em", textShadow: "0 0 10px rgba(255, 255, 255, 0.2)" }}>
            Create a dual-token reactor system
          </p>
        </div>

        {/* Connection Status */}
        {!isConnected && (
          <div className="max-w-md mx-auto mb-8">
            <div className="bg-card/50 border-2 border-white/10 rounded-lg p-4 hover:border-white/20 transition-all duration-300">
              <div className="flex items-center gap-3">
                <Wallet className="h-5 w-5 text-muted-foreground" />
                <p className="text-muted-foreground">Connect your wallet to deploy a reactor</p>
              </div>
            </div>
          </div>
        )}

        {/* Single Form */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-card/50 border-2 border-white/10 rounded-lg overflow-hidden hover:border-white/20 transition-all duration-300">
            
            {/* Form Content */}
            <div className="p-8 space-y-8">
              
              {/* Vault Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold" style={{ letterSpacing: "0.02em" }}>
                  Vault Information
                </h3>
                <div>
                  <Label className="text-sm text-muted-foreground" style={{ letterSpacing: "0.02em" }}>Vault Name</Label>
                  <Input
                    placeholder="e.g., Gold Backed Vault"
                    value={config.vaultName}
                    onChange={(e) => updateConfig("vaultName", e.target.value)}
                    className="h-12 bg-transparent border-2 border-white/20 focus:border-white/40 hover:border-white/30 transition-all duration-300 cursor-target"
                  />
                </div>
              </div>

              {/* Peg Configuration */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold" style={{ letterSpacing: "0.02em" }}>
                  Peg Target
                </h3>
                <div>
                  <Label className="text-sm text-muted-foreground" style={{ letterSpacing: "0.02em" }}>
                    What should your stable token track?
                  </Label>
                  <Select 
                    value={config.pegAsset} 
                    onValueChange={(value) => {
                      const selectedFeed = Object.values(PriceFeedCategories)
                        .flat()
                        .find(feed => feed.symbol === value);
                      if (selectedFeed) {
                        updateConfig("pegAsset", value);
                        updateConfig("priceId", selectedFeed.priceId);
                      }
                    }}
                  >
                    <SelectTrigger className="h-12 bg-transparent border-2 border-white/20 focus:border-white/40 hover:border-white/30 transition-all duration-300 cursor-target">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(PriceFeedCategories).map(([category, feeds]) => (
                        <div key={category}>
                          <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">
                            {category}
                          </div>
                          {feeds.map((feed) => (
                            <SelectItem key={feed.symbol} value={feed.symbol}>
                              {feed.name} ({feed.symbol})
                            </SelectItem>
                          ))}
                        </div>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Token Configuration */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold" style={{ letterSpacing: "0.02em" }}>
                  Token Names
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="text-sm text-muted-foreground flex items-center gap-2" style={{ letterSpacing: "0.02em" }}>
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      Stable Token
                    </div>
                    <div>
                      <Input
                        placeholder="Token Name"
                        value={config.neutronName}
                        onChange={(e) => updateConfig("neutronName", e.target.value)}
                        className="h-12 bg-transparent border-2 border-white/20 focus:border-white/40 hover:border-white/30 transition-all duration-300 cursor-target"
                      />
                    </div>
                    <div>
                      <Input
                        placeholder="SYMBOL"
                        value={config.neutronSymbol}
                        onChange={(e) => updateConfig("neutronSymbol", e.target.value.toUpperCase())}
                        className="h-12 bg-transparent border-2 border-white/20 focus:border-white/40 hover:border-white/30 transition-all duration-300 cursor-target font-mono"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="text-sm text-muted-foreground flex items-center gap-2" style={{ letterSpacing: "0.02em" }}>
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      Volatile Token
                    </div>
                    <div>
                      <Input
                        placeholder="Token Name"
                        value={config.protonName}
                        onChange={(e) => updateConfig("protonName", e.target.value)}
                        className="h-12 bg-transparent border-2 border-white/20 focus:border-white/40 hover:border-white/30 transition-all duration-300 cursor-target"
                      />
                    </div>
                    <div>
                      <Input
                        placeholder="SYMBOL"
                        value={config.protonSymbol}
                        onChange={(e) => updateConfig("protonSymbol", e.target.value.toUpperCase())}
                        className="h-12 bg-transparent border-2 border-white/20 focus:border-white/40 hover:border-white/30 transition-all duration-300 cursor-target font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Addresses */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold" style={{ letterSpacing: "0.02em" }}>
                  Configuration
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm text-muted-foreground" style={{ letterSpacing: "0.02em" }}>
                      Base Token (Collateral)
                    </Label>
                    <Input
                      placeholder="0x..."
                      value={config.baseToken}
                      onChange={(e) => updateConfig("baseToken", e.target.value)}
                      className="h-12 bg-transparent border-2 border-white/20 focus:border-white/40 hover:border-white/30 transition-all duration-300 cursor-target font-mono"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-sm text-muted-foreground" style={{ letterSpacing: "0.02em" }}>
                      Treasury (Fee Recipient)
                    </Label>
                    <Input
                      placeholder="0x..."
                      value={config.treasury}
                      onChange={(e) => updateConfig("treasury", e.target.value)}
                      className="h-12 bg-transparent border-2 border-white/20 focus:border-white/40 hover:border-white/30 transition-all duration-300 cursor-target font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Deploy Section */}
            <div className="border-t border-white/10 p-8">
              <div className="space-y-4">
                {/* Info Panel */}
                <div className="bg-muted/20 rounded-lg p-4 border border-white/10">
                  <div className="grid grid-cols-3 gap-4 text-center text-sm">
                    <div>
                      <div className="font-semibold">Critical Ratio</div>
                      <div className="text-muted-foreground">80%</div>
                    </div>
                    <div>
                      <div className="font-semibold">Fees</div>
                      <div className="text-muted-foreground">0.5%</div>
                    </div>
                    <div>
                      <div className="font-semibold">Peg Target</div>
                      <div className="text-muted-foreground">{config.pegAsset}</div>
                    </div>
                  </div>
                </div>

                {/* Deploy Button */}
                <Button 
                  size="lg" 
                  className="w-full h-14 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold text-lg border-0 cursor-target" 
                  onClick={handleDeploy}
                  disabled={!isConnected || !isFormValid() || isDeploying || isConfirming}
                  style={{ letterSpacing: "0.05em" }}
                >
                  {isDeploying ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                      Deploying...
                    </>
                  ) : isConfirming ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                      Confirming...
                    </>
                    ) : !isConnected ? (
                      <>
                        <Wallet className="mr-2 h-5 w-5" />
                        Connect Wallet
                      </>
                    ) : (
                      <>
                        <Zap className="mr-2 h-5 w-5" />
                        Deploy Reactor
                      </>
                    )}
                </Button>

                {/* Success Message */}
                {isSuccess && (
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <div>
                        <div className="font-semibold text-green-500">Reactor Deployed!</div>
                        <div className="text-sm text-green-400 font-mono break-all">
                          {hash}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
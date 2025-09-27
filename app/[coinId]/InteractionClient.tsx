"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { parseEther, formatEther } from "viem"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpDown, Settings, Info, Zap, ArrowRightLeft, Split, Merge, Activity, Shield, AlertTriangle } from "lucide-react"
import { ConnectButton } from '@rainbow-me/rainbowkit'
import LightRays from "@/components/LightRays"
import Shuffle from "@/components/Shuffle"
import { StableCoinReactorABI, ERC20ABI } from "@/utils/abi/StableCoin"
import { toast } from "sonner"

interface ReactorData {
  base: string
  neutron: string
  proton: string
  treasury: string
  reserve: bigint
  neutronSupply: bigint
  protonSupply: bigint
  reserveRatio: bigint
  isHealthy: boolean
  criticalRatio: bigint
  fissionFee: bigint
  fusionFee: bigint
}

export default function InteractionClient() {
  const { address, isConnected } = useAccount()
  const params = useParams()
  const reactorAddress = params.coinId as string
  
  const [activeTab, setActiveTab] = useState("fission")
  const [amount, setAmount] = useState("")
  const [recipient, setRecipient] = useState("")

  // Contract reads for reactor data
  const { data: systemHealth, isLoading: isLoadingHealth, refetch: refetchHealth } = useReadContract({
    address: reactorAddress as `0x${string}`,
    abi: StableCoinReactorABI,
    functionName: 'systemHealth',
  })

  const { data: baseToken } = useReadContract({
    address: reactorAddress as `0x${string}`,
    abi: StableCoinReactorABI,
    functionName: 'base',
  })

  const { data: neutronToken } = useReadContract({
    address: reactorAddress as `0x${string}`,
    abi: StableCoinReactorABI,
    functionName: 'neutron',
  })

  const { data: protonToken } = useReadContract({
    address: reactorAddress as `0x${string}`,
    abi: StableCoinReactorABI,
    functionName: 'proton',
  })

  const { data: fissionFee } = useReadContract({
    address: reactorAddress as `0x${string}`,
    abi: StableCoinReactorABI,
    functionName: 'fissionFee',
  })

  const { data: fusionFee } = useReadContract({
    address: reactorAddress as `0x${string}`,
    abi: StableCoinReactorABI,
    functionName: 'fusionFee',
  })

  // Pyth oracle data
  const { data: priceId } = useReadContract({
    address: reactorAddress as `0x${string}`,
    abi: StableCoinReactorABI,
    functionName: 'priceId',
  })

  const { data: neutronTargetPrice, isError: isPriceError, refetch: refetchPrice } = useReadContract({
    address: reactorAddress as `0x${string}`,
    abi: StableCoinReactorABI,
    functionName: 'getNeutronTargetPrice',
  })

  // Token symbols
  const { data: baseSymbol } = useReadContract({
    address: baseToken as `0x${string}`,
    abi: ERC20ABI,
    functionName: 'symbol',
    query: {
      enabled: !!baseToken,
    }
  })

  const { data: neutronSymbol } = useReadContract({
    address: neutronToken as `0x${string}`,
    abi: ERC20ABI,
    functionName: 'symbol',
    query: {
      enabled: !!neutronToken,
    }
  })

  const { data: protonSymbol } = useReadContract({
    address: protonToken as `0x${string}`,
    abi: ERC20ABI,
    functionName: 'symbol',
    query: {
      enabled: !!protonToken,
    }
  })

  // User balances
  const { data: baseBalance, refetch: refetchBaseBalance } = useReadContract({
    address: baseToken as `0x${string}`,
    abi: ERC20ABI,
    functionName: 'balanceOf',
    args: [address as `0x${string}`],
    query: {
      enabled: !!address && !!baseToken,
    }
  })

  const { data: neutronBalance, refetch: refetchNeutronBalance } = useReadContract({
    address: neutronToken as `0x${string}`,
    abi: ERC20ABI,
    functionName: 'balanceOf',
    args: [address as `0x${string}`],
    query: {
      enabled: !!address && !!neutronToken,
    }
  })

  const { data: protonBalance, refetch: refetchProtonBalance } = useReadContract({
    address: protonToken as `0x${string}`,
    abi: ERC20ABI,
    functionName: 'balanceOf',
    args: [address as `0x${string}`],
    query: {
      enabled: !!address && !!protonToken,
    }
  })

  // Approval check
  const { data: baseAllowance } = useReadContract({
    address: baseToken as `0x${string}`,
    abi: ERC20ABI,
    functionName: 'allowance',
    args: [address as `0x${string}`, reactorAddress as `0x${string}`],
    query: {
      enabled: !!address && !!baseToken,
    }
  })

  // Contract writes
  const { data: approveHash, writeContract: writeApprove, isPending: isApproving } = useWriteContract()
  const { data: fissionHash, writeContract: writeFission, isPending: isFissioning } = useWriteContract()
  const { data: fusionHash, writeContract: writeFusion, isPending: isFusing } = useWriteContract()

  // Transaction confirmations
  const { isLoading: isApprovingTx, isSuccess: isApproveSuccess } = useWaitForTransactionReceipt({ 
    hash: approveHash,
  })
  const { isLoading: isFissionTx, isSuccess: isFissionSuccess } = useWaitForTransactionReceipt({ 
    hash: fissionHash,
  })
  const { isLoading: isFusionTx, isSuccess: isFusionSuccess } = useWaitForTransactionReceipt({ 
    hash: fusionHash,
  })

  // Update recipient to user address by default
  useEffect(() => {
    if (address && !recipient) {
      setRecipient(address)
    }
  }, [address, recipient])

  // Refetch balances after successful transactions
  useEffect(() => {
    if (isFissionSuccess || isFusionSuccess || isApproveSuccess) {
      refetchBaseBalance()
      refetchNeutronBalance()
      refetchProtonBalance()
      refetchHealth()
      refetchPrice()
    }
  }, [isFissionSuccess, isFusionSuccess, isApproveSuccess])

  const handleApprove = () => {
    if (!writeApprove || !baseToken) return
    
    try {
      writeApprove({
        address: baseToken as `0x${string}`,
        abi: ERC20ABI,
        functionName: 'approve',
        args: [reactorAddress as `0x${string}`, parseEther("1000000")] // Large approval
      })
    } catch (error) {
      console.error("Approve error:", error)
      toast.error("Failed to approve tokens")
    }
  }

  const handleFission = () => {
    if (!writeFission || !amount) return
    
    try {
      writeFission({
        address: reactorAddress as `0x${string}`,
        abi: StableCoinReactorABI,
        functionName: 'fission',
        args: [parseEther(amount), recipient as `0x${string}`]
      })
    } catch (error) {
      console.error("Fission error:", error)
      toast.error("Failed to perform fission")
    }
  }

  const handleFusion = () => {
    if (!writeFusion || !amount) return
    
    try {
      writeFusion({
        address: reactorAddress as `0x${string}`,
        abi: StableCoinReactorABI,
        functionName: 'fusion',
        args: [parseEther(amount), recipient as `0x${string}`]
      })
    } catch (error) {
      console.error("Fusion error:", error)
      toast.error("Failed to perform fusion")
    }
  }

  const needsApproval = activeTab === "fission" && baseAllowance !== undefined && parseEther(amount || "0") > (baseAllowance || 0n)

  const formatBalance = (balance: bigint | undefined) => {
    if (!balance) return "0"
    return parseFloat(formatEther(balance)).toFixed(4)
  }

  const formatFee = (fee: bigint | undefined) => {
    if (!fee) return "0"
    return (Number(fee) / 1e16).toFixed(2) + "%"
  }

  const formatPrice = (price: bigint | undefined) => {
    if (!price) return "0.00"
    // Price is in 18 decimal precision, convert to readable format
    return parseFloat(formatEther(price)).toFixed(6)
  }

  const formatPriceId = (id: string | undefined) => {
    if (!id) return "N/A"
    return `${id.slice(0, 8)}...${id.slice(-6)}`
  }

  const containerStyle = {
    fontFamily: "'Orbitron', 'Space Mono', 'Courier New', monospace",
    fontWeight: "500"
  }

  return (
    <div className="min-h-screen relative" style={containerStyle}>
      {/* Full Page Light Rays Background Effect */}
      <LightRays
        raysOrigin="top-center"
        raysColor="#F7F7F7"
        raysSpeed={1.5}
        lightSpread={0.8}
        rayLength={1.2}
        followMouse={true}
        mouseInfluence={0.1}
        noiseAmount={0.1}
        distortion={0.05}
        className="fixed inset-0 z-[1]"
      />
      
      <div className="container mx-auto px-4 py-8 relative z-[5]">
        {/* Header */}
        <div className="text-center mb-8">
          <Shuffle
            text="StableCoin Reactor"
            tag="h1"
            className="text-4xl lg:text-6xl font-bold mb-4 text-foreground"
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
          
          <div className="flex items-center justify-center gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold" style={{ textShadow: "0 0 5px rgba(255, 255, 255, 0.1)" }}>
                {neutronSymbol}/{protonSymbol} Reactor
              </h2>
              <p className="text-sm text-muted-foreground font-mono">
                {reactorAddress.slice(0, 8)}...{reactorAddress.slice(-6)}
              </p>
            </div>
          </div>

          {/* System Health */}
          {systemHealth && (
            <div className="flex justify-center mb-6">
              <Badge variant={systemHealth[2] ? "default" : "destructive"} className="text-sm px-4 py-2">
                {systemHealth[2] ? (
                  <><Shield className="h-4 w-4 mr-2" /> Healthy ({(Number(systemHealth[0]) / 1e16).toFixed(1)}%)</>
                ) : (
                  <><AlertTriangle className="h-4 w-4 mr-2" /> At Risk ({(Number(systemHealth[0]) / 1e16).toFixed(1)}%)</>
                )}
              </Badge>
            </div>
          )}
        </div>

        {/* Interface */}
        <div className="max-w-md mx-auto">
          <Card className="backdrop-blur-md bg-background/60 border-white/20 shadow-2xl">
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="fission" className="flex items-center gap-2">
                    <Split className="h-4 w-4" />
                    Fission
                  </TabsTrigger>
                  <TabsTrigger value="fusion" className="flex items-center gap-2">
                    <Merge className="h-4 w-4" />
                    Fusion
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="fission" className="space-y-4">
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      Split {baseSymbol} into {neutronSymbol} (stable) and {protonSymbol} (volatile) tokens.
                      Fee: {formatFee(fissionFee)}
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-muted-foreground">Input Amount ({baseSymbol})</label>
                      <button 
                        className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                        onClick={() => baseBalance && setAmount(formatEther(baseBalance))}
                      >
                        Balance: {formatBalance(baseBalance)}
                      </button>
                    </div>
                    
                    <Input
                      type="number"
                      placeholder="0.0"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="text-2xl font-bold h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">Recipient Address</label>
                    <Input
                      placeholder="0x..."
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                      className="font-mono text-sm"
                    />
                  </div>

                  {amount && (
                    <div className="bg-muted/50 p-4 rounded-lg space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Input:</span>
                        <span>{amount} {baseSymbol}</span>
                      </div>
                      <div className="flex justify-between text-yellow-500">
                        <span>Output {neutronSymbol}:</span>
                        <span>≈ {amount}</span>
                      </div>
                      <div className="flex justify-between text-red-500">
                        <span>Output {protonSymbol}:</span>
                        <span>≈ {amount}</span>
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="fusion" className="space-y-4">
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      Burn {neutronSymbol} and {protonSymbol} to redeem {baseSymbol}.
                      Fee: {formatFee(fusionFee)}
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-muted-foreground">Redeem Amount ({baseSymbol})</label>
                      <div className="text-xs text-muted-foreground">
                        {neutronSymbol}: {formatBalance(neutronBalance)} | {protonSymbol}: {formatBalance(protonBalance)}
                      </div>
                    </div>
                    
                    <Input
                      type="number"
                      placeholder="0.0"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="text-2xl font-bold h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">Recipient Address</label>
                    <Input
                      placeholder="0x..."
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                      className="font-mono text-sm"
                    />
                  </div>

                  {amount && (
                    <div className="bg-muted/50 p-4 rounded-lg space-y-2 text-sm">
                      <div className="flex justify-between text-yellow-500">
                        <span>Burn {neutronSymbol}:</span>
                        <span>≈ {amount}</span>
                      </div>
                      <div className="flex justify-between text-red-500">
                        <span>Burn {protonSymbol}:</span>
                        <span>≈ {amount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Receive {baseSymbol}:</span>
                        <span>{amount}</span>
                      </div>
                    </div>
                  )}
                </TabsContent>
              </Tabs>

              {/* Action Button */}
              <div className="pt-6">
                <ConnectButton.Custom>
                  {({ account, chain, openConnectModal, openAccountModal, openChainModal, mounted }) => {
                    const ready = mounted;
                    const connected = ready && account && chain;

                    return (
                      <div
                        {...(!ready && {
                          'aria-hidden': true,
                          style: {
                            opacity: 0,
                            pointerEvents: 'none',
                            userSelect: 'none',
                          },
                        })}
                      >
                        {(() => {
                          if (!connected) {
                            return (
                              <Button
                                onClick={openConnectModal}
                                className="w-full h-14 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold text-lg border-0"
                              >
                                <Zap className="mr-2 h-5 w-5" />
                                Connect Wallet
                              </Button>
                            );
                          }

                          if (!amount || !recipient) {
                            return (
                              <Button
                                disabled
                                className="w-full h-14 bg-muted text-muted-foreground"
                              >
                                Enter Amount and Recipient
                              </Button>
                            );
                          }

                          if (needsApproval) {
                            return (
                              <Button
                                onClick={handleApprove}
                                disabled={isApproving || isApprovingTx}
                                className="w-full h-14 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold text-lg border-0"
                              >
                                {isApproving || isApprovingTx ? (
                                  <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                                    Approving...
                                  </>
                                ) : (
                                  <>
                                    <Shield className="mr-2 h-5 w-5" />
                                    Approve {baseSymbol}
                                  </>
                                )}
                              </Button>
                            );
                          }

                          return (
                            <Button
                              onClick={activeTab === "fission" ? handleFission : handleFusion}
                              disabled={isFissioning || isFusing || isFissionTx || isFusionTx}
                              className="w-full h-14 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold text-lg border-0"
                            >
                              {isFissioning || isFusing || isFissionTx || isFusionTx ? (
                                <>
                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                                  {activeTab === "fission" ? "Splitting..." : "Merging..."}
                                </>
                              ) : (
                                <>
                                  {activeTab === "fission" ? (
                                    <><Split className="mr-2 h-5 w-5" /> Split Tokens</>
                                  ) : (
                                    <><Merge className="mr-2 h-5 w-5" /> Merge Tokens</>
                                  )}
                                </>
                              )}
                            </Button>
                          );
                        })()}
                      </div>
                    );
                  }}
                </ConnectButton.Custom>
              </div>

              {/* Token Balances */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <h3 className="text-sm font-medium mb-3 text-center">Your Token Balances</h3>
                <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                  <div className="text-center">
                    <p className="text-yellow-500 font-medium">{neutronSymbol}</p>
                    <p className="font-bold text-sm">{formatBalance(neutronBalance)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-red-500 font-medium">{protonSymbol}</p>
                    <p className="font-bold text-sm">{formatBalance(protonBalance)}</p>
                  </div>
                </div>
              </div>

              {/* System Info */}
              {systemHealth && (
                <div className="mt-6 pt-4 border-t border-white/10">
                  <h3 className="text-sm font-medium mb-3 text-center">System Health</h3>
                  <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                    <div className="text-center">
                      <p>Reserve Ratio</p>
                      <p className="font-medium">{(Number(systemHealth[0]) / 1e16).toFixed(1)}%</p>
                    </div>
                    <div className="text-center">
                      <p>Critical Ratio</p>
                      <p className="font-medium">{(Number(systemHealth[1]) / 1e16).toFixed(1)}%</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Pyth Oracle Status */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium">Pyth Oracle Status</h3>
                  <Button
                    onClick={() => refetchPrice()}
                    size="sm"
                    variant="outline"
                    className="h-6 px-2 text-xs"
                  >
                    <ArrowUpDown className="h-3 w-3 mr-1" />
                    Refresh
                  </Button>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Price Feed ID:</span>
                    <span className="font-mono text-xs">{formatPriceId(priceId)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Target Price:</span>
                    <div className="flex items-center gap-2">
                      {isPriceError ? (
                        <Badge variant="destructive" className="text-xs px-2 py-0">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Error
                        </Badge>
                      ) : neutronTargetPrice ? (
                        <>
                          <span className="font-medium">${formatPrice(neutronTargetPrice)}</span>
                          <Badge variant="default" className="text-xs px-2 py-0">
                            <Activity className="h-3 w-3 mr-1" />
                            Live
                          </Badge>
                        </>
                      ) : (
                        <Badge variant="secondary" className="text-xs px-2 py-0">
                          Loading...
                        </Badge>
                      )}
                    </div>
                  </div>
                  {isPriceError && (
                    <Alert className="mt-2">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription className="text-xs">
                        Failed to fetch price from Pyth oracle. Check if price feeds are up to date or if the oracle is accessible.
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}




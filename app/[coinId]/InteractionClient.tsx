"use client"

import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi"
import { parseUnits, formatUnits } from "viem"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ArrowLeftRight,
  Info,
  Zap,
  Shield,
  AlertTriangle,
  Sparkles,
} from "lucide-react"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import LightRays from "@/components/LightRays"
import Shuffle from "@/components/Shuffle"
import { StableCoinReactorABI, ERC20ABI } from "@/utils/abi/StableCoin"
import { toast } from "sonner"

type TokenOption = "BASE" | "BUNDLE" | "NEUTRON" | "PROTON"
type SwapRoute = "FISSION" | "FUSION" | "PROTON_TO_NEUTRON" | "NEUTRON_TO_PROTON"
const allowedTargets: Record<TokenOption, TokenOption[]> = {
  BASE: ["BUNDLE"],
  BUNDLE: ["BASE"],
  NEUTRON: ["PROTON"],
  PROTON: ["NEUTRON"],
}

const routeMap: Record<string, SwapRoute> = {
  "BASE->BUNDLE": "FISSION",
  "BUNDLE->BASE": "FUSION",
  "PROTON->NEUTRON": "PROTON_TO_NEUTRON",
  "NEUTRON->PROTON": "NEUTRON_TO_PROTON",
}

const containerStyle = {
  fontFamily: "'Orbitron', 'Space Mono', 'Courier New', monospace",
  fontWeight: "500",
}

const formatPercentFromWad = (value?: bigint) => {
  if (!value) return "0.0%"
  const percent = Number(value) / 1e16
  return `${percent.toFixed(1)}%`
}

const formatFeeFromWad = (value?: bigint) => {
  if (!value) return "0.00%"
  return `${(Number(value) / 1e16).toFixed(2)}%`
}

const trimFormattedAmount = (value: string, precision = 6) => {
  const [integer, fraction] = value.split(".")
  if (!fraction) return integer
  const sliced = fraction.slice(0, precision).replace(/0+$/, "")
  return sliced.length ? `${integer}.${sliced}` : integer
}

const formatBalance = (balance?: bigint, decimals?: number, precision = 4) => {
  if (balance === undefined || decimals === undefined) return "0"
  const formatted = formatUnits(balance, decimals)
  return trimFormattedAmount(formatted, precision)
}

const safeParseUnits = (value: string, decimals?: number) => {
  if (decimals === undefined) return null
  if (!value || Number(value) === 0) return BigInt(0)
  try {
    return parseUnits(value, decimals)
  } catch (error) {
    console.error("Failed to parse units:", error)
    return null
  }
}

const shortAddress = (value?: string) => {
  if (!value) return ""
  return `${value.slice(0, 6)}...${value.slice(-4)}`
}

const WAD = 10n ** 18n

const mulDiv = (a: bigint, b: bigint, denominator: bigint) => {
  if (denominator === 0n) return 0n
  return (a * b) / denominator
}

const formatTokenValue = (
  amount: bigint | null | undefined,
  decimals?: number,
  symbol?: string,
  precision = 6,
) => {
  if (amount === null || amount === undefined || decimals === undefined) return "—"
  const formatted = formatBalance(amount, decimals, precision)
  return symbol ? `${formatted} ${symbol}` : formatted
}

const formatWad = (value?: bigint, precision = 4) => {
  if (value === undefined) return "—"
  const formatted = formatUnits(value, 18)
  return trimFormattedAmount(formatted, precision)
}

export default function InteractionClient({ coinId }: { coinId: string }) {
  const { address } = useAccount()
  const searchParams = useSearchParams()
  const reactorAddress = coinId === "c" ? searchParams.get("coin") : coinId

  const [fromToken, setFromToken] = useState<TokenOption>("BASE")
  const [toToken, setToToken] = useState<TokenOption>("BUNDLE")
  const [amount, setAmount] = useState("")
  const [recipient, setRecipient] = useState("")
  const [hasSetDefaultRecipient, setHasSetDefaultRecipient] = useState(false)

  useEffect(() => {
    if (address && recipient === "" && !hasSetDefaultRecipient) {
      setRecipient(address)
      setHasSetDefaultRecipient(true)
    }
  }, [address, recipient, hasSetDefaultRecipient])

  useEffect(() => {
    const targets = allowedTargets[fromToken]
    if (!targets.includes(toToken)) {
      setToToken(targets[0])
    }
  }, [fromToken, toToken])

  const route: SwapRoute | null = useMemo(() => {
    const key = `${fromToken}->${toToken}`
    return routeMap[key] || null
  }, [fromToken, toToken])

  if (!reactorAddress) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">No Reactor Address</h2>
          <p className="text-muted-foreground">Please provide a valid reactor address.</p>
        </div>
      </div>
    )
  }

  const { data: vaultName } = useReadContract({
    address: reactorAddress as `0x${string}`,
    abi: StableCoinReactorABI,
    functionName: "vaultName",
  })

  const { data: oracleAddress } = useReadContract({
    address: reactorAddress as `0x${string}`,
    abi: StableCoinReactorABI,
    functionName: "pyth",
  })

  const { data: reactorPriceId } = useReadContract({
    address: reactorAddress as `0x${string}`,
    abi: StableCoinReactorABI,
    functionName: "priceId",
  })

  const {
    data: baseToken,
    refetch: refetchBaseToken,
  } = useReadContract({
    address: reactorAddress as `0x${string}`,
    abi: StableCoinReactorABI,
    functionName: "base",
  })

  const {
    data: neutronToken,
    refetch: refetchNeutronToken,
  } = useReadContract({
    address: reactorAddress as `0x${string}`,
    abi: StableCoinReactorABI,
    functionName: "neutron",
  })

  const {
    data: protonToken,
    refetch: refetchProtonToken,
  } = useReadContract({
    address: reactorAddress as `0x${string}`,
    abi: StableCoinReactorABI,
    functionName: "proton",
  })

  const { data: treasury } = useReadContract({
    address: reactorAddress as `0x${string}`,
    abi: StableCoinReactorABI,
    functionName: "treasury",
  })

  const {
    data: fissionFee,
    refetch: refetchFissionFee,
  } = useReadContract({
    address: reactorAddress as `0x${string}`,
    abi: StableCoinReactorABI,
    functionName: "fissionFee",
  })

  const {
    data: fusionFee,
    refetch: refetchFusionFee,
  } = useReadContract({
    address: reactorAddress as `0x${string}`,
    abi: StableCoinReactorABI,
    functionName: "fusionFee",
  })

  const {
    data: reserve,
    refetch: refetchReserve,
  } = useReadContract({
    address: reactorAddress as `0x${string}`,
    abi: StableCoinReactorABI,
    functionName: "reserve",
  })

  const {
    data: reserveRatio,
    refetch: refetchReserveRatio,
  } = useReadContract({
    address: reactorAddress as `0x${string}`,
    abi: StableCoinReactorABI,
    functionName: "reserveRatioPeggedAsset",
  })

  const { data: targetReserveRatio } = useReadContract({
    address: reactorAddress as `0x${string}`,
    abi: StableCoinReactorABI,
    functionName: "targetReserveRatio",
  })

  const { data: basePricePegged, error: basePriceError } = useReadContract({
    address: reactorAddress as `0x${string}`,
    abi: StableCoinReactorABI,
    functionName: "getBasePriceInPeggedAsset",
    query: {
      enabled: !!reactorAddress,
    },
  })

  const { data: isAboveTarget } = useReadContract({
    address: reactorAddress as `0x${string}`,
    abi: StableCoinReactorABI,
    functionName: "isAboveTargetReserveRatio",
  })

  const {
    data: neutronSupply,
    refetch: refetchNeutronSupply,
  } = useReadContract({
    address: reactorAddress as `0x${string}`,
    abi: StableCoinReactorABI,
    functionName: "neutronSupply",
  })

  const {
    data: protonSupply,
    refetch: refetchProtonSupply,
  } = useReadContract({
    address: reactorAddress as `0x${string}`,
    abi: StableCoinReactorABI,
    functionName: "protonSupply",
  })

  const { data: baseDecimals } = useReadContract({
    address: reactorAddress as `0x${string}`,
    abi: StableCoinReactorABI,
    functionName: "baseDecimals",
  })

  const { data: neutronDecimals } = useReadContract({
    address: neutronToken as `0x${string}`,
    abi: ERC20ABI,
    functionName: "decimals",
    query: {
      enabled: !!neutronToken,
    },
  })

  const { data: protonDecimals } = useReadContract({
    address: protonToken as `0x${string}`,
    abi: ERC20ABI,
    functionName: "decimals",
    query: {
      enabled: !!protonToken,
    },
  })

  const { data: protonPriceInBase } = useReadContract({
    address: reactorAddress as `0x${string}`,
    abi: StableCoinReactorABI,
    functionName: "protonPriceInBase",
  })

  const { data: neutronPriceInBase } = useReadContract({
    address: reactorAddress as `0x${string}`,
    abi: StableCoinReactorABI,
    functionName: "neutronPriceInBase",
  })

  const { data: baseSymbol } = useReadContract({
    address: baseToken as `0x${string}`,
    abi: ERC20ABI,
    functionName: "symbol",
    query: {
      enabled: !!baseToken,
    },
  })

  const { data: neutronSymbol } = useReadContract({
    address: neutronToken as `0x${string}`,
    abi: ERC20ABI,
    functionName: "symbol",
    query: {
      enabled: !!neutronToken,
    },
  })

  const { data: protonSymbol } = useReadContract({
    address: protonToken as `0x${string}`,
    abi: ERC20ABI,
    functionName: "symbol",
    query: {
      enabled: !!protonToken,
    },
  })

  const { data: baseBalance, refetch: refetchBaseBalance } = useReadContract({
    address: baseToken as `0x${string}`,
    abi: ERC20ABI,
    functionName: "balanceOf",
    args: [address as `0x${string}`],
    query: {
      enabled: !!address && !!baseToken,
    },
  })

  const {
    data: neutronBalance,
    refetch: refetchNeutronBalance,
  } = useReadContract({
    address: neutronToken as `0x${string}`,
    abi: ERC20ABI,
    functionName: "balanceOf",
    args: [address as `0x${string}`],
    query: {
      enabled: !!address && !!neutronToken,
    },
  })

  const {
    data: protonBalance,
    refetch: refetchProtonBalance,
  } = useReadContract({
    address: protonToken as `0x${string}`,
    abi: ERC20ABI,
    functionName: "balanceOf",
    args: [address as `0x${string}`],
    query: {
      enabled: !!address && !!protonToken,
    },
  })

  const { data: baseAllowance, refetch: refetchBaseAllowance } = useReadContract({
    address: baseToken as `0x${string}`,
    abi: ERC20ABI,
    functionName: "allowance",
    args: [address as `0x${string}`, reactorAddress as `0x${string}`],
    query: {
      enabled: !!address && !!baseToken,
    },
  })

  const { data: approveHash, writeContract: writeApprove, isPending: isApproving } = useWriteContract()
  const { data: fissionHash, writeContract: writeFission, isPending: isFissioning } = useWriteContract()
  const { data: fusionHash, writeContract: writeFusion, isPending: isFusing } = useWriteContract()
  const {
    data: protonToNeutronHash,
    writeContract: writeProtonToNeutron,
    isPending: isProtonToNeutronPending,
  } = useWriteContract()
  const {
    data: neutronToProtonHash,
    writeContract: writeNeutronToProton,
    isPending: isNeutronToProtonPending,
  } = useWriteContract()

  const { isLoading: isApprovingTx, isSuccess: isApproveSuccess } = useWaitForTransactionReceipt({
    hash: approveHash,
  })
  const { isLoading: isFissionTx, isSuccess: isFissionSuccess } = useWaitForTransactionReceipt({
    hash: fissionHash,
  })
  const { isLoading: isFusionTx, isSuccess: isFusionSuccess } = useWaitForTransactionReceipt({
    hash: fusionHash,
  })
  const {
    isLoading: isProtonToNeutronTx,
    isSuccess: isProtonToNeutronSuccess,
  } = useWaitForTransactionReceipt({
    hash: protonToNeutronHash,
  })
  const {
    isLoading: isNeutronToProtonTx,
    isSuccess: isNeutronToProtonSuccess,
  } = useWaitForTransactionReceipt({
    hash: neutronToProtonHash,
  })

  useEffect(() => {
    if (
      isApproveSuccess ||
      isFissionSuccess ||
      isFusionSuccess ||
      isProtonToNeutronSuccess ||
      isNeutronToProtonSuccess
    ) {
      void refetchBaseBalance()
      void refetchNeutronBalance()
      void refetchProtonBalance()
      void refetchBaseAllowance()
      void refetchReserve()
      void refetchReserveRatio()
      void refetchNeutronSupply()
      void refetchProtonSupply()
      void refetchFissionFee()
      void refetchFusionFee()
      void refetchBaseToken()
      void refetchNeutronToken()
      void refetchProtonToken()
      setAmount("")
    }
  }, [
    isApproveSuccess,
    isFissionSuccess,
    isFusionSuccess,
    isProtonToNeutronSuccess,
    isNeutronToProtonSuccess,
    refetchBaseBalance,
    refetchNeutronBalance,
    refetchProtonBalance,
    refetchBaseAllowance,
    refetchReserve,
    refetchReserveRatio,
    refetchNeutronSupply,
    refetchProtonSupply,
    refetchFissionFee,
    refetchFusionFee,
    refetchBaseToken,
    refetchNeutronToken,
    refetchProtonToken,
  ])

  const vaultHeading =
    typeof vaultName === "string" && vaultName.length > 0
      ? `${vaultName} Reactor`
      : "StableCoin Reactor"

  useEffect(() => {
    if (isFissionSuccess) toast.success("Base converted into neutron + proton")
  }, [isFissionSuccess])

  useEffect(() => {
    if (isFusionSuccess) toast.success("Neutron + proton redeemed for base")
  }, [isFusionSuccess])

  useEffect(() => {
    if (isProtonToNeutronSuccess) toast.success("Proton successfully transmuted to neutron")
  }, [isProtonToNeutronSuccess])

  useEffect(() => {
    if (isNeutronToProtonSuccess) toast.success("Neutron successfully transmuted to proton")
  }, [isNeutronToProtonSuccess])

  const routeRequiresApproval = route === "FISSION"

  const parsedAmountForApproval = safeParseUnits(amount, baseDecimals)
  const needsApproval =
    routeRequiresApproval &&
    baseAllowance !== undefined &&
    parsedAmountForApproval !== null &&
    parsedAmountForApproval > (baseAllowance || BigInt(0))

  const isProcessing =
    isApproving ||
    isApprovingTx ||
    isFissioning ||
    isFissionTx ||
    isFusing ||
    isFusionTx ||
    isProtonToNeutronPending ||
    isProtonToNeutronTx ||
    isNeutronToProtonPending ||
    isNeutronToProtonTx

  const fromLabel = useMemo(() => {
    switch (fromToken) {
      case "BASE":
        return baseSymbol || "Base"
      case "NEUTRON":
        return neutronSymbol || "Neutron"
      case "PROTON":
        return protonSymbol || "Proton"
      case "BUNDLE":
        return `${neutronSymbol || "Neutron"} + ${protonSymbol || "Proton"}`
      default:
        return "Token"
    }
  }, [fromToken, baseSymbol, neutronSymbol, protonSymbol])

  const toLabel = useMemo(() => {
    switch (toToken) {
      case "BASE":
        return baseSymbol || "Base"
      case "NEUTRON":
        return neutronSymbol || "Neutron"
      case "PROTON":
        return protonSymbol || "Proton"
      case "BUNDLE":
        return `${neutronSymbol || "Neutron"} + ${protonSymbol || "Proton"}`
      default:
        return "Token"
    }
  }, [toToken, baseSymbol, neutronSymbol, protonSymbol])

  const handleApprove = () => {
    if (!writeApprove || !baseToken) return
    const parsedAmount = parsedAmountForApproval
    if (parsedAmount === null) {
      toast.error("Invalid amount for approval")
      return
    }
    try {
      writeApprove({
        address: baseToken as `0x${string}`,
        abi: ERC20ABI,
        functionName: "approve",
        args: [reactorAddress as `0x${string}`, parsedAmount === BigInt(0) ? parseUnits("1000000", baseDecimals ?? 18) : parsedAmount],
      })
    } catch (error) {
      console.error("Approve error:", error)
      toast.error("Failed to approve tokens")
    }
  }

  const handleSwap = () => {
    if (!route) {
      toast.error("Unsupported conversion path")
      return
    }

    if (!amount || Number(amount) <= 0) {
      toast.error("Enter a valid amount")
      return
    }

    if (!recipient || !recipient.startsWith("0x")) {
      toast.error("Enter a valid recipient address")
      return
    }

    try {
      switch (route) {
        case "FISSION": {
          const parsed = safeParseUnits(amount, baseDecimals)
          if (parsed === null) {
            toast.error("Invalid base amount")
            return
          }
          writeFission({
            address: reactorAddress as `0x${string}`,
            abi: StableCoinReactorABI,
            functionName: "fission",
            args: [parsed, recipient as `0x${string}`],
          })
          break
        }
        case "FUSION": {
          const parsed = safeParseUnits(amount, baseDecimals)
          if (parsed === null) {
            toast.error("Invalid base amount")
            return
          }
          writeFusion({
            address: reactorAddress as `0x${string}`,
            abi: StableCoinReactorABI,
            functionName: "fusion",
            args: [parsed, recipient as `0x${string}`],
          })
          break
        }
        case "PROTON_TO_NEUTRON": {
          const parsed = safeParseUnits(amount, protonDecimals)
          if (parsed === null) {
            toast.error("Invalid proton amount")
            return
          }
          writeProtonToNeutron({
            address: reactorAddress as `0x${string}`,
            abi: StableCoinReactorABI,
            functionName: "transmuteProtonToNeutron",
            args: [parsed, recipient as `0x${string}`],
          })
          break
        }
        case "NEUTRON_TO_PROTON": {
          const parsed = safeParseUnits(amount, neutronDecimals)
          if (parsed === null) {
            toast.error("Invalid neutron amount")
            return
          }
          writeNeutronToProton({
            address: reactorAddress as `0x${string}`,
            abi: StableCoinReactorABI,
            functionName: "transmuteNeutronToProton",
            args: [parsed, recipient as `0x${string}`],
          })
          break
        }
        default:
          toast.error("Unsupported conversion path")
      }
    } catch (error) {
      console.error("Swap execution error:", error)
      toast.error("Transaction failed to send")
    }
  }

  const disabledTokens: Record<TokenOption, boolean> = {
    BASE: !baseToken,
    BUNDLE: !neutronToken || !protonToken,
    NEUTRON: !neutronToken,
    PROTON: !protonToken,
  }

  const fromBalanceDisplay = useMemo(() => {
    switch (fromToken) {
      case "BASE":
        return formatBalance(baseBalance, baseDecimals)
      case "NEUTRON":
        return formatBalance(neutronBalance, neutronDecimals as number | undefined)
      case "PROTON":
        return formatBalance(protonBalance, protonDecimals as number | undefined)
      case "BUNDLE":
        return `${neutronSymbol || "Neutron"}: ${formatBalance(
          neutronBalance,
          neutronDecimals as number | undefined,
        )} · ${protonSymbol || "Proton"}: ${formatBalance(
          protonBalance,
          protonDecimals as number | undefined,
        )}`
      default:
        return "0"
    }
  }, [
    fromToken,
    baseBalance,
    neutronBalance,
    protonBalance,
    baseDecimals,
    neutronDecimals,
    protonDecimals,
    neutronSymbol,
    protonSymbol,
  ])

  const swapDescription = useMemo(() => {
    switch (route) {
      case "FISSION":
        return `Convert ${baseSymbol || "base"} into ${neutronSymbol || "neutron"} + ${
          protonSymbol || "proton"
        }.`
      case "FUSION":
        return `Redeem ${neutronSymbol || "neutron"} + ${protonSymbol || "proton"} back into ${
          baseSymbol || "base"
        }.`
      case "PROTON_TO_NEUTRON":
        return `Transmute ${protonSymbol || "proton"} into ${neutronSymbol || "neutron"} using the β⁺ pathway.`
      case "NEUTRON_TO_PROTON":
        return `Transmute ${neutronSymbol || "neutron"} into ${protonSymbol || "proton"} using the β⁻ pathway.`
      default:
        return "Select a supported conversion pair to continue."
    }
  }, [route, baseSymbol, neutronSymbol, protonSymbol])

  const actionLabel = useMemo(() => {
    switch (route) {
      case "FISSION":
        return "Split Base"
      case "FUSION":
        return "Merge Tokens"
      case "PROTON_TO_NEUTRON":
        return "Transmute β⁺"
      case "NEUTRON_TO_PROTON":
        return "Transmute β⁻"
      default:
        return "Select Pair"
    }
  }, [route])

  const handleMaxClick = () => {
    if (fromToken === "BASE" && baseBalance && baseDecimals !== undefined) {
      const formatted = formatUnits(baseBalance, baseDecimals)
      setAmount(trimFormattedAmount(formatted, 6))
    } else if (fromToken === "NEUTRON" && neutronBalance && neutronDecimals !== undefined) {
      const formatted = formatUnits(neutronBalance, neutronDecimals as number)
      setAmount(trimFormattedAmount(formatted, 6))
    } else if (fromToken === "PROTON" && protonBalance && protonDecimals !== undefined) {
      const formatted = formatUnits(protonBalance, protonDecimals as number)
      setAmount(trimFormattedAmount(formatted, 6))
    }
  }

  const renderMaxButton =
    fromToken === "BASE" || fromToken === "NEUTRON" || fromToken === "PROTON"

  const baseDecimalsNumber = typeof baseDecimals === "number" ? baseDecimals : undefined
  const neutronDecimalsNumber =
    typeof neutronDecimals === "number" ? (neutronDecimals as number) : undefined
  const protonDecimalsNumber =
    typeof protonDecimals === "number" ? (protonDecimals as number) : undefined

  const baseSymbolText = typeof baseSymbol === "string" ? baseSymbol : "BASE"
  const neutronSymbolText = typeof neutronSymbol === "string" ? neutronSymbol : "NEUTRON"
  const protonSymbolText = typeof protonSymbol === "string" ? protonSymbol : "PROTON"

  const baseAmountRaw = useMemo(() => {
    if (!baseDecimalsNumber) return null
    if (!amount) return null
    return safeParseUnits(amount, baseDecimalsNumber)
  }, [amount, baseDecimalsNumber])

  const parsedProtonAmount = useMemo(() => {
    if (route !== "PROTON_TO_NEUTRON") return null
    if (!protonDecimalsNumber) return null
    if (!amount) return null
    return safeParseUnits(amount, protonDecimalsNumber)
  }, [route, amount, protonDecimalsNumber])

  const parsedNeutronAmount = useMemo(() => {
    if (route !== "NEUTRON_TO_PROTON") return null
    if (!neutronDecimalsNumber) return null
    if (!amount) return null
    return safeParseUnits(amount, neutronDecimalsNumber)
  }, [route, amount, neutronDecimalsNumber])

  const isFissionRoute = route === "FISSION"
  const isFusionRoute = route === "FUSION"

  const fissionBreakdown = useMemo(() => {
    if (!isFissionRoute) return null
    if (!baseAmountRaw || baseAmountRaw <= 0n) return null
    if (fissionFee === undefined || targetReserveRatio === undefined || basePricePegged === undefined) {
      return null
    }

    const fee = mulDiv(baseAmountRaw, fissionFee, WAD)
    const netBase = baseAmountRaw - fee
    if (netBase <= 0n) {
      return {
        baseIn: baseAmountRaw,
        fee,
        netBase,
        neutronOut: 0n,
        protonOut: 0n,
      }
    }

    const neutronOut = mulDiv(netBase, basePricePegged, targetReserveRatio)
    const protonOut = netBase - mulDiv(netBase, WAD, targetReserveRatio)

    return {
      baseIn: baseAmountRaw,
      fee,
      netBase,
      neutronOut,
      protonOut,
    }
  }, [isFissionRoute, baseAmountRaw, fissionFee, targetReserveRatio, basePricePegged])

  const fusionBreakdown = useMemo(() => {
    if (!isFusionRoute) return null
    if (!baseAmountRaw || baseAmountRaw <= 0n) return null
    if (
      fusionFee === undefined ||
      reserve === undefined ||
      neutronSupply === undefined ||
      protonSupply === undefined ||
      reserve === 0n
    ) {
      return null
    }

    const denominator = WAD - fusionFee
    if (denominator <= 0n) return null

    const grossBase = mulDiv(baseAmountRaw, WAD, denominator)
    const fee = grossBase - baseAmountRaw
    const neutronBurn = mulDiv(grossBase, neutronSupply, reserve)
    const protonBurn = mulDiv(grossBase, protonSupply, reserve)

    return {
      requestedBaseOut: baseAmountRaw,
      grossBase,
      fee,
      neutronBurn,
      protonBurn,
    }
  }, [isFusionRoute, baseAmountRaw, fusionFee, reserve, neutronSupply, protonSupply])

  const fromBreakdownRows = useMemo(() => {
    if (isFusionRoute && fusionBreakdown) {
      return [
        {
          label: neutronSymbolText,
          value: formatTokenValue(fusionBreakdown.neutronBurn, neutronDecimalsNumber, neutronSymbolText),
        },
        {
          label: protonSymbolText,
          value: formatTokenValue(fusionBreakdown.protonBurn, protonDecimalsNumber, protonSymbolText),
        },
      ]
    }
    return []
  }, [
    isFusionRoute,
    fusionBreakdown,
    neutronDecimalsNumber,
    protonDecimalsNumber,
    neutronSymbolText,
    protonSymbolText,
  ])

  const fusionBundleSummary = useMemo(() => {
    if (!isFusionRoute) return ""
    if (!fromBreakdownRows.length) return ""
    return fromBreakdownRows.map((row) => row.value).join(" + ")
  }, [isFusionRoute, fromBreakdownRows])

  const breakdownPopover = useMemo(() => {
    if (isFissionRoute && fissionBreakdown) {
      return {
        title: "Fission breakdown",
        rows: [
          {
            label: "Base supplied",
            value: formatTokenValue(fissionBreakdown.baseIn, baseDecimalsNumber, baseSymbolText),
          },
          {
            label: "Fee retained",
            value: formatTokenValue(fissionBreakdown.fee, baseDecimalsNumber, baseSymbolText),
          },
          {
            label: "Net base",
            value: formatTokenValue(fissionBreakdown.netBase, baseDecimalsNumber, baseSymbolText),
          },
          {
            label: `Mint ${neutronSymbolText}`,
            value: formatTokenValue(fissionBreakdown.neutronOut, neutronDecimalsNumber, neutronSymbolText),
          },
          {
            label: `Mint ${protonSymbolText}`,
            value: formatTokenValue(fissionBreakdown.protonOut, protonDecimalsNumber, protonSymbolText),
          },
          {
            label: "Oracle price",
            value: basePricePegged ? `${formatWad(basePricePegged)} Pegged/Base` : "—",
          },
        ],
      }
    }

    if (isFusionRoute && fusionBreakdown) {
      return {
        title: "Fusion breakdown",
        rows: [
          {
            label: "Base requested",
            value: formatTokenValue(
              fusionBreakdown.requestedBaseOut,
              baseDecimalsNumber,
              baseSymbolText,
            ),
          },
          {
            label: "Gross base",
            value: formatTokenValue(fusionBreakdown.grossBase, baseDecimalsNumber, baseSymbolText),
          },
          {
            label: "Fee withheld",
            value: formatTokenValue(fusionBreakdown.fee, baseDecimalsNumber, baseSymbolText),
          },
          {
            label: `Burn ${neutronSymbolText}`,
            value: formatTokenValue(fusionBreakdown.neutronBurn, neutronDecimalsNumber, neutronSymbolText),
          },
          {
            label: `Burn ${protonSymbolText}`,
            value: formatTokenValue(fusionBreakdown.protonBurn, protonDecimalsNumber, protonSymbolText),
          },
        ],
      }
    }

    return null
  }, [
    isFissionRoute,
    fissionBreakdown,
    baseDecimalsNumber,
    baseSymbolText,
    neutronSymbolText,
    neutronDecimalsNumber,
    protonSymbolText,
    protonDecimalsNumber,
    basePricePegged,
    isFusionRoute,
    fusionBreakdown,
  ])

  const fissionMintSummary = useMemo(() => {
    if (!isFissionRoute || !fissionBreakdown) return ""
    const neutronText = formatTokenValue(
      fissionBreakdown.neutronOut,
      neutronDecimalsNumber,
      neutronSymbolText,
      4,
    )
    const protonText = formatTokenValue(
      fissionBreakdown.protonOut,
      protonDecimalsNumber,
      protonSymbolText,
      4,
    )
    return `${neutronText} + ${protonText}`
  }, [
    isFissionRoute,
    fissionBreakdown,
    neutronDecimalsNumber,
    protonDecimalsNumber,
    neutronSymbolText,
    protonSymbolText,
  ])

  const protonToNeutronSummary = useMemo(() => {
    if (route !== "PROTON_TO_NEUTRON") return ""
    if (!parsedProtonAmount || parsedProtonAmount <= 0n) return ""
    if (!protonPriceInBase || !neutronPriceInBase) return ""
    if (!neutronDecimalsNumber) return ""
    const grossBase = mulDiv(parsedProtonAmount, protonPriceInBase, WAD)
    if (grossBase === 0n) return ""
    const neutronOut = mulDiv(grossBase, WAD, neutronPriceInBase)
    if (neutronOut === 0n) return ""
    return formatTokenValue(neutronOut, neutronDecimalsNumber, neutronSymbolText, 4)
  }, [
    route,
    parsedProtonAmount,
    protonPriceInBase,
    neutronPriceInBase,
    neutronDecimalsNumber,
    neutronSymbolText,
  ])

  const neutronToProtonSummary = useMemo(() => {
    if (route !== "NEUTRON_TO_PROTON") return ""
    if (!parsedNeutronAmount || parsedNeutronAmount <= 0n) return ""
    if (!neutronPriceInBase || !protonPriceInBase) return ""
    if (!protonDecimalsNumber) return ""
    const grossBase = mulDiv(parsedNeutronAmount, neutronPriceInBase, WAD)
    if (grossBase === 0n) return ""
    const protonOut = mulDiv(grossBase, WAD, protonPriceInBase)
    if (protonOut === 0n) return ""
    return formatTokenValue(protonOut, protonDecimalsNumber, protonSymbolText, 4)
  }, [
    route,
    parsedNeutronAmount,
    neutronPriceInBase,
    protonPriceInBase,
    protonDecimalsNumber,
    protonSymbolText,
  ])

  const fromInputReadOnly = isFusionRoute
  const fromInputType = isFusionRoute ? "text" : "number"
  const fromInputValue = isFusionRoute ? fusionBundleSummary : amount
  const fromInputPlaceholder = isFusionRoute
    ? fusionBundleSummary || `${neutronSymbolText} + ${protonSymbolText} burn calculated automatically`
    : "0.0"

  const toInputReadOnly = !isFusionRoute
  const toInputType = isFusionRoute ? "number" : "text"
  const toInputValue = useMemo(() => {
    if (isFusionRoute) return amount
    if (isFissionRoute && fissionMintSummary) return fissionMintSummary
    if (route === "PROTON_TO_NEUTRON") return protonToNeutronSummary
    if (route === "NEUTRON_TO_PROTON") return neutronToProtonSummary
    return ""
  }, [
    isFusionRoute,
    amount,
    isFissionRoute,
    fissionMintSummary,
    route,
    protonToNeutronSummary,
    neutronToProtonSummary,
  ])

  const toInputPlaceholder = useMemo(() => {
    if (isFusionRoute) {
      return `Enter the amount of ${baseSymbolText} you want back`
    }
    if (isFissionRoute) {
      return fissionMintSummary || "Minted bundle appears here"
    }
    if (route === "PROTON_TO_NEUTRON") {
      return protonToNeutronSummary || `Minted ${neutronSymbolText} appears here`
    }
    if (route === "NEUTRON_TO_PROTON") {
      return neutronToProtonSummary || `Minted ${protonSymbolText} appears here`
    }
    return "Calculated on-chain"
  }, [
    isFusionRoute,
    baseSymbolText,
    isFissionRoute,
    fissionMintSummary,
    route,
    protonToNeutronSummary,
    neutronToProtonSummary,
    neutronSymbolText,
    protonSymbolText,
  ])

  const treasuryAddress = typeof treasury === "string" ? treasury : undefined
  const oracleAddressText = typeof oracleAddress === "string" ? oracleAddress : undefined
  const priceFeedIdText = typeof reactorPriceId === "string" ? reactorPriceId : undefined
  const baseTokenAddress = typeof baseToken === "string" ? baseToken : undefined

  const reserveRatioText = reserveRatio ? formatPercentFromWad(reserveRatio) : "—"
  const targetRatioText = targetReserveRatio ? formatPercentFromWad(targetReserveRatio) : "—"
  const reserveBalanceText =
    reserve && baseDecimalsNumber !== undefined
      ? `${formatBalance(reserve, baseDecimalsNumber)} ${baseSymbolText}`
      : "—"
  const neutronSupplyText =
    neutronSupply && neutronDecimalsNumber !== undefined
      ? formatBalance(neutronSupply, neutronDecimalsNumber)
      : "—"
  const protonSupplyText =
    protonSupply && protonDecimalsNumber !== undefined
      ? formatBalance(protonSupply, protonDecimalsNumber)
      : "—"

  const infoRows = useMemo(
    () => [
      { label: "Vault Address", value: reactorAddress ?? "—", monospace: true },
      { label: "Treasury", value: treasuryAddress ?? "—", monospace: true },
      { label: "Oracle (Pyth)", value: oracleAddressText ?? "—", monospace: true },
      { label: "Price Feed ID", value: priceFeedIdText ?? "—", monospace: true },
      { label: "Base Token", value: baseTokenAddress ?? "—", monospace: true },
      { label: "Reserve Ratio", value: reserveRatioText },
      { label: "Target Ratio", value: targetRatioText },
      { label: "Reserve Balance", value: reserveBalanceText },
      { label: `${neutronSymbolText} Supply`, value: neutronSupplyText },
      { label: `${protonSymbolText} Supply`, value: protonSupplyText },
    ],
    [
      reactorAddress,
      treasuryAddress,
      oracleAddressText,
      priceFeedIdText,
      baseTokenAddress,
      reserveRatioText,
      targetRatioText,
      reserveBalanceText,
      neutronSupplyText,
      protonSupplyText,
      neutronSymbolText,
      protonSymbolText,
    ],
  )


  return (
    <div className="min-h-screen relative" style={containerStyle}>
      <LightRays
        raysOrigin="top-center"
        raysColor="#F7F7F7"
        raysSpeed={1.5}
        lightSpread={0.8}
        rayLength={1.2}
        followMouse
        mouseInfluence={0.1}
        noiseAmount={0.1}
        distortion={0.05}
        className="fixed inset-0 z-[1]"
      />

      <div className="container mx-auto px-4 py-8 relative z-[5]">
        <div className="text-center mb-10">
          <Shuffle
            text={vaultHeading}
            tag="h1"
            className="text-4xl lg:text-5xl mb-4 text-foreground"
            shuffleDirection="right"
            duration={0.35}
            animationMode="evenodd"
            shuffleTimes={1}
            ease="power3.out"
            stagger={0.03}
            threshold={0.1}
            triggerOnce
            triggerOnHover
            respectReducedMotion
          />
        </div>

        <div className="max-w-xl mx-auto">
          <Card className="backdrop-blur-md bg-background/60 border-white/20 shadow-2xl">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-semibold flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                  Swap Anywhere, Anytime
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3 rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>From</span>
                  <span className="font-mono text-xs text-foreground/80">{fromBalanceDisplay}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Select
                    value={fromToken}
                    onValueChange={(value) => setFromToken(value as TokenOption)}
                  >
                    <SelectTrigger className="w-40 bg-background/80">
                      <SelectValue placeholder="Token" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BASE" disabled={disabledTokens.BASE}>
                        {baseSymbol || "Base"}
                      </SelectItem>
                      <SelectItem value="NEUTRON" disabled={disabledTokens.NEUTRON}>
                        {neutronSymbol || "Neutron"}
                      </SelectItem>
                      <SelectItem value="PROTON" disabled={disabledTokens.PROTON}>
                        {protonSymbol || "Proton"}
                      </SelectItem>
                      <SelectItem value="BUNDLE" disabled={disabledTokens.BUNDLE}>
                        {(neutronSymbol || "Neutron") + " + " + (protonSymbol || "Proton")}
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <Input
                    type={fromInputType}
                    placeholder={fromInputPlaceholder}
                    value={fromInputValue}
                    onChange={(event) => {
                      if (fromInputReadOnly) return
                      setAmount(event.target.value)
                    }}
                    readOnly={fromInputReadOnly}
                    className="flex-1 text-2xl font-semibold h-14 bg-background/60"
                  />

                  {renderMaxButton && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="border-white/20 hover:bg-white/10"
                      onClick={handleMaxClick}
                    >
                      Max
                    </Button>
                  )}
                </div>
              </div>

              <div className="flex justify-center">
                <Button
                  type="button"
                  variant="ghost"
                  className="rounded-full h-10 w-10 p-0 bg-white/10 hover:bg-white/20"
                  onClick={() => {
                    const newFrom = toToken
                    const newTo = allowedTargets[newFrom][0]
                    setFromToken(newFrom)
                    setToToken(newTo)
                  }}
                >
                  <ArrowLeftRight className="h-5 w-5" />
                </Button>
              </div>

              <div className="space-y-3 rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>To</span>
                  <div className="flex items-center gap-2">
                    {breakdownPopover && (
                      <Popover>
                        <PopoverTrigger asChild>
                          <button
                            type="button"
                            className="rounded-full border border-white/20 p-1 text-foreground/70 transition-colors hover:border-white/40 hover:text-foreground"
                          >
                            <Info className="h-4 w-4" />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-64 space-y-2 text-sm" align="end">
                          <p className="font-semibold text-foreground/90">{breakdownPopover.title}</p>
                          <div className="space-y-1 font-mono text-xs">
                            {breakdownPopover.rows.map((row) => (
                              <div key={row.label} className="flex items-center justify-between gap-2">
                                <span className="text-muted-foreground">{row.label}</span>
                                <span className="text-foreground">{row.value}</span>
                              </div>
                            ))}
                          </div>
                        </PopoverContent>
                      </Popover>
                    )}
                    <span className="font-mono text-xs text-foreground/80">{toLabel}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Select
                    value={toToken}
                    onValueChange={(value) => setToToken(value as TokenOption)}
                  >
                    <SelectTrigger className="bg-background/80">
                      <SelectValue placeholder="Token" />
                    </SelectTrigger>
                    <SelectContent>
                      {allowedTargets[fromToken].map((target) => (
                        <SelectItem key={target} value={target}>
                          {target === "BUNDLE"
                            ? `${neutronSymbol || "Neutron"} + ${protonSymbol || "Proton"}`
                            : target === "BASE"
                              ? baseSymbol || "Base"
                              : target === "NEUTRON"
                                ? neutronSymbol || "Neutron"
                                : protonSymbol || "Proton"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Input
                    type={toInputType}
                    placeholder={toInputPlaceholder}
                    value={toInputValue}
                    onChange={(event) => {
                      if (!toInputReadOnly) {
                        setAmount(event.target.value)
                      }
                    }}
                    readOnly={toInputReadOnly}
                    className="flex-1 text-2xl font-semibold h-14 bg-background/60"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Recipient Address</label>
                <Input
                  placeholder="0x..."
                  value={recipient}
                  onChange={(event) => setRecipient(event.target.value)}
                  className="font-mono text-sm bg-background/60"
                />
              </div>

              <ConnectButton.Custom>
                {({ account, chain, openConnectModal, mounted }) => {
                  const ready = mounted
                  const connected = ready && account && chain

                  return (
                    <div
                      {...(!ready && {
                        "aria-hidden": true,
                        style: {
                          opacity: 0,
                          pointerEvents: "none",
                          userSelect: "none",
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
                          )
                        }

                        if (!route) {
                          return (
                            <Button disabled className="w-full h-14 bg-muted text-muted-foreground">
                              Select a valid pair
                            </Button>
                          )
                        }

                        if (!amount || Number(amount) <= 0 || !recipient) {
                          return (
                            <Button disabled className="w-full h-14 bg-muted text-muted-foreground">
                              Enter amount and recipient
                            </Button>
                          )
                        }

                        if (needsApproval) {
                          return (
                            <Button
                              onClick={handleApprove}
                              disabled={isProcessing}
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
                                  Approve {baseSymbol || "Base"}
                                </>
                              )}
                            </Button>
                          )
                        }

                        return (
                          <Button
                            onClick={handleSwap}
                            disabled={isProcessing}
                            className="w-full h-14 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold text-lg border-0"
                          >
                            {isProcessing ? (
                              <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                                Processing...
                              </>
                            ) : (
                              actionLabel
                            )}
                          </Button>
                        )
                      })()}
                    </div>
                  )
                }}
              </ConnectButton.Custom>

            </CardContent>
          </Card>
        </div>
        <div className="max-w-4xl mx-auto mt-10">
          <Card className="bg-background/50 border-white/15">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
                Reactor Parameters
              </CardTitle>
              <p className="text-xs text-muted-foreground/80">
                Live configuration and treasury wiring for this vault.
              </p>
            </CardHeader>
            <CardContent>
              <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {infoRows.map((row) => (
                  <div key={row.label} className="space-y-1">
                    <dt className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      {row.label}
                    </dt>
                    <dd
                      className={`font-mono text-sm text-foreground ${
                        row.monospace ? "break-all" : ""
                      }`}
                    >
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

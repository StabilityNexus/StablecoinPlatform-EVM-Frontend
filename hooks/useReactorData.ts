import { useReadContract } from "wagmi"
import { StableCoinReactorABI, ERC20ABI } from "@/utils/abi/StableCoin"

export interface ReactorData {
  address: string
  vaultName: string
  base: string
  neutron: string
  proton: string
  treasury: string
  reserve: bigint
  neutronSupply: bigint
  protonSupply: bigint
  reserveRatio: bigint
  isHealthy: boolean
  neutronSymbol?: string
  protonSymbol?: string
  neutronName?: string
  protonName?: string
  baseSymbol?: string
  basePrice?: number
}

export function useReactorInfo(reactorAddress: string) {
  const enabledQuery = !!reactorAddress && reactorAddress !== ""

  const { data: vaultName, isLoading: isLoadingVault } = useReadContract({
    address: reactorAddress as `0x${string}`,
    abi: StableCoinReactorABI,
    functionName: "vaultName",
    query: {
      enabled: enabledQuery,
    },
  })

  const { data: base } = useReadContract({
    address: reactorAddress as `0x${string}`,
    abi: StableCoinReactorABI,
    functionName: "base",
    query: {
      enabled: enabledQuery,
    },
  })

  const { data: neutron } = useReadContract({
    address: reactorAddress as `0x${string}`,
    abi: StableCoinReactorABI,
    functionName: "neutron",
    query: {
      enabled: enabledQuery,
    },
  })

  const { data: proton } = useReadContract({
    address: reactorAddress as `0x${string}`,
    abi: StableCoinReactorABI,
    functionName: "proton",
    query: {
      enabled: enabledQuery,
    },
  })

  const { data: treasury } = useReadContract({
    address: reactorAddress as `0x${string}`,
    abi: StableCoinReactorABI,
    functionName: "treasury",
    query: {
      enabled: enabledQuery,
    },
  })

  const { data: reserve } = useReadContract({
    address: reactorAddress as `0x${string}`,
    abi: StableCoinReactorABI,
    functionName: "reserve",
    query: {
      enabled: enabledQuery,
    },
  })

  const { data: neutronSupply } = useReadContract({
    address: reactorAddress as `0x${string}`,
    abi: StableCoinReactorABI,
    functionName: "neutronSupply",
    query: {
      enabled: enabledQuery,
    },
  })

  const { data: protonSupply } = useReadContract({
    address: reactorAddress as `0x${string}`,
    abi: StableCoinReactorABI,
    functionName: "protonSupply",
    query: {
      enabled: enabledQuery,
    },
  })

  const { data: reserveRatio } = useReadContract({
    address: reactorAddress as `0x${string}`,
    abi: StableCoinReactorABI,
    functionName: "reserveRatioPeggedAsset",
    query: {
      enabled: enabledQuery,
    },
  })

  const { data: isAboveTarget } = useReadContract({
    address: reactorAddress as `0x${string}`,
    abi: StableCoinReactorABI,
    functionName: "isAboveTargetReserveRatio",
    query: {
      enabled: enabledQuery,
    },
  })

  const { data: neutronSymbol } = useReadContract({
    address: neutron as `0x${string}`,
    abi: ERC20ABI,
    functionName: "symbol",
    query: {
      enabled: !!neutron,
    },
  })

  const { data: neutronName } = useReadContract({
    address: neutron as `0x${string}`,
    abi: ERC20ABI,
    functionName: "name",
    query: {
      enabled: !!neutron,
    },
  })

  const { data: protonSymbol } = useReadContract({
    address: proton as `0x${string}`,
    abi: ERC20ABI,
    functionName: "symbol",
    query: {
      enabled: !!proton,
    },
  })

  const { data: protonName } = useReadContract({
    address: proton as `0x${string}`,
    abi: ERC20ABI,
    functionName: "name",
    query: {
      enabled: !!proton,
    },
  })

  const { data: baseSymbol } = useReadContract({
    address: base as `0x${string}`,
    abi: ERC20ABI,
    functionName: "symbol",
    query: {
      enabled: !!base,
    },
  })

  const demoPrices: Record<string, number> = {
    USDC: 1,
    USDT: 1,
    WETH: 3420.5,
    WBTC: 67830.25,
    DAI: 1.01,
  }

  if (base && neutron && proton && reserve && neutronSupply !== undefined && protonSupply !== undefined) {
    const reactorData: ReactorData = {
      address: reactorAddress,
      vaultName: vaultName || `Vault ${reactorAddress.slice(-6)}`,
      base: base,
      neutron: neutron,
      proton: proton,
      treasury: treasury || "",
      reserve: reserve,
      neutronSupply: neutronSupply,
      protonSupply: protonSupply,
      reserveRatio: reserveRatio || BigInt(0),
      isHealthy: isAboveTarget ?? true,
      neutronSymbol,
      protonSymbol,
      neutronName,
      protonName,
      baseSymbol,
      basePrice: demoPrices[baseSymbol as string] || 1,
    }

    return {
      data: reactorData,
      isLoading: isLoadingVault,
      isError: false,
    }
  }

  return {
    data: null,
    isLoading: isLoadingVault,
    isError: false,
  }
}

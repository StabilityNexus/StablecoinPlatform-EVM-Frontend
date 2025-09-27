import { useReadContract } from "wagmi"
import { StableCoinFactoryABI } from "@/utils/abi/StableCoinFactory"
import { StableCoinReactorABI, ERC20ABI } from "@/utils/abi/StableCoin"
import { StableCoinFactories } from "@/utils/addresses"

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
  // Get basic reactor info from factory
  const { data: factoryInfo, isLoading: isLoadingFactoryInfo } = useReadContract({
    address: StableCoinFactories[534351],
    abi: StableCoinFactoryABI,
    functionName: 'getReactorInfo',
    args: [reactorAddress as `0x${string}`],
    query: {
      enabled: !!reactorAddress && reactorAddress !== "",
    }
  })

  // Get vault name directly from reactor
  const { data: vaultName } = useReadContract({
    address: reactorAddress as `0x${string}`,
    abi: StableCoinReactorABI,
    functionName: 'vaultName',
    query: {
      enabled: !!reactorAddress && reactorAddress !== "",
    }
  })

  // Get system health
  const { data: systemHealth } = useReadContract({
    address: reactorAddress as `0x${string}`,
    abi: StableCoinReactorABI,
    functionName: 'systemHealth',
    query: {
      enabled: !!reactorAddress && reactorAddress !== "",
    }
  })

  // Get token symbols if we have token addresses from factoryInfo
  const { data: neutronSymbol } = useReadContract({
    address: factoryInfo?.[2] as `0x${string}`, // neutron address
    abi: ERC20ABI,
    functionName: 'symbol',
    query: {
      enabled: !!factoryInfo?.[2],
    }
  })

  const { data: neutronName } = useReadContract({
    address: factoryInfo?.[2] as `0x${string}`, // neutron address
    abi: ERC20ABI,
    functionName: 'name',
    query: {
      enabled: !!factoryInfo?.[2],
    }
  })

  const { data: protonSymbol } = useReadContract({
    address: factoryInfo?.[3] as `0x${string}`, // proton address
    abi: ERC20ABI,
    functionName: 'symbol',
    query: {
      enabled: !!factoryInfo?.[3],
    }
  })

  const { data: protonName } = useReadContract({
    address: factoryInfo?.[3] as `0x${string}`, // proton address
    abi: ERC20ABI,
    functionName: 'name',
    query: {
      enabled: !!factoryInfo?.[3],
    }
  })

  const { data: baseSymbol } = useReadContract({
    address: factoryInfo?.[1] as `0x${string}`, // base address
    abi: ERC20ABI,
    functionName: 'symbol',
    query: {
      enabled: !!factoryInfo?.[1],
    }
  })

  // Demo prices for different base tokens
  const demoPrices: { [key: string]: number } = {
    "USDC": 1.00,
    "USDT": 0.99,
    "WETH": 3420.50,
    "WBTC": 67830.25,
    "DAI": 1.01,
  }

  // Combine all data
  if (factoryInfo && systemHealth) {
    const reactorData: ReactorData = {
      address: reactorAddress,
      vaultName: vaultName || `Vault ${reactorAddress.slice(-6)}`,
      base: factoryInfo[1] as string,
      neutron: factoryInfo[2] as string,
      proton: factoryInfo[3] as string,
      treasury: factoryInfo[4] as string,
      reserve: factoryInfo[5] as bigint,
      neutronSupply: factoryInfo[6] as bigint,
      protonSupply: factoryInfo[7] as bigint,
      reserveRatio: systemHealth[0] as bigint,
      isHealthy: systemHealth[2] as boolean,
      neutronSymbol,
      protonSymbol,
      neutronName,
      protonName,
      baseSymbol,
      basePrice: demoPrices[baseSymbol as string] || 1.00
    }

    return {
      data: reactorData,
      isLoading: isLoadingFactoryInfo,
      isError: false
    }
  }

  return {
    data: null,
    isLoading: isLoadingFactoryInfo,
    isError: false
  }
}

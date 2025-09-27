"use client"

import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { ThemeToggle } from "@/components/theme-toggle"
import { ChainSelector } from "@/components/chain-selector"
import PillNav from "@/components/PillNav"
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useEffect, useState } from "react"
import Link from "next/link"

const navItems = [
  { href: "/explorer", label: "Explorer" },
  { href: "/my-coins", label: "My Coins" },
  { href: "/create", label: "Create" },
]

export default function Navigation() {
  const pathname = usePathname()
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return null
  }

  const isDark = theme === 'dark'

  return (
    <div className="relative w-full">
      {/* StableCoin Logo/Heading on the left */}
      <div className="absolute top-[1em] left-4 z-[1002]">
        <Link href="/" className="flex items-center space-x-2 group">
          <span className="font-bold text-xl text-foreground group-hover:text-primary transition-colors">
            StableCoin
          </span>
        </Link>
      </div>

      {/* Centered PillNav Component */}
      <div className="flex justify-center">
        <PillNav
          items={navItems}
          activeHref={pathname}
          className="custom-nav"
          ease="power2.easeOut"
          baseColor="transparent"
          pillColor={isDark ? "#ffffff" : "#000000"}
          hoveredPillTextColor={isDark ? "#000000" : "#1a1a1a"}
          pillTextColor={isDark ? "#000000" : "#ffffff"}
          initialLoadAnimation={true}
        />
      </div>
      
      {/* Additional controls positioned on the right */}
      <div className="absolute top-[1em] right-4 flex items-center gap-3 z-[1001]">
        <ChainSelector />
        <ThemeToggle />
        <ConnectButton />
      </div>
    </div>
  )
}
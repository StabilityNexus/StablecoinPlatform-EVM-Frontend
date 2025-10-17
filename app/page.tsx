"use client";

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import LightRays from "@/components/LightRays"
import TargetCursor from "@/components/TargetCursor"
import TokenFlow from "@/components/TokenFlow"
import { HeroText } from "@/components/HeroText"
import { motion } from "framer-motion"

export default function HomePage() {
  return (
    <div
      className="min-h-screen relative"
      style={{ fontFamily: "'Inter', 'Helvetica Neue', 'Arial', sans-serif", fontWeight: 400 }}
    >
      {/* Target Cursor Effect */}
      <TargetCursor 
        spinDuration={2}
        hideDefaultCursor={true}
      />
      
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
        className="fixed inset-0"
      />
      
      {/* Hero Section with Grid Background */}
      <section className="relative min-h-screen flex items-center z-[5]">
        <div className="container mx-auto px-4 mb-24 relative z-10">
          <div className="text-center">
            <HeroText />
            <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
              Launch your own stablecoin. Maintain price stability and
              build trust in the decentralized economy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 cursor-target">
                <Link href="/create">Create Stablecoin</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 bg-transparent cursor-target">
                <Link href="/explorer">Explore Coins</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative min-h-screen flex items-center z-[5]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Card className="grid container py-8 p-8 grid-cols-1 gap-8 items-center lg:grid-cols-2 bg-black/50 backdrop-blur-md rounded-xl shadow-lg border border-white/10">
              <motion.div
                className="flex gap-10 flex-col"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <div className="flex gap-4 flex-col">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                  >
                    <div className="inline-block bg-muted px-4 py-2 rounded-full text-sm font-medium mb-4">How It Works</div>
                  </motion.div>
                  <div className="flex gap-2 flex-col">
                    <motion.h2
                      className="text-3xl lg:text-5xl tracking-tighter max-w-xl text-left font-regular"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                    >
                      Dual Token Mechanics
                    </motion.h2>
                    <motion.p
                      className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-lg text-left"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    >
                      Get exposure to stability with Proton.
                      <br />
                      Proton is the stablecoin pegged to price of 1 backed token.
                      <br /><br />
                      Get leveraged volatility and yield with Neutron.
                      <br />
                      Neutron tokenizes the reserve surplus.
                      <br /><br />
                      Both Proton and Neutron are fully backed by Fungible-Tokens tokens.
                    </motion.p>
                  </div>
                </div>
                <div className="grid lg:pl-6 grid-cols-1 items-start gap-6">
                  {[
                    { icon: "⚡", title: "Fission", description: "Splits Fungible-Tokens tokens into Proton stable tokens and Neutron volatile tokens" },
                    { icon: "✨", title: "Fusion", description: "Merges Proton stable tokens and Neutron volatile tokens into Fungible-Tokens tokens" }
                  ].map((item, index) => (
                    <motion.div
                      key={item.title}
                      className="flex flex-row gap-6 items-start"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                      whileHover={{ x: 5 }}
                    >
                      <div className="text-2xl mt-2 text-primary">{item.icon}</div>
                      <div className="flex flex-col gap-1">
                        <p className="font-semibold">{item.title}</p>
                        <p className="text-muted-foreground text-sm">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              <motion.div
                className="rounded-[2rem] h-full w-full p-4 flex flex-col items-center justify-center space-y-6"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                {/* Fission: Fungible-Tokens -> Proton + Neutron */}
                <TokenFlow
                  title="Fission"
                  fromTokens={['Fungible Token']}
                  toTokens={['Proton', 'Neutron']}
                />

                {/* Fusion: Proton + Neutron -> Fungible-Tokens */}
                <TokenFlow
                  title="Fusion"
                  fromTokens={['Proton', 'Neutron']}
                  toTokens={['Fungible Token']}
                  reverse={false}
                />
              </motion.div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative min-h-screen flex items-center z-[5]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-balance">Why Choose Our Platform</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Revolutionary dual-token mechanics on Bitcoin infrastructure. Build the future of stable assets with cutting-edge technology.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {/* Price Stability */}
            <Card className="p-8 cursor-target bg-black/50 backdrop-blur-md border border-white/10">
              <CardContent className="p-0">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-white text-black px-4 py-2 rounded-lg font-bold text-sm">
                    Dual Token Innovation
                  </div>
                  <div className="bg-black text-white px-3 py-1 rounded-full text-xs font-bold border border-white">
                    1.1
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  Revolutionary fission/fusion mechanics split assets into Proton (stable) and Neutron (volatile) tokens. Get exposure to both stability and leveraged volatility from a single underlying asset.
                </p>
              </CardContent>
            </Card>

            {/* Full Transparency */}
            <Card className="p-8 cursor-target bg-black/50 backdrop-blur-md border border-white/10">
              <CardContent className="p-0">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-white text-black px-4 py-2 rounded-lg font-bold text-sm">
                    Bitcoin Infrastructure
                  </div>
                  <div className="bg-black text-white px-3 py-1 rounded-full text-xs font-bold border border-white">
                    1.2
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  Built on Bitcoin-compatible networks like Citrea and Rootstock. Leverage Bitcoin's security and stability while accessing modern DeFi capabilities and smart contract functionality.
                </p>
              </CardContent>
            </Card>

            {/* Easy Integration */}
            <Card className="p-8 cursor-target bg-black/50 backdrop-blur-md border border-white/10">
              <CardContent className="p-0">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-white text-black px-4 py-2 rounded-lg font-bold text-sm">
                    Real-Time Oracle Data
                  </div>
                  <div className="bg-black text-white px-3 py-1 rounded-full text-xs font-bold border border-white">
                    1.3
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  Powered by different Oracles real-time price feeds for accurate and reliable asset pricing. Get sub-second price updates across multiple asset classes including fiat, crypto, and commodities.
                </p>
              </CardContent>
            </Card>

            {/* Regulatory Compliant */}
            <Card className="p-8 cursor-target bg-black/50 backdrop-blur-md border border-white/10">
              <CardContent className="p-0">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-white text-black px-4 py-2 rounded-lg font-bold text-sm">
                    Full Transparency
                  </div>
                  <div className="bg-black text-white px-3 py-1 rounded-full text-xs font-bold border border-white">
                    1.4
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  All transactions, reserves, and system health metrics are publicly auditable on the blockchain. Complete transparency builds trust and ensures accountability in every operation.
                </p>
              </CardContent>
            </Card>

            {/* 24/7 Monitoring */}
            <Card className="p-8 cursor-target bg-black/50 backdrop-blur-md border border-white/10">
              <CardContent className="p-0">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-white text-black px-4 py-2 rounded-lg font-bold text-sm">
                    Dynamic Risk Management
                  </div>
                  <div className="bg-black text-white px-3 py-1 rounded-full text-xs font-bold border border-white">
                    1.5
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  Advanced system health monitoring and automated risk management protocols. Choose from conservative, moderate, or aggressive risk profiles to match your investment strategy.
                </p>
              </CardContent>
            </Card>

            {/* Global Access */}
            <Card className="p-8 cursor-target bg-black/50 backdrop-blur-md border border-white/10">
              <CardContent className="p-0">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-white text-black px-4 py-2 rounded-lg font-bold text-sm">
                    Multi-Chain Support
                  </div>
                  <div className="bg-black text-white px-3 py-1 rounded-full text-xs font-bold border border-white">
                    1.6
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  Deploy across Citrea Testnet, Rootstock Testnet, and Scroll Sepolia networks. Seamless cross-chain functionality with unified user experience across Bitcoin-compatible ecosystems.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}

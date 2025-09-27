"use client";

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import LightRays from "@/components/LightRays"
import Shuffle from "@/components/Shuffle"
import TargetCursor from "@/components/TargetCursor"
import TokenFlow from "@/components/TokenFlow"
import { motion } from "framer-motion"

export default function HomePage() {
  return (
    <div className="min-h-screen relative">
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
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              Create Stable Assets
              <div>
                <Shuffle
                  text="On Bitcoin"
                  tag="span"
                  className="block text-muted-foreground"
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
              </div>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
              Launch your own stablecoin with our intuitive platform. Maintain price stability, ensure transparency, and
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
                      Get exposure to stability with StableCoin.
                      <br />
                      StableCoin is the stablecoin pegged to price of 1 backed token.
                      <br /><br />
                      Get leveraged volatility and yield with ReserveCoin.
                      <br />
                      ReserveCoin tokenizes the reserve surplus.
                      <br /><br />
                      Both StableCoin and ReserveCoin are fully backed by ERC-20 tokens.
                    </motion.p>
                  </div>
                </div>
                <div className="grid lg:pl-6 grid-cols-1 items-start gap-6">
                  {[
                    { icon: "⚡", title: "Fission", description: "Splits ERC-20 tokens into StableCoin stable tokens and ReserveCoin volatile tokens" },
                    { icon: "✨", title: "Fusion", description: "Merges StableCoin stable tokens and ReserveCoin volatile tokens into ERC-20 tokens" }
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
                {/* Fission: ERC-20 -> StableCoin + ReserveCoin */}
                <TokenFlow
                  title="Fission"
                  fromTokens={['ERC-20']}
                  toTokens={['StableCoin', 'ReserveCoin']}
                />

                {/* Fusion: StableCoin + ReserveCoin -> ERC-20 */}
                <TokenFlow
                  title="Fusion"
                  fromTokens={['StableCoin', 'ReserveCoin']}
                  toTokens={['ERC-20']}
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
              Built for developers, designed for everyone. Create stable digital assets with confidence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {/* Price Stability */}
            <Card className="p-8 cursor-target bg-black/50 backdrop-blur-md border border-white/10">
              <CardContent className="p-0">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-white text-black px-4 py-2 rounded-lg font-bold text-sm">
                    Price Stability
                  </div>
                  <div className="bg-black text-white px-3 py-1 rounded-full text-xs font-bold border border-white">
                    1.1
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  Advanced algorithms ensure your stablecoin maintains its peg to the target asset. Our robust mechanisms provide consistent value preservation across market conditions.
                </p>
                <div className="flex items-center gap-4">
                  <div className="text-white font-semibold text-sm">AUTOMATED</div>
                  <div className="text-white font-semibold text-sm">RELIABLE</div>
                  <div className="text-white font-semibold text-sm">SECURE</div>
                </div>
              </CardContent>
            </Card>

            {/* Full Transparency */}
            <Card className="p-8 cursor-target bg-black/50 backdrop-blur-md border border-white/10">
              <CardContent className="p-0">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-white text-black px-4 py-2 rounded-lg font-bold text-sm">
                    Full Transparency
                  </div>
                  <div className="bg-black text-white px-3 py-1 rounded-full text-xs font-bold border border-white">
                    1.2
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  All transactions and reserves are publicly auditable on the blockchain. Complete transparency builds trust and ensures accountability in every operation.
                </p>
                <div className="flex items-center gap-4">
                  <div className="text-white font-semibold text-sm">AUDITABLE</div>
                  <div className="text-white font-semibold text-sm">OPEN SOURCE</div>
                  <div className="text-white font-semibold text-sm">VERIFIABLE</div>
                </div>
              </CardContent>
            </Card>

            {/* Easy Integration */}
            <Card className="p-8 cursor-target bg-black/50 backdrop-blur-md border border-white/10">
              <CardContent className="p-0">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-white text-black px-4 py-2 rounded-lg font-bold text-sm">
                    Easy Integration
                  </div>
                  <div className="bg-black text-white px-3 py-1 rounded-full text-xs font-bold border border-white">
                    1.3
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  Simple APIs and SDKs make it easy to integrate with your existing systems. Comprehensive documentation and developer tools streamline implementation.
                </p>
                <div className="flex items-center gap-4">
                  <div className="text-white font-semibold text-sm">REST API</div>
                  <div className="text-white font-semibold text-sm">SDK</div>
                  <div className="text-white font-semibold text-sm">WEBHOOKS</div>
                </div>
              </CardContent>
            </Card>

            {/* Regulatory Compliant */}
            <Card className="p-8 cursor-target bg-black/50 backdrop-blur-md border border-white/10">
              <CardContent className="p-0">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-white text-black px-4 py-2 rounded-lg font-bold text-sm">
                    Regulatory Compliant
                  </div>
                  <div className="bg-black text-white px-3 py-1 rounded-full text-xs font-bold border border-white">
                    1.4
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  Built with compliance in mind to meet regulatory requirements worldwide. Our framework adapts to evolving regulations across different jurisdictions.
                </p>
                <div className="flex items-center gap-4">
                  <div className="text-white font-semibold text-sm">KYC</div>
                  <div className="text-white font-semibold text-sm">AML</div>
                  <div className="text-white font-semibold text-sm">GDPR</div>
                </div>
              </CardContent>
            </Card>

            {/* 24/7 Monitoring */}
            <Card className="p-8 cursor-target bg-black/50 backdrop-blur-md border border-white/10">
              <CardContent className="p-0">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-white text-black px-4 py-2 rounded-lg font-bold text-sm">
                    24/7 Monitoring
                  </div>
                  <div className="bg-black text-white px-3 py-1 rounded-full text-xs font-bold border border-white">
                    1.5
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  Continuous monitoring ensures your stablecoin operates smoothly around the clock. Real-time alerts and automated responses maintain system integrity.
                </p>
                <div className="flex items-center gap-4">
                  <div className="text-white font-semibold text-sm">UPTIME</div>
                  <div className="text-white font-semibold text-sm">ALERTS</div>
                  <div className="text-white font-semibold text-sm">SUPPORT</div>
                </div>
              </CardContent>
            </Card>

            {/* Global Access */}
            <Card className="p-8 cursor-target bg-black/50 backdrop-blur-md border border-white/10">
              <CardContent className="p-0">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-white text-black px-4 py-2 rounded-lg font-bold text-sm">
                    Global Access
                  </div>
                  <div className="bg-black text-white px-3 py-1 rounded-full text-xs font-bold border border-white">
                    1.6
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  Deploy on multiple blockchains and reach users worldwide with cross-chain support. Seamless interoperability across different network ecosystems.
                </p>
                <div className="flex items-center gap-4">
                  <div className="text-white font-semibold text-sm">MULTI-CHAIN</div>
                  <div className="text-white font-semibold text-sm">BRIDGE</div>
                  <div className="text-white font-semibold text-sm">SCALING</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}

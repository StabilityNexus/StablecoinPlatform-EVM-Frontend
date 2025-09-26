import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Grid Background */}
      <section className="relative grid-bg py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-balance">
              Create Stable Digital Assets
              <span className="block text-muted-foreground">On The Blockchain</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
              Launch your own stablecoin with our intuitive platform. Maintain price stability, ensure transparency, and
              build trust in the decentralized economy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8">
                <Link href="/create">Create Stablecoin</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                <Link href="/explorer">Explore Coins</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block bg-muted px-4 py-2 rounded-full text-sm font-medium mb-4">How It Works</div>
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-balance">Simple Process, Powerful Results</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Get started in minutes and see the difference our platform can make for your business.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-foreground text-background rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                01
              </div>
              <h3 className="text-2xl font-bold mb-4">Connect Wallet</h3>
              <p className="text-muted-foreground text-pretty">
                Connect your crypto wallet in seconds. No credit card required to get started with our platform.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-foreground text-background rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                02
              </div>
              <h3 className="text-2xl font-bold mb-4">Configure Parameters</h3>
              <p className="text-muted-foreground text-pretty">
                Customize your stablecoin parameters to match your project's unique requirements and goals.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-foreground text-background rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                03
              </div>
              <h3 className="text-2xl font-bold mb-4">Deploy & Manage</h3>
              <p className="text-muted-foreground text-pretty">
                Deploy your stablecoin to the blockchain and use our dashboard to monitor and manage it effectively.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-balance">Why Choose Our Platform</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Built for developers, designed for everyone. Create stable digital assets with confidence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="p-6">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                  <div className="w-6 h-6 bg-primary-foreground rounded"></div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Price Stability</h3>
                <p className="text-muted-foreground">
                  Advanced algorithms ensure your stablecoin maintains its peg to the target asset.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                  <div className="w-6 h-6 bg-primary-foreground rounded"></div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Full Transparency</h3>
                <p className="text-muted-foreground">
                  All transactions and reserves are publicly auditable on the blockchain.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                  <div className="w-6 h-6 bg-primary-foreground rounded"></div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Easy Integration</h3>
                <p className="text-muted-foreground">
                  Simple APIs and SDKs make it easy to integrate with your existing systems.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                  <div className="w-6 h-6 bg-primary-foreground rounded"></div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Regulatory Compliant</h3>
                <p className="text-muted-foreground">
                  Built with compliance in mind to meet regulatory requirements worldwide.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                  <div className="w-6 h-6 bg-primary-foreground rounded"></div>
                </div>
                <h3 className="text-xl font-semibold mb-2">24/7 Monitoring</h3>
                <p className="text-muted-foreground">
                  Continuous monitoring ensures your stablecoin operates smoothly around the clock.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                  <div className="w-6 h-6 bg-primary-foreground rounded"></div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Global Access</h3>
                <p className="text-muted-foreground">
                  Deploy on multiple blockchains and reach users worldwide with cross-chain support.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-foreground text-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-balance">Ready to Launch Your Stablecoin?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto text-pretty">
            Join thousands of projects already using our platform to create stable digital assets.
          </p>
          <Button asChild size="lg" variant="secondary" className="text-lg px-8">
            <Link href="/create">Get Started Now</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

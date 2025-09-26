"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CreationStep } from "@/components/creation-step"
import { Separator } from "@/components/ui/separator"
import { Wallet, Shield, Rocket, CheckCircle } from "lucide-react"

interface StablecoinConfig {
  name: string
  symbol: string
  description: string
  initialSupply: string
  blockchain: string
  collateralType: string
  collateralRatio: string
  pegCurrency: string
  governanceModel: string
}

export default function CreatePage() {
  const [activeStep, setActiveStep] = useState<number | null>(1)
  const [config, setConfig] = useState<StablecoinConfig>({
    name: "",
    symbol: "",
    description: "",
    initialSupply: "",
    blockchain: "",
    collateralType: "",
    collateralRatio: "",
    pegCurrency: "USD",
    governanceModel: "",
  })

  const totalSteps = 4

  const updateConfig = (field: keyof StablecoinConfig, value: string) => {
    setConfig((prev) => ({ ...prev, [field]: value }))
  }

  const toggleStep = (step: number) => {
    setActiveStep(activeStep === step ? null : step)
  }

  const isStepCompleted = (step: number) => {
    switch (step) {
      case 1:
        return config.name && config.symbol && config.description
      case 2:
        return config.blockchain && config.initialSupply
      case 3:
        return config.collateralType && config.collateralRatio
      case 4:
        return true // Review step
      default:
        return false
    }
  }

  const allStepsCompleted = () => {
    return isStepCompleted(1) && isStepCompleted(2) && isStepCompleted(3)
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Create Your Stablecoin</h1>
          <p className="text-xl text-muted-foreground">Click on any section below to configure your stablecoin</p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center space-x-6">
            {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
              <div key={step} className="flex flex-col items-center space-y-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    isStepCompleted(step)
                      ? "bg-green-600 text-white"
                      : activeStep === step
                        ? "bg-foreground text-background"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {isStepCompleted(step) ? <CheckCircle className="h-5 w-5" /> : step}
                </div>
                <span className="text-xs text-muted-foreground">
                  {step === 1 && "Basic"}
                  {step === 2 && "Technical"}
                  {step === 3 && "Collateral"}
                  {step === 4 && "Deploy"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-6">
          {/* Step 1: Basic Information */}
          <CreationStep
            stepNumber={1}
            title="Basic Information"
            description="Define your stablecoin's identity and purpose"
            isActive={activeStep === 1}
            isCompleted={isStepCompleted(1)}
            onClick={() => toggleStep(1)}
          >
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Stablecoin Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g., My Business Token"
                    value={config.name}
                    onChange={(e) => updateConfig("name", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="symbol">Symbol</Label>
                  <Input
                    id="symbol"
                    placeholder="e.g., MBT"
                    value={config.symbol}
                    onChange={(e) => updateConfig("symbol", e.target.value.toUpperCase())}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the purpose and use case of your stablecoin..."
                  value={config.description}
                  onChange={(e) => updateConfig("description", e.target.value)}
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="pegCurrency">Peg Currency</Label>
                <Select value={config.pegCurrency} onValueChange={(value) => updateConfig("pegCurrency", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">US Dollar (USD)</SelectItem>
                    <SelectItem value="EUR">Euro (EUR)</SelectItem>
                    <SelectItem value="GBP">British Pound (GBP)</SelectItem>
                    <SelectItem value="JPY">Japanese Yen (JPY)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CreationStep>

          {/* Step 2: Technical Configuration */}
          <CreationStep
            stepNumber={2}
            title="Technical Configuration"
            description="Choose blockchain and set initial parameters"
            isActive={activeStep === 2}
            isCompleted={isStepCompleted(2)}
            onClick={() => toggleStep(2)}
          >
            <div className="space-y-6">
              <div>
                <Label htmlFor="blockchain">Blockchain Network</Label>
                <Select value={config.blockchain} onValueChange={(value) => updateConfig("blockchain", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select blockchain" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ethereum">Ethereum</SelectItem>
                    <SelectItem value="polygon">Polygon</SelectItem>
                    <SelectItem value="bsc">Binance Smart Chain</SelectItem>
                    <SelectItem value="arbitrum">Arbitrum</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="initialSupply">Initial Supply</Label>
                <Input
                  id="initialSupply"
                  type="number"
                  placeholder="1000000"
                  value={config.initialSupply}
                  onChange={(e) => updateConfig("initialSupply", e.target.value)}
                />
                <p className="text-sm text-muted-foreground mt-1">Number of tokens to mint initially</p>
              </div>
              <div>
                <Label htmlFor="governanceModel">Governance Model</Label>
                <Select
                  value={config.governanceModel}
                  onValueChange={(value) => updateConfig("governanceModel", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select governance model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="centralized">Centralized (Owner controlled)</SelectItem>
                    <SelectItem value="dao">DAO (Decentralized governance)</SelectItem>
                    <SelectItem value="multisig">Multi-signature</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CreationStep>

          {/* Step 3: Collateral Settings */}
          <CreationStep
            stepNumber={3}
            title="Collateral Settings"
            description="Configure collateral type and stability mechanisms"
            isActive={activeStep === 3}
            isCompleted={isStepCompleted(3)}
            onClick={() => toggleStep(3)}
          >
            <div className="space-y-6">
              <div>
                <Label htmlFor="collateralType">Collateral Type</Label>
                <Select value={config.collateralType} onValueChange={(value) => updateConfig("collateralType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select collateral type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fiat">Fiat Currency Reserves</SelectItem>
                    <SelectItem value="crypto">Cryptocurrency</SelectItem>
                    <SelectItem value="mixed">Mixed Assets</SelectItem>
                    <SelectItem value="algorithmic">Algorithmic (No collateral)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="collateralRatio">Collateral Ratio (%)</Label>
                <Input
                  id="collateralRatio"
                  type="number"
                  placeholder="110"
                  value={config.collateralRatio}
                  onChange={(e) => updateConfig("collateralRatio", e.target.value)}
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Minimum collateral ratio to maintain stability (recommended: 110-150%)
                </p>
              </div>
              <Card className="bg-muted/50">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Stability Mechanism</h4>
                      <p className="text-sm text-muted-foreground">
                        Your stablecoin will use automated rebalancing and liquidation mechanisms to maintain its peg.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CreationStep>

          {/* Step 4: Review & Deploy */}
          <CreationStep
            stepNumber={4}
            title="Review & Deploy"
            description="Review your configuration and deploy your stablecoin"
            isActive={activeStep === 4}
            isCompleted={isStepCompleted(4)}
            onClick={() => toggleStep(4)}
          >
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Configuration Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm text-muted-foreground">Name</Label>
                      <p className="font-medium">{config.name || "Not set"}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Symbol</Label>
                      <p className="font-medium">{config.symbol || "Not set"}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Blockchain</Label>
                      <p className="font-medium capitalize">{config.blockchain || "Not set"}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Initial Supply</Label>
                      <p className="font-medium">
                        {config.initialSupply ? Number(config.initialSupply).toLocaleString() : "Not set"}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Collateral Type</Label>
                      <p className="font-medium capitalize">{config.collateralType || "Not set"}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Collateral Ratio</Label>
                      <p className="font-medium">{config.collateralRatio ? `${config.collateralRatio}%` : "Not set"}</p>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <Label className="text-sm text-muted-foreground">Description</Label>
                    <p className="text-sm">{config.description || "No description provided"}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-yellow-50 border-yellow-200">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <Wallet className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-800">Deployment Cost</h4>
                      <p className="text-sm text-yellow-700">Estimated gas fee: ~0.05 ETH (~$125 USD)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button size="lg" className="w-full">
                <Rocket className="h-4 w-4 mr-2" />
                Deploy Stablecoin
              </Button>
            </div>
          </CreationStep>
        </div>

        {/* Navigation */}
        {allStepsCompleted() && (
          <div className="flex justify-center mt-12">
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <CardContent className="p-6 text-center">
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Ready to Deploy!</h3>
                <p className="text-muted-foreground mb-4">
                  All configuration steps are complete. Click below to deploy your stablecoin.
                </p>
                <Button size="lg" className="bg-green-600 hover:bg-green-700" onClick={() => toggleStep(4)}>
                  <Rocket className="h-4 w-4 mr-2" />
                  Review & Deploy
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

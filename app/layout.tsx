import '@rainbow-me/rainbowkit/styles.css'
import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/providers/theme-provider'
import { WalletProvider } from '@/providers/WalletProvider'
import Navigation from '@/components/navigation'

export const metadata: Metadata = {
  title: 'Gluon - Decentralized StableCoin Creation Platform',
  description: 'A modern platform for Web3 hackathons with project submission and judging capabilities',
  generator: 'Next.js',
  icons: {
    icon: '/GluonProtocol-Darker.png',
    shortcut: '/GluonProtocol-Darker.png',
    apple: '/GluonProtocol-Darker.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-background">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <WalletProvider>
            <Navigation />
            <main className="max-w-8xl mx-32 px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </main>
          </WalletProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

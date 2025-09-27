export const StableCoinFactories = {
  534351: '0x946B432be572405651452152eec8d17CE5a0f49b',
  5115: '0xd9E7848Ba881DABb8AF8C7b37fB681039B83DE50',
  31: '0xBd29b285037af7a6CA200da456f04cc7b3594DF1'
} as {
  [key: number]: `0x${string}`
}

export const PythOracles = {
  534351: '0xA2aa501b19aff244D90cc15a4Cf739D2725B5729'
} as {
  [key: number]: `0x${string}`
}

// Price feed IDs for Pyth oracle - organized by category
export const PriceFeeds = {
  // Fiat Currencies
  'USD': '0xeaa020409c8c9b93e04e9b4e72f0e9c0bb5ae9b27f37db21eafe8e66e2b5d1d4', // USD/USD (1.0)
  'EUR/USD': '0xa995d00bb36a63cef7fd2c287dc105fc8f3d93779f062f09551b0af3e81ec30b',
  'GBP/USD': '0x84c2dde9633d93d1bcad84e7dc41c9d56578b7ec52fabedc1f335d673df0a7c1',
  'JPY/USD': '0xef2c98c804ba503c6a707e38be4dfbb1efa26bb9b1582a8b01b4bf0de2b08b2b',
  'INR/USD': '0x605bf4e75b14ed513295d6e87c5d31615ed5a889ffcf16b3f17bf47b4b41bf2c',
  
  // Cryptocurrencies
  'ETH/USD': '0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace',
  'BTC/USD': '0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43',
  'USDC/USD': '0xeaa020409c8c9b93e04e9b4e72f0e9c0bb5ae9b27f37db21eafe8e66e2b5d1d4',
  'USDT/USD': '0x2b89b9dc8fdf9f34709a5b106b472f0f39bb6ca9ce04b0fd7f2e971688e2e53b',
  
  // Commodities
  'GOLD/USD': '0x765d2ba906dbc32ca17cc11f5310a89e9ee1f6420508c63861f2f8ba4ee34bb2',
  'SILVER/USD': '0xf2fb02c32b055c2cb9f85b6f24f2fb7f7d3a30e3f8e41e3e4c1a1f7f4b9b8e4a',
} as {
  [key: string]: `0x${string}`
}

// Organized price feeds by category for UI
export const PriceFeedCategories = {
  'Fiat Currencies': [
    { name: 'US Dollar', symbol: 'USD', priceId: PriceFeeds['USD'] },
    { name: 'Euro', symbol: 'EUR', priceId: PriceFeeds['EUR/USD'] },
    { name: 'British Pound', symbol: 'GBP', priceId: PriceFeeds['GBP/USD'] },
    { name: 'Japanese Yen', symbol: 'JPY', priceId: PriceFeeds['JPY/USD'] },
    { name: 'Indian Rupee', symbol: 'INR', priceId: PriceFeeds['INR/USD'] },
  ],
  'Cryptocurrencies': [
    { name: 'Ethereum', symbol: 'ETH', priceId: PriceFeeds['ETH/USD'] },
    { name: 'Bitcoin', symbol: 'BTC', priceId: PriceFeeds['BTC/USD'] },
    { name: 'USD Coin', symbol: 'USDC', priceId: PriceFeeds['USDC/USD'] },
    { name: 'Tether', symbol: 'USDT', priceId: PriceFeeds['USDT/USD'] },
  ],
  'Commodities': [
    { name: 'Gold', symbol: 'GOLD', priceId: PriceFeeds['GOLD/USD'] },
    { name: 'Silver', symbol: 'SILVER', priceId: PriceFeeds['SILVER/USD'] },
  ]
}

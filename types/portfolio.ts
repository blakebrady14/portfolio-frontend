export interface Holding {
  id: string;
  symbol: string;
  name: string;
  sector: string;
  assetClass: 'Stock' | 'Bond' | 'ETF' | 'Mutual Fund' | 'Crypto' | 'Cash';
  quantity: number;
  averageCost: number;
  currentPrice: number;
  marketValue: number;
  costBasis: number;
  unrealizedGainLoss: number;
  unrealizedGainLossPercent: number;
  dayChange: number;
  dayChangePercent: number;
  portfolioWeight: number;
  dividendYield?: number;
  lastUpdated: string;
}

export interface Transaction {
  id: string;
  symbol: string;
  type: 'Buy' | 'Sell' | 'Dividend' | 'Transfer';
  date: string;
  quantity: number;
  price: number;
  amount: number;
  fees: number;
  notes?: string;
}

export interface PortfolioSummary {
  totalValue: number;
  totalCostBasis: number;
  totalGainLoss: number;
  totalGainLossPercent: number;
  dayChange: number;
  dayChangePercent: number;
  cashBalance: number;
  numberOfHoldings: number;
}

export interface SectorAllocation {
  sector: string;
  value: number;
  percentage: number;
  gainLoss: number;
}

export interface PerformanceData {
  date: string;
  portfolioValue: number;
  benchmarkValue: number;
}

'use client';

import { PortfolioSummary } from '@/types/portfolio';
import { TrendingUp, TrendingDown, DollarSign, PieChart } from 'lucide-react';

interface PortfolioSummaryCardsProps {
  summary: PortfolioSummary;
}

export default function PortfolioSummaryCards({ summary }: PortfolioSummaryCardsProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(value);
  };

  const formatPercent = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  const cards = [
    {
      title: 'Total Portfolio Value',
      value: formatCurrency(summary.totalValue),
      icon: DollarSign,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Gain/Loss',
      value: formatCurrency(summary.totalGainLoss),
      subtitle: formatPercent(summary.totalGainLossPercent),
      icon: summary.totalGainLoss >= 0 ? TrendingUp : TrendingDown,
      color: summary.totalGainLoss >= 0 ? 'bg-green-500' : 'bg-red-500',
      valueColor: summary.totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600',
    },
    {
      title: 'Day Change',
      value: formatCurrency(summary.dayChange),
      subtitle: formatPercent(summary.dayChangePercent),
      icon: summary.dayChange >= 0 ? TrendingUp : TrendingDown,
      color: summary.dayChange >= 0 ? 'bg-green-500' : 'bg-red-500',
      valueColor: summary.dayChange >= 0 ? 'text-green-600' : 'text-red-600',
    },
    {
      title: 'Number of Holdings',
      value: summary.numberOfHoldings.toString(),
      icon: PieChart,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">{card.title}</h3>
              <div className={`${card.color} p-2 rounded-lg`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className={`text-2xl font-bold ${card.valueColor || 'text-gray-900'}`}>
              {card.value}
            </div>
            {card.subtitle && (
              <div className={`text-sm mt-1 font-semibold ${card.valueColor || 'text-gray-600'}`}>
                {card.subtitle}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

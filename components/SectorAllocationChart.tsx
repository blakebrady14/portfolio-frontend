'use client';

import { SectorAllocation } from '@/types/portfolio';

interface SectorAllocationChartProps {
  data: SectorAllocation[];
}

const COLORS = [
  { primary: '#2563eb', light: '#dbeafe', dark: '#1e40af' },
  { primary: '#059669', light: '#d1fae5', dark: '#047857' },
  { primary: '#d97706', light: '#fef3c7', dark: '#b45309' },
  { primary: '#7c3aed', light: '#ede9fe', dark: '#6d28d9' },
  { primary: '#dc2626', light: '#fee2e2', dark: '#b91c1c' },
  { primary: '#0891b2', light: '#cffafe', dark: '#0e7490' },
];

export default function SectorAllocationChart({ data }: SectorAllocationChartProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const totalValue = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Sector Allocation</h2>
        <p className="text-sm text-gray-600 mt-1">Portfolio diversification by sector</p>
      </div>

      {/* Horizontal stacked bar */}
      <div className="mb-6">
        <div className="flex h-8 rounded-lg overflow-hidden shadow-sm">
          {data.map((sector, index) => (
            <div
              key={sector.sector}
              style={{
                width: `${sector.percentage}%`,
                backgroundColor: COLORS[index % COLORS.length].primary,
              }}
              className="relative group transition-all hover:opacity-80 cursor-pointer"
              title={`${sector.sector}: ${sector.percentage.toFixed(1)}%`}
            />
          ))}
        </div>
      </div>

      {/* Sector breakdown list */}
      <div className="space-y-3">
        {data.map((sector, index) => (
          <div
            key={sector.sector}
            className="group hover:bg-gray-50 p-3 rounded-lg transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center flex-1">
                <div
                  className="w-4 h-4 rounded mr-3"
                  style={{ backgroundColor: COLORS[index % COLORS.length].primary }}
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900">{sector.sector}</span>
                    <span className="text-sm font-medium text-gray-600">
                      {sector.percentage.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between ml-7">
              <span className="text-sm text-gray-600">{formatCurrency(sector.value)}</span>
              <div className="flex items-center space-x-4">
                <span
                  className={`text-sm font-semibold ${
                    sector.gainLoss >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {sector.gainLoss >= 0 ? '+' : ''}
                  {formatCurrency(sector.gainLoss)}
                </span>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded ${
                    sector.gainLoss >= 0
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {sector.gainLoss >= 0 ? '+' : ''}
                  {((sector.gainLoss / (sector.value - sector.gainLoss)) * 100).toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary footer */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-gray-700">Total Portfolio Value</span>
          <span className="font-bold text-gray-900 text-base">{formatCurrency(totalValue)}</span>
        </div>
      </div>
    </div>
  );
}

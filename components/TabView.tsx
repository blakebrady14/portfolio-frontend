'use client';

import { useState } from 'react';
import { mockHoldings, mockTransactions } from '@/lib/mockData';
import PortfolioGrid from '@/components/PortfolioGrid';
import TransactionGrid from '@/components/TransactionGrid';

export default function TabView() {
  const [activeTab, setActiveTab] = useState<'holdings' | 'transactions'>('holdings');

  const tabs = [
    { id: 'holdings' as const, label: 'Holdings', count: mockHoldings.length },
    { id: 'transactions' as const, label: 'Transactions', count: mockTransactions.length },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {tab.label}
              <span
                className={`ml-2 py-0.5 px-2 rounded-full text-xs font-medium
                  ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-100 text-gray-600'
                  }
                `}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'holdings' ? (
          <div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Portfolio Holdings</h3>
              <p className="text-sm text-gray-600">
                Detailed view of all positions with real-time performance metrics
              </p>
            </div>
            <PortfolioGrid holdings={mockHoldings} />
          </div>
        ) : (
          <div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Transaction History</h3>
              <p className="text-sm text-gray-600">
                Complete history of all portfolio transactions
              </p>
            </div>
            <TransactionGrid transactions={mockTransactions} />
          </div>
        )}
      </div>
    </div>
  );
}

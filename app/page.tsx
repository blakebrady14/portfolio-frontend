'use client';

import { useState } from 'react';
import PortfolioSummaryCards from '@/components/PortfolioSummaryCards';
import SectorAllocationChart from '@/components/SectorAllocationChart';
import PerformanceChart from '@/components/PerformanceChart';
import TabView from '@/components/TabView';
import AddTransactionModal from '@/components/AddTransactionModal';
import {
  mockPortfolioSummary,
  mockSectorAllocation,
  mockPerformanceData,
} from '@/lib/mockData';
import { TrendingUp } from 'lucide-react';
import { Transaction } from '@/types/portfolio';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTransaction = (transaction: Omit<Transaction, 'id'>) => {
    console.log('New transaction:', transaction);
    // future: can connect this to potential server directory to actually add this transaction
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Add Transaction
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Add Transaction Modal */}
      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddTransaction}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <PortfolioSummaryCards summary={mockPortfolioSummary} />

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <PerformanceChart data={mockPerformanceData} />
          <SectorAllocationChart data={mockSectorAllocation} />
        </div>

        {/* Holdings & Transactions Tabs */}
        <TabView />
      </main>
    </div>
  );
}

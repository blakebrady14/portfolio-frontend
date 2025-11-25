# Investment Portfolio Manager

A professional investment portfolio tracking application written by Blake Brady and built with Next.js 14, TypeScript, and AG Grid. This application demonstrates advanced data grid capabilities and frontend concepts utilized by high-performant systems.

<img width="1245" height="1101" alt="Screenshot 2025-11-25 at 7 06 45 AM" src="https://github.com/user-attachments/assets/22aab414-b2ee-45fe-aa1f-f39310771f68" />

<img width="1240" height="787" alt="Screenshot 2025-11-25 at 7 45 37 AM" src="https://github.com/user-attachments/assets/f975e5f0-a9e1-4fd0-a70e-f9d6ad4865ae" />


## Features

### 📊 Advanced Data Grids with AG Grid
- **Portfolio Holdings Grid** - Comprehensive view of all investments with:
  - Sorting and filtering on all columns
  - Floating filters for quick data access
  - Custom cell rendering with color-coded gain/loss values
  - Pagination for large datasets
  - Resizable and sortable columns
  - Real-time value formatting (currency, percentages)

- **Transaction History Grid** - Complete transaction tracking with:
  - Date-based sorting
  - Type-based filtering (Buy, Sell, Dividend, Transfer)
  - Color-coded transaction types
  - Custom cell styling

### 💼 Portfolio Management Features
- **Summary Dashboard** - Key metrics at a glance:
  - Total portfolio value
  - Total gain/loss with percentage
  - Day change tracking
  - Number of holdings

- **Performance Chart** - Portfolio growth visualization:
  - Time-series comparison with benchmark (S&P 500)
  - Interactive tooltips with detailed information
  - Historical performance tracking

- **Sector Allocation** - Portfolio diversification insights:
  - Pie chart visualization
  - Sector-level gain/loss tracking
  - Percentage allocation display

### 🎨 Modern UI/UX
- Responsive design that works on all devices
- Professional color scheme
- Card-based layout
- Tab navigation for different views
- Lucide icons for visual clarity

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Data Grid**: AG Grid React (Community & Enterprise)
- **Charts**: Recharts
- **Icons**: Lucide React
- **Date Handling**: date-fns

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies (already done)
```bash
npm install
```

2. Run the development server
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
investments-personal/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page with dashboard
│   └── globals.css         # Global styles
├── components/
|   |── AddTransactionModal.tsx     # Pop-up modal to add transactions
│   ├── PortfolioGrid.tsx           # Main holdings grid
│   ├── TransactionGrid.tsx         # Transaction history grid
│   ├── PortfolioSummaryCards.tsx   # Summary metrics cards
│   ├── PerformanceChart.tsx        # Performance line chart
│   ├── SectorAllocationChart.tsx   # Sector pie chart
│   └── TabView.tsx                 # Tab navigation component
├── types/
│   └── portfolio.ts        # TypeScript interfaces
├── lib/
│   └── mockData.ts         # Sample data
└── package.json
```


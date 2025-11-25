'use client';

import { AgGridReact } from 'ag-grid-react';
import { ColDef, ValueFormatterParams } from 'ag-grid-community';
import { useCallback, useMemo, useRef } from 'react';
import { Holding } from '@/types/portfolio';
import '@/lib/agGridConfig';
import { themeQuartz } from 'ag-grid-community';

interface PortfolioGridProps {
  holdings: Holding[];
}

export default function PortfolioGrid({ holdings }: PortfolioGridProps) {
  const gridRef = useRef<AgGridReact>(null);

  // Currency formatter
  const currencyFormatter = (params: ValueFormatterParams) => {
    if (params.value == null) return '';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(params.value);
  };

  // Percent formatter
  const percentFormatter = (params: ValueFormatterParams) => {
    if (params.value == null) return '';
    return `${params.value.toFixed(2)}%`;
  };

  // Number formatter
  const numberFormatter = (params: ValueFormatterParams) => {
    if (params.value == null) return '';
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(params.value);
  };

  // Cell style for positive/negative values
  const gainLossCellStyle = (params: any) => {
    if (params.value > 0) {
      return { color: '#16a34a', fontWeight: '600' } as any;
    } else if (params.value < 0) {
      return { color: '#dc2626', fontWeight: '600' } as any;
    }
    return { color: '#6b7280' } as any;
  };

  const columnDefs: ColDef<Holding>[] = useMemo(
    () => [
      {
        headerName: 'Symbol',
        field: 'symbol',
        pinned: 'left',
        width: 120,
        cellStyle: { fontWeight: '600', fontSize: '14px' } as any,
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'Name',
        field: 'name',
        width: 220,
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'Quantity',
        field: 'quantity',
        width: 120,
        type: 'numericColumn',
        valueFormatter: numberFormatter,
        filter: 'agNumberColumnFilter',
      },
      {
        headerName: 'Price',
        field: 'currentPrice',
        width: 120,
        type: 'numericColumn',
        valueFormatter: currencyFormatter,
        filter: 'agNumberColumnFilter',
      },
      {
        headerName: 'Market Value',
        field: 'marketValue',
        width: 150,
        type: 'numericColumn',
        valueFormatter: currencyFormatter,
        filter: 'agNumberColumnFilter',
        cellStyle: { fontWeight: '600' } as any,
      },
      {
        headerName: 'Total Gain/Loss',
        field: 'unrealizedGainLoss',
        width: 150,
        type: 'numericColumn',
        valueFormatter: currencyFormatter,
        filter: 'agNumberColumnFilter',
        cellStyle: gainLossCellStyle,
      },
      {
        headerName: 'Total Return %',
        field: 'unrealizedGainLossPercent',
        width: 150,
        type: 'numericColumn',
        valueFormatter: percentFormatter,
        filter: 'agNumberColumnFilter',
        cellStyle: gainLossCellStyle,
      },
    ],
    []
  );

  const defaultColDef = useMemo<ColDef>(
    () => ({
      sortable: true,
      resizable: true,
      filter: true,
      floatingFilter: true,
    }),
    []
  );

  const onGridReady = useCallback(() => {
    gridRef.current?.api?.sizeColumnsToFit();
  }, []);

  const theme = useMemo(() => 
    themeQuartz.withParams({
      accentColor: '#3b82f6',
      backgroundColor: '#ffffff',
      borderColor: '#e5e7eb',
      browserColorScheme: 'light',
      chromeBackgroundColor: '#f9fafb',
      fontFamily: 'inherit',
      fontSize: 14,
      headerFontSize: 14,
      headerFontWeight: 600,
    }),
    []
  );

  return (
    <div className="w-full" style={{ height: '600px' }}>
      <AgGridReact
        ref={gridRef}
        rowData={holdings}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        animateRows={true}
        pagination={true}
        paginationPageSize={20}
        enableCellTextSelection={true}
        onGridReady={onGridReady}
        theme={theme}
      />
    </div>
  );
}

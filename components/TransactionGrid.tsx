'use client';

import { AgGridReact } from 'ag-grid-react';
import { ColDef, ValueFormatterParams } from 'ag-grid-community';
import { useCallback, useMemo, useRef } from 'react';
import { Transaction } from '@/types/portfolio';
import '@/lib/agGridConfig';
import { themeQuartz } from 'ag-grid-community';

interface TransactionGridProps {
  transactions: Transaction[];
}

export default function TransactionGrid({ transactions }: TransactionGridProps) {
  const gridRef = useRef<AgGridReact>(null);

  const currencyFormatter = (params: ValueFormatterParams) => {
    if (params.value == null) return '';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(params.value);
  };

  const dateFormatter = (params: ValueFormatterParams) => {
    if (!params.value) return '';
    return new Date(params.value).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const numberFormatter = (params: ValueFormatterParams) => {
    if (params.value == null) return '';
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(params.value);
  };

  const typeCellStyle = (params: any) => {
    const typeColors: any = {
      Buy: { backgroundColor: '#dcfce7', color: '#166534' },
      Sell: { backgroundColor: '#fee2e2', color: '#991b1b' },
      Dividend: { backgroundColor: '#dbeafe', color: '#1e40af' },
      Transfer: { backgroundColor: '#f3e8ff', color: '#6b21a8' },
    };
    return typeColors[params.value] || {};
  };

  const columnDefs: ColDef<Transaction>[] = useMemo(
    () => [
      {
        headerName: 'Date',
        field: 'date',
        width: 130,
        sort: 'desc',
        valueFormatter: dateFormatter,
        filter: 'agDateColumnFilter',
      },
      {
        headerName: 'Symbol',
        field: 'symbol',
        width: 110,
        cellStyle: { fontWeight: '600', fontSize: '14px' } as any,
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'Type',
        field: 'type',
        width: 120,
        cellStyle: typeCellStyle,
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
        field: 'price',
        width: 130,
        type: 'numericColumn',
        valueFormatter: currencyFormatter,
        filter: 'agNumberColumnFilter',
      },
      {
        headerName: 'Amount',
        field: 'amount',
        width: 140,
        type: 'numericColumn',
        valueFormatter: currencyFormatter,
        filter: 'agNumberColumnFilter',
        cellStyle: { fontWeight: '600' } as any,
      },
      {
        headerName: 'Fees',
        field: 'fees',
        width: 110,
        type: 'numericColumn',
        valueFormatter: currencyFormatter,
        filter: 'agNumberColumnFilter',
      },
      {
        headerName: 'Notes',
        field: 'notes',
        width: 200,
        filter: 'agTextColumnFilter',
      },
    ],
    []
  );

  const defaultColDef = useMemo<ColDef>(
    () => ({
      sortable: true,
      resizable: true,
      filter: true,
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
    <div className="w-full" style={{ height: '500px' }}>
      <AgGridReact
        ref={gridRef}
        rowData={transactions}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        animateRows={true}
        pagination={true}
        paginationPageSize={15}
        enableCellTextSelection={true}
        onGridReady={onGridReady}
        theme={theme}
      />
    </div>
  );
}

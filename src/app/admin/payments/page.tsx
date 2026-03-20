"use client";

import { useState } from "react";
import PaymentFilter from "@/components/admin/payments/PaymentFilter";
import PaymentStats from "@/components/admin/payments/PaymentStats";
import TransactionDetail from "@/components/admin/payments/TransactionDetail";
import TransactionList from "@/components/admin/payments/TransactionList";

export default function PaymentsPage() {
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [modalMode, setModalMode] = useState<'view' | 'edit'>('view');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [filters, setFilters] = useState(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const start = today.toISOString();
    
    today.setHours(23, 59, 59, 999);
    const end = today.toISOString();

    return {
      search: "",
      paymentMethod: null as number | null,
      paymentStatus: null as number | null,
      startDate: start,
      endDate: end,
    };
  });

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="flex flex-col h-[calc(100vh)] -m-4 md:-m-8">
      {/* Header */}
        <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-3 shrink-0">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">Giao Dịch Thanh Toán</h2>
        </header>

      {/* Main Full View */}
      <div className="flex flex-1 overflow-hidden">
        {/* Full Column */}
        <div className="w-full flex flex-col bg-slate-50/50 dark:bg-slate-900 overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6">
            <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full">
              <PaymentStats filters={filters} />
              <PaymentFilter onFilterChange={handleFilterChange} filters={filters} />
              <TransactionList 
                key={refreshKey}
                selectedId={selectedOrderId} 
                onSelect={(id, mode) => { 
                  setSelectedOrderId(id); 
                  setModalMode(mode); 
                  setIsModalOpen(true); 
                }} 
                filters={filters}
              />
            </div>
          </div>
        </div>

        {/* Modal Window for Details */}
        <TransactionDetail 
          orderId={selectedOrderId}
          mode={modalMode}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onStatusUpdated={() => setRefreshKey(prev => prev + 1)}
        />
      </div>
    </div>
  );
}

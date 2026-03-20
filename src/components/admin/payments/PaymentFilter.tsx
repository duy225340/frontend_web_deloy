"use client";

import { useState, useRef, useEffect } from "react";
import { PAYMENT_STATUSES, PAYMENT_METHODS } from "@/hooks/useOrders";

interface PaymentFilterProps {
  onFilterChange: (filters: {
    search?: string;
    paymentMethod?: number | null;
    paymentStatus?: number | null;
    startDate?: string | null;
    endDate?: string | null;
  }) => void;
  filters: {
    search: string;
    paymentMethod: number | null;
    paymentStatus: number | null;
    startDate: string | null;
    endDate: string | null;
  };
}

// Compact Filter Dropdown Component
function PaymentFilterDropdown({
  filters,
  onFilterChange
}: {
  filters: PaymentFilterProps["filters"];
  onFilterChange: PaymentFilterProps["onFilterChange"];
}) {
  const [open, setOpen] = useState(false);
  const [dateType, setDateType] = useState<"today" | "7d" | "30d" | "custom">("today");
  const ref = useRef<HTMLDivElement>(null);

  // Determine active count
  const activeCount = 
    (filters.paymentStatus !== null ? 1 : 0) + 
    (filters.paymentMethod !== null ? 1 : 0) + 
    (dateType !== "today" ? 1 : 0);

  // Click outside detection
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDateSelect = (type: "today" | "7d" | "30d" | "custom") => {
    setDateType(type);
    
    if (type === "custom") return;

    const end = new Date();
    end.setHours(23, 59, 59, 999);
    
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    if (type === "7d") {
      start.setDate(start.getDate() - 7);
    } else if (type === "30d") {
      start.setDate(start.getDate() - 30);
    }

    onFilterChange({ 
      startDate: start.toISOString(), 
      endDate: end.toISOString() 
    });
  };

  const handleCustomDateChange = (isStart: boolean, value: string) => {
    if (!value) return;
    
    const date = new Date(value);
    if (isStart) {
      date.setHours(0, 0, 0, 0);
      onFilterChange({ startDate: date.toISOString() });
    } else {
      // Allow selecting future dates to ensure exact end of selected day is captured
      date.setHours(23, 59, 59, 999);
      onFilterChange({ endDate: date.toISOString() });
    }
  };

  const handleClear = () => {
    onFilterChange({
      paymentStatus: null,
      paymentMethod: null
    });
    handleDateSelect("today");
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 h-12 px-5 rounded-2xl border font-bold text-sm transition-all focus:outline-none focus:ring-4 focus:ring-primary/10 ${
          activeCount > 0 
            ? "border-primary bg-primary/5 text-primary" 
            : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
        }`}
      >
        <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>filter_list</span>
        Bộ Lọc
        {activeCount > 0 && (
          <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-primary text-white text-[10px] font-black ml-1">
            {activeCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-[300px] md:w-[700px] lg:w-[800px] bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 z-30 p-5 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Bộ lọc thời gian */}
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Thời gian</p>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <button
                  onClick={() => handleDateSelect("today")}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                    dateType === "today" 
                      ? "bg-primary text-white shadow-md shadow-primary/20" 
                      : "bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  Hôm nay
                </button>
                <button
                  onClick={() => handleDateSelect("7d")}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                    dateType === "7d" 
                      ? "bg-primary text-white shadow-md shadow-primary/20" 
                      : "bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  7 Ngày
                </button>
                <button
                  onClick={() => handleDateSelect("30d")}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                    dateType === "30d" 
                      ? "bg-primary text-white shadow-md shadow-primary/20" 
                      : "bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  30 Ngày
                </button>
                <button
                  onClick={() => handleDateSelect("custom")}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                    dateType === "custom" 
                      ? "bg-primary text-white shadow-md shadow-primary/20" 
                      : "bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  Tùy chỉnh
                </button>
              </div>

              {dateType === "custom" && (
                <div className="space-y-2 animate-in slide-in-from-top-2 duration-200">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 mr-2">Từ:</span>
                    <input 
                      type="date" 
                      value={filters.startDate ? filters.startDate.split('T')[0] : ""}
                      onChange={(e) => handleCustomDateChange(true, e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 mr-2">Đến:</span>
                    <input 
                      type="date" 
                      value={filters.endDate ? filters.endDate.split('T')[0] : ""}
                      onChange={(e) => handleCustomDateChange(false, e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Trạng thái thanh toán */}
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Tình trạng</p>
              <div className="space-y-1 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                {PAYMENT_STATUSES.map((s) => (
                  <label
                    key={s.value}
                    className="flex items-center gap-3 py-1.5 px-2 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={filters.paymentStatus === s.value}
                      onChange={() => onFilterChange({ paymentStatus: filters.paymentStatus === s.value ? null : s.value })}
                      className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary/20"
                    />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{s.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Phương thức thanh toán */}
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Phương thức</p>
              <div className="space-y-1">
                {PAYMENT_METHODS.map((m) => (
                  <label
                    key={m.value}
                    className="flex items-center gap-3 py-1.5 px-2 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={filters.paymentMethod === m.value}
                      onChange={() => onFilterChange({ paymentMethod: filters.paymentMethod === m.value ? null : m.value })}
                      className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary/20"
                    />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{m.label}</span>
                  </label>
                ))}
              </div>
            </div>

          </div>

          {/* Clear button */}
          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-700 flex justify-end">
            <button
              onClick={handleClear}
              className="text-xs font-bold text-slate-400 hover:text-rose-500 uppercase tracking-widest transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>delete</span>
              Xóa bộ lọc
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PaymentFilter({ onFilterChange, filters }: PaymentFilterProps) {
  const [search, setSearch] = useState(filters.search);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterChange({ search });
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="flex flex-col lg:flex-row gap-4 items-center">
      <div className="flex-1 relative w-full group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
          <span className="material-symbols-outlined" style={{ fontSize: "22px" }}>search</span>
        </div>
        <input
          className="w-full h-12 pl-12 pr-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/50 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all placeholder:text-slate-400 text-slate-900 dark:text-white shadow-sm"
          placeholder="Tìm theo mã giao dịch, tên khách hàng..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      
      <PaymentFilterDropdown
        filters={filters}
        onFilterChange={onFilterChange}
      />
    </div>
  );
}

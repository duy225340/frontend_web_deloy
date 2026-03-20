"use client";

import { useState, useRef, useEffect } from "react";
import { Order, ORDER_STATUSES, PAYMENT_STATUSES, OrderStats } from "@/hooks/useOrders";
import { formatVND, formatDateVN } from "@/utils/format";
import { useAppSelector } from "@/redux/hooks";

// Compact Filter Dropdown Component
function FilterDropdown({
  status, onStatusChange,
  startDate, endDate, onDateChange
}: {
  status: number | null;
  onStatusChange: (v: number | null) => void;
  startDate: string | null;
  endDate: string | null;
  onDateChange: (start: string | null, end: string | null) => void;
}) {
  const [open, setOpen] = useState(false);
  const [dateType, setDateType] = useState<"today" | "7d" | "30d" | "custom">("today");
  const ref = useRef<HTMLDivElement>(null);

  // Đếm số filter đang active
  const activeCount = 
    (status !== null ? 1 : 0) + 
    (dateType !== "today" ? 1 : 0);

  // Click outside đóng dropdown
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleClear = () => {
    onStatusChange(null);
    handleDateSelect("today");
  };

  const handleDateSelect = (type: "today" | "7d" | "30d" | "custom") => {
    setDateType(type);
    if (type === "custom") return; // Let user pick from inputs

    const today = new Date();
    today.setHours(23, 59, 59, 999);
    
    let startD = new Date(today);
    startD.setHours(0, 0, 0, 0);

    if (type === "7d") {
      startD.setDate(today.getDate() - 7);
    } else if (type === "30d") {
      startD.setDate(today.getDate() - 30);
    }
    
    // Format to ISO string for backend
    onDateChange(startD.toISOString(), today.toISOString());
  };

  // Convert string to yyyy-mm-dd for input
  const getCustomDateStr = (dateStr: string | null) => {
    if (!dateStr) return "";
    return dateStr.split('T')[0];
  };

  const handleCustomDateChange = (isStart: boolean, value: string) => {
    if (!value) return;
    
    let newStart = startDate;
    let newEnd = endDate;

    const selectedDate = new Date(value);
    
    if (isStart) {
      selectedDate.setHours(0, 0, 0, 0);
      newStart = selectedDate.toISOString();
      if (!newEnd) {
        const endD = new Date(selectedDate);
        endD.setHours(23, 59, 59, 999);
        newEnd = endD.toISOString();
      }
    } else {
      selectedDate.setHours(23, 59, 59, 999);
      newEnd = selectedDate.toISOString();
      if (!newStart) {
        const startD = new Date(selectedDate);
        startD.setHours(0, 0, 0, 0);
        newStart = startD.toISOString();
      }
    }
    
    onDateChange(newStart, newEnd);
  };


  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className={`flex h-12 shrink-0 items-center gap-2 px-5 rounded-2xl text-sm font-bold transition-all border ${
          activeCount > 0
            ? "bg-primary text-white border-primary shadow-lg shadow-primary/25"
            : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300"
        }`}
      >
        <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>filter_list</span>
        Bộ lọc
        {activeCount > 0 && (
          <span className="flex items-center justify-center h-5 w-5 rounded-full bg-white text-primary text-[11px] font-black">
            {activeCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-[300px] md:w-[600px] bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 z-30 p-5 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bộ lọc thời gian */}
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Thời gian</p>
              <div className="grid grid-cols-2 gap-2 mb-3">
                 <button 
                  onClick={() => handleDateSelect("today")}
                  className={`py-1.5 px-2 rounded-lg text-xs font-bold border transition-colors ${dateType === "today" ? "bg-primary/10 text-primary border-primary/20" : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300"}`}
                 >Hôm nay</button>
                 <button 
                  onClick={() => handleDateSelect("7d")}
                  className={`py-1.5 px-2 rounded-lg text-xs font-bold border transition-colors ${dateType === "7d" ? "bg-primary/10 text-primary border-primary/20" : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300"}`}
                 >7 Ngày</button>
                 <button 
                  onClick={() => handleDateSelect("30d")}
                  className={`py-1.5 px-2 rounded-lg text-xs font-bold border transition-colors ${dateType === "30d" ? "bg-primary/10 text-primary border-primary/20" : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300"}`}
                 >30 Ngày</button>
                 <button 
                  onClick={() => handleDateSelect("custom")}
                  className={`py-1.5 px-2 rounded-lg text-xs font-bold border transition-colors ${dateType === "custom" ? "bg-primary/10 text-primary border-primary/20" : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300"}`}
                 >Tùy chọn</button>
              </div>
              
              {dateType === "custom" && (
                <div className="flex flex-col gap-2 mt-2 animate-in fade-in slide-in-from-top-1 duration-200">
                  <input
                    type="date"
                    value={getCustomDateStr(startDate)}
                    onChange={(e) => handleCustomDateChange(true, e.target.value)}
                    className="w-full text-xs p-1.5 border border-slate-200 rounded-md focus:outline-none focus:border-primary dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                  />
                  <input
                    type="date"
                    value={getCustomDateStr(endDate)}
                    onChange={(e) => handleCustomDateChange(false, e.target.value)}
                    className="w-full text-xs p-1.5 border border-slate-200 rounded-md focus:outline-none focus:border-primary dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                  />
                </div>
              )}
            </div>

            {/* Trạng thái đơn */}
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Trạng thái đơn</p>
              <div className="space-y-1">
                {ORDER_STATUSES.map((s) => (
                  <label
                    key={s.value}
                    className="flex items-center gap-3 py-1.5 px-2 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={status === s.value}
                      onChange={() => onStatusChange(status === s.value ? null : s.value)}
                      className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary/20"
                    />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{s.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Clear button */}
          {activeCount > 0 && (
            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-700 flex justify-end">
              <button
                onClick={handleClear}
                className="px-5 py-2 text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 dark:hover:text-red-400 rounded-xl transition-colors shrink-0"
              >
                Xóa tất cả bộ lọc
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

interface OrderListProps {
  orders: Order[];
  loading: boolean;
  totalPages: number;
  totalElements: number;
  stats: OrderStats;
  page: number;
  setPage: (page: number) => void;
  onCreateOrder: () => void;
  onEditOrder: (order: Order) => void;
  onViewOrder: (order: Order) => void;
  onDeleteOrder: (id: number) => void;
  search: string;
  onSearchChange: (value: string) => void;
  status: number | null;
  onStatusChange: (value: number | null) => void;
  startDate: string | null;
  endDate: string | null;
  onDateChange: (start: string | null, end: string | null) => void;
}

export default function OrderList({
  orders,
  loading,
  totalPages,
  totalElements,
  stats,
  page,
  setPage,
  onCreateOrder,
  onEditOrder,
  onViewOrder,
  onDeleteOrder,
  search,
  onSearchChange,
  status,
  onStatusChange,
  startDate,
  endDate,
  onDateChange,
}: OrderListProps) {
  const user = useAppSelector((state) => state.authReducer.user);
  const isAdmin = user?.roleCode === 'ADMIN';

  const getStatusStyle = (statusValue: number) => {
    const statusObj = ORDER_STATUSES.find((s) => s.value === statusValue);
    const color = statusObj?.color || "gray";
    const styles: Record<string, string> = {
      yellow: "bg-yellow-50 text-yellow-600 border-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400",
      orange: "bg-orange-50 text-orange-600 border-orange-100 dark:bg-orange-900/20 dark:text-orange-400",
      blue: "bg-primary/5 text-primary border-primary/20 dark:bg-primary/10",
      purple: "bg-purple-50 text-purple-600 border-purple-100 dark:bg-purple-900/20 dark:text-purple-400",
      green: "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400",
      red: "bg-red-50 text-red-600 border-red-100 dark:bg-red-900/20 dark:text-red-400",
      gray: "bg-slate-50 text-slate-500 border-slate-100 dark:bg-slate-800/50 dark:text-slate-400",
    };
    return styles[color] || styles.gray;
  };

  const getPaymentStatusStyle = (paymentStatusVal: number) => {
    const statusObj = PAYMENT_STATUSES.find((s) => s.value === paymentStatusVal);
    const color = statusObj?.color || "gray";
    const styles: Record<string, string> = {
      yellow: "bg-yellow-50 text-yellow-600 border-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400",
      orange: "bg-orange-50 text-orange-600 border-orange-100 dark:bg-orange-900/20 dark:text-orange-400",
      green: "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400",
      red: "bg-red-50 text-red-600 border-red-100 dark:bg-red-900/20 dark:text-red-400",
      gray: "bg-slate-50 text-slate-500 border-slate-100 dark:bg-slate-800/50 dark:text-slate-400",
    };
    return styles[color] || styles.gray;
  };

  const getDotStyle = (statusValue: number) => {
    const statusObj = ORDER_STATUSES.find((s) => s.value === statusValue);
    const color = statusObj?.color || "gray";
    const styles: Record<string, string> = {
      yellow: "bg-yellow-500 shadow-sm shadow-yellow-500/50",
      orange: "bg-orange-500 shadow-sm shadow-orange-500/50",
      blue: "bg-blue-500 shadow-sm shadow-blue-500/50",
      purple: "bg-purple-500 shadow-sm shadow-purple-500/50",
      green: "bg-emerald-500 shadow-sm shadow-emerald-500/50",
      red: "bg-red-500 shadow-sm shadow-red-500/50",
      gray: "bg-slate-500 shadow-sm shadow-slate-500/50",
    };
    return styles[color] || styles.gray;
  };

  const formatCurrency = (amount: number) => {
    return formatVND(amount);
  };

  const formatDate = (dateStr: string) => {
    return formatDateVN(dateStr);
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-slate-900 w-full h-full overflow-hidden">
      {/* List Header with modern dashboard look */}
      <div className="flex flex-col gap-6 p-8 bg-white dark:bg-slate-900 shrink-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Quản Lý Đơn Hàng
            </h3>
            <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">
              Quản lý đơn hàng và trạng thái giao hàng
            </p>
          </div>
          <button
            onClick={onCreateOrder}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl font-black shadow-lg shadow-primary/30 hover:bg-blue-600 transition-all active:scale-95"
          >
            <span className="material-symbols-outlined font-bold">add</span>
            Thêm Đơn
          </button>
        </div>

        {/* Stats Grid - Premium look */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="p-4 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
               <span className="material-symbols-outlined">receipt_long</span>
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">{stats.total}</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Tổng Đơn</div>
            </div>
          </div>
          <div className="p-4 rounded-3xl bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/20 flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-orange-500/10 text-orange-600 flex items-center justify-center">
               <span className="material-symbols-outlined">pending_actions</span>
            </div>
            <div>
              <div className="text-2xl font-black text-orange-600">{stats.pending}</div>
              <div className="text-xs font-bold text-orange-500 uppercase tracking-widest">Chờ Xử Lý</div>
            </div>
          </div>
          <div className="p-4 rounded-3xl bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/20 flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
               <span className="material-symbols-outlined">check_circle</span>
            </div>
            <div>
              <div className="text-2xl font-black text-emerald-600">{stats.completed}</div>
              <div className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Hoàn Thành</div>
            </div>
          </div>
          <div className="p-4 rounded-3xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-red-500/10 text-red-600 flex items-center justify-center">
               <span className="material-symbols-outlined">cancel</span>
            </div>
            <div>
              <div className="text-2xl font-black text-red-600">{stats.cancelled}</div>
              <div className="text-xs font-bold text-red-500 uppercase tracking-widest">Đã Hủy</div>
            </div>
          </div>
          <div className="p-4 rounded-3xl bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-100 dark:border-yellow-900/20 flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-yellow-500/10 text-yellow-600 flex items-center justify-center">
               <span className="material-symbols-outlined">pending_actions</span>
            </div>
            <div>
              <div className="text-2xl font-black text-yellow-600">{stats.processing}</div>
              <div className="text-xs font-bold text-yellow-500 uppercase tracking-widest">Đang Xử Lý</div>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <div className="flex-1 relative w-full group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
              <span className="material-symbols-outlined" style={{ fontSize: "22px" }}>search</span>
            </div>
            <input
              className="w-full h-12 pl-12 pr-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all placeholder:text-slate-400 text-slate-900 dark:text-white"
              placeholder="Tìm theo mã đơn, tên khách, sđt..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          
          {/* Compact Filter Dropdown */}
          <FilterDropdown
            status={status}
            onStatusChange={onStatusChange}
            startDate={startDate}
            endDate={endDate}
            onDateChange={onDateChange}
          />
        </div>
      </div>

      {/* Modern Table Design */}
      <div className="flex-1 overflow-x-auto px-8 pb-8">
        <div className="min-w-[1000px] bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
              <p className="mt-4 text-slate-500 font-bold">Đang tải đơn hàng...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-slate-500">
              <div className="h-20 w-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-5xl">inbox</span>
              </div>
              <p className="font-bold text-lg text-slate-900 dark:text-white">Không tìm thấy đơn hàng</p>
              <p className="text-sm">Hãy thử bộ lọc hoặc từ khóa khác</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-800/50">
                  <th className="pl-8 pr-4 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Thông Tin Đơn</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Khách Hàng</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Tổng Tiền</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Trạng Thái</th>
                  <th className="pl-4 pr-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Hành Động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="group hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-all duration-200"
                  >
                    <td className="pl-8 pr-4 py-5">
                      <div className="text-sm font-black text-slate-900 dark:text-white mb-0.5">#{order.orderCode}</div>
                      <div className="text-[11px] font-bold text-slate-400 leading-none">{formatDate(order.createdAt)}</div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-primary font-black text-xs border border-slate-200 dark:border-slate-700">
                          {order.customerName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="text-sm font-black text-slate-800 dark:text-slate-200 leading-tight">{order.customerName}</div>
                          <div className="text-xs font-bold text-slate-500">{order.customerPhone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right font-black text-slate-900 dark:text-white">
                      {formatCurrency(order.finalAmount)}
                       <div className="text-[10px] font-bold text-slate-400">{order.itemCount} sản phẩm</div>
                    </td>
                    <td className="px-6 py-5">
                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-[11px] font-black uppercase border tracking-wider ${getStatusStyle(order.status)} animate-in fade-in duration-500`}>
                        <span className={`h-2 w-2 rounded-full ${getDotStyle(order.status)}`}></span>
                        {ORDER_STATUSES.find(s => s.value === order.status)?.label || order.statusText}
                      </div>
                    </td>
                    <td className="pl-4 pr-8 py-5">
                      <div className="flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <button
                          onClick={() => onViewOrder(order)}
                          className="h-10 w-10 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600 hover:bg-primary hover:text-white dark:bg-blue-900/20 transition-all active:scale-90"
                          title="Xem chi tiết"
                        >
                          <span className="material-symbols-outlined text-[20px] font-bold">visibility</span>
                        </button>
                        <button
                          disabled={!isAdmin}
                          title={!isAdmin ? "Bạn không có quyền" : "Sửa đơn"}
                          onClick={() => onEditOrder(order)}
                          className="h-10 w-10 flex items-center justify-center rounded-xl bg-amber-50 text-amber-600 hover:bg-amber-500 hover:text-white dark:bg-amber-900/20 transition-all active:scale-90 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-amber-50 disabled:hover:text-amber-600"
                        >
                          <span className="material-symbols-outlined text-[20px] font-bold">edit</span>
                        </button>
                        <button
                          disabled={!isAdmin}
                          title={!isAdmin ? "Bạn không có quyền" : "Xóa đơn"}
                          onClick={() => onDeleteOrder(order.id)}
                          className="h-10 w-10 flex items-center justify-center rounded-xl bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white dark:bg-rose-900/20 dark:text-rose-400 dark:hover:bg-rose-600 dark:hover:text-white transition-all active:scale-90 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-rose-50 disabled:hover:text-rose-500"
                        >
                          <span className="material-symbols-outlined text-[20px] font-bold">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {totalPages > 0 && (
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900 shrink-0">
          <button
            className="flex items-center justify-center gap-2 px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
          >
            <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
              arrow_back
            </span>
            <span>Trước</span>
          </button>
          
          <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Trang {page + 1} / {totalPages || 1}
          </span>

          <button
            className="flex items-center justify-center gap-2 px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={page >= totalPages - 1}
            onClick={() => setPage(page + 1)}
          >
            <span>Sau</span>
            <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
              arrow_forward
            </span>
          </button>
        </div>
      )}
    </div>
  );
}

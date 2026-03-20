import { useState, ChangeEvent, useEffect } from "react";

interface Props {
  settings: Record<string, string>;
  onSettingChange: (key: string, value: string) => void;
}

// Format number theo VN (không kèm ₫)
const formatNumber = (value: number) => {
  return value.toLocaleString("vi-VN");
};

export default function ShippingConfig({ settings, onSettingChange }: Props) {
  const [displayValue, setDisplayValue] = useState<string>("0");

  // Sync khi settings thay đổi từ parent
  useEffect(() => {
    const fee = parseInt(settings["shipping_fee"] || "0", 10);
    setDisplayValue(formatNumber(fee));
  }, [settings]);

  const handleShippingFeeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;

    // Chỉ giữ số
    const numericString = rawValue.replace(/\D/g, "");

    const numberValue = parseInt(numericString || "0", 10);

    // Update parent (giữ raw number)
    onSettingChange("shipping_fee", numberValue.toString());

    // Update UI
    setDisplayValue(formatNumber(numberValue));
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
      
      {/* Header */}
      <div className="p-6 border-b border-slate-200 dark:border-slate-700">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">
            local_shipping
          </span>
          Cấu hình Vận chuyển
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Thiết lập phí vận chuyển mặc định cho đơn hàng.
        </p>
      </div>

      {/* Content */}
      <div className="p-6">
        <label className="block max-w-md">
          <span className="text-sm font-medium text-slate-900 dark:text-white mb-2 block">
            Phí Vận Chuyển Mặc Định
          </span>

          <div className="relative">
            
            {/* Icon trái */}
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
              payments
            </span>

            {/* Input */}
            <input
              type="text"
              inputMode="numeric"
              placeholder="0"
              value={displayValue}
              onChange={handleShippingFeeChange}
              className="w-full h-11 pl-10 pr-10 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white font-bold placeholder-slate-400 transition-colors focus:outline-none"
            />

            {/* ₫ bên phải */}
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 font-bold">
              ₫
            </span>

          </div>
        </label>
      </div>
    </div>
  );
}
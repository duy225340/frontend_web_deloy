import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  settings: Record<string, string>;
  onSettingChange: (key: string, value: string) => void;
}

export default function StoreProfile({ settings, onSettingChange }: Props) {


  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="p-6 border-b border-slate-200 dark:border-slate-700">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          Thông tin Cửa hàng
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Cập nhật thông tin nhận diện thương hiệu và liên hệ của cửa hàng.
        </p>
      </div>
      
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Support Phone */}
          <label className="block">
            <span className="text-sm font-medium text-slate-900 dark:text-white mb-2 block">
              Số Điện Thoại Hỗ Trợ
            </span>
            <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
                    call
                </span>
                <input
                className="w-full h-11 pl-10 pr-4 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white placeholder-slate-400 transition-colors focus:outline-none"
                placeholder="VD: 1900 1234"
                type="tel"
                value={settings['support_phone'] || ""}
                onChange={(e) => onSettingChange("support_phone", e.target.value)}
                />
            </div>
          </label>

          {/* Customer Care Email */}
          <label className="block">
            <span className="text-sm font-medium text-slate-900 dark:text-white mb-2 block">
              Email Chăm Sóc Khách Hàng
            </span>
            <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
                    mail
                </span>
                <input
                className="w-full h-11 pl-10 pr-4 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white placeholder-slate-400 transition-colors focus:outline-none"
                placeholder="VD: support@store.com"
                type="email"
                value={settings['support_email'] || ""}
                onChange={(e) => onSettingChange("support_email", e.target.value)}
                />
            </div>
          </label>
        </div>

        {/* Office Address */}
        <label className="block">
            <span className="text-sm font-medium text-slate-900 dark:text-white mb-2 block">
              Địa Chỉ Văn Phòng
            </span>
            <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-3 text-slate-400 text-[20px]">
                    location_on
                </span>
                <textarea
                className="w-full h-24 pl-10 pr-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white placeholder-slate-400 transition-colors focus:outline-none resize-none"
                placeholder="Nhập địa chỉ văn phòng..."
                value={settings['office_address'] || ""}
                onChange={(e) => onSettingChange("office_address", e.target.value)}
                ></textarea>
            </div>
        </label>
      </div>
    </div>
  );
}

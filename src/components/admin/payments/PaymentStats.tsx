import { useOrders } from "@/hooks/useOrders";
import { formatVND } from "@/utils/format";

interface PaymentStatsProps {
  filters: any;
}

export default function PaymentStats({ filters }: PaymentStatsProps) {
  const { stats, loading } = useOrders(filters);

  const formatCurrency = (amount: number) => {
    return formatVND(amount);
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
      {/* Revenue */}
      <div className="col-span-2 lg:col-span-1 p-4 rounded-3xl bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/20 flex items-center gap-4">
        <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined">monetization_on</span>
        </div>
        <div>
          <div className="text-xl font-black text-emerald-600 line-clamp-1">{loading ? "..." : formatCurrency(stats.totalRevenue || 0)}</div>
          <div className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mt-0.5">Tổng Doanh Thu</div>
        </div>
      </div>
      {/* Cần Hoàn Tiền */}
      <div className="p-4 rounded-3xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 flex items-center gap-4">
        <div className="h-12 w-12 rounded-2xl bg-red-500/10 text-red-600 flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined">assignment_return</span>
        </div>
        <div>
          <div className="text-2xl font-black text-red-600">{loading ? "..." : stats.needingRefund}</div>
          <div className="text-[10px] font-bold text-red-500 uppercase tracking-widest mt-0.5">Cần Hoàn</div>
        </div>
      </div>

      {/* Đã Hoàn Tiền */}
      <div className="p-4 rounded-3xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20 flex items-center gap-4">
        <div className="h-12 w-12 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined">payments</span>
        </div>
        <div>
          <div className="text-2xl font-black text-blue-600">{loading ? "..." : stats.refundedPayment}</div>
          <div className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mt-0.5">Đã Hoàn</div>
        </div>
      </div>

      {/* Online Payment */}
      <div className="p-4 rounded-3xl bg-purple-50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-900/20 flex items-center gap-4">
        <div className="h-12 w-12 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined">language</span>
        </div>
        <div>
          <div className="text-2xl font-black text-purple-600">{loading ? "..." : stats.onlinePayment}</div>
          <div className="text-[10px] font-bold text-purple-500 uppercase tracking-widest mt-0.5">Trực Tuyến</div>
        </div>
      </div>

      {/* COD Payment */}
      <div className="p-4 rounded-3xl bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/20 flex items-center gap-4">
        <div className="h-12 w-12 rounded-2xl bg-orange-500/10 text-orange-600 flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined">local_shipping</span>
        </div>
        <div>
          <div className="text-2xl font-black text-orange-600">{loading ? "..." : stats.codPayment}</div>
          <div className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mt-0.5">Tiền Mặt</div>
        </div>
      </div>
    </div>
  );
}

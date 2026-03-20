import Link from "next/link";
import ProductForm from "@/components/admin/products/ProductForm";

export default function AddProductPage() {
  return (
    <div className="space-y-6">
     

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            Thêm sản phẩm
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Link
             href="/admin/products"
             className="inline-flex items-center justify-center rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-5 py-2.5 text-sm font-bold text-slate-700 dark:text-slate-200 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400">
            Cancel
          </Link>
        </div>
      </div>

      {/* Product Form */}
      <ProductForm />
    </div>
  );
}

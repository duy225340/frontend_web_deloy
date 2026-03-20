"use client";
import React, { useEffect, useState, useCallback } from "react";
import SingleOrder from "./SingleOrder";
import { OrderService, Order } from "@/services/order.service";
import { useAppSelector } from "@/redux/store";
import toast from "react-hot-toast";

import ConfirmModal from "../ui/ConfirmModal";

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = useAppSelector((state) => state.authReducer.token);
  const [cancelOrderId, setCancelOrderId] = useState<number | null>(null);
  const [showRefundNotice, setShowRefundNotice] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 5;

  const fetchOrders = useCallback(async () => {
    if (!token) return;
    try {
      setIsLoading(true);
      const data = await OrderService.getMyOrders(token);
      setOrders(data);
    } catch (error: any) {
      console.error(error);
      if (error.message && (error.message.includes("403") || error.message.includes("401"))) {
          toast.error("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại");
      }
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleCancelClick = (orderId: number) => {
    setCancelOrderId(orderId);
  };

  // Tìm đơn hàng đang cancel để kiểm tra paymentMethod
  const cancellingOrder = orders.find(o => o.id === cancelOrderId);
  const isBankingOrder = cancellingOrder?.paymentMethod === "Banking" || cancellingOrder?.paymentMethod === "1";

  const handleConfirmCancel = async () => {
    if (!token || !cancelOrderId) return;
    try {
      await OrderService.cancelOrder(cancelOrderId, token);
      
      if (isBankingOrder) {
        // Đơn thanh toán online → hiện thông báo hoàn tiền thủ công
        setShowRefundNotice(true);
      } else {
        toast.success("Hủy đơn hàng thành công");
      }
      
      fetchOrders(); // Refresh list
    } catch (error: any) {
      toast.error(error.message || "Hủy đơn hàng thất bại");
    } finally {
      setCancelOrderId(null);
    }
  };

  if (isLoading) {
    return <p className="py-8 text-center">Đang tải đơn hàng...</p>;
  }

  const totalPages = Math.ceil(orders.length / pageSize);
  const paginatedOrders = orders.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

  return (
    <>
      <div className="w-full overflow-x-auto">
        <div className="min-w-full">
          {/* <!-- order item --> */}
          {orders.length > 0 && (
            <div className="items-center justify-between py-4.5 px-7.5 hidden md:flex border-b border-gray-3 mb-5">
              <div className="flex-[3] min-w-[120px]">
                <p className="text-custom-sm text-dark font-medium">Mã Đơn</p>
              </div>
              <div className="flex-[1.5] min-w-[140px]">
                <p className="text-custom-sm text-dark font-medium">Ngày đặt</p>
              </div>

              <div className="flex-1 min-w-[110px]">
                <p className="text-custom-sm text-dark font-medium">Trạng thái</p>
              </div>

              <div className="flex-1 min-w-[110px]">
                <p className="text-custom-sm text-dark font-medium">Thanh toán</p>
              </div>

              <div className="flex-[2] min-w-[180px]">
                <p className="text-custom-sm text-dark font-medium">Sản phẩm</p>
              </div>

              <div className="flex-1 min-w-[100px]">
                <p className="text-custom-sm text-dark font-medium">Tổng tiền</p>
              </div>

              <div className="flex-1 min-w-[120px]">
                <p className="text-custom-sm text-dark font-medium">Thao tác</p>
              </div>
            </div>
          )}
          {paginatedOrders.length > 0 ? (
            paginatedOrders.map((orderItem, key) => (
              <SingleOrder 
                key={key} 
                orderItem={orderItem} 
                smallView={false} 
                onCancel={() => handleCancelClick(orderItem.id)}
              />
            ))
          ) : (
            <p className="py-9.5 px-4 sm:px-7.5 xl:px-10 text-center text-dark">
              Bạn chưa có đơn hàng nào!
            </p>
          )}
        </div>

        {paginatedOrders.length > 0 &&
          paginatedOrders.map((orderItem, key) => (
            <SingleOrder 
              key={key} 
              orderItem={orderItem} 
              smallView={true} 
              onCancel={() => handleCancelClick(orderItem.id)}
            />
          ))}
      </div>

      {/* Pagination component */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 mb-6">
          <div className="bg-gray-1 shadow-1 rounded-md p-2">
            <ul className="flex items-center gap-1">
              <li>
                <button
                  type="button"
                  disabled={currentPage === 0}
                  onClick={() => {
                    setCurrentPage(currentPage - 1);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex items-center justify-center w-8 h-9 ease-out duration-200 rounded-[3px] hover:text-white hover:bg-blue disabled:text-gray-4"
                >
                  <svg
                    className="fill-current"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.1782 16.1156C12.0095 16.1156 11.8407 16.0594 11.7282 15.9187L5.37197 9.45C5.11885 9.19687 5.11885 8.80312 5.37197 8.55L11.7282 2.08125C11.9813 1.82812 12.3751 1.82812 12.6282 2.08125C12.8813 2.33437 12.8813 2.72812 12.6282 2.98125L6.72197 9L12.6563 15.0187C12.9095 15.2719 12.9095 15.6656 12.6563 15.9187C12.4876 16.0312 12.347 16.1156 12.1782 16.1156Z"
                      fill=""
                    />
                  </svg>
                </button>
              </li>
              
              {Array.from({ length: totalPages }, (_, i) => (
                <li key={i}>
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentPage(i);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`flex py-1.5 px-3.5 duration-200 rounded-[3px] ${
                      currentPage === i
                        ? "bg-blue text-white"
                        : "hover:text-white hover:bg-blue text-dark"
                    }`}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}

              <li>
                <button
                  type="button"
                  disabled={currentPage >= totalPages - 1}
                  onClick={() => {
                    setCurrentPage(currentPage + 1);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex items-center justify-center w-8 h-9 ease-out duration-200 rounded-[3px] hover:text-white hover:bg-blue disabled:text-gray-4"
                >
                  <svg
                    className="fill-current"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.82197 16.1156C5.65322 16.1156 5.5126 16.0594 5.37197 15.9469C5.11885 15.6937 5.11885 15.3 5.37197 15.0469L11.2782 9L5.37197 2.98125C5.11885 2.72812 5.11885 2.33437 5.37197 2.08125C5.6251 1.82812 6.01885 1.82812 6.27197 2.08125L12.6282 8.55C12.8813 8.80312 12.8813 9.19687 12.6282 9.45L6.27197 15.9187C6.15947 16.0312 5.99072 16.1156 5.82197 16.1156Z"
                      fill=""
                    />
                  </svg>
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={!!cancelOrderId}
        title="Hủy Đơn Hàng"
        message={
          isBankingOrder
            ? "Bạn có chắc chắn muốn hủy đơn hàng này không? Đơn hàng đã thanh toán online sẽ được hoàn tiền trong 1-2 ngày làm việc."
            : "Bạn có chắc chắn muốn hủy đơn hàng này không? Hành động này không thể hoàn tác."
        }
        onConfirm={handleConfirmCancel}
        onCancel={() => setCancelOrderId(null)}
        confirmText="Xác nhận hủy"
        type="danger"
      />

      {/* Thông báo hoàn tiền sau khi cancel đơn Banking thành công */}
      <ConfirmModal
        isOpen={showRefundNotice}
        title="Hủy Đơn Thành Công"
        message="Đơn hàng đã được hủy thành công. Số tiền đã thanh toán sẽ được hoàn trả trong 1-2 ngày làm việc. Vui lòng kiểm tra tài khoản ngân hàng của bạn."
        onConfirm={() => setShowRefundNotice(false)}
        onCancel={() => setShowRefundNotice(false)}
        confirmText="Đã hiểu"
        type="info"
      />
    </>
  );
};

export default Orders;

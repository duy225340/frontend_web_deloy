import React, { useState } from "react";
import OrderActions from "./OrderActions";
import OrderModal from "./OrderModal";
import { formatVND, formatDateVN } from "@/utils/format";

const SingleOrder = ({ orderItem, smallView, onCancel }: any) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const toggleEdit = () => {
    setShowEdit(!showEdit);
  };

  const toggleModal = (status: boolean) => {
    setShowDetails(status);
    setShowEdit(status);
  };

  const isCancellable = ["PENDING", "PROCESSING", "pending", "processing", "Pending", "Processing"].includes(
    orderItem.status
  );


  const getStatusText = (status: string) => {
    switch (status?.toUpperCase()) {
      case "PENDING": return "Chờ xử lý";
      case "PROCESSING": return "Đang xử lý";
      case "SHIPPING": return "Đang giao hàng";
      case "DELIVERED": return "Đã giao hàng";
      case "COMPLETED": return "Hoàn thành";
      case "CANCELLED": return "Đã hủy";
      default: return status;
    }
  };

  const getPaymentBadgeStyle = (ps?: number) => {
    switch (ps) {
      case 0: return "text-yellow-700 bg-yellow-100";
      case 1: return "text-green-700 bg-green-100";
      case 2: return "text-red-700 bg-red-100";
      case 3: return "text-gray-700 bg-gray-200";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <>
      {!smallView && (
        <div className="items-center justify-between border-t border-gray-3 py-5 px-7.5 hidden md:flex">
          <div className="flex-[3] min-w-[120px]">
            <p className="text-custom-sm text-red">
              {orderItem.orderId}
            </p>
          </div>
          <div className="flex-[1.5] min-w-[140px]">
            <p className="text-custom-sm text-dark">{formatDateVN(orderItem.createdAt)}</p>
          </div>

          <div className="flex-1 min-w-[110px]">
            <p
              className={`inline-block text-2xs md:text-custom-sm py-0.5 px-2.5 rounded-[30px] capitalize ${
                orderItem.status === "delivered" || orderItem.status === "DELIVERED" || orderItem.status === "Completed"
                  ? "text-green bg-green-light-6"
                  : orderItem.status === "cancelled" || orderItem.status === "CANCELLED" || orderItem.status === "Cancelled"
                  ? "text-red bg-red-light-6"
                   : orderItem.status === "processing" || orderItem.status === "PROCESSING" || orderItem.status === "Processing"
                  ? "text-yellow bg-yellow-light-4"
                  : "text-blue bg-blue-light-5"
              }`}
            >
              {getStatusText(orderItem.status)}
            </p>
          </div>

          <div className="flex-1 min-w-[110px]">
            <p className={`inline-block text-2xs md:text-custom-sm py-0.5 px-2.5 rounded-[30px] ${getPaymentBadgeStyle(orderItem.paymentStatus)}`}>
              {orderItem.paymentStatusText || ""}
            </p>
          </div>

          <div className="flex-[2] min-w-[180px]">
            <p className="text-custom-sm text-dark truncate max-w-[170px]" title={orderItem.items?.[0]?.productName}>
              {orderItem.items?.[0]?.productName} {orderItem.items?.length > 1 ? `+${orderItem.items.length - 1}` : ''}
            </p>
          </div>

          <div className="flex-1 min-w-[100px]">
            <p className="text-custom-sm text-dark">{formatVND(orderItem.total)}</p>
          </div>

          <div className="flex-1 min-w-[120px] flex gap-2 items-center">
            <OrderActions
              toggleDetails={toggleDetails}
              toggleEdit={toggleEdit}
            />
            {isCancellable && (
              <button
                onClick={onCancel}
                className="text-[10px] text-red-500 hover:text-red-700 border border-red-500 rounded px-1.5 py-0.5 transition-colors"
                title="Hủy đơn"
              >
                Hủy
              </button>
            )}
          </div>
        </div>
      )}

      {smallView && (
        <div className="block md:hidden border-b border-gray-2 py-4">
          <div className="px-4">
            <div className="flex justify-between mb-2">
              <p className="text-custom-sm text-dark font-bold">
                {orderItem.orderId}
              </p>
               <span
                  className={`text-xs py-0.5 px-2.5 rounded-[30px] capitalize ${
                    orderItem.status === "delivered" || orderItem.status === "DELIVERED" || orderItem.status === "Completed"
                  ? "text-green bg-green-light-6"
                  : orderItem.status === "cancelled" || orderItem.status === "CANCELLED" || orderItem.status === "Cancelled"
                  ? "text-red bg-red-light-6"
                   : orderItem.status === "processing" || orderItem.status === "PROCESSING" || orderItem.status === "Processing"
                  ? "text-yellow bg-yellow-light-4"
                  : "text-blue bg-blue-light-5"
                  }`}
                >
                  {getStatusText(orderItem.status)}
                </span>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mb-2 text-sm">
              <p className="text-gray-500">Ngày:</p>
              <p className="text-dark text-right">{formatDateVN(orderItem.createdAt)}</p>
              
              <p className="text-gray-500">Tổng tiền:</p>
              <p className="text-dark text-right font-medium">{formatVND(orderItem.total)}</p>

              <p className="text-gray-500">Thanh toán:</p>
              <p className="text-right">
                <span className={`inline-block text-xs py-0.5 px-2 rounded-full ${getPaymentBadgeStyle(orderItem.paymentStatus)}`}>
                  {orderItem.paymentStatusText || ""}
                </span>
              </p>
            </div>

            <div className="flex justify-end gap-3 mt-3">
               <OrderActions
                  toggleDetails={toggleDetails}
                  toggleEdit={toggleEdit}
                />
               {isCancellable && (
                <button
                  onClick={onCancel}
                  className="text-xs text-red-500 hover:text-red-700 border border-red-500 rounded px-3 py-1.5 transition-colors"
                >
                  Hủy Đơn Hàng
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <OrderModal
        showDetails={showDetails}
        showEdit={showEdit}
        toggleModal={toggleModal}
        order={orderItem}
        onCancel={onCancel}
      />
    </>
  );
};

export default SingleOrder;

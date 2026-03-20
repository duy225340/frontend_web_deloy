import React, { useEffect, useState } from "react";
import ConfirmModal from "../ui/ConfirmModal";
import { UserProfile, UserService } from "@/services/user.service";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { updateUser } from "@/redux/features/auth-slice";
import toast from "react-hot-toast";

interface AddressModalProps {
  isOpen: boolean;
  closeModal: () => void;
  currentUser?: any; 
}

const AddressModal = ({ isOpen, closeModal, currentUser }: AddressModalProps) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.authReducer.token);
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (isOpen && currentUser) {
      setFormData({
        fullName: currentUser.fullName || "",
        email: currentUser.email || "",
        phoneNumber: currentUser.phoneNumber || "",
        address: currentUser.address || "",
      });
    }
  }, [isOpen, currentUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (!event.target.closest(".modal-content") && isOpen && !showConfirm) {
        closeModal();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, closeModal, showConfirm]);

  const handlePreSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
        toast.error("Bạn cần đăng nhập để cập nhật thông tin");
        return;
    }
    setShowConfirm(true);
  };

  const handleConfirmUpdate = async () => {
    setShowConfirm(false);
    if (!token) return;

    try {
      setIsLoading(true);
      
      const apiPayload: any = {
          fullName: formData.fullName,
          phoneNumber: formData.phoneNumber,
          address: formData.address
      };

      const updatedProfile = await UserService.updateProfile(apiPayload, token);

      dispatch(updateUser({
          ...updatedProfile,
          address: formData.address 
      }));

      toast.success("Cập nhật thông tin thành công");
      closeModal();
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Cập nhật thông tin thất bại");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-dark/70 px-4 py-5 overflow-y-auto">
      <div className="w-full max-w-[800px] rounded-xl shadow-3 bg-white p-7.5 relative modal-content">
        <button
          onClick={closeModal}
          aria-label="close modal"
          className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <svg
            className="w-4 h-4 fill-current text-gray-600"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <h3 className="text-xl font-medium text-dark mb-6">Cập nhật thông tin cá nhân</h3>

        <form onSubmit={handlePreSubmit}>
          {/* Personal Info Section */}
          <div className="mb-6">
            <h4 className="text-lg font-medium text-dark mb-4 border-b pb-2">Thông tin cá nhân</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="w-full">
                <label htmlFor="fullName" className="block mb-2.5 text-sm font-medium text-dark">
                    Họ và tên
                </label>
                <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Nhập họ và tên của bạn"
                    className="w-full rounded-md border border-gray-300 bg-gray-50 py-2.5 px-5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    required
                />
                </div>

                <div className="w-full">
                <label htmlFor="email" className="block mb-2.5 text-sm font-medium text-dark">
                    Địa chỉ Email
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    // Email often read-only or needs separate flow
                    disabled
                    className="w-full rounded-md border border-gray-300 bg-gray-200 py-2.5 px-5 outline-none text-gray-500 cursor-not-allowed"
                />
                </div>

                <div className="w-full">
                <label htmlFor="phoneNumber" className="block mb-2.5 text-sm font-medium text-dark">
                    Số điện thoại
                </label>
                <input
                    type="tel"
                    name="phoneNumber"
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Nhập số điện thoại"
                    className="w-full rounded-md border border-gray-300 bg-gray-50 py-2.5 px-5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
                </div>
            </div>
          </div>

          {/* Address Section */}
          <div className="mb-6">
            <h4 className="text-lg font-medium text-dark mb-4 border-b pb-2">Thông tin địa chỉ</h4>
            <div className="w-full">
                <label htmlFor="address" className="block mb-2.5 text-sm font-medium text-dark">
                    Địa chỉ
                </label>
                <textarea
                    name="address"
                    id="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Ví dụ: Số 123 Đường Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh"
                    rows={3}
                    className="w-full rounded-md border border-gray-300 bg-gray-50 py-2.5 px-5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none"
                />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="button"
              onClick={closeModal}
              className="mr-3 rounded-md px-6 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="rounded-md bg-blue-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 transition-colors"
            >
              {isLoading ? "Đang lưu..." : "Lưu thay đổi"}
            </button>
          </div>
        </form>
      </div>
      
      <ConfirmModal
        isOpen={showConfirm}
        onCancel={() => setShowConfirm(false)}
        onConfirm={handleConfirmUpdate}
        title="Xác nhận cập nhật thông tin"
        message="Bạn có chắc chắn muốn cập nhật thông tin cá nhân không? Thông tin này sẽ được lưu vào hệ thống."
        confirmText="Đồng ý cập nhật"
        cancelText="Xem lại"
        type="info"
      />
    </div>
  );
};

export default AddressModal;

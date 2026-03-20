"use client";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const ForgotPassword = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const router = useRouter();

  // Step 1: Request OTP via email
  const onSendEmail = async (data: any) => {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email }),
      });

      if (response.ok) {
        setEmail(data.email);
        setStep(2);
        toast.success("Nếu tài khoản tồn tại, mã OTP đã được gửi đến email của bạn.");
      } else {
        const err = await response.json();
        toast.error(err.message || "Có lỗi xảy ra, vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Forgot Password error:", error);
      toast.error("Không thể kết nối máy chủ");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const onVerifyOtp = async (data: any) => {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, otp: data.otp }),
      });

      if (response.ok) {
        setOtp(data.otp);
        setStep(3);
        toast.success("Xác thực OTP thành công. Vui lòng tạo mật khẩu mới.");
      } else {
        const err = await response.json();
        toast.error(err.message || "Mã OTP không hợp lệ.");
      }
    } catch (error) {
      console.error("Verify OTP error:", error);
      toast.error("Không thể kết nối máy chủ");
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Reset Password
  const onResetPassword = async (data: any) => {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          resetToken: otp,
          newPassword: data.newPassword,
          confirmPassword: data.confirmPassword
        }),
      });

      if (response.ok) {
        toast.success("Đổi mật khẩu thành công. Hệ thống sẽ chuyển về trang đăng nhập...");
        setTimeout(() => {
          router.push("/signin");
        }, 2000);
      } else {
        const err = await response.json();
        toast.error(err.message || "Đổi mật khẩu thất bại.");
      }
    } catch (error) {
      console.error("Reset Password error:", error);
      toast.error("Không thể kết nối máy chủ");
    } finally {
      setLoading(false);
    }
  };

  // Handle Form Validation Errors
  const onFormError = (errors: any) => {
    if (errors.email) toast.error(errors.email.message as string);
    else if (errors.otp) toast.error(errors.otp.message as string);
    else if (errors.newPassword) toast.error(errors.newPassword.message as string);
    else if (errors.confirmPassword) toast.error(errors.confirmPassword.message as string);
    else toast.error("Vui lòng kiểm tra lại thông tin đã nhập");
  };

  return (
    <>
      <Breadcrumb title={"Quên Mật Khẩu"} pages={["Quên Mật Khẩu"]} />
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="max-w-[570px] w-full mx-auto rounded-xl bg-white shadow-1 p-4 sm:p-7.5 xl:p-11">
            <div className="text-center mb-11">
              <h2 className="font-semibold text-xl sm:text-2xl xl:text-heading-5 text-dark mb-1.5">
                Quên Mật Khẩu
              </h2>
              <p className="text-dark-5">
                {step === 1 && "Nhập email của bạn để lấy lại mật khẩu"}
                {step === 2 && "Nhập mã xác nhận (OTP) được gửi đến email"}
                {step === 3 && "Nhập mật khẩu mới an toàn"}
              </p>
            </div>

            <div>
              <form onSubmit={
                step === 1 ? handleSubmit(onSendEmail, onFormError) :
                step === 2 ? handleSubmit(onVerifyOtp, onFormError) :
                handleSubmit(onResetPassword, onFormError)
              }>
                {step === 1 && (
                  <div className="mb-5">
                    <label htmlFor="email" className="block mb-2.5">
                      Email <span className="text-red">*</span>
                    </label>

                    <input
                      type="email"
                      id="email"
                      placeholder="Nhập email của bạn"
                      {...register("email", { 
                        required: "Email là bắt buộc",
                        pattern: {
                          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                          message: "Email không hợp lệ"
                        }
                      })}
                      className={`rounded-lg border bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20 ${errors.email ? 'border-red-500' : 'border-gray-3'}`}
                    />
                    {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email.message as string}</span>}
                  </div>
                )}

                {step === 2 && (
                  <div className="mb-5">
                    <label htmlFor="otp" className="block mb-2.5">
                      Mã OTP <span className="text-red">*</span>
                    </label>

                    <input
                      type="text"
                      id="otp"
                      maxLength={6}
                      placeholder="Nhập 6 số OTP từ Email"
                      {...register("otp", { 
                        required: "Mã OTP là bắt buộc",
                        minLength: { value: 6, message: "Mã OTP gồm 6 số" }
                      })}
                      className={`rounded-lg border bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 tracking-widest text-center text-lg outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20 ${errors.otp ? 'border-red-500' : 'border-gray-3'}`}
                    />
                    {errors.otp && <span className="text-red-500 text-sm mt-1">{errors.otp.message as string}</span>}
                  </div>
                )}

                {step === 3 && (
                  <>
                    <div className="mb-5">
                      <label htmlFor="newPassword" className="block mb-2.5">
                        Mật khẩu mới <span className="text-red">*</span>
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        placeholder="Nhập mật khẩu mới"
                        {...register("newPassword", { 
                          required: "Mật khẩu mới không được để trống",
                          minLength: { value: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" }
                        })}
                        className={`rounded-lg border bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20 ${errors.newPassword ? 'border-red-500' : 'border-gray-3'}`}
                      />
                      {errors.newPassword && <span className="text-red-500 text-sm mt-1">{errors.newPassword.message as string}</span>}
                    </div>

                    <div className="mb-5">
                      <label htmlFor="confirmPassword" className="block mb-2.5">
                        Xác nhận mật khẩu <span className="text-red">*</span>
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        placeholder="Nhập lại mật khẩu mới"
                        {...register("confirmPassword", { 
                          required: "Vui lòng xác nhận mật khẩu",
                          validate: (val) => {
                            if (watch('newPassword') != val) {
                              return "Mật khẩu xác nhận không khớp";
                            }
                          }
                        })}
                        className={`rounded-lg border bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-3'}`}
                      />
                      {errors.confirmPassword && <span className="text-red-500 text-sm mt-1">{errors.confirmPassword.message as string}</span>}
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center font-medium text-white bg-dark py-3 px-6 rounded-lg ease-out duration-200 hover:bg-blue mt-7.5 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {loading ? "Đang xử lý..." : 
                    step === 1 ? "Gửi OTP" : 
                    step === 2 ? "Xác thực OTP" : 
                    "Đổi Mật Khẩu"
                  }
                </button>

                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep((step - 1) as 1 | 2 | 3)}
                    disabled={loading}
                    className="w-full flex justify-center font-medium text-dark bg-gray-1 py-3 px-6 rounded-lg ease-out duration-200 hover:bg-gray-3 mt-3 disabled:text-gray-400"
                  >
                    Quay lại
                  </button>
                )}

                <p className="text-center mt-6">
                  Bạn đã nhớ mật khẩu?
                  <Link
                    href="/signin"
                    className="text-dark ease-out duration-200 hover:text-blue pl-2 hover:underline"
                  >
                    Đăng nhập ngay
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForgotPassword;

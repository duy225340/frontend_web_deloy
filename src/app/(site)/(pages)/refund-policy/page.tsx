import { siteMetadata } from "@/config/metadata";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chính Sách Hoàn Tiền | PimjoLabs",
  description: siteMetadata.defaultDescription,
};

const RefundPolicyPage = () => {
  return (
    <main>
      <Breadcrumb title={"Chính Sách Hoàn Tiền"} pages={["Chính Sách Hoàn Tiền"]} />
      
      <section className="py-20 bg-gray-2">
        <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
          <div className="bg-white rounded-xl shadow-1 p-8 sm:p-12">
            <h2 className="text-2xl font-bold text-dark mb-6">1. Điều kiện đổi trả</h2>
            <p className="text-body-color mb-6">
              Sản phẩm có thể được đổi trả trong vòng 7 ngày kể từ ngày nhận hàng nếu đáp ứng các điều kiện sau:
            </p>
            <ul className="list-disc list-inside text-body-color mb-6 space-y-2">
              <li>Sản phẩm còn nguyên tem mác, bao bì và chưa qua sử dụng.</li>
              <li>Sản phẩm bị lỗi do nhà sản xuất hoặc hư hỏng trong quá trình vận chuyển.</li>
              <li>Sản phẩm giao không đúng mẫu mã, kích thước hoặc số lượng như đơn hàng đã đặt.</li>
            </ul>

            <h2 className="text-2xl font-bold text-dark mb-6">2. Quy trình hoàn tiền</h2>
            <p className="text-body-color mb-6">
              Sau khi chúng tôi nhận được sản phẩm đổi trả và kiểm tra điều kiện, quy trình hoàn tiền sẽ được thực hiện như sau:
            </p>
            <ul className="list-disc list-inside text-body-color mb-6 space-y-2">
              <li>Thời gian kiểm tra sản phẩm: 1-2 ngày làm việc.</li>
              <li>Phương thức hoàn tiền: Hoàn tiền qua tài khoản ngân hàng hoặc ví điện tử mà bạn đã sử dụng để thanh toán.</li>
              <li>Thời gian nhận được tiền: Từ 3-5 ngày làm việc tùy thuộc vào ngân hàng của bạn.</li>
            </ul>

            <h2 className="text-2xl font-bold text-dark mb-6">3. Chi phí vận chuyển đổi trả</h2>
            <p className="text-body-color mb-6">
              - Nếu lỗi thuộc về nhà sản xuất hoặc shop gửi sai hàng: Chúng tôi sẽ chịu toàn bộ chi phí vận chuyển.
            </p>
            <p className="text-body-color mb-6">
              - Nếu khách hàng muốn đổi sản phẩm do nhu cầu cá nhân: Khách hàng vui lòng thanh toán chi phí vận chuyển 2 chiều.
            </p>

            <h2 className="text-2xl font-bold text-dark mb-6">4. Các trường hợp không được đổi trả</h2>
            <p className="text-body-color mb-6">
              - Sản phẩm đã qua sử dụng, mất tem mác hoặc hư hỏng do lỗi của người dùng.
            </p>
            <p className="text-body-color mb-6">
              - Các sản phẩm nằm trong chương trình xả kho hoặc khuyến mãi đặc biệt không áp dụng đổi trả.
            </p>

            <h2 className="text-2xl font-bold text-dark mb-6">5. Thông tin liên hệ hỗ trợ</h2>
            <p className="text-body-color mb-6">
              Nếu bạn có bất kỳ câu hỏi nào về chính sách hoàn tiền, vui lòng liên hệ với chúng tôi qua số hotline hoặc email hỗ trợ được hiển thị ở phần Footer của website.
            </p>

            <div className="mt-10 pt-10 border-t border-gray-3">
              <p className="text-sm text-gray-500 italic">
                Cập nhật lần cuối: 12 tháng 03, 2026
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default RefundPolicyPage;

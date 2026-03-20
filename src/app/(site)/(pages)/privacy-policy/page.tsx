import { siteMetadata } from "@/config/metadata";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chính Sách Bảo Mật | PimjoLabs",
  description: siteMetadata.defaultDescription,
};

const PrivacyPolicyPage = () => {
  return (
    <main>
      <Breadcrumb title={"Chính Sách Bảo Mật"} pages={["Chính Sách Bảo Mật"]} />
      
      <section className="py-20 bg-gray-2">
        <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
          <div className="bg-white rounded-xl shadow-1 p-8 sm:p-12">
            <h2 className="text-2xl font-bold text-dark mb-6">1. Thu thập thông tin cá nhân</h2>
            <p className="text-body-color mb-6">
              Chúng tôi thu thập thông tin cá nhân của bạn khi bạn đăng ký tài khoản, đặt hàng hoặc liên hệ với chúng tôi. Các thông tin bao gồm: họ tên, địa chỉ email, số điện thoại, địa chỉ giao hàng và thông tin thanh toán.
            </p>

            <h2 className="text-2xl font-bold text-dark mb-6">2. Mục đích sử dụng thông tin</h2>
            <p className="text-body-color mb-6">
              Thông tin của bạn được sử dụng để:
            </p>
            <ul className="list-disc list-inside text-body-color mb-6 space-y-2">
              <li>Xử lý đơn hàng và giao hàng cho bạn.</li>
              <li>Cung cấp dịch vụ hỗ trợ khách hàng.</li>
              <li>Gửi thông tin khuyến mãi và cập nhật mới nhất (nếu bạn đồng ý).</li>
              <li>Nâng cao chất lượng dịch vụ và trải nghiệm người dùng trên website.</li>
            </ul>

            <h2 className="text-2xl font-bold text-dark mb-6">3. Bảo mật thông tin</h2>
            <p className="text-body-color mb-6">
              Chúng tôi cam kết bảo mật thông tin cá nhân của bạn bằng các biện pháp kỹ thuật và tổ chức phù hợp. Dữ liệu của bạn được lưu trữ trên máy chủ an toàn và chỉ những nhân viên có thẩm quyền mới có quyền truy cập.
            </p>

            <h2 className="text-2xl font-bold text-dark mb-6">4. Chia sẻ thông tin với bên thứ ba</h2>
            <p className="text-body-color mb-6">
              Chúng tôi không bán, trao đổi hoặc cho thuê thông tin cá nhân của bạn cho bên thứ ba. Chúng tôi chỉ chia sẻ thông tin với các đối tác vận chuyển và thanh toán để hoàn tất quy trình giao dịch của bạn.
            </p>

            <h2 className="text-2xl font-bold text-dark mb-6">5. Quyền của người dùng</h2>
            <p className="text-body-color mb-6">
              Bạn có quyền yêu cầu truy cập, chỉnh sửa hoặc xóa thông tin cá nhân của mình bất kỳ lúc nào. Vui lòng liên hệ với chúng tôi qua email hỗ trợ để thực hiện các yêu cầu này.
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

export default PrivacyPolicyPage;

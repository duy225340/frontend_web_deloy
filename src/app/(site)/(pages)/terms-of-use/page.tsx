import { siteMetadata } from "@/config/metadata";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Điều Khoản Sử Dụng | PimjoLabs",
  description: siteMetadata.defaultDescription,
};

const TermsOfUsePage = () => {
  return (
    <main>
      <Breadcrumb title={"Điều Khoản Sử Dụng"} pages={["Điều Khoản Sử Dụng"]} />
      
      <section className="py-20 bg-gray-2">
        <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
          <div className="bg-white rounded-xl shadow-1 p-8 sm:p-12">
            <h2 className="text-2xl font-bold text-dark mb-6">1. Chấp nhận điều khoản</h2>
            <p className="text-body-color mb-6">
              Bằng việc truy cập và sử dụng website này, bạn đồng ý tuân thủ và bị ràng buộc bởi các điều khoản và điều kiện sử dụng sau đây. Nếu bạn không đồng ý với bất kỳ phần nào của các điều khoản này, vui lòng không sử dụng website của chúng tôi.
            </p>

            <h2 className="text-2xl font-bold text-dark mb-6">2. Bản quyền và quyền sở hữu trí tuệ</h2>
            <p className="text-body-color mb-6">
              Toàn bộ nội dung trên website này, bao gồm nhưng không giới hạn ở văn bản, hình ảnh, logo, đồ họa và mã nguồn, đều thuộc sở hữu của PimjoLabs hoặc các bên cấp phép cho chúng tôi. Bạn không được sao chép, tái bản hoặc phân phối bất kỳ phần nào của website mà không có sự đồng ý bằng văn bản của chúng tôi.
            </p>

            <h2 className="text-2xl font-bold text-dark mb-6">3. Trách nhiệm của người dùng</h2>
            <p className="text-body-color mb-6">
              Khi sử dụng website, bạn cam kết:
            </p>
            <ul className="list-disc list-inside text-body-color mb-6 space-y-2">
              <li>Cung cấp thông tin chính xác và đầy đủ khi đăng ký tài khoản.</li>
              <li>Chịu trách nhiệm bảo mật thông tin đăng nhập cá nhân.</li>
              <li>Không sử dụng website cho bất kỳ mục đích bất hợp pháp hoặc vi phạm bản quyền.</li>
              <li>Không can thiệp vào hoạt động bình thường của hệ thống website.</li>
            </ul>

            <h2 className="text-2xl font-bold text-dark mb-6">4. Giới hạn trách nhiệm</h2>
            <p className="text-body-color mb-6">
              Chúng tôi luôn nỗ lực để cung cấp thông tin chính xác nhất. Tuy nhiên, PimjoLabs không chịu trách nhiệm đối với bất kỳ thiệt hại trực tiếp, gián tiếp hoặc ngẫu nhiên nào phát sinh từ việc bạn sử dụng hoặc không thể sử dụng website này.
            </p>

            <h2 className="text-2xl font-bold text-dark mb-6">5. Thay đổi điều khoản</h2>
            <p className="text-body-color mb-6">
              Chúng tôi có quyền sửa đổi hoặc cập nhật các điều khoản này bất kỳ lúc nào mà không cần thông báo trước. Các thay đổi sẽ có hiệu lực ngay khi được đăng tải trên website. Việc bạn tiếp tục sử dụng website đồng nghĩa với việc bạn chấp nhận các thay đổi đó.
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

export default TermsOfUsePage;

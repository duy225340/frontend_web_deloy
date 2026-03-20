import { siteMetadata } from "@/config/metadata";

import ForgotPassword from "@/components/Auth/ForgotPassword";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password | NextCommerce Next.js E-commerce Template",
  description: siteMetadata.defaultDescription,
  // other metadata
};

const ForgotPasswordPage = () => {
  return (
    <>
      <ForgotPassword />
    </>
  );
};

export default ForgotPasswordPage;

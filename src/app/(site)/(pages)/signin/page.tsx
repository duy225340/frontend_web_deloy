import Signin from "@/components/Auth/Signin";
import React, { Suspense } from "react";
import { Metadata } from "next";
import { siteMetadata } from "@/config/metadata";
export const metadata: Metadata = {
  title: "Signin Page" + siteMetadata.titleSuffix,
  description: siteMetadata.defaultDescription,
  // other metadata
};

const SigninPage = () => {
  return (
    <main>
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Đang tải biểu mẫu...</div>}>
         <Signin />
      </Suspense>
    </main>
  );
};

export default SigninPage;

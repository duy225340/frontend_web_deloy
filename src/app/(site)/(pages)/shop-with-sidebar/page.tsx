import React from "react";
import ShopWithSidebar from "@/components/ShopWithSidebar";

import { Metadata } from "next";
import { siteMetadata } from "@/config/metadata";
export const metadata: Metadata = {
  title: "Shop Page" + siteMetadata.titleSuffix,
  description: siteMetadata.defaultDescription,
  // other metadata
};

const ShopWithSidebarPage = () => {
  return (
    <main>
      <ShopWithSidebar />
    </main>
  );
};

export default ShopWithSidebarPage;

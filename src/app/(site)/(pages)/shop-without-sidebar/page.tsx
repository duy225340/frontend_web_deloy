import React from "react";
import ShopWithoutSidebar from "@/components/ShopWithoutSidebar";

import { Metadata } from "next";
import { siteMetadata } from "@/config/metadata";
export const metadata: Metadata = {
  title: "Shop Page" + siteMetadata.titleSuffix,
  description: siteMetadata.defaultDescription,
  // other metadata
};

const ShopWithoutSidebarPage = () => {
  return (
    <main>
      <ShopWithoutSidebar />
    </main>
  );
};

export default ShopWithoutSidebarPage;

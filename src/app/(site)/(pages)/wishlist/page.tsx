import React from "react";
import { Wishlist } from "@/components/Wishlist";
import { Metadata } from "next";
import { siteMetadata } from "@/config/metadata";

export const metadata: Metadata = {
  title: "Wishlist Page" + siteMetadata.titleSuffix,
  description: siteMetadata.defaultDescription,
  // other metadata
};

const WishlistPage = () => {
  return (
    <main>
      <Wishlist />
    </main>
  );
};

export default WishlistPage;

import React from "react";
import ShopDetails from "@/components/ShopDetails";
import { Metadata } from "next";
import { siteMetadata } from "@/config/metadata";

export const metadata: Metadata = {
  title: "Chi tiết sản phẩm | E-Commerce",
  description: siteMetadata.defaultDescription,
};

interface ShopDetailsPageProps {
  searchParams: Promise<{ id?: string; slug?: string }>;
}

const ShopDetailsPage = async ({ searchParams }: ShopDetailsPageProps) => {
  const params = await searchParams;
  
  // Extract ID if explicitly provided
  let productId = params.id ? parseInt(params.id) : null;
  
  // Extract Slug
  // 1. Check if 'slug' key exists explicitly: ?slug=ao-da
  // 2. Otherwise, check for the first key: ?ao-da (params = { 'ao-da': '' })
  let slug = params.slug || null;
  
  if (!slug && !productId) {
    const keys = Object.keys(params);
    if (keys.length > 0 && keys[0] !== 'id' && keys[0] !== 'slug') {
      slug = keys[0];
    }
  }
  
  return (
    <main>
      <ShopDetails productId={productId} slug={slug} />
    </main>
  );
};

export default ShopDetailsPage;

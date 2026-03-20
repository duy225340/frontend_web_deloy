import React from "react";
import BlogGridWithSidebar from "@/components/BlogGridWithSidebar";

import { Metadata } from "next";
import { siteMetadata } from "@/config/metadata";
export const metadata: Metadata = {
  title: "Blog Grid Page" + siteMetadata.titleSuffix,
  description: siteMetadata.defaultDescription,
  // other metadata
};

const BlogGridWithSidebarPage = () => {
  return (
    <>
      <BlogGridWithSidebar />
    </>
  );
};

export default BlogGridWithSidebarPage;

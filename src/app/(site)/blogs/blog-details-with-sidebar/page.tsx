import React from "react";
import BlogDetailsWithSidebar from "@/components/BlogDetailsWithSidebar";

import { Metadata } from "next";
import { siteMetadata } from "@/config/metadata";
export const metadata: Metadata = {
  title: "Blog Details Page" + siteMetadata.titleSuffix,
  description: siteMetadata.defaultDescription,
  // other metadata
};

const BlogDetailsWithSidebarPage = () => {
  return (
    <main>
      <BlogDetailsWithSidebar />
    </main>
  );
};

export default BlogDetailsWithSidebarPage;

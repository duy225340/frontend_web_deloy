import BlogDetails from "@/components/BlogDetails";
import React from "react";

import { Metadata } from "next";
import { siteMetadata } from "@/config/metadata";
export const metadata: Metadata = {
  title: "Blog Details Page" + siteMetadata.titleSuffix,
  description: siteMetadata.defaultDescription,
  // other metadata
};

const BlogDetailsPage = () => {
  return (
    <main>
      <BlogDetails />
    </main>
  );
};

export default BlogDetailsPage;

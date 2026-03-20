import MyAccount from "@/components/MyAccount";
import React from "react";

import { Metadata } from "next";
import { siteMetadata } from "@/config/metadata";
export const metadata: Metadata = {
  title: "My Account" + siteMetadata.titleSuffix,
  description: siteMetadata.defaultDescription,
  // other metadata
};

const MyAccountPage = () => {
  return (
    <main>
      <MyAccount />
    </main>
  );
};

export default MyAccountPage;

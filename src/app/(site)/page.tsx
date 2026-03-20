import Home from "@/components/Home";
import ChatbotWidget from "@/components/ChatbotWidget";
import { Metadata } from "next";
import { siteMetadata } from "@/config/metadata";

export const metadata: Metadata = {
  title: siteMetadata.defaultTitle,
  description: siteMetadata.defaultDescription,
  // other metadata
};

export default function HomePage() {
  return (
    <>
      <Home />
      <ChatbotWidget />
    </>
  );
}

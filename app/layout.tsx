import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { LoadingProvider } from "./(context)/LoadingContext";
import GlobalLoaderProvider from "@/components/ui/global-loader-provider";

const outfit = Outfit({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RapidContent - AI Content Generator SAAS",
  description: "Generate high-quality content with AI. Professional AI content generator with templates for blogs, social media, marketing, and more. Start with 1,00,000 free words.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignOutUrl="/landing">
      <html lang="en">
        <body className={outfit.className}>
          <LoadingProvider>
            {children}
            <GlobalLoaderProvider />
          </LoadingProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

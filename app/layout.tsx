import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { MyRuntimeProvider } from "@/app/MyRuntimeProvider";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Urology Guidelines",
  description: "Chat with Guidelines",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MyRuntimeProvider serverUrl={process.env.NEXT_PUBLIC_BACKEND_URL_ALL_GUIDELINES || ''}>
      <html lang="en" className="h-full w-full">
        <body className={`${inter.className} h-full w-full`}>{children}</body>
      </html>
    </MyRuntimeProvider>
  )};

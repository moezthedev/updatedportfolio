import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Spinner from "@/components/Spinner/Spinner";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Moez Portfolio",
  description: "Showcasing projects by Moez",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-gray-100">
        <Suspense
          fallback={
            <div className="flex min-h-screen items-center justify-center">
              <Spinner size="lg" color="indigo" />
            </div>
          }
        >
          {children}
        </Suspense>
      </body>
    </html>
  );
}

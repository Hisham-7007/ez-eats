import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/ui/Footer";

export const metadata: Metadata = {
  title: "Hisham Ibrahim",
  description: "EATS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}

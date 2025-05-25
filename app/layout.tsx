import type React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
   title: "iElect - Secure Blockchain Voting Platform",
   description: "A secure, transparent, and accessible blockchain-based electronic voting system",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <html lang="en">
         <body className={inter.className}>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
               {children}
            </ThemeProvider>
         </body>
      </html>
   );
}

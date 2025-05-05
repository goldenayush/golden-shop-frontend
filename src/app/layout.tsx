import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/libs/redux/providers/redux.provider";

type Props = Readonly<{ children: React.ReactNode }>;

const geistSans = Geist({
   variable: "--font-geist-sans",
   subsets: ["latin"],
});

const geistMono = Geist_Mono({
   variable: "--font-geist-mono",
   subsets: ["latin"],
});

export const metadata: Metadata = {
   title: "Dashboard",
   description: "ecommerces admin dashboard",
};
export default function RootLayout({ children }: Props) {
   return (
      <html lang="en">
         <body className={`${geistSans.variable} ${geistMono.variable}`}>
            <StoreProvider>{children}</StoreProvider>
         </body>
      </html>
   );
}

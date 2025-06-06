import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import App from "./app";

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
         <body //
            className={`${geistSans.variable} ${geistMono.variable}`}
            suppressHydrationWarning={true}>
            <App>{children}</App>
         </body>
      </html>
   );
}

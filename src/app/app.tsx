"use client";
import StoreProvider from "@/libs/redux/providers/redux.provider";
import { usePathname } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";

type Props = {
   children: ReactNode;
};
export default function App({ children }: Props) {
   const [mounted, setMounted] = useState(false);
   const pathname = usePathname();

   useEffect(() => {
      setMounted(true);
   }, []);

   const loading = !mounted && pathname.startsWith("/admin"); //csr only for /admin.... routes

   if (loading) {
      return "laoding...";
   }
   return <StoreProvider>{children}</StoreProvider>;
}

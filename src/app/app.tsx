"use client";
import StoreProvider from "@/libs/redux/providers/redux.provider";
import { Loading } from "@/shared/components";
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
      // return <Loading className="h-[70vh] text-3xl" />;
      return <div className="h-[70vh] text-3xl">Loading...</div>;
   }
   return <StoreProvider>{children}</StoreProvider>;
}

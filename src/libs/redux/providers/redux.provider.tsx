"use client";
import { useEffect, useRef, useState } from "react";
import { Provider } from "react-redux";
import { AppStore, makeStore } from "../store";
import dynamic from "next/dynamic";
const ToastContainer = dynamic(() => import("react-toastify").then((m) => m.ToastContainer), {
   ssr: false,
   loading: () => "loading...",
});
export default function StoreProvider({ children }: { children: React.ReactNode }) {
   const storeRef = useRef<AppStore>(undefined);
   const [isClient, setClient] = useState(false);

   useEffect(() => {
      setClient(true);
      return () => {};
   }, []);

   if (!isClient) {
      return "loading...";
   }
   if (!storeRef.current) {
      storeRef.current = makeStore();
   }
   return (
      <Provider store={storeRef.current}>
         {children}
         <ToastContainer theme="colored" />
      </Provider>
   );
}

"use client";
import { useEffect, useRef, useState } from "react";
import { Provider } from "react-redux";
import { AppStore, makeStore } from "../store";

export default function StoreProvider({ children }: { children: React.ReactNode }) {
   const [isClient, setIsClient] = useState(false);
   const storeRef = useRef<AppStore>(undefined);
   if (!storeRef.current) {
      storeRef.current = makeStore();
   }

   useEffect(() => {
      setIsClient(true); // This only runs on the client
   }, []);

   if (!isClient) {
      return null; // Or a loader/skeleton
   }
   return <Provider store={storeRef.current}>{children}</Provider>;
}

"use client";
import { useState, useEffect } from "react";

type Props = {
   children: React.ReactNode;
};
export function ClientWrapper({ children }: Props) {
   const [isClient, setIsClient] = useState(false);

   useEffect(() => {
      setIsClient(true);
   }, []);

   if (!isClient) {
      <div>loading...</div>;
   }

   return <>{children}</>;
}

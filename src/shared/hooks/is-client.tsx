import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export function useIsClient() {
   const [mounted, setMounted] = useState(false);
   const pathname = usePathname();

   useEffect(() => {
      setMounted(true);
   }, []);

   return !mounted && pathname.startsWith("/admin");
}

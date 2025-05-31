import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function useWidgetsController() {
   const router = useRouter();
   const modalRef = useRef<any>(null);
   const widgets = [
      { id: 1, name: "Main menu", type: "Menu", status: true },
      { id: 2, name: "Featured categories", type: "Text block", status: true },
      { id: 3, name: "Featured Products", type: "Collection products", status: true },
      { id: 4, name: "Main banner", type: "Text block", status: true },
      { id: 5, name: "Banner Krishna Theme", type: "Text block", status: true },
      { id: 6, name: "Krishna Theme Menu", type: "Menu", status: true },
   ];
   const menuLink = (link: string) => {
      router.push(link);
   };
   return { widgets, modalRef, menuLink };
}

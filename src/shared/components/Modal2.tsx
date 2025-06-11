"use client";
import React, { useState, CSSProperties } from "react";
import { IoClose } from "react-icons/io5";

type ModalSize = "sm" | "md" | "lg" | "xl" | "full";
type ModalPlacement = "top" | "center" | "bottom";

type Props = {
   title?: string;
   size?: ModalSize;
   closeable?: boolean;
   className?: string;
   placement?: ModalPlacement;
   Trigger: React.ComponentType<{ onOpen: () => void }>;
   Content: React.ComponentType<{ onClose: () => void }>;
};

export function Modal2({ title, size = "md", closeable = false, className = "", placement = "center", Trigger, Content }: Props) {
   const [isOpen, setIsOpen] = useState(false);

   const sizeClass = {
      sm: "w-64",
      md: "w-96",
      lg: "w-[32rem]",
      xl: "w-[40rem]",
      full: "w-full max-w-screen-lg",
   }[size];

   const placementClass = {
      top: "items-start",
      center: "items-center",
      bottom: "items-end",
   }[placement];

   const handleClose = () => setIsOpen(false);
   const handleOpen = () => setIsOpen(true);

   return (
      <>
         <Trigger onOpen={handleOpen} />
         {isOpen && (
            <div className={`fixed inset-0 z-50 flex ${placementClass} justify-center overflow-y-auto bg-opacity-50`} style={styles.overlay} onClick={closeable ? handleClose : undefined}>
               <div className={`bg-white rounded shadow ${sizeClass} ${className}`} onClick={(e) => e.stopPropagation()}>
                  {title && (
                     <div className="flex justify-between items-center mb-4 p-4 border-b">
                        <h2 className="text-xl font-semibold">{title}</h2>
                        {closeable && (
                           <button onClick={handleClose} className="text-xl">
                              <IoClose className="text-red-500" />
                           </button>
                        )}
                     </div>
                  )}
                  <Content onClose={handleClose} />
               </div>
            </div>
         )}
      </>
   );
}

const styles: Record<string, CSSProperties> = {
   overlay: {
      backgroundColor: "#000000a3",
   },
};

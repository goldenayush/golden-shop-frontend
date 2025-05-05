"use client";
import React, { CSSProperties, forwardRef, useImperativeHandle, useState } from "react";
import { IoClose } from "react-icons/io5";

type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

type Props = {
   title?: string;
   size?: ModalSize;
   children: React.ReactNode;
   closeable?: boolean;
   className?: string;
};

export const Modal = forwardRef(
   (
      {
         title, //
         size = "md",
         closeable,
         className,
         children,
      }: Props,
      ref
   ) => {
      const [isOpen, setIsOpen] = useState(false);

      useImperativeHandle(ref, () => ({ setIsOpen }), []);

      const sizeClass = {
         sm: "w-64", // 16rem
         md: "w-96", // 24rem
         lg: "w-[32rem]", // 32rem
         xl: "w-[40rem]", // 40rem
         full: "w-full max-w-screen-lg mx-4", // Full with margin
      }[size];

      return (
         <>
            {isOpen && (
               <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 modal-fade-in" style={styles.overlay} onClick={() => closeable && setIsOpen(false)}>
                  <div className={`bg-white rounded shadow ${sizeClass} ${className ? " " + className : ""}`} onClick={(e) => e.stopPropagation()}>
                     {title && (
                        <div className="flex justify-between items-center mb-4">
                           <h2 className="text-xl font-semibold text-[16px]">{title}</h2>
                           {closeable && (
                              <button onClick={() => setIsOpen(false)} className="text-xl">
                                 <IoClose className="text-red-500" />
                              </button>
                           )}
                        </div>
                     )}
                     {children}
                  </div>
               </div>
            )}
         </>
      );
   }
);

const styles: Record<string, CSSProperties> = {
   overlay: {
      backgroundColor: "#000000a3",
   },
};

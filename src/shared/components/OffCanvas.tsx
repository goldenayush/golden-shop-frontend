"use client";
import React, { forwardRef, ReactNode, useImperativeHandle, useState } from "react";

type Props = {
   isFragment?: boolean;
   children?: ReactNode;
};
export const OffCanvas = forwardRef(({ isFragment, children }: Props, ref) => {
   const [isOpen, toggle] = useState(false);
   useImperativeHandle(ref, () => ({ toggle }), []);
   if (isFragment) {
      return children;
   }

   return (
      <div className="relative h-screen bg-gray-100">
         {/* Backdrop */}
         {isOpen && (
            <div //
               onClick={() => toggle(false)}
               className="fixed inset-0 z-40"
               style={{ background: "#00000040" }}
            />
         )}

         {/* Off-Canvas Sidebar */}
         <div className={`fixed top-0 left-0  h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>{children}</div>
      </div>
   );
});

"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { IoArrowBack } from "react-icons/io5";

type Props = {
   backLink?: string;
   heading: string | JSX.Element;
   action?: {
      title: string;
      link?: string;
      event?: () => void;
   };
   extra?: string | JSX.Element;
};

export function PageHeader({ backLink, heading, action, extra }: Props) {
   const router = useRouter();
   return (
      <div className="flex items-center justify-between gap-3 mb-4">
         <div className="flex items-center gap-2">
            {backLink && (
               <button
                  type="button"
                  className="border p-2 rounded-sm cursor-pointer border-[#8c9196]
                                 text-[#6c7277]"
                  onClick={() => router.replace(backLink)}>
                  <IoArrowBack size={22} />
               </button>
            )}
            {heading && <h2 className="text-[20px] font-semibold">{heading}</h2>}
         </div>
         {action?.link && (
            <Link href={action?.link} type="button" className="bg-[#008060] text-white py-2 px-4 rounded-sm text-[14px] font-semibold cursor-pointer">
               {action?.title}
            </Link>
         )}
         {extra && extra}
      </div>
   );
}

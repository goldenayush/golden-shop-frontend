"use client";
import React from "react";

type FeatureProps = { label?: string; eleSize?: "sm" | "md" | "lg" };
type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & FeatureProps;

const TEXT_FIELD_SIZE_TYPE = {
   sm: "px-[12px] py-[2px] h-[25px] text-[12px]",
   md: "px-[12px] py-[8px] h-[35px] text-[13px]",
   lg: "px-[12px] py-[8px] h-[50px] text-[16px]",
};

export function TextField({ label, className, eleSize, ...props }: Props) {
   return (
      <>
         {label && (
            <label //
               htmlFor={props.id}
               className="block mb-1 text-[#666] text-[13px]">
               {label}
            </label>
         )}
         <input //
            {...props}
            className={`border-1 border-[#e5e7eb] rounded-[4px] w-full  placeholder:text-[14px] ${TEXT_FIELD_SIZE_TYPE[eleSize || "md"]}`}
         />
      </>
   );
}

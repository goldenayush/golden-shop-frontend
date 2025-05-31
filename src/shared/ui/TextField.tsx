"use client";
import React from "react";
import { Label } from "./Label";

type FeatureProps = {
   label?: string | JSX.Element;
   eleSize?: "sm" | "md" | "lg";
   prefixIcon?: any;
   suffixIcon?: any;
   instruction?: string | JSX.Element;
};
export type TextFieldProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & FeatureProps;

const TEXT_FIELD_SIZE_TYPE = {
   sm: "px-[12px] py-[2px] h-[27px] text-[12px] rounded-sm",
   md: "px-[12px] py-[8px] h-[35px] text-[13px] rounded-[4px]",
   lg: "px-[12px] py-[8px] h-[50px] text-[16px] rounded-lg",
};

export function TextField({ label, className, eleSize, prefixIcon, suffixIcon, instruction, ...props }: TextFieldProps) {
   if (suffixIcon || prefixIcon) {
      return (
         <>
            {label && <Label htmlFor={props.id}>{label}</Label>}
            <div className="border flex items-center rounded-[4px] border-gray-300  focus-within:outline-2 focus-within:outline-blue-500">
               {prefixIcon && <span className="px-2">{prefixIcon}</span>}
               <input
                  {...props}
                  className={`leading-none border-none text-gray-900 text-sm focus:ring-0 focus:outline-none block w-full placeholder:text-[14px] ${TEXT_FIELD_SIZE_TYPE[eleSize || "md"]} ${
                     className || ""
                  }`}
               />
               {suffixIcon && <span className="px-2">{suffixIcon}</span>}
            </div>
            {instruction && <p className="text-[14px] text-[#6d7175]">{instruction}</p>}
         </>
      );
   }
   return (
      <>
         {label && <Label htmlFor={props.id}>{label}</Label>}
         <input //
            {...props}
            className={`border leading-none border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full  placeholder:text-[14px] ${
               TEXT_FIELD_SIZE_TYPE[eleSize || "md"]
            } ${className && className}`}
         />
         {instruction && <p className="text-[14px] text-[#6d7175]">{instruction}</p>}
      </>
   );
}

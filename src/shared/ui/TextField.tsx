"use client";
import React from "react";
import { Label } from "./Label";

type FeatureProps = { label?: string; eleSize?: "sm" | "md" | "lg" };
export type TextFieldProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & FeatureProps;

const TEXT_FIELD_SIZE_TYPE = {
   sm: "px-[12px] py-[2px] h-[27px] text-[12px] rounded-sm",
   md: "px-[12px] py-[8px] h-[35px] text-[13px] rounded-[4px]",
   lg: "px-[12px] py-[8px] h-[50px] text-[16px] rounded-lg",
};

export function TextField({ label, className, eleSize, ...props }: TextFieldProps) {
   return (
      <>
         {label && <Label htmlFor={props.id}>{label}</Label>}
         <input //
            {...props}
            className={`border leading-none border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full  placeholder:text-[14px] ${
               TEXT_FIELD_SIZE_TYPE[eleSize || "md"]
            } ${className && className}`}
         />
      </>
   );
}

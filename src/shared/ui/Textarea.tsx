import React, { JSX } from "react";
import { Label } from "./Label";

type FeatureProps = { label?: string | JSX.Element };
export type TextareaProps = React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> & FeatureProps;

export function Textarea({ className, label, ...props }: TextareaProps) {
   return (
      <>
         {label && <Label htmlFor={props.id}>{label}</Label>}
         <textarea {...props} className={`border-1 border-[#e5e7eb] rounded-[4px] px-[12px] py-[8px] w-full placeholder:text-[14px] text-[14px]${className ? " " + className : ""}`} />
      </>
   );
}

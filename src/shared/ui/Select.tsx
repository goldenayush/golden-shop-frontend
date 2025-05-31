import React from "react";
import { Label } from "./Label";
import { TbSelector } from "react-icons/tb";
type Options = React.DetailedHTMLProps<React.OptionHTMLAttributes<HTMLOptionElement>, HTMLOptionElement>;
type FeatureProps = {
   label?: string;
   options: Options[];
   placeholder?: string;
   eleSize?: "sm" | "md" | "lg";
};

export type SelectProps = React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> & FeatureProps;

const SELECT_SIZE_TYPE = {
   sm: "px-[12px] py-[2px] h-[25px] text-[12px] rounded-sm",
   md: "px-[12px] py-[8px] h-[35px] text-[13px] rounded-[4px]",
   lg: "px-[12px] py-[8px] h-[50px] text-[16px] rounded-lg",
};

export function Select({ label, options, placeholder, eleSize, ...props }: SelectProps) {
   return (
      <>
         {label && <Label htmlFor={props.id}>{label}</Label>}
         <div className="relative">
            <select {...props} className={`border leading-none border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full ${SELECT_SIZE_TYPE[eleSize || "md"]}`}>
               {placeholder && (
                  <option value="" disabled selected>
                     {placeholder}
                  </option>
               )}
               {options.map((option, idx) => (
                  <option key={`${props.name}-${idx}`} {...option} />
               ))}
            </select>
            <TbSelector size={10} className="select-icon" />
         </div>
      </>
   );
}

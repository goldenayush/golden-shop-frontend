import React from "react";
import { Label } from "./Label";
import { FaCalendarWeek } from "react-icons/fa";

type FeatureProps = {
   label?: string;
   eleSize?: "sm" | "md" | "lg";
};

const DATE_PICKER_SIZE_TYPE = {
   sm: "px-[12px] py-[2px] h-[25px] text-[12px]",
   md: "px-[12px] py-[8px] h-[35px] text-[13px]",
   lg: "px-[12px] py-[8px] h-[50px] text-[16px]",
};

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & FeatureProps;

export function DatePicker({ label, ...props }: Props) {
   const size = DATE_PICKER_SIZE_TYPE["md"];
   return (
      <div className="w-full">
         {label && <Label htmlFor="date">{label}</Label>}
         <div className="relative">
            <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
               <div className="bg-white">
                  <FaCalendarWeek />
               </div>
            </div>
            <input
               {...props}
               type="date"
               id="date"
               className={`border leading-none border-gray-300 text-gray-900 text-sm rounded-[4px] focus:ring-blue-500 focus:border-blue-500 w-full ${size}`}
            />
         </div>
      </div>
   );
}

import React, { JSX } from "react";

type FeatureProps = { label?: string | JSX.Element };
type Props = React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> & FeatureProps;

export function Textarea({ className, label, ...props }: Props) {
   return (
      <>
         {label && (
            <label //
               htmlFor={props.id}
               className="block mb-1 text-[#666] text-[14px]">
               {label}
            </label>
         )}
         <textarea {...props} className={`border-1 border-[#e5e7eb] rounded-[4px] px-[12px] py-[8px] w-full placeholder:text-[14px] text-[14px]${className ? " " + className : ""}`} />
      </>
   );
}

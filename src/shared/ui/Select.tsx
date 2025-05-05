import React from "react";

type Options = React.DetailedHTMLProps<React.OptionHTMLAttributes<HTMLOptionElement>, HTMLOptionElement>;
type FeatureProps = {
   label?: string;
   options: Options[];
   placeholder?: string;
   eleSize?: "sm" | "md" | "lg";
};

type Props = React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> & FeatureProps;

const SELECT_SIZE_TYPE = {
   sm: "px-[12px] py-[2px] h-[25px] text-[12px]",
   md: "px-[12px] py-[8px] h-[35px] text-[13px]",
   lg: "px-[12px] py-[8px] h-[50px] text-[16px]",
};

export function Select({ label, options, placeholder, eleSize, ...props }: Props) {
   return (
      <>
         {label && (
            <label //
               htmlFor={props.id}
               className="block mb-1 text-[#666] text-[14px]">
               {label}
            </label>
         )}
         <select {...props} className={`border-1 border-[#e5e7eb] rounded-[4px] w-full ${SELECT_SIZE_TYPE[eleSize || "md"]}`}>
            {placeholder && (
               <option value="" disabled>
                  {placeholder}
               </option>
            )}
            {options.map((option, idx) => (
               <option key={`${props.name}-${idx}`} {...option} />
            ))}
         </select>
      </>
   );
}

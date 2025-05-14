import React from "react";
type Props = React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>;
export function Label({ className, ...props }: Props) {
   return (
      <label
         {...props}
         className={`${
            className //
               ? className
               : "block mb-1 text-[#262626] text-[14px]"
         }`}
      />
   );
}

import React from "react";
type Props = React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>;
export function Label({ className, ...props }: Props) {
   return (
      <label
         {...props}
         className={`${
            className //
               ? className
               : "block mb-1 text-[#666] text-[14px]"
         }`}
      />
   );
}

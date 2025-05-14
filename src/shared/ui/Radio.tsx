import React, { JSX } from "react";

type FeatureProps = { label?: string | JSX.Element };
type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & FeatureProps;

export function Radio({ label, type, ...props }: Props) {
   return (
      <label htmlFor={props.id} className="flex items-center gap-2 cursor-pointer select-none">
         <input type="radio" {...props} id={props.id} hidden />
         <div className="w-4 h-4 rounded-full border-2 border-gray-400 radio" />
         {label && <span className="text-[14px] font-normal">{label}</span>}
      </label>
   );
}

import React from "react";
import { Label } from "./Label";

type FeatureProps = {
   label?: string | JSX.Element;
};

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & FeatureProps;

export function Checkbox({ type, label, ...props }: Props) {
   return (
      <div className="flex items-center gap-2">
         <input {...props} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2" />
         {label && <Label htmlFor={props.id}>{label}</Label>}
      </div>
   );
}

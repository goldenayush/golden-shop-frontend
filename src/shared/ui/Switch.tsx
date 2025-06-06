import React from "react";

type FeatureProps = {
   label?: string | JSX.Element;
   eleSize?: "sm" | "md" | "lg";
};
type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & FeatureProps;

const SWITCH_SIZE_TYPE = {
   sm: "w-9 h-5 after:h-4 after:w-4 after:top-[2px] after:start-[2px]",
   md: "w-11 h-6 after:h-5 after:w-5 after:top-[2px] after:start-[2px]",
   lg: "w-15 h-8 after:h-6 after:w-6 after:top-[3px] after:start-[4px]",
};

export function Switch({ label, eleSize, ...props }: Props) {
   const size = SWITCH_SIZE_TYPE[eleSize || "md"];
   return (
      <label className="inline-flex items-center cursor-pointer">
         <input {...props} type="checkbox" className="peer hidden" />
         <div
            className={`relative bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute  after:bg-white after:border-gray-300 after:border after:rounded-full after:transition-all peer-checked:bg-blue-600 ${size}`}
         />
         {label && <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{label}</span>}
      </label>
   );
}

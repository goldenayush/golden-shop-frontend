import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export function Loading({ className, ...rest }: Props) {
   return (
      <div {...rest} className={"border-1 border-gray-300 p-3 flex items-center justify-center gap-2 rounded-sm" + (className ? ` ${className}` : "")}>
         <AiOutlineLoading3Quarters className="spin" />
      </div>
   );
}

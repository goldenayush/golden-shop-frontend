import React from "react";

type Props = {
   title: string;
   iconAfter?: any;
   iconBefore?: any;
   bg: string;
   color: string;
};
export function Badge({ title, iconAfter, iconBefore, bg, color }: Props) {
   return (
      <span //
         className="rounded-[30px] inline-flex text-xs capitalize px-[8px] py-[3px] items-center gap-2 text-[13px]"
         style={{ background: bg, color: color }}>
         {iconBefore && iconBefore} {title} {iconAfter && iconAfter}
      </span>
   );
}

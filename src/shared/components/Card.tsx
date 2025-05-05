import React from "react";

type FeatureProps = {
   heading?: string;
   more?: any;
};

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & FeatureProps;

export function Card({ className, heading, more, style, ...props }: Props) {
   return (
      <div //
         {...props}
         className={`bg-white rounded-[6px] ${className}`}
         style={{ ...style, ...styles.cardShadow }}>
         {heading && (
            <div className="flex justify-between mb-4">
               <h3 className="text-[16px] font-semibold">{heading}</h3>
               {more}
            </div>
         )}
         {props.children}
      </div>
   );
}

const styles = {
   cardShadow: {
      boxShadow: "0 0 #0000, 0 0 #0000, 0 0 #0000, 0 0 #0000, 0 0 0 1px rgba(63,63,68,.05),0 1px 3px 0 rgba(63,63,68,.15)",
   },
};

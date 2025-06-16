"use client";
import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type FeatureProps = {
   loading?: boolean;
};
type Props = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & FeatureProps;

export function Button({ loading, ...props }: Props) {
   const disabled = props.disabled || loading;
   return (
      <button //
         {...props}
         style={{ ...(disabled ? styles.disabled : {}), ...styles.flex }}
         disabled={disabled}>
         {loading && <AiOutlineLoading3Quarters className="spin" />}
         {props.children}
      </button>
   );
}

const styles = {
   disabled: {
     // color: "white",
     // background: "#aaa9a9",
      cursor: "not-allowed",
      border: "none",
   },
   flex: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "6px",
   },
};

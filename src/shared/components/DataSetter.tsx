"use client";
import { useEffect } from "react";

type Props = {
   callback: () => void;
};
export function DataSetter({ callback }: Props) {
   useEffect(() => {
      if (callback) {
         callback();
      }
      return () => {};
   }, [callback]);

   return "";
}

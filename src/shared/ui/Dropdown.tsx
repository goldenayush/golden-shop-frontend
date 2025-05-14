"use client";
import React, { useEffect, useRef, useState } from "react";

type Props = {
   defaultValue?: string;
   OptionComponent?: React.ComponentType<{ label: string; value: string }>;
   Component: React.ComponentType<{ isShow: boolean; value: string }>;
   options: { value: string; label: any }[];
   onChange: (value: string) => void;
};
export function Dropdown({ options, Component, OptionComponent, onChange, defaultValue }: Props) {
   const [isShow, setToggle] = useState(false);
   const [value, setValue] = useState("");
   const dropdownRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      if (defaultValue && options?.length) {
         const item = options?.find((item) => item?.value === defaultValue);
         if (item?.value) setValue(item.label);
      }
      return () => {};
   }, [defaultValue]);

   useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
         if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setToggle(false);
         }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
   }, []);

   return (
      <div className="relative" ref={dropdownRef}>
         <button onClick={() => setToggle(!isShow)}>
            <Component isShow={isShow} value={value} />
         </button>
         {isShow && (
            <div className="absolute z-10 bg-white divide-gray-100 rounded-lg shadow-sm  px-3">
               {options.map((option) => (
                  <button
                     type="button"
                     onClick={() => {
                        setValue((prev) => {
                           const selectValue = option.value;
                           onChange(selectValue);
                           return option.label;
                        });
                        setToggle(false);
                     }}>
                     {OptionComponent ? ( //
                        <OptionComponent label={option.label} value={option.value} />
                     ) : (
                        option.label
                     )}
                  </button>
               ))}
            </div>
         )}
      </div>
   );
}

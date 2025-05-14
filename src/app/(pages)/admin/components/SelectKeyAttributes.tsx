"use client";
import { Modal } from "@/shared/components";
import React, { useMemo, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

type Selcted = {
   id: string;
   name: string;
   value: string;
};

type Props = {
   keyName: "categories" | "collections" | "attribute_groups" | "sku";
   setValue: (value: any[]) => void;
   title: string;
   multiple?: boolean;
   selcted?: Selcted[];
   onlyTitle?: boolean;
   disabled?: boolean;
};

const categories = [
   { id: "a1b2", name: "Laddu Gopal > Accessories", value: "laddu-gopal-accessories" },
   { id: "c3d4", name: "Laddu Gopal > Pagdi", value: "laddu-gopal-pagdi" },
   { id: "e5f6", name: "Laddu Gopal > Poshak", value: "laddu-gopal-poshak" },
   { id: "g7h8", name: "Laddu Gopal", value: "laddu-gopal" },
];

const collections = [
   { id: "i9j0", name: "Accessories", value: "accessories" },
   { id: "k1l2", name: "Best Sellers", value: "best-sellers" },
   { id: "m3n4", name: "Krishna Products", value: "krishna-products" },
   { id: "o5p6", name: "Featured Products", value: "featured-products" },
];

const attribute_groups = [
   { id: "q7r8", name: "Default", value: "default" }, //
];

const sku = [
   { id: "s9t0", name: "Laddu Gopal Jewelry Set", value: "laddu-gopal-jewelry-set" },
   { id: "u1v2", name: "Laddu Gopal Jewelry Set", value: "laddu-gopal-jewelry-set" },
   { id: "w3x4", name: "Laddu Gopal Jewelry Set", value: "laddu-gopal-jewelry-set" },
   { id: "y5z6", name: "Laddu Gopal Mala", value: "laddu-gopal-mala" },
   { id: "a7b8", name: "Laddu Gopal Mala", value: "laddu-gopal-mala" },
   { id: "c9d0", name: "Laddu Gopal Mala", value: "laddu-gopal-mala" },
];

export default function SelectKeyAttributes({ keyName, setValue, multiple, title, onlyTitle, selcted = [], disabled }: Props) {
   const modalRef = useRef<any>(null);
   const list = useMemo(() => {
      return { categories, collections, attribute_groups, sku }[keyName || "categories"];
   }, [keyName]);

   return (
      <div>
         {onlyTitle ? (
            <button //
               type="button"
               className="text-sm text-blue-500 hover:underline cursor-pointer disabled:text-gray-500"
               onClick={() => modalRef.current.setIsOpen(true)}
               disabled={disabled}>
               {title}
            </button>
         ) : (
            <React.Fragment>
               {selcted.length ? (
                  <button //
                     type="button"
                     className="text-sm text-blue-500 hover:underline cursor-pointer disabled:text-gray-500"
                     onClick={() => modalRef.current.setIsOpen(true)}
                     disabled={disabled}>
                     {`'${selcted[0]?.id}'${selcted.length > 1 ? ` and ${selcted.length - 1} more` : ""}`}
                  </button>
               ) : (
                  <button //
                     type="button"
                     className="text-sm text-blue-500 hover:underline cursor-pointer disabled:text-gray-500"
                     onClick={() => modalRef.current.setIsOpen(true)}
                     disabled={disabled}>
                     {title}
                  </button>
               )}
            </React.Fragment>
         )}
         <Modal ref={modalRef} title="Select Categories" size="lg" className="p-5">
            <div>
               <input type="text" className="border w-full border-gray-400 p-2 rounded-sm placeholder:text-[14px]" placeholder="Search Categories" />
            </div>
            <div className="mt-3">
               {list?.map((category, idx) => {
                  const isSelect = selcted?.length && selcted?.some((e) => e?.id === category?.id);
                  return (
                     <React.Fragment //
                        key={`product-category-${idx}`}>
                        <div //
                           className="flex justify-between items-center py-3">
                           <span className="text-sm text-gray-500">{category.name}</span>
                           <button //
                              type="button"
                              className={
                                 isSelect //
                                    ? "py-3 px-7 bg-[#008060] border rounded-sm text-sm cursor-pointer font-semibold text-white"
                                    : "py-2 px-4 border-gray-600 border rounded-sm text-sm cursor-pointer font-semibold text-black"
                              }
                              onClick={() => {
                                 if (selcted?.some((item) => item?.id === category?.id)) {
                                    setValue(selcted.filter((item) => item?.id !== category?.id));
                                 } else {
                                    if (multiple) {
                                       setValue([...selcted, category]);
                                    } else {
                                       setValue([category]);
                                    }
                                 }
                              }}>
                              {isSelect ? <FaCheck /> : "Select"}
                           </button>
                        </div>
                        {Boolean(list.length - 1 > idx) && (
                           <hr //
                              className="border-b border-[#e1e3e5]"
                           />
                        )}
                     </React.Fragment>
                  );
               })}
            </div>
            <div className="mt-4 flex items-center justify-between ">
               <div className="flex items-center gap-2">
                  <span className="text-[14px] text-gray-500">4 of 4</span>
                  <button type="button" className="border border-gray-500 text-gray-500 p-1 cursor-pointer">
                     <MdArrowBackIosNew size={12} />
                  </button>
                  <button type="button" className="border border-gray-500 text-gray-500 p-1 cursor-pointer">
                     <MdArrowForwardIos size={12} />
                  </button>
               </div>
               <button //
                  type="button"
                  className="py-2 px-4 border-gray-600 border rounded-sm text-sm cursor-pointer font-semibold"
                  onClick={() => modalRef.current.setIsOpen(false)}>
                  Close
               </button>
            </div>
         </Modal>
      </div>
   );
}

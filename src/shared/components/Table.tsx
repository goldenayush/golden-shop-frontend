"use client";
import React, { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { Checkbox, Select, TextField } from "../ui";
import { useSearchParams, useRouter } from "next/navigation";
import { HiOutlineChevronDoubleLeft } from "react-icons/hi";
import { IoChevronBackSharp } from "react-icons/io5";
type Props = {
   onSort?: (param: string) => void;
   checkable?: boolean;
   dataList: any[];
   colums?: {
      key: string;
      label: string;
      sort?: boolean;
   }[];
   onPagination?: (params: any) => void;
   checkEventList?: {
      label: string;
      event(param: string[]): void;
   }[];
};

export function Table({ dataList = [], colums, checkable, onSort, onPagination, checkEventList }: Props) {
   const router = useRouter();
   const searchParams = useSearchParams();
   const page = Number(searchParams.get("page")) || 0;
   const [products, setProducts] = useState(
      dataList.map((item) => ({
         ...item, //
         checked: false,
      }))
   );

   const checkedProducts = products?.filter((item) => item?.checked) || [];

   const setParam = (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(key, value);
      router.push(`?${params.toString()}`);
   };

   return (
      <div className="relative overflow-x-auto">
         <table className="w-full text-sm text-left rtl:text-right">
            <thead className="text-xs text-gray-700 uppercase">
               {checkable && (
                  <th scope="col" className="px-6 py-4 border-b border-gray-200">
                     <Checkbox
                        onChange={(e) =>
                           setProducts((prev) =>
                              prev.map((item) => ({
                                 ...item,
                                 checked: e.target.checked,
                              }))
                           )
                        }
                     />
                  </th>
               )}
               {colums?.map((colum) => (
                  <th key={colum.key} scope="col" className="px-4 py-4 border-b border-gray-200">
                     <div className="flex items-center gap-2">
                        <span className="text-[12px] font-semibold">{colum?.label}</span>
                        {colum.sort && (
                           <span>
                              <IoIosArrowUp
                                 className="cursor-pointer"
                                 size={10}
                                 onClick={() => {
                                    onSort && onSort(`od=${colum.key}&od=asc`);
                                 }}
                              />
                              <IoIosArrowUp
                                 className="cursor-pointer rotate-[180deg]"
                                 size={10}
                                 onClick={() => {
                                    onSort && onSort(`od=${colum.key}&od=desc`);
                                 }}
                              />
                           </span>
                        )}
                     </div>
                  </th>
               ))}
            </thead>
            <tbody>
               {checkable && products?.some((ele) => ele?.checked) && (
                  <tr className="border-b border-gray-200">
                     <th colSpan={7} scope="col" className="px-6 py-4 border-b border-gray-200">
                        <div className="border-l-0 border inline-block border-gray-200">
                           <button type="button" className="border-gray-200 py-2 px-4 border-l font-semibold text-[14px] cursor-pointer">
                              {checkedProducts?.length} selected
                           </button>
                           {Boolean(checkEventList?.length) &&
                              checkEventList?.map((evt) => (
                                 <button //
                                    type="button"
                                    className="border-gray-200 py-2 px-4 border-l font-semibold text-[14px] cursor-pointer"
                                    onClick={() => evt?.event(checkedProducts.map((data) => data?.id))}>
                                    {evt.label}
                                 </button>
                              ))}
                        </div>
                     </th>
                  </tr>
               )}
               {products?.map((data) => {
                  return (
                     <tr className="border-b border-gray-200">
                        {checkable && (
                           <th scope="col" className="px-6 py-4 border-b border-gray-200">
                              <Checkbox
                                 checked={data?.checked}
                                 value={data.id}
                                 onChange={(e) => {
                                    setProducts((prev) =>
                                       prev.map((item) => {
                                          if (item.id == e.target.value) {
                                             return {
                                                ...item,
                                                checked: e.target.checked,
                                             };
                                          } else {
                                             return item;
                                          }
                                       })
                                    );
                                 }}
                              />
                           </th>
                        )}
                        {colums?.map((col) => {
                           return <td className="px-6 py-2">{data?.[col?.key]}</td>;
                        })}
                     </tr>
                  );
               })}
               {onPagination && (
                  <tr className="border-b border-gray-200">
                     <th colSpan={7} scope="col" className="px-6 py-4 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                           <div className="flex items-center gap-2">
                              <span className="text-sm font-normal">Show</span>
                              <TextField eleSize="md" className="text-sm font-normal text-center" style={{ width: "50px" }} />
                              <span className="text-sm font-normal">per page</span>
                           </div>
                           <div className="flex items-center gap-2">
                              <button className="border p-2 rounded-sm border-gray-200 cursor-pointer" onClick={() => setParam("page", "1")}>
                                 <HiOutlineChevronDoubleLeft color="#bcbdbe" />
                              </button>
                              <button className="border p-2 rounded-sm border-gray-200 cursor-pointer" onClick={() => setParam("page", String(page - 1))}>
                                 <IoChevronBackSharp color="#bcbdbe" />
                              </button>
                              <select //
                                 className="w-[50px] p-[5px] border rounded-sm border-gray-200 text-sm font-normal text-center"
                                 onChange={(e) => setParam("page", e.target.value)}>
                                 <option value="1">1</option>
                                 <option value="2">2</option>
                                 <option value="3">3</option>
                                 <option value="4">4</option>
                              </select>
                              <button
                                 className="border p-2 rounded-sm border-gray-200 cursor-pointer rotate-[180deg]"
                                 onClick={() => {
                                    setParam("page", String(page + 1));
                                 }}>
                                 <IoChevronBackSharp color="#bcbdbe" />
                              </button>
                              <button className="border p-2 rounded-sm border-gray-200 cursor-pointer rotate-[180deg]" onClick={() => setParam("page", "4")}>
                                 <HiOutlineChevronDoubleLeft color="#bcbdbe" />
                              </button>
                              <span className="text-sm font-normal">72 records</span>
                           </div>
                        </div>
                     </th>
                  </tr>
               )}
            </tbody>
         </table>
      </div>
   );
}

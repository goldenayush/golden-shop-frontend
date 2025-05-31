"use client";
import React, { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { Button, Checkbox, Select, TextField } from "../ui";
import { useSearchParams, useRouter } from "next/navigation";
import { HiOutlineChevronDoubleLeft } from "react-icons/hi";
import { IoChevronBackSharp } from "react-icons/io5";

type Props = {
   loading?: boolean;
   onSort?: (param: any) => void;
   checkable?: boolean;
   dataList: any[];
   colums?: {
      key: string;
      label: string;
      sort?: boolean;
   }[];
   onPagination?: (params: any) => void;
   pagination?: {
      currentPage: number;
      totalPages: number;
      totalRecords: number;
      limit: number;
      onPagination(param: any): void;
   };
   checkEventList?: {
      loading?: boolean;
      label: string;
      event(param: string[]): void;
   }[];
};

function List({ dataList, colums, checkable, onSort, onPagination, pagination, checkEventList }: Props) {
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
                                 size={8}
                                 onClick={() => {
                                    onSort && onSort({ sortBy: colum.key, sortOrder: "asc" });
                                 }}
                              />
                              <IoIosArrowUp
                                 className="cursor-pointer rotate-[180deg]"
                                 size={8}
                                 onClick={() => {
                                    onSort && onSort({ sortBy: colum.key, sortOrder: "desc" });
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
                        <div className="border-l-0 border inline-flex border-gray-200">
                           <button type="button" className="border-gray-200 py-2 px-4 border-l font-semibold text-[14px] cursor-pointer">
                              {checkedProducts?.length} selected
                           </button>
                           {Boolean(checkEventList?.length) &&
                              checkEventList?.map((evt, idx) => (
                                 <Button //
                                    key={`event-${idx}`}
                                    type="button"
                                    className="border-gray-200 py-2 px-4 border-l font-semibold text-[14px] cursor-pointer"
                                    onClick={() => evt?.event(checkedProducts.map((data) => data?.id))}
                                    loading={evt?.loading}>
                                    {evt.label}
                                 </Button>
                              ))}
                        </div>
                     </th>
                  </tr>
               )}
               {products?.map((data, idx) => {
                  return (
                     <tr key={`table-product-${idx}`} className="border-b border-gray-200">
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
               {pagination && (
                  <tr className="border-b border-gray-200">
                     <th colSpan={7} scope="col" className="px-6 py-4 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                           <div className="flex items-center gap-2">
                              <span className="text-sm font-normal">Show</span>
                              <select //
                                 className="w-[50px] p-[5px] border rounded-sm border-gray-200 text-sm font-normal text-center"
                                 onChange={(e) => pagination?.onPagination({ limit: e.target.value })}
                                 defaultValue={pagination?.limit}>
                                 <option value="10">10</option>
                                 <option value="15">15</option>
                                 <option value="20">20</option>
                                 <option value="25">25</option>
                              </select>
                           </div>
                           <div className="flex items-center gap-2">
                              {pagination?.currentPage > 1 && (
                                 <React.Fragment>
                                    <button //
                                       className="border p-2 rounded-sm border-gray-200 cursor-pointer"
                                       onClick={() => pagination?.onPagination({ page: 1 })}>
                                       <HiOutlineChevronDoubleLeft color="#bcbdbe" />
                                    </button>
                                    <button //
                                       className="border p-2 rounded-sm border-gray-200 cursor-pointer"
                                       onClick={() => {
                                          pagination?.onPagination({
                                             page: pagination.currentPage - 1,
                                          });
                                       }}>
                                       <IoChevronBackSharp color="#bcbdbe" />
                                    </button>
                                 </React.Fragment>
                              )}
                              <select //
                                 className="w-[50px] p-[5px] border rounded-sm border-gray-200 text-sm font-normal text-center"
                                 onChange={(e) => pagination?.onPagination({ page: e.target.value })}
                                 defaultValue={pagination?.currentPage}>
                                 {Array.from({ length: pagination?.totalPages }).map((_, idx) => (
                                    <option value={idx + 1}>{idx + 1}</option>
                                 ))}
                              </select>
                              {pagination.currentPage < pagination.totalPages && (
                                 <React.Fragment>
                                    <button
                                       className="border p-2 rounded-sm border-gray-200 cursor-pointer rotate-[180deg]" //
                                       onClick={() => {
                                          pagination?.onPagination({
                                             page: pagination.currentPage + 1,
                                          });
                                       }}>
                                       <IoChevronBackSharp color="#bcbdbe" />
                                    </button>
                                    <button //
                                       className="border p-2 rounded-sm border-gray-200 cursor-pointer rotate-[180deg]"
                                       onClick={() => pagination?.onPagination({ page: pagination.totalPages })}>
                                       <HiOutlineChevronDoubleLeft color="#bcbdbe" />
                                    </button>
                                 </React.Fragment>
                              )}

                              <span className="text-sm font-normal">{pagination?.totalRecords} records</span>
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

export function Table({ loading, ...props }: Props) {
   if (loading) {
      return (
         <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
               <tbody className="divide-y divide-gray-200">
                  {Array.from({ length: 4 }).map((_, idx) => (
                     <tr key={idx}>
                        <td className="px-4 py-4">
                           <div className="h-4 w-3/4 animate-pulse rounded bg-gray-300"></div>
                        </td>
                        <td className="px-4 py-4">
                           <div className="h-4 w-5/6 animate-pulse rounded bg-gray-300"></div>
                        </td>
                        <td className="px-4 py-4">
                           <div className="h-4 w-1/2 animate-pulse rounded bg-gray-300"></div>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      );
   }
   return <List {...props} />;
}

